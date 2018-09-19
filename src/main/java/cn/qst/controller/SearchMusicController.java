package cn.qst.controller;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageHelper;


import cn.qst.pojo.TbMenu;
import cn.qst.pojo.TbMenuContent;
import cn.qst.pojo.TbMusic;
import cn.qst.pojo.TbMusiclist;
import cn.qst.pojo.TbUser;
import cn.qst.service.MenuService;
import cn.qst.service.MusicClassifyService;
import cn.qst.service.MusiclistService;
import cn.qst.service.SeacherMusicService;

/**
 * 音乐搜索
 * @author daihong
 *
 */
@Controller
public class SearchMusicController {
	
	@Autowired
	private SeacherMusicService seacherMusicService;
	
	@Autowired
	private MenuService menuService;
	
	@Autowired
	private MusiclistService musiclistService;
	
	@Autowired
	private MusicClassifyService musicClassifyService;
	
	//搜索历史
	private Set<String> historyList;
	/**
	 * 针对搜索框的内容体现	
	 * @param musicName
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/search",method=RequestMethod.POST)
	public Map<String,Object> searchMusic(String musicName,HttpServletRequest request){
		Map<String, Object> searcherByStr = null;
		if(!musicName.equals("")) {
			searcherByStr = seacherMusicService.searcherByStr(musicName);
		}else {
			List<TbMenuContent> list = (List<TbMenuContent>)request.getSession().getAttribute("hot");
			for(TbMenuContent tbMenuContent:list) {
				System.out.println(tbMenuContent);
			}
			searcherByStr = new HashMap<>();
			searcherByStr.put("song", list);
		}
		searcherByStr.put("history", historyList);
		return searcherByStr;
	}	
	
	/**
	 * 跳到查询页面
	 * @param musicName
	 * @param map
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/seacher",method=RequestMethod.POST)
	public String serachMusic(String musicName,ModelMap map,HttpServletRequest request) {
		System.out.println(musicName);
		//将查询结果保存成历史记录
		if(historyList==null) {
			historyList = new HashSet<>();
		}
		historyList.add(musicName);
		/**
		 * 获取菜单信息
		 */

		List<TbMenu> queryByParent = menuService.queryByParent(12);
		map.put("TbMenu", queryByParent);
		PageHelper.startPage(1, 2);
			Map<String, Object> map2 = seacherMusicService.searcherByStr(musicName);
			map.put("song", map2);	
			TbUser user = (TbUser)request.getSession().getAttribute("user");
			// 查询用户歌单
			if( user != null ) {
				List<TbMusiclist> musiclists = musiclistService.selectByUid(user.getUid());
				map.put("musicList", musiclists);
			}
		return "searchMusic";
		
	}
	
	
	/**
	 * 跳到查询页面
	 * @param musicName
	 * @param map
	 * @param request
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	@RequestMapping( "/seacher")
	public String serachMusic1(String musicName,ModelMap map,HttpServletRequest request) throws UnsupportedEncodingException {
		String name = java.net.URLDecoder.decode(musicName,"UTF-8");
		/**
		 * 获取菜单信息
		 */
		List<TbMenu> queryByParent = menuService.queryByParent(12);
		map.put("TbMenu", queryByParent);
		PageHelper.startPage(1, 2);
			Map<String, Object> map2 = seacherMusicService.searcherByStr(name);
			map.put("song", map2);	
			TbUser user = (TbUser)request.getSession().getAttribute("user");
			// 查询用户歌单
			if( user != null ) {
				List<TbMusiclist> musiclists = musiclistService.selectByUid(user.getUid());
				map.put("musicList", musiclists);
			}
		return "searchMusic";
		
	}
	
	
	/**
	 * 添加歌曲到歌单中
	 * @param mlid
	 * @param mid
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/serachAdd")
	public Boolean serachAdd(Integer mid,Integer mlid) {
		Boolean addMusic = seacherMusicService.addMusic(mlid, mid);
		return addMusic;
	}
	
	/**
	 * 查询歌手的歌
	 * @throws UnsupportedEncodingException 
	 */
	@RequestMapping("/searchBySname")
	public String searchMusicBySname(String sname,ModelMap map) throws UnsupportedEncodingException {
		  String name = java.net.URLDecoder.decode(sname,"UTF-8");
		List<TbMenu> queryByParent = menuService.queryByParent(12);
		map.put("TbMenu", queryByParent);
		List<TbMusic> queryBySname = musicClassifyService.queryBySname(name);
		Map<String, Object> map2 = new HashMap<>();
		map2.put("song", queryBySname);
		map.put("song", map2);
		return "searchMusic";
	}

	public Set<String> getHistoryList() {
		return historyList;
	}

	public void setHistoryList(Set<String> historyList) {
		this.historyList = historyList;
	}
	
}
