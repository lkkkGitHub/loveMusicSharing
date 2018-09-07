package cn.qst.controller;

import cn.qst.pojo.TbUser;
import cn.qst.service.TbUserService;

import org.omg.CORBA.PUBLIC_MEMBER;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ser.std.EnumMapSerializer;

/**
 * @author lk 2018/9/7 11:23
 * @description:
 */

@Controller
@RequestMapping("/User")
public class TbUserController {

	@Autowired
	private TbUserService tbUserService;

	/**
	 * 跳转登陆界面get方法
	 * @return
	 */
	@RequestMapping(value = "/login", method = { RequestMethod.GET })
	public String login() {
		return "login";
	}
	
	/**
	 * 登陆，检查账号密码时候正确
	 * @param tbUser
	 * @return
	 */
	@RequestMapping(value="/login", method = {RequestMethod.POST})
	public String login(TbUser tbUser) {
		
		return "redirect:index.jsp";
	}
	
	/**
	 * 跳转到注册界面
	 * @return
	 */
	@RequestMapping(value="/regist", method = {RequestMethod.GET})
	public String regist() {
		return "regist";
	}
	
	/**
	 * 注册写入数据库
	 * @param tbUser
	 * @return
	 */
	@RequestMapping(value="/regist", method = {RequestMethod.POST})
	public String regist(TbUser tbUser) {
		
		return "login";
	}
	
	/**
	 * 效验用户名是否为唯一
	 * @param uname
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/verifyUname", method = {RequestMethod.POST})
	public Boolean verifyUname(String uname) {
		boolean flag;
	 	String name = tbUserService.selectByUname(uname);
	 	if (name == null) {
	 		flag = false;
	 	} else {
	 		flag = true;
	 	}
		return flag;
	}
	
	@ResponseBody
	@RequestMapping(value = "/verifyEmail", method = {RequestMethod.POST})
	public Boolean verifyEmail(String email) {
		boolean flag = false;
		String email1 = tbUserService.selectByEmail(email);
		if (email1 == null) {
			flag = true;
		} 
		return flag;
	}
	
	@ResponseBody
	@RequestMapping(value = "/verifyPhone", method = {RequestMethod.POST})
	public Boolean verifyPhone(String phone) {
		boolean flag = false;
		String phone1 = tbUserService.selectByPhone(phone);
		if (phone1 == null) {
			flag = true;
		} 
		return flag;
	}
	
	
}







