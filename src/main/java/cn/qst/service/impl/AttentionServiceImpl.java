package cn.qst.service.impl;

import cn.qst.mapper.TbUserMapper;
import cn.qst.pojo.TbAttention;
import cn.qst.pojo.TbUser;
import cn.qst.pojo.TbUserExample;
import cn.qst.pojo.TbUserExample.Criteria;
import cn.qst.service.AttentionService;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

/**
 * @author lk
 * 2018/9/17 20:13
 * @description:
 */
@Service
public class AttentionServiceImpl implements AttentionService {

    @Resource
    private TbUserMapper tbUserMapper;

    /**
     * 关注用户
     *
     * @param uid 关注用户
     * @param did 被关注用户
     * @return 写入成功即返回true，失败即返回false
     */
    @Override
    public Boolean insert(String uid, String did) {
        TbAttention attention = new TbAttention();
        attention.setUid("uid");
        attention.setBid("did");
        return tbUserMapper.attentionUser(attention) == 1 ? true : false;
    }

    /**
     * 用户关注的数量
     *
     * @param uid 用户id
     * @return 用户关注的数量
     */
	@Override
	public int selectAttention(String uid) {
		// TODO Auto-generated method stub
		return tbUserMapper.selectAttention(uid);
	}

	 /**
     * 用户的粉丝数
     * @param did 用户id
     * @return 用户粉丝的数量
     */
	@Override
	public int selectFans(String did) {
		// TODO Auto-generated method stub
		return tbUserMapper.selectFans(did);
	}
	
	
	/**
     * 验证用户uid 是否 关注 了用户bid
     * @param uid 主动关注
     * @param bid 被关注
     * @return 关注了即返回true，没有即返回false
     */
	@Override
    public Boolean verfiyAttentioned(String uid, String bid) {
		// TODO Auto-generated method stub
		TbAttention attention = new TbAttention();
		attention.setUid(uid);
		attention.setBid(bid);
		return tbUserMapper.verfiyAttentioned(attention) != null ? true : false;
	}

	/**
     * 取消关注
     * @param uid 关注人id
     * @param bid 被关注人id
     * @return 取消成功即返回true，失败即返回false
     */
	@Override
	public Boolean cancelAttention(String uid, String bid) {
		// TODO Auto-generated method stub
		TbAttention attention = new TbAttention();
		attention.setUid(uid);
		attention.setBid(bid);
		return tbUserMapper.cancelAttention(attention) == 1 ? true : false;
	}

	@Override
	public List<TbUser> queryAttention(String id) {
		// TODO Auto-generated method stub
		System.out.println("111111111111111111111111111");
		List<String> attention = tbUserMapper.queryAttention(id);
		attention.forEach(name->System.out.println(name));
		List<TbUser> tbUsers = new ArrayList<>();
		for(String string:attention) {
			TbUserExample example = new TbUserExample();
			Criteria criteria = example.createCriteria();
			criteria.andUidEqualTo(string);
			List<TbUser> byExample = tbUserMapper.selectByExample(example );
			tbUsers.addAll(byExample);
		}
		return tbUsers;
	}

	@Override
	public List<TbUser> queryFans(String id) {
		// TODO Auto-generated method stub
		List<String> fans = tbUserMapper.queryFans(id);
		List<TbUser> tbUsers = new ArrayList<>();
		for(String string:fans) {
			TbUserExample example = new TbUserExample();
			Criteria criteria = example.createCriteria();
			criteria.andUidEqualTo(string);
			List<TbUser> byExample = tbUserMapper.selectByExample(example );
			tbUsers.addAll(byExample);
		}
		return tbUsers;
	}
}