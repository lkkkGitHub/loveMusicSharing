package cn.qst.service;

import java.util.List;

import com.github.pagehelper.PageInfo;

import cn.qst.pojo.TbComment;

public interface CommentService {
	// 通过音乐id查找所有评论
	List<TbComment> selectByMid(int mid);
	
	// 插入评论
	boolean addComment(TbComment comment);
	
	// 获取点赞TOP10的评论
	List<TbComment> selectTop10(int id);
	
	boolean deleteComment(int cdid);
	
	// 分页查询
	PageInfo<TbComment> selectByPage(Integer pageIndex, Integer rows, Integer mid);

	int countTotal(int mid);

	int findDianZan(String uid, int cid);

	int dianzan(String uid, int cid);

	boolean updateLikesum(int cid);
	
}
