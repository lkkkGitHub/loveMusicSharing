package cn.qst.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.qst.comman.jedis.JedisClient;
import cn.qst.comman.pojo.AdminResult;
import cn.qst.comman.pojo.EasyUiDataGridResult;
import cn.qst.comman.pojo.EasyUiTreeNode;
import cn.qst.pojo.TbMenuContent;
import cn.qst.pojo.TbUser;
import cn.qst.service.AdminService;


/**
 * 管理员针对页面调整
 * 
 * @author daihong
 *
 */
@Controller
public class AdminController {


	@Autowired
	private AdminService adminService;
	
	@Autowired
	private JedisClient jedisClient;
		
	//根据父类id查询菜单
	@RequestMapping("/menu/list")
	@ResponseBody
	public List<EasyUiTreeNode> getMenubyParentId(@RequestParam(name="id",defaultValue="0") int id){
		List<EasyUiTreeNode> menuList = adminService.getMenubyParentId(id);
		return menuList;
	}
	
	//添加菜单
	@RequestMapping("/menu/add")
	@ResponseBody
	public AdminResult addMenu(Integer parentId , String name) {
		return adminService.addMenu(parentId , name);
	}
	
	//修改添加菜单
	@RequestMapping("/menu/update")
	@ResponseBody
	public AdminResult updateMenu(Integer id , String name) {
		return adminService.updateMenu(id , name);
	}
	
	//删除菜单
	@RequestMapping("/menu/delete")
	@ResponseBody
	public AdminResult deleteMenu(Integer parentId,Integer id) {
		//删除菜单
		adminService.deleteMenu(id);
		//判断该类的父类是否还有子节点 没有的话把自身改为子目录
		return adminService.isParent(parentId);
	}
	
	//查询菜单内容
	@RequestMapping("/menu/content")
	@ResponseBody
	public EasyUiDataGridResult getMenuContent(Integer page , Integer rows , Integer mid) {
		return adminService.getMenuConten(page,rows,mid);
	}
	
	//修改菜单内容
	@RequestMapping("/content/edit")
	@ResponseBody
	public AdminResult updateContent(TbMenuContent content) {
		//同步缓存
		jedisClient.hdel("CONTENT", "huadong");
		jedisClient.hdel("CONTENT", "newsong");
		jedisClient.hdel("CONTENT", "hot");
		jedisClient.hdel("CONTENT", "songer");
		return adminService.updateContent(content);
	}
	
	//查询用户
	@RequestMapping("/user/list")
	@ResponseBody
	public EasyUiDataGridResult selectUser(Integer page , Integer rows,TbUser user) {
		return adminService.selectUser(page,rows,user);
	}
	
	//修改用户状态
	@RequestMapping("/user/status")
	@ResponseBody
	public AdminResult updateUserstatus(String ids , boolean status) {
		String[] split = ids.split(",");
		return adminService.updateUserStatus(split, status);
	}
}
