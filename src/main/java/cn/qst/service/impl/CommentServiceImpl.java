package cn.qst.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import cn.qst.mapper.TbCommentMapper;
import cn.qst.pojo.TbComment;
import cn.qst.service.CommentService;

/**
 * 
 * @author Asimple
 * @date 2018年9月17日
 * @Description 评论服务实现类
 */

@Service
public class CommentServiceImpl implements CommentService {

	@Autowired
	private TbCommentMapper commentDao;
	
	@Override
	public List<TbComment> selectByMid(int mid) {
		return commentDao.selectByMid(mid);
	}

	@Override
	public boolean addComment(TbComment comment) {
		return commentDao.save(comment)==1;
	}

	@Override
	public List<TbComment> selectTop10(int id) {
		return commentDao.top10Comment(id);
	}

	@Override
	public boolean deleteComment(int cdid) {
		return commentDao.delete(cdid)==1;
	}

	@Override
	public PageInfo<TbComment> selectByPage(Integer pageIndex, Integer rows, Integer mid) {
		PageHelper.startPage(pageIndex, rows);
		List<TbComment> list = commentDao.selectByMid(mid);
		PageInfo<TbComment> info = new PageInfo<>(list, 5);
		return info;
	}

	@Override
	public int countTotal(int mid) {
		return commentDao.countAllByMid(mid);
	}

	@Override
	public int findDianZan(String uid, int cid) {
		return commentDao.findDianZan(uid, cid);
	}

	@Override
	public int dianzan(String uid, int cid) {
		return commentDao.saveDianzan(uid, cid);
	}

	@Override
	public boolean updateLikesum(int cid) {
		return commentDao.addLikesum(cid)==1;
	}

}
