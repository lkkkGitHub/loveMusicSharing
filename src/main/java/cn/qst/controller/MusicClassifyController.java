package cn.qst.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageInfo;


import cn.qst.pojo.AlbumResult;
import cn.qst.pojo.TbMenuContent;
import cn.qst.pojo.TbMusic;
import cn.qst.service.MusicClassifyService;

/**
 * 对音乐进行详细分类
 * 
 * @author daihong
 *
 */
@Controller
public class MusicClassifyController {
	@Autowired
	private MusicClassifyService musicClassifyService;

	/**
	 * 把歌曲按照歌手分类
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/musicClassify/queryAll")
	public PageInfo<AlbumResult> queryAll(@RequestParam(value="pageIndex",defaultValue="1")Integer pageNum) {
		PageInfo<AlbumResult> pageInfo = musicClassifyService.fundSnameAll(pageNum,8);
		return pageInfo;
	}
	
	
	/**
	 * 音乐分类
	 */
	@ResponseBody
	@RequestMapping("/musicClassify/queryByCid")
	public PageInfo<TbMusic> queryByCid(Integer cid,Integer pageIndex){
		PageInfo<TbMusic> pageInfo = musicClassifyService.fundQuery(pageIndex,8,cid);
		System.out.println(pageInfo.toString());
		return pageInfo;
	}
	
	/**
	 * 音乐排行
	 */
	@ResponseBody
	@RequestMapping("/musicClassify/rank")
	public List<TbMenuContent> queryRank(Integer mid,String type,HttpServletRequest request){
		if(type.equals("hot")) {
			return (List<TbMenuContent>)request.getSession().getAttribute("hot");
		}else if(type.equals("newsong")) {
			return (List<TbMenuContent>)request.getSession().getAttribute("newsong");
		}else if(type.equals("songer")){
			return (List<TbMenuContent>)request.getSession().getAttribute("songer");	
		}else {
			List<TbMenuContent> queryRank = musicClassifyService.queryRank(mid);
			return queryRank;	
		}
	}
}
