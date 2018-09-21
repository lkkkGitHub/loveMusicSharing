<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="shortcut icon" href="../../source/images/logo-b.png" />
<title>个人主页</title>
<link rel="stylesheet" type="text/css"
	href="../../source/person/css/jiazaitoubu.css">
<link rel="stylesheet" type="text/css"
	href="../../source/person/css/css.css">
<script src="../../source/person/js/jquery-1.8.3.min.js"></script>
<script src="../../myjs/index2.js"></script>
<link rel="stylesheet" type="text/css"
	href="../../source/person/css/center.css">

<!--城市联动-->
<link rel="stylesheet" type="text/css"
	href="../../source/person/city/city.css">
<script src="../../source/person/city/Popt.js"></script>
<script src="../../source/person/city/cityJson.js"></script>
<script src="../../myjs/citySet.js"></script>
<!-- 上传头像 -->
<script src="../../source/person/headImage/head/jquery.min.js"></script>

<link rel="stylesheet" type="text/css"
	href="../../source/person/headImage/css/bootstrap.min.css">
<link href="../../source/person/headImage/head/cropper.min.css"
	rel="stylesheet">
<link href="../../source/person/headImage/head/sitelogo.css"
	rel="stylesheet">
<link rel="stylesheet" type="text/css"
	href="../../source/person/headImage/css/font-awesome.min.css">

<script src="../../source/person/headImage/head/bootstrap.min.js"></script>
<script src="../../source/person/headImage/head/cropper.js"></script>
<script src="../../source/person/headImage/head/sitelogo.js"></script>
<script src="../../source/person/headImage/head/html2canvas.js"></script>
<!-- 生日插件 -->
<script type="text/javascript"
	src="../../source/person/birthday/jedate/jedate.js"></script>
<style>
.datainp {
	width: 200px;
	height: 30px;
	border: 1px #ccc solid;
	text-align: center;
}
</style>
<!--页脚 -->
<link rel="stylesheet" type="text/css"
	href="../../source/person/footer/index.css">
</head>
<%
	request.setCharacterEncoding("utf-8");
	String name = (String) request.getAttribute("name");
	String zname = (String) request.getAttribute("zname");
	String email = (String) request.getAttribute("email");
	String tel = (String) request.getAttribute("tel");
	String birthday = (String) request.getAttribute("birthday");
	String date = (String) request.getAttribute("date");
	String imgstr = (String) request.getAttribute("imgstr");
	if (name == null) {
		name = "";
	}
	if (zname == null) {
		zname = "";
	}
	if (email == null) {
		email = "";
	}
	if (tel == null) {
		tel = "";
	}
	if (birthday == null) {
		birthday = "";
	}
	if (date == null) {
		date = "";
	}
%>

<body onload="getAddress('${user.address}');">
	<!--top-->

	<!--当前位置-->
	<div class="now_positionm">
		<span>当前位置：</span><a href="/index"
			style="text-decoration: none; cursor: pointer;">首页></a> <a href="#"
			style="text-decoration: none;">个人中心</a>
	</div>
	<!--centers-->
	<div class="centers_m">
		<!--清除浮动-->
		<div class="clear_sm"></div>
		<!--left-->
		<div class="centers_ml">
			<!--头像-->
			<div class="center_header">
				<a href="#"><img src="${imgstr}" id="img2" /></a> <em
					style="margin-left: 10px; font-size: 16px;"><font>您好,${user.uname}</font></em>
			</div>
			<!--列表go-->
			<div class="centers_listm" style="width: 210px;">
				<div class="centers_listm_one" style="width: 210px;">
					<img src="../../source/person/images/zshy.png" /> <em>会员中心</em>
				</div>
				<!--一条开始-->
				<div class="centers_listm_one_in" style="width: 210px;">
					<img src="../../source/person/images/shezhi.png" /> <em>资料管理</em>
					<b></b>
				</div>
				<span class="gjszmdm"> <a href="#public_m2"
					class="center_in_self"><font>信息资料</font></a>
				</span>
				<!--一条开始-->
				<div class="centers_listm_one_in" style="width: 210px;">
					<img src="../../source/person/images/suo.png" /> <em>账户安全</em> <b></b>
				</div>
				<span class="gjszmdm"> <a href="#fst1" class="center_in_self"><font>邮箱绑定</font></a>
					<a href="#fst2" class="center_in_self"><font>手机绑定</font></a>
				</span>
				<!--一条开始-->
				<div class="centers_listm_one_in" style="width: 210px;">
					<img src="../../source/person/images/myfridend.png" /> <em>我的好友</em>
					<b></b>
				</div>
				<span class="gjszmdm"> <a href="#" class="center_in_self"><font>我的消息</font></a>
					<a href="#" class="center_in_self"><font>我的好友</font></a>
				</span>
			</div>
			<script type="text/javascript">
				$(
						function() {//第一步都得写这个
							$(".centers_listm_one_in").click(
									function() {
										$(this).next(".gjszmdm").slideToggle()
												.siblings("gjszmdm").slideUp()
									});
						})
			</script>
		</div>
		<!--right-->
		<div class="centers_mr">
			<h1 class="welcom_tm">
				欢迎您，爱唱
				<c:choose>
					<c:when test="${user.vip == 1}">
						<span style="color: red">会员</span>
					</c:when>
					<c:otherwise>
                    用户
                </c:otherwise>
				</c:choose>
				<font>${user.uname}</font>！
			</h1>
			<!--一条开始-->
			<div class="public_m1">
				<div class="public_m2">资料管理</div>
				<!--照片和内容-->
				<div class="zp_nrm">
					<!--left-->
					<div class="zp_nrm_l">

						<img src="${imgstr}" id="img4" />
						<button type="button" class="btn btn-primary" data-toggle="modal"
							data-target="#avatar-modal" style="margin: 10px 15px 10px 19px">修改头像</button>
						<!-- 更换头像开始 -->
						<div class="user_pic" style="margin: 10px;"></div>

						<div class="modal fade" id="avatar-modal" aria-hidden="true"
							aria-labelledby="avatar-modal-label" role="dialog" tabindex="-1">
							<div class="modal-dialog modal-lg">
								<div class="modal-content">
									<!--<form class="avatar-form" action="upload-logo.php" enctype="multipart/form-data" method="post">-->
									<form class="avatar-form" method="post"
										enctype="multipart/form-data">
										<div class="modal-header">
											<button class="close" data-dismiss="modal" type="button">&times;</button>
											<h4 class="modal-title" id="avatar-modal-label">上传图片</h4>
										</div>
										<div class="modal-body">
											<div class="avatar-body">
												<div class="avatar-upload">
													<input class="avatar-src" name="avatar_src" type="hidden">
													<input class="avatar-data" name="avatar_data" type="hidden">
													<label for="avatarInput" style="line-height: 35px;">图片上传</label>
													<button class="btn btn-danger" type="button"
														style="height: 35px;"
														onClick="$('input[id=avatarInput]').click();">请选择图片
													</button>
													<span id="avatar-name"></span> <input
														class="avatar-input hide" id="avatarInput"
														name="avatar_file" type="file">
												</div>
												<div class="row">
													<div class="col-md-9">
														<div class="avatar-wrapper"></div>
													</div>
													<div class="col-md-3">
														<div class="avatar-preview preview-lg" id="imageHead"></div>
													</div>
												</div>
												<div class="row avatar-btns">
													<div class="col-md-4">
														<div class="btn-group">
															<button class="btn btn-danger fa fa-undo"
																data-method="rotate" data-option="-90" type="button"
																title="Rotate -90 degrees">向左旋转</button>
														</div>
														<div class="btn-group">
															<button class="btn  btn-danger fa fa-repeat"
																data-method="rotate" data-option="90" type="button"
																title="Rotate 90 degrees">向右旋转</button>
														</div>
													</div>
													<div class="col-md-5" style="text-align: right;">
														<button class="btn btn-danger fa fa-arrows"
															data-method="setDragMode" data-option="move"
															type="button" title="移动">
															<span class="docs-tooltip" data-toggle="tooltip" title=""
																data-original-title="$().cropper(&quot;setDragMode&quot;, &quot;move&quot;)">
															</span>
														</button>
														<button type="button"
															class="btn btn-danger fa fa-search-plus"
															data-method="zoom" data-option="0.1" title="放大图片">
															<span class="docs-tooltip" data-toggle="tooltip" title=""
																data-original-title="$().cropper(&quot;zoom&quot;, 0.1)">
																<!--<span class="fa fa-search-plus"></span>-->
															</span>
														</button>
														<button type="button"
															class="btn btn-danger fa fa-search-minus"
															data-method="zoom" data-option="-0.1" title="缩小图片">
															<span class="docs-tooltip" data-toggle="tooltip" title=""
																data-original-title="$().cropper(&quot;zoom&quot;, -0.1)">
																<!--<span class="fa fa-search-minus"></span>-->
															</span>
														</button>
														<button type="button" class="btn btn-danger fa fa-refresh"
															data-method="reset" title="重置图片">
															<span class="docs-tooltip" data-toggle="tooltip" title=""
																data-original-title="$().cropper(&quot;reset&quot;)"
																aria-describedby="tooltip866214"> </span>
														</button>
													</div>
													<div class="col-md-3">
														<button
															class="btn btn-danger btn-block avatar-save fa fa-save"
															type="button" data-dismiss="modal">保存修改</button>
													</div>
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>

						<div class="loading" aria-label="Loading" role="img" tabindex="-1"></div>
						<script src="head/html2canvas.min.js" type="text/javascript"
							charset="utf-8"></script>
						<script type="text/javascript">
							//做个下简易的验证  大小 格式
							$('#avatarInput')
									.on(
											'change',
											function(e) {
												var filemaxsize = 1024 * 5;//5M
												var target = $(e.target);
												var Size = target[0].files[0].size / 1024;
												if (Size > filemaxsize) {
													alert('图片过大，请重新选择!');
													$(".avatar-wrapper")
															.childre().remove;
													return false;
												}
												if (!this.files[0].type
														.match(/image.*/)) {
													alert('请选择正确的图片!')
												} else {
													var filename = document
															.querySelector("#avatar-name");
													var texts = document
															.querySelector("#avatarInput").value;
													var teststr = texts; //你这里的路径写错了
													testend = teststr
															.match(/[^\\]+\.[^\(]+/i); //直接完整文件名的
													filename.innerHTML = testend;
												}

											});

							$(".avatar-save")
									.on(
											"click",
											function() {
												var img_lg = document
														.getElementById('imageHead');
												// 截图小的显示框内的内容
												html2canvas(
														img_lg,
														{
															allowTaint : true,
															taintTest : false,
															onrendered : function(
																	canvas) {
																canvas.id = "mycanvas";
																//生成base64图片数据
																console
																		.log("aaaaaaaaaa");
																console
																		.log(canvas);
																var dataUrl = canvas
																		.toDataURL("image/jpeg");
																console
																		.log(dataUrl);
																var newImg = document
																		.createElement("img");
																newImg.src = dataUrl;
																imagesAjax(dataUrl);
															}
														});
												setTimeout("reload()", 100);
											})

							function imagesAjax(src) {
								$
										.ajax({
											url : "/User/upHeadImage",
											data : {
												imgDate : src,
											},
											async : false,
											type : "POST",
											dataType : 'json',
											contentType : "application/x-www-form-urlencoded",
											success : function(re) {
												var flag = re;
												if (flag == true) {//preview
												} else {
												}
											},
											error : function(XMLHttpRequest,
													textStatus, errorThrown) {//如果调用servlet出现问题，响应非200（这里响应405）。通常情况下textStatus和errorThown只有其中一个有值 。(默认: 自动判断 (xml 或 html)) 请求失败时将调用此方法。这个方法有三个参数：XMLHttpRequest 对象，错误信息，（可能）捕获的错误对象。
												console.log(textStatus);
												//alert("连接失败");
											}
										});
							}
							function reload() {
								window.location.reload();
							}
						</script>
						<!-- 更换头像结束 -->
					</div>
					<!--right-->
					<div class="zp_nrm_r">
						<form action="/User/changUserInfo" method="post" id="form1">
							<span> <input value="${user.uname}" style="display: none"
								name="uname">
							</span>
							<p id="userEmail">
								<em>邮箱：</em><i>${user.email}</i> <a href="#fst1"
									style="text-decoration: none;">立即修改</a> <input type="text"
									name="email" value="" style="display: none">
							</p>
							<p id="userPhone">
								<em>手机号：</em><i>${user.phone}</i> <a href="#fst2"
									style="text-decoration: none;">立即修改</a> <input type="text"
									name="phone" value="" style="display: none">
							</p>

							<p>
								<em>VIP：</em>

								<c:choose>
									<c:when test="${user.vip == 0 }">
										<!-- 充值会员 暂时不做-->
                                    非会员，赶紧成为我们的<span><a href="">充值</a></span>，享受更多资源
                                    <input type="text" name="vip"
											value="0" style="display: none">
									</c:when>
									<c:otherwise>
                                    恭喜你是我们的会员
                                    <input type="text" name="vip"
											value="1" style="display: none">
									</c:otherwise>
								</c:choose>
							</p>
							<p>
								<em>性别：</em>
								<c:choose>
									<c:when test="${user.sex==0}">
										<input type="radio" name="sex" value="2" class="sex_m">
										<i>保密</i>
										<input type="radio" name="sex" value="0" class="sex_m"
											checked="true">
										<i>男</i>
										<input type="radio" name="sex" value="1" class="sex_m">
										<i>女</i>
									</c:when>
									<c:when test="${user.sex==1}">
										<input type="radio" name="sex" value="2" class="sex_m">
										<i>保密</i>
										<input type="radio" name="sex" value="0" class="sex_m">
										<i>男</i>
										<input type="radio" name="sex" value="1" class="sex_m"
											checked="true">
										<i>女</i>
									</c:when>
									<c:otherwise>
										<input type="radio" name="sex" value="2" class="sex_m"
											checked="true">
										<i>保密</i>
										<input type="radio" name="sex" value="0" class="sex_m">
										<i>男</i>
										<input type="radio" name="sex" value="1" class="sex_m">
										<i>女</i>
									</c:otherwise>
								</c:choose>
							</p>
							<p>
								<em>居住城市：</em> <span> <span id="province"> <c:choose>
											<c:when
												test="${userInfo.uid != null && userInfo.uid != user.uid}">

											</c:when>
											<c:otherwise>
												<span><a onclick="allCityInfo()">立即添加</a></span>
											</c:otherwise>
										</c:choose>

								</span> <span id="cityInfo"> </span>
								</span>

							</p>
							<a
								style="text-decoration: none; cursor: pointer; width: 265px; margin-right: 313px; background-color: #FA3B4A;"
								class="public_m3" onclick="sumb();">保存修改</a>
						</form>
					</div>
				</div>
			</div>
			<!--一条开始-->
			<div class="public_m1">
				<a name="fst2"></a>
				<div class="public_m2">绑定手机修改</div>
				<!--提示信息-->
				<div class="tip_notem">
					<ul>
						<li>1. 绑定手机后可直接通过短信接受安全验证等重要操作。</li>
						<li>2. 更改手机时，请通过安全验证后重新输入新手机号码绑定。</li>
						<li>3. 收到安全验证码后，请在30分钟内完成验证。</li>
					</ul>
				</div>
				<div class="public_m4">
					<p>
						<em>绑定手机号码：</em> <input id="phone" type="text"
							style="height: 23px; border: 1px solid #eaeaea; width: 140px">
					</p>
					<a href="#" onclick="getPhone()" class="public_m3"
						style="text-decoration: none;">立即绑定</a>
				</div>
			</div>
			<!--一条开始-->
			<div class="public_m1">
				<a name="fst1"></a>
				<div class="public_m2">绑定邮箱修改</div>
				<!--提示信息-->
				<div class="tip_notem">
					<ul>
						<li>1. 此邮箱将接收密码找回，订单通知等敏感性安全服务及提醒使用，请务必填写正确地址。</li>
						<li>2. 设置提交后，系统将自动发送验证邮件到您绑定的信箱，您需在24小时内登录邮箱并完成验证。</li>
						<li>3. 更改邮箱时，请通过安全验证后重新输入新邮箱地址绑定。</li>
					</ul>
				</div>
				<div class="public_m4">
					<p>
						<em>绑定邮箱地址：</em> <input type="text" name="email" id="email"
							style="width: 200px; height: 30px; border: 1px #ccc solid; margin-top: 11px; font-size: 12px; color: #343434; float: left">
						<!-- <span class="intelligent-label f-fl"><b class="ftx04">*</b>验证码：</span>
						 -->
					</p>
					<a style="text-decoration: none; cursor: pointer;" href="#"
						class="public_m3" onclick="getEmail();">立即绑定</a>
				</div>
			</div>
		</div>
	</div>
	<!-- footer -->
	<footer class="footer" style="height:170px;width:100%;">
	<div class="footer-inner" style="height: 170px; width: 100%;">
		<div class="footer-copyright"
			style="height: 90px; padding-top: 40px; width: 100%;">
			<p>
				<a href="#">关于我们</a><span>|</span><a href="#">帮助中心</a><span>|</span><a
					href="#">意见反馈</a><span>|</span><a href="#">独立音乐人合作</a><span>|</span><a
					href="#">音乐专栏</a><span>|</span><a href="#">校园小助手</a>
			</p>
			<p>© 2017 Qingdao University of Technology| LPJ</p>
			<p>我们公司 版权所有 我们网络文化经营许可证</p>
		</div>
	</div>
	</footer>
	<script type="text/javascript">
		jeDate({
			dateCell : "#birthday",
			format : "YYYY年MM月DD日",
			isinitVal : false,
			isTime : true, //isClear:false,
			minDate : "1900-01-01"
		})
	</script>
	<script type="text/javascript">
		$("#city").click(function(e) {
			SelCity(this, e);
		});
	</script>
</body>
</html>
