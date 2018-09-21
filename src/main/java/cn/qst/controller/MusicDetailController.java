package cn.qst.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageInfo;

import cn.qst.comman.utils.JsonUtils;
import cn.qst.pojo.TbComment;
import cn.qst.pojo.TbUser;
import cn.qst.service.CommentService;
/**
 * 
 * @author Asimple
 * @Description 音乐评论相关
 */
@Controller
@RequestMapping(value="/music")
public class MusicDetailController {
	
	@Autowired
	private CommentService commentService;
	
	// 根据音乐id获取评论(分页，待添加)
	@RequestMapping(value="/commentPage", method= {RequestMethod.POST})
	@ResponseBody
	public PageInfo<TbComment> commentGet(Integer mid, Integer pageIndex) {
		PageInfo<TbComment> pageInfo = commentService.selectByPage(pageIndex, 10, mid);
		return pageInfo;
	}
	
	// 添加评论
	@RequestMapping(value="/comment", method= {RequestMethod.POST})
	@ResponseBody
	public String addComment(String uid, String mid, String cid, String content) {
		// 获取评论用户
		TbUser user = new TbUser(); user.setUid(uid);
		TbComment comment = new TbComment();
		comment.setUser(user);
		int rid = 0, musicId = 0;
		if( mid != null && "".equals(mid) == false ) musicId = Integer.parseInt(mid);
		if( cid != null && "".equals(cid.trim())==false ) rid = Integer.parseInt(cid);
		comment.setParentid(rid);
		comment.setCdate(new Date());
		comment.setMid(musicId);
		comment.setContent(content);
		if( commentService.addComment(comment) ) return JsonUtils.objectToJson("成功");
		else return JsonUtils.objectToJson("评论失败");
	}
	
	// 删除评论
	@RequestMapping(value="/comment/delete", method= {RequestMethod.POST})
	@ResponseBody
	public String deleteComment(String cdid) {
		if( cdid == null || "".equals(cdid) ) {
			return JsonUtils.objectToJson("删除的id不存在");
		}
		int id = Integer.parseInt(cdid);
		if( commentService.deleteComment(id) ) return JsonUtils.objectToJson("成功");
		else return JsonUtils.objectToJson("删除失败");
	}
	
	// 点赞
	@RequestMapping("/comment/dianzan")
	@ResponseBody
	public String dianzan(String uid, String cdid) {
		boolean flag = true;
		if( cdid == null || "".equals(cdid) ) {
			flag = false;
		}
		int cid = Integer.parseInt(cdid);
		if( commentService.findDianZan(uid, cid) != 0 ) {
			flag = false;
		} else {
			// 添加到点赞表
			commentService.dianzan(uid, cid);
			// 点赞数目加1
			commentService.updateLikesum(cid);
		}
		if( flag ) return JsonUtils.objectToJson("点赞成功");
		else return JsonUtils.objectToJson("你已经点过赞了~~");
	}
	
}
