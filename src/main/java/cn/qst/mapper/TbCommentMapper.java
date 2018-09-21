package cn.qst.mapper;

import java.util.List;

import cn.qst.pojo.TbComment;

public interface TbCommentMapper {
    // 添加评论
	int save(TbComment comment);
	
	// 删除评论
	int delete(int cdid);
	
	// 根据mid查找对应的评论
	List<TbComment> selectByMid(int mid);
	
	// 增加点赞数
	int addLikesum(int cid);
	
	// 统计总数
	int countAllByMid(int mid);
	
	// 精彩评论
	List<TbComment> top10Comment(int mid);
	
	// 根据uid和cdid查找是否点赞
	int findDianZan(String uid, int cdid);

	// 保存点赞
	int saveDianzan(String uid, int cid);
	
}