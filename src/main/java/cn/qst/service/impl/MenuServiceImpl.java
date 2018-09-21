package cn.qst.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import cn.qst.mapper.TbMenuContentMapper;
import cn.qst.mapper.TbMenuMapper;
import cn.qst.pojo.TbMenu;
import cn.qst.pojo.TbMenuContent;
import cn.qst.pojo.TbMenuContentExample;
import cn.qst.pojo.TbMenuExample;
import cn.qst.pojo.TbMenuExample.Criteria;
import cn.qst.service.MenuService;

/**
 * 
 * @author daihong
 *
 */
@Service
public class MenuServiceImpl implements MenuService {
	@Autowired
	private TbMenuMapper menuMapper;

	@Autowired
	private TbMenuContentMapper meunContentMapper;
	@Override
	public List<TbMenu> queryAll() {
		// TODO Auto-generated method stub
		return menuMapper.selectByExample(null);
	}

	

	@Override
	public List<TbMenu> queryByParent(Integer mid) {
		TbMenuExample example = new TbMenuExample();
		// TODO Auto-generated method stub
		Criteria criteria = example.createCriteria();
		criteria.andParentmidEqualTo(mid);
		return menuMapper.selectByExample(example );
	}

	@Override
	public TbMenu query(Integer mid) {
		// TODO Auto-generated method stub
		return menuMapper.selectByPrimaryKey(mid);
	}


	@Override
	public List<TbMenuContent> queryByName() {
		// TODO Auto-generated method stub
		TbMenuContentExample example = new TbMenuContentExample();
		cn.qst.pojo.TbMenuContentExample.Criteria criteria3 = example.createCriteria();
		criteria3.andMidEqualTo(18);
		List<TbMenuContent> selectByExample3 = meunContentMapper.selectByExample(example);
		return selectByExample3;
	}



	@Override
	public List<TbMenuContent> queryIndexNew() {
		// TODO Auto-generated method stub
		TbMenuExample example = new TbMenuExample();
		Criteria criteria2 = example.createCriteria();
		criteria2.andMnameEqualTo("新歌榜");
		List<TbMenu> selectByExample2 = menuMapper.selectByExample(example);
		Integer mid = selectByExample2.get(0).getMid();
		TbMenuContentExample tbMenuContentExample = new TbMenuContentExample();
		cn.qst.pojo.TbMenuContentExample.Criteria criteria = tbMenuContentExample.createCriteria();
		criteria.andMidEqualTo(mid);
		List<TbMenuContent> selectByExample = meunContentMapper.selectByExample(tbMenuContentExample);
		return selectByExample;	
	}



	@Override
	public List<TbMenuContent> queryIndexHot() {
		// TODO Auto-generated method stub
		TbMenuExample example = new TbMenuExample();
		Criteria criteria2 = example.createCriteria();
		criteria2.andMnameEqualTo("热歌榜");
		List<TbMenu> selectByExample2 = menuMapper.selectByExample(example);
		Integer mid = selectByExample2.get(0).getMid();
		TbMenuContentExample tbMenuContentExample = new TbMenuContentExample();
		cn.qst.pojo.TbMenuContentExample.Criteria criteria = tbMenuContentExample.createCriteria();
		criteria.andMidEqualTo(mid);
		List<TbMenuContent> selectByExample = meunContentMapper.selectByExample(tbMenuContentExample);
		return selectByExample;	
	}



	@Override
	public List<TbMenuContent> queryIndexSonger() {
		// TODO Auto-generated method stub
		TbMenuExample example = new TbMenuExample();
		Criteria criteria2 = example.createCriteria();
		criteria2.andMnameEqualTo("歌手榜");
		List<TbMenu> selectByExample2 = menuMapper.selectByExample(example);
		Integer mid = selectByExample2.get(0).getMid();
		TbMenuContentExample tbMenuContentExample = new TbMenuContentExample();
		cn.qst.pojo.TbMenuContentExample.Criteria criteria = tbMenuContentExample.createCriteria();
		criteria.andMidEqualTo(mid);
		List<TbMenuContent> selectByExample = meunContentMapper.selectByExample(tbMenuContentExample);
		return selectByExample;
	}
}
