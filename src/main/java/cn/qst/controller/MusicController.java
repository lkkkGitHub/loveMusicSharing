package cn.qst.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


import cn.qst.comman.pojo.AdminResult;
import cn.qst.comman.pojo.EasyUiDataGridResult;
import cn.qst.comman.utils.DownloadLyric;
import cn.qst.pojo.TbComment;
import cn.qst.pojo.TbMusic;
import cn.qst.pojo.TbMusiclist;
import cn.qst.pojo.TbUser;
import cn.qst.service.CommentService;
import cn.qst.service.MusicService;
import cn.qst.service.MusiclistService;

@Controller
public class MusicController {
	
	@Autowired
	private MusicService musicService;
	@Autowired
	private CommentService commentService;
	@Autowired
	private MusiclistService musiclistService;
	
	//上传文件urlip地址
	@Value("${IMAGE_SERVER_URL}")
	private String IMAGE_SERVER_URL;
	
	// 跳转到音乐详情（需要获取音乐的精彩评论和所有评论）
	@RequestMapping("/music/detail")
	public String musicDetailPage(ModelMap map,String mid, HttpSession session) {
		if( mid == null ) {
			return "500";
		}
		// 根据id获取音乐
		int id = Integer.parseInt(mid);
		TbMusic music = musicService.selectByPrimaryKey(id);
		map.addAttribute("music", music);
		
		// 处理歌词（去掉前面的[]）
		String lrcUrl = music.getLyricsurl();
		String lrc = "";
		if( lrcUrl == null || "".equals(lrcUrl.trim()) ) { // 歌词没有保存
			lrc = DownloadLyric.startDownload(music.getMname(), music.getSname());
		} else {// 已经保存好歌词
			lrc = DownloadLyric.download(lrcUrl);
		}
		if( lrc == null || "".equals(lrc) ) lrc = "暂无歌词";
		else {
			lrc = lrc.replaceAll("\\[.*\\]", "<br/>");
			// 去掉多余的<br/>
			lrc = lrc.replaceAll("<br/>\\s(<br/>\\s)+", "<br/>");
		}
		map.addAttribute("lrc", lrc);
		
		// 获取当前音乐的精彩评论
		List<TbComment> topComents = commentService.selectTop10(id);
		map.addAttribute("top10", topComents);
		
		// 分页查询最新评论
		List<TbComment> comments = commentService.selectByMid(id);
		int endIndex = comments.size()>10?10:comments.size();
		comments = comments.subList(0, endIndex);
		map.addAttribute("comments", comments);
		// 查询保存评论总数
		int countAll = commentService.countTotal(id);
		map.addAttribute("counts", countAll);
		// 查询保存总页数
		int page = countAll/10+(countAll%10==0?0:1);
		map.addAttribute("page", page);
		// 保存用户的歌单
		TbUser user = (TbUser) session.getAttribute("user");
		List<TbMusiclist> list = null;
		if( user != null ) list = musiclistService.selectByUid(user.getUid());
		map.addAttribute("mylist", list);
		return "musicdetail";
	}
	
	//添加音乐
	@RequestMapping("/music/addmusic")
	@ResponseBody
	public AdminResult addMusic(TbMusic music) {
			return musicService.addMusic(music);
	}
	
	//查询音乐分页显示
	@RequestMapping("/music/list")
	@ResponseBody
	public EasyUiDataGridResult fundMusicAll( Integer page , Integer rows , TbMusic music) {
		if(page==null) {
			page=1;
		}
		if(rows==null) {
			rows=20;
		}
		EasyUiDataGridResult result = musicService.fundMusicAll(page , rows, music);
		return result;
	}
	
	//修改音乐
	@RequestMapping("/music/update")
	@ResponseBody
	public AdminResult updateMusic(TbMusic music) {
		AdminResult result = musicService.updateMusic(music);
		return result;
	}
	
	//删除音乐
	@RequestMapping("/music/delete")
	@ResponseBody
	public AdminResult deleteMusic(String ids) {
		//转换id类型
		List<Integer> idList = this.strIdtoInt(ids);
		AdminResult result = musicService.deleteMusic(idList);
		return result;
	}
	
	//下线音乐
	@RequestMapping("/item/instock")
	@ResponseBody
	public AdminResult musicInstock(String ids) {
		//转换id
		List<Integer> idList = this.strIdtoInt(ids);
		AdminResult result = musicService.updateMusicStatus(idList, false);
		return result;
	}
	
	//上线音乐
	@RequestMapping("/music/reshelf")
	@ResponseBody
	public AdminResult musicReshelf(String ids) {
		//转换id
		List<Integer> idList = this.strIdtoInt(ids);
		AdminResult result = musicService.updateMusicStatus(idList, true);
		return result;
	}
	
	//id转换器
	private List<Integer> strIdtoInt(String ids){
		//使用,进行分割
		String[] str = ids.split(",");
		List<Integer> idList = new ArrayList<>();
		for (String id : str) {
			idList.add(Integer.parseInt(id));
		}
		return idList;
	}
}
