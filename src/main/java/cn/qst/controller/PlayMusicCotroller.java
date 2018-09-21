package cn.qst.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.qst.comman.utils.DownloadLyric;
import cn.qst.comman.utils.JsonUtils;
import cn.qst.pojo.PlaySynchResult;
import cn.qst.pojo.TbMusic;
import cn.qst.pojo.TbMusiclist;
import cn.qst.pojo.TbUser;
import cn.qst.service.MusicService;
import cn.qst.service.Music_MusicListService;
import cn.qst.service.MusiclistService;

/**
 * 
 * @author Asimple
 * @date 2018年9月8日
 * @Description 播放音乐请求控制器
 */


@Controller
public class PlayMusicCotroller {
	
	@Autowired
	private MusiclistService musiclistService;
	@Autowired
	private Music_MusicListService music_musicListService;
	@Autowired
	private MusicService musicService;
	private List<TbMusic> historyList;
	private List<TbMusic> loveList;
	private List<TbMusic> nowList;
	//当前播放的音乐id;
	private Integer nowMid = null;
	//上传文件的url地址
	@Value("${IMAGE_SERVER_URL}")
	private String IMAGE_SERVER_URL;
	
	
	// 跳转到音乐播放
	@RequestMapping("/play")
	public String playPage(ModelMap map, HttpSession session, String type, String id) {
		// 用户登录后可访问
		TbUser user = (TbUser) session.getAttribute("user");
		
		// 查询用户歌单
		if( user != null ) {
			List<TbMusiclist> musiclists = musiclistService.selectByUid(user.getUid());
			map.addAttribute("musicList", musiclists);
		}
		
		// 显示的歌曲列表
		List<TbMusic> musics = null;
		int mid = 0;
		if( id != null ) {
			mid = Integer.parseInt(id);
			//更新的id
			this.nowMid = mid;
		}
		if( type == null || "now".equals(type) ) { // 默认正在播放
			// 如果传过来id，代表直接播放歌曲，可以直接将歌曲添加到正在播放列表
			if( mid != 0 ) {
				//根据id获取音乐
				TbMusic music = musicService.selectByPrimaryKey(mid);
				//修改音乐播放量
				music.setPlaysum(music.getPlaysum()+1);
				musicService.updateMusic(music);
				if( nowList == null ) nowList = new ArrayList<>();
				// 去重
				boolean flag = true;
				for(TbMusic te: nowList) {
					if( te.getMid() == mid ) {
						flag = false;
					}
				}
				if( flag ) nowList.add(music);
			}
			musics = nowList;
		} else if( "history".equals(type) ) { // 历史播放
			musics = historyList;
		} else if( "myLove".equals(type) ) { // 我喜欢的音乐
			musics = loveList;
		} else { // 根据歌单id查找对应的歌单
			musics = musicService.selectByMusicList(Integer.parseInt(type));
		}
		map.addAttribute("songs", musics);
		map.addAttribute("type", type);
		Integer defalutId = null;
		// 传过来id的话，就直接播放这首歌
		if( mid != 0 ) defalutId = mid;
		map.addAttribute("id", defalutId);
		// 将我喜爱的音乐的id到数组中，控制前端红星的显示
		List<Integer> loves = null;
		if( loveList != null && loveList.size()>0 ) {
			loves = new ArrayList<>();
			for(TbMusic temp: loveList) {
				loves.add(temp.getMid());
			}
		}
		map.addAttribute("love", loves);
		
		return "playMusic";
	}

	//播放页面的异步请求
	@RequestMapping("/play/playasynch")
	@ResponseBody
	public PlaySynchResult playasynch(HttpSession session,String type) {
		// 显示的歌曲列表
		List<TbMusic> musics = null;
		if( type == null || "now".equals(type) ) { // 默认正在播放
			musics = nowList;
		} else if( "history".equals(type) ) { // 历史播放
			musics = historyList;
		} else if( "myLove".equals(type) ) { // 我喜欢的音乐
			musics = loveList;
		} else { // 根据歌单id查找对应的歌单
			musics = musicService.selectByMusicList(Integer.parseInt(type));
		}
		List<Integer> loves = null;
		if( loveList != null && loveList.size()>0 ) {
			loves = new ArrayList<>();
			for(TbMusic temp: loveList) {
				loves.add(temp.getMid());
			}
		}
		//把类型保存在session中
		session.setAttribute("type", type);
		//创建结果对象
		PlaySynchResult result = new PlaySynchResult();
		result.setMusics(musics);
		result.setLoves(loves);
		result.setNowMid(nowMid);
		return result;
	}
	
	
	// 音乐播放
	@RequestMapping(value = "/play/playmusic", method= {RequestMethod.POST})
	@ResponseBody
	public String playMusic(ModelMap map, int mid) {
		/*
		 * 1、根据音乐id查找对应的音乐以及歌词
		 * 2、将音乐添加到播放历史歌单当中
		 * 3、返回json数据
		 */
		
		TbMusic music = musicService.selectByPrimaryKey(mid);
		//修改音乐播放量
		music.setPlaysum(music.getPlaysum()+1);
		musicService.updateMusic(music);
		map.addAttribute("music", music);
		//更新当前播放音乐id
		this.nowMid = mid;
		// 将当前播放的音乐放入历史播放歌单当中
		if( historyList == null ) {
			historyList = new ArrayList<>();
		}
		// 如果历史歌单已经有这首歌，就不需要再次添加了
		boolean flag = true;
		for(TbMusic temp: historyList ) {
			if( temp.getMid() == mid ) {
				flag = false;
			}
		}
		if( flag ) historyList.add(music);
		//加入正在播放列表
		if( nowList == null ) nowList = new ArrayList<>();
		// 去重
		boolean flag1 = true;
		for(TbMusic te: nowList) {
			if( te.getMid() == mid ) {
				flag1 = false;
			}
		}
		if( flag1 ) nowList.add(music);
		return JsonUtils.objectToJson("1");
	}
	
	
	// 添加到喜爱的音乐
	@RequestMapping(value = "/loveMusic", method= {RequestMethod.POST})
	@ResponseBody
	public String addLove(int id) {
		//去重
		boolean flag = true;
		if( loveList == null ) loveList = new ArrayList<>();
		for(TbMusic temp: loveList ) {
			if( temp.getMid() == id ) {
				flag = false;
			}
		}
		if( flag ) {
			TbMusic music = musicService.selectByPrimaryKey(id);
			loveList.add(music);
		}
		return JsonUtils.objectToJson("1");
	}
	
	
	// 添加音乐到列表
	@RequestMapping(value="/addList")
	@ResponseBody
	public String addList(String lid, String id) {
		if( lid == null || id == null ) {
			return JsonUtils.objectToJson("参数错误");
		}
		int mlid = Integer.parseInt(lid);
		int mid = Integer.parseInt(id);
		if( music_musicListService.countByMlidAndMid(mlid, mid) == 1 ) {
			return JsonUtils.objectToJson("歌曲已经存在歌单");
		}
		boolean flag = music_musicListService.save(mlid, mid);
		if( flag ) return JsonUtils.objectToJson("添加成功");
		else return JsonUtils.objectToJson("添加失败");
	}
	
	
	// 从列表中删除音乐
	@RequestMapping(value="/delMusicFromList", method= {RequestMethod.POST})
	@ResponseBody
	public String del(int id,HttpSession session) {
		//获取请求类型
		String ty = (String) session.getAttribute("type");
		if( ty==null || "".equals(ty.trim()) || "now".equals(ty) ) {
			for(TbMusic te: nowList ) {
				if( te.getMid() == id ) {
					nowList.remove(te);
				}
			}
		} else if( "history".equals(ty) ) {
			for(TbMusic te: historyList ) {
				if( te.getMid() == id ) {
					historyList.remove(te);
				}
			}
		} else if( "myLove".equals(ty) ) {
			for(TbMusic te: loveList ) {
				if( te.getMid() == id ) {
					loveList.remove(te);
				}
			}
		} else {
			int type = Integer.parseInt(ty);
			music_musicListService.del(type, id);
		}
		return JsonUtils.objectToJson("1");
	}
	
	
	// 歌词获取
	@RequestMapping(value = "/getLy", method = { RequestMethod.POST })
	@ResponseBody
	public String getLrc(String url, String songName, String singerName, int id) {
		/*
		 * 传入url，如果有url就直接获取url的内容
		 * 如果没有url，则从网络中抓取相关歌词
		 */
		if( url == null || "".equals(url.trim()) ) {// 没有url信息
			String lrc = DownloadLyric.startDownload(songName, singerName);
			
		/*	// 正式版本才能用
			String path = IMAGE_SERVER_URL+FileUploadUtils.fileUpload(lrc, DownloadLyric.LRC_EXT);
			//将歌词文件路径添加到对应的音乐
			TbMusic music = new TbMusic();
			music.setMid(id);
			music.setLyricsurl(path);
			musicService.updateMusic(music );*/
			
			
			Map<String, Object> res = new HashMap<String, Object>();
			res.put("lrc", lrc);
			return JsonUtils.objectToJson(res);
		} else { // 含有url地址
			// 读取url地址，返回字符串	
			String lrc = DownloadLyric.download(url);
			Map<String, Object> res = new HashMap<String, Object>();
			res.put("lrc", lrc);
			return JsonUtils.objectToJson(res);
		}
	}
	
	
	// 歌单创建请求
	@RequestMapping(value = "/addMusicList", method = { RequestMethod.POST})
	@ResponseBody
	public String createList(String musicListName, HttpSession session, String s) {
		// 创建返回对象
		Map<String, Object> result = new HashMap<>();
		// 获取创建歌单的用户
		TbUser user = (TbUser) session.getAttribute("user");
		
		if( "v".equalsIgnoreCase(s.trim()) ) { // 验证名字是否存在 falg=true为不存在
			boolean flag = musiclistService.selectByNameAndUid(musicListName, user.getUid())==null;
			String r = flag==true?"true":"false";
			result.put("flag", r);
		} else if( "w".equalsIgnoreCase(s.trim()) ){
			/*
			 * 创建歌单实体对象
			 * 	设置名称
			 * 	设置图片为默认图片
			 * 	设置创建时间
			 * 	设置创建人id
			 */
			TbMusiclist musiclist = new TbMusiclist();
			musiclist.setName(musicListName);
			musiclist.setUid(user.getUid());
			musiclist.setCreatedate(new Date());
			// 设置默认图片
			musiclist.setImage("/images/musicLIst.jpg");
			
			// 保存歌单实体对象
			boolean flag = musiclistService.save(musiclist);
			if( flag ) {
				musiclist = musiclistService.selectByNameAndUid(musicListName, user.getUid());
				result.put("mlid", musiclist.getMlid());
			}
		}
		return JsonUtils.objectToJson(result);
	}
	
	
	// 歌单删除请求
	@RequestMapping(value = "deletMusicList", method = { RequestMethod.POST })
	@ResponseBody
	public String deletMusicList(String musicListId) {
		if( musicListId == null ) return null;
		int mlid = Integer.parseInt(musicListId);
		//情况歌单的歌
		music_musicListService.delAll(mlid);
		//删除歌单
		boolean flag = musiclistService.deleteById(mlid);
		if( !flag ) return null;
		return JsonUtils.objectToJson("1");
	}
	

	public void setHistoryList(List<TbMusic> historyList) {
		this.historyList = historyList;
	}
	public void setLoveList(List<TbMusic> loveList) {
		this.loveList = loveList;
	}
	public void setNowList(List<TbMusic> nowList) {
		this.nowList = nowList;
	}
	
}
