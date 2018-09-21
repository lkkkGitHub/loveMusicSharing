$(document).ready(function(){
	
	//获取JS传递的语言参数
	var utils = new Utils();
	var args = utils.getScriptArgs();	
	
	
	//隐藏Loading/注册失败 DIV
	$(".loading").hide();
	$(".login-error").hide();
	registError = $("<label class='error repeated'></label>");
	
	//加载国际化语言包资源
	utils.loadProperties(args.lang);
	
	//输入框激活焦点、移除焦点
	jQuery.focusblur = function(focusid) {
		var focusblurid = $(focusid);
		var defval = focusblurid.val();
		focusblurid.focus(function(){
			var thisval = $(this).val();
			if(thisval==defval){
				$(this).val("");
			}
		});
		focusblurid.blur(function(){
			var thisval = $(this).val();
			if(thisval==""){
				$(this).val(defval);
			}
		});
	 
	};
	/*下面是调用方法*/
	$.focusblur("#username");
	
	//获取表单验证对象[填写验证规则]
	var validate = $("#signupForm").validate({
		rules: {
			username: {
				required: true
			},
			password: {
				required: true,
				minlength: 4,
				maxlength: 16
			},
			passwordAgain: {
				required: true,
				minlength: 4,
				maxlength: 16,
				equalTo: "#password"
			},
			email: {
				required: true,
				email: true
			},
			
			tel: {
				required: true,
				digits:true
			},
			qq: {
				required: true,
				digits:true
			},
			problem:{
				required: true,
				
			},
			answer:{
				required: true,
				
			}
		},
		messages: {
			username: {
				required: $.i18n.prop("请输入注册学号")
			},
			password: {
				required: $.i18n.prop("请输入密码"),
				minlength: jQuery.format($.i18n.prop("密码过短")),
				maxlength: jQuery.format($.i18n.prop("密码过长"))
			},
			passwordAgain: {
				required: $.i18n.prop("请再次输入密码"),
				minlength: jQuery.format($.i18n.prop("密码过短")),
				maxlength: jQuery.format($.i18n.prop("密码过长")),
				equalTo: jQuery.format($.i18n.prop("两次密码不一致"))
			},
			email: {
				required: $.i18n.prop("请输入邮箱地址"),
				email: $.i18n.prop("邮箱格式不正确")
			},
			
			tel: {
				required: $.i18n.prop("请输入电话"),
				digits: $.i18n.prop("电话格式不正确")
			},
			qq: {
				required: $.i18n.prop("请输入QQ号"),
				digits: $.i18n.prop("QQ格式不正确")
			},
			problem:{
				required: $.i18n.prop("请输入密保问题")			
			},
			answer:{
				required: $.i18n.prop("请输入密保答案")	
			}
			
		}
	});
	
	
	//输入框激活焦点、溢出焦点的渐变特效
	if($("#username").val()){
		$("#username").prev().fadeOut();
	};
	$("#username").focus(function(){
		$(this).prev().fadeOut();
	});
	$("#username").blur(function(){
		if(!$("#username").val()){
			$(this).prev().fadeIn();
		};		
	});
	if($("#password").val()){
		$("#password").prev().fadeOut();
	};
	$("#password").focus(function(){
		$(this).prev().fadeOut();
	});
	$("#password").blur(function(){
		if(!$("#password").val()){
			$(this).prev().fadeIn();
		};		
	});
	if($("#passwordAgain").val()){
		$("#passwordAgain").prev().fadeOut();
	};
	$("#passwordAgain").focus(function(){
		$(this).prev().fadeOut();
	});
	$("#passwordAgain").blur(function(){
		if(!$("#passwordAgain").val()){
			$(this).prev().fadeIn();
		};		
	});
	if($("#contact").val()){
		$("#contact").prev().fadeOut();
	};
	$("#contact").focus(function(){
		$(this).prev().fadeOut();
	});
	$("#contact").blur(function(){
		if(!$("#contact").val()){
			$(this).prev().fadeIn();
		};		
	});
	
	if($("#email").val()){
		$("#email").prev().fadeOut();
	};
	$("#email").focus(function(){
		$(this).prev().fadeOut();
	});
	$("#email").blur(function(){
		if(!$("#email").val()){
			$(this).prev().fadeIn();
		};		
	});
	
	if($("#tel").val()){
		$("#tel").prev().fadeOut();
	};
	$("#tel").focus(function(){
		$(this).prev().fadeOut();
	});
	$("#tel").blur(function(){
		if(!$("#tel").val()){
			$(this).prev().fadeIn();
		};		
	});
	
	if($("#qq").val()){
		$("#qq").prev().fadeOut();
	};
	$("#qq").focus(function(){
		$(this).prev().fadeOut();
	});
	$("#qq").blur(function(){
		if(!$("#qq").val()){
			$(this).prev().fadeIn();
		};		
	});
	
	if($("#problem").val()){
		$("#problem").prev().fadeOut();
	};
	$("#problem").focus(function(){
		$(this).prev().fadeOut();
	});
	$("#problem").blur(function(){
		if(!$("#problem").val()){
			$(this).prev().fadeIn();
		};		
	});
	if($("#answer").val()){
		$("#answer").prev().fadeOut();
	};
	$("#answer").focus(function(){
		$(this).prev().fadeOut();
	});
	$("#answer").blur(function(){
		if(!$("#answer").val()){
			$(this).prev().fadeIn();
		};		
	});
	
	//ajax提交注册信息
	$("#submit").bind("click", function(){
		regist(validate);
	});
	
	$("body").each(function(){
		$(this).keydown(function(){
			if(event.keyCode == 13){
				regist(validate);
			}
		});
	});
	
});

function regist(validate){	
	//校验Email, password，校验如果失败的话不提交
	if(validate.form()){
		if($("#checkBox").attr("checked")){	
			//onBlur="checkUserName();
			checkUserName();
		}
	}
}

	var Utils = function(){};

	Utils.prototype.loadProperties = function(lang){
		jQuery.i18n.properties({// 加载资浏览器语言对应的资源文件
			name:'ApplicationResources',
			language: lang,
			path:'resources/i18n/',
			mode:'map',
			callback: function() {// 加载成功后设置显示内容
			} 
		});	
	};

	Utils.prototype.getScriptArgs = function(){//获取多个参数
	    var scripts=document.getElementsByTagName("script"),
	    //因为当前dom加载时后面的script标签还未加载，所以最后一个就是当前的script
	    script=scripts[scripts.length-1],
	    src=script.src,
	    reg=/(?:\?|&)(.*?)=(.*?)(?=&|$)/g,
	    temp,res={};
	    while((temp=reg.exec(src))!=null) res[temp[1]]=decodeURIComponent(temp[2]);
	    return res;
	};