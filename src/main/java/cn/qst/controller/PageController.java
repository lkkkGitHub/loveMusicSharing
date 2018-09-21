package cn.qst.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.qst.comman.jedis.JedisClient;
import cn.qst.comman.utils.JsonUtils;
import cn.qst.pojo.TbMcategory;
import cn.qst.pojo.TbMenu;
import cn.qst.pojo.TbMenuContent;
import cn.qst.service.MenuService;
import cn.qst.service.MusicClassifyService;

/**
 * 处理jsp页面请求
 * 
 * @author Administrator
 *
 */
@Controller
public class PageController {

	@Autowired
	private MenuService menuService;

	@Autowired
	private MusicClassifyService musicClassifyService;

	@Autowired
	private JedisClient jedisClient;

	// 主页跳转
	@RequestMapping("/")
	public String indexJsp(HttpSession session) {
		// 滑动轮播列表
		List<TbMenuContent> queryByName;
		// 新歌模块列表
		List<TbMenuContent> queryIndexNew;
		// 热歌模块列表
		List<TbMenuContent> queryIndexHot;
		// 歌手模块
		List<TbMenuContent> queryIndexSonger;
		// 从redis缓存获取数据
		String jsonName = jedisClient.hget("CONTENT", "huadong");
		// 判断数据是否存在
		if (jsonName != null && !"".equals(jsonName.trim())) {
			queryByName = JsonUtils.jsonToList(jsonName, TbMenuContent.class);
		} else {
			queryByName = menuService.queryByName();
			// 存入缓存
			jedisClient.hset("CONTENT", "huadong", JsonUtils.objectToJson(queryByName));
		}
		String jsonNew = jedisClient.hget("CONTENT", "newsong");
		if (jsonNew != null && !"".equals(jsonNew.trim())) {
			queryIndexNew = JsonUtils.jsonToList(jsonNew, TbMenuContent.class);
		} else {
			queryIndexNew = menuService.queryIndexNew();
			// 存入缓存
			jedisClient.hset("CONTENT", "newsong", JsonUtils.objectToJson(queryIndexNew));
		}
		String jsonHot = jedisClient.hget("CONTENT", "hot");
		if (jsonHot != null && !"".equals(jsonHot.trim())) {
			queryIndexHot = JsonUtils.jsonToList(jsonHot, TbMenuContent.class);
		} else {
			queryIndexHot = menuService.queryIndexHot();
			// 存入缓存
			jedisClient.hset("CONTENT", "hot", JsonUtils.objectToJson(queryIndexHot));
		}
		String jsonSonger = jedisClient.hget("Content", "songer");
		if (jsonSonger != null && !"".equals(jsonSonger.trim())) {
			queryIndexSonger = JsonUtils.jsonToList(jsonSonger, TbMenuContent.class);
		} else {
			queryIndexSonger = menuService.queryIndexSonger();
			jedisClient.hset("CONTENT", "songer", JsonUtils.objectToJson(queryIndexHot));
		}
		session.setAttribute("huadong", queryByName);
		session.setAttribute("newsong", queryIndexNew);
		session.setAttribute("hot", queryIndexHot);
		session.setAttribute("songer", queryIndexSonger);
		return "index";
	}

	// 页面跳转
	@RequestMapping("/{page}")
	public String pageJsp(String page, Integer menuid, Map<String, Object> map) {
		map.put("menuid", menuid);
		return page;
	}

	// 后台主页跳转
	@RequestMapping("/admin")
	public String adminIndexJsp() {
		return "admin/index";
	}

	// 后台其他页面
	// 页面跳转
	@RequestMapping("/admin/{page}")
	public String pageJsp(@PathVariable String page) {
		return "admin/" + page;
	}

	/**
	 * 根据不同的页面返回相应的菜单
	 * 
	 * @param id通过id来得到当前跳转页面的菜单属性
	 */
	@ResponseBody
	@RequestMapping("/admin/queryMenuAll")
	public List<Object> queryMenuAll(Integer menuid, Map<String, Object> map) {
		System.out.println(menuid);
		List<TbMenu> tbMenus = menuService.queryAll();
		List<TbMenu> mPList = new ArrayList<>();
		// 查询所有一级菜单
		for (TbMenu tbMenu : tbMenus) {
			if (tbMenu.getParentmid().equals(12)) {
				mPList.add(tbMenu);
			}
		}
		List<Object> list = new ArrayList<>();
		TbMenu tbMenu = menuService.query(menuid);
		List<TbMenu> mCList = new ArrayList<>();
		// 取得父菜单的id和判断是否需要直接跳转到首个子菜单id
		Integer parent = 0;
		// 取得个单独页面的菜单选项
		List<TbMenu> mClsit1 = new ArrayList<>();
		Integer child = 0;
		String name;
		// 判断传回的值的菜单属性是否是父菜单
		if (tbMenu.getIsparent()) {
			parent = tbMenu.getMid();
			mCList = menuService.queryByParent(tbMenu.getMid());
			// 判断其子类是否是一级父类不是就获取该类的父类。进行显示
			if (tbMenu.getParentmid() != 12) {
				parent = tbMenu.getParentmid();
				child = tbMenu.getMid();
				name = tbMenu.getEname();
				mCList = menuService.queryByParent(parent);
				mClsit1 = menuService.queryByParent(tbMenu.getMid());
			} else {
				child = mCList.get(0).getMid();
				name = mCList.get(0).getEname();
			}
		} else {
			parent = tbMenu.getParentmid();
			mCList = menuService.queryByParent(parent);
			child = tbMenu.getMid();
			name = tbMenu.getEname();
		}
		list.add(parent);
		list.add(child);
		list.add(name);
		mPList.addAll(mCList);
		list.add(mPList);
		if (mClsit1.size() != 0) {
			list.add(mClsit1);
		}

		return list;
	}

	/**
	 * 对音乐进行所有的分类规划
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/admin/queryMcategoryAll")
	public List<TbMcategory> queryMcategoryAll() {
		List<TbMcategory> list = new ArrayList<>();
		// 查询所有的总分类
		List<TbMcategory> mcategories = musicClassifyService.mcategories(0);
		// 根据每个总分类查询所有的子类
		for (TbMcategory mcategory : mcategories) {
			list.add(mcategory);
			List<TbMcategory> child = musicClassifyService.mcategories(mcategory.getCid());
			if (child != null) {
				for (TbMcategory tbMcategory : child)
					list.add(tbMcategory);
			}
		}
		return list;
	}
}