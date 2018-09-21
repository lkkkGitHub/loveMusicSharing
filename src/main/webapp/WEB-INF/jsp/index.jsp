<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>LoveMusic</title>
<link rel="shortcut icon" href="/source/images/logo-b.png" />
<link rel="stylesheet" href="/source/css/reset.css">
<link rel="stylesheet" href="/source/css/index.css">
<script type="text/javascript" src="/source/js/jquery.js"></script>
<script src="/source/js/script.js"></script>
<script src="/myjs/index.js"></script>
<script src="/myjs/searcher.js"></script>

<!-- 轮播图 -->
<link rel="stylesheet" type="text/css"
	href="/source/content-top-resource/css/style.css" />
<!-- 提示框 -->
<link href="/source/SearchMusic/css/qikoo.css" type="text/css"
	rel="stylesheet" />
<script src="/myjs/qikoo.js"></script>
<script type="text/javascript">
	var menuid = 2;

	var searchvalue = document.get
</script>
</head>

<body onload="getName('${username}');">
	<header class="header">
	<div class="header-container" style="width: 1200px;">
		<div class="header-top">
			<a href="/index" class="logo"></a>
			<nav class="header-nav">
			<ul id="topindex">


			</ul>
			</nav>
			<div class="header-search" style="margin-left: -20px;">
				<form action="/seacher" method="post" id="searchform" onsubmit="return searchNull()">
					<input style="width: 170px;" type="text" class="text"
						placeholder="我是歌手第四季" name="musicName" id="musicName" speech
						x-webkit-speech onkeyup="searchStr(this.value)"/> <span class="btn" id="vid"
						style="float: left;"><i><img style="margin-top: 6px;"
							src="/source/images/video.png"></i></span> <span class="btn"
						onclick="search();"><i class="icon-sprite"></i></span>
				</form>
				<div class="videoFrame">
					<iframe frameborder=0 width=290 height=330 marginheight=0
						marginwidth=0 scrolling=no src="video.jsp"></iframe>
				</div>
				<div class="result" id="searchBox">
				<c:forEach items="${hot}" var="hot_song" varStatus="stat">
				<c:if test="${stat.count<=6 }">
				<a  class="result-item" href="play?id=${hot_song.musicid}" target='_new'>
				<span class="rank">${stat.count }</span>
				<span class="title">${hot_song.title}</span> <span class="num">${hot_song.playsum }万</span></a>
				</c:if>
				</c:forEach>
				</div>
			</div>

			<div id="nameicon" class="center_header"
				style="margin-left: 60px; margin-right: 10px; float: left; display: none">
				<a href="personal"><img src="${imgstr}" id="img2" /></a>
			</div>
			<div id="name" style="display: none; padding-top: 35px;">
				<a href="personal" style="cursor: pointer"><i
					onmouseover="xianshi()" onmouseout="xiaoshi2()">${username}</i></a>
			</div>
			<div id="xianshi">
				<p style="margin-left: 5px; margin-top: 3px;">
					<a href="personal"><img src="/images/person.png"></a>
				</p>
				<p style="margin-left: 4px; margin-top: 5px;">
					<a href="User/exit"><img src="/images/exit.png"></a>
				</p>
			</div>
			<div class="header-login" style="margin-right: -10px;">
				<a href="/login" class="open-green" id="login">登录</a> <a
					href="/regist" class="open-vip" id="reg">注册</a>
			</div>
		</div>
		<ul class="header-subNav" style="margin-top: 20px;" id="topindexChild">

		</ul>
	</div>
	</header>
	<section class="section_cont" style="margin-top:20px;"> <!--轮播图 开始 -->
	<div class="main_banner" >
		<div class="main_banner_bg"></div>
		<div class="main_banner_wrap">
			<canvas id="myCanvas" width="0" height="0"></canvas>
			<div class="main_banner_box" id="m_box">
				<a href="javascript:void(0)" class="banner_btn js_pre"> <span
					class="banner_btn_arrow"><i></i></span>
				</a> <a href="javascript:void(0)" class="banner_btn btn_next js_next">
					<span class="banner_btn_arrow"><i></i></span>
				</a>
				<ul >
				<c:forEach items="${huadong}" var="hua" varStatus="stat">
					<c:if test="${stat.first }">
					<li id='imgCard${stat.index }'><a href="/music/detail?mid=${hua.musicid}" target=new">
					<span style='opacity: 0;'>
					</span></a><img src='${hua.image }'alt=''>
					<p style='bottom: 0'>${hua.title }</p></li>
					</c:if>
					<c:if test="${!stat.first }">
					<li id='imgCard${stat.index }'><a href="/music/detail?mid=${hua.musicid}" target=new">
					<span style='opacity: 0.4;'>
					</span></a><img src='${hua.image }'alt=''>
					<p >${hua.title}</p></li>
					</c:if>


				</c:forEach>
				</ul>
				<!--火狐倒影图层-->
				<p id="rflt"></p>
				<!--火狐倒影图层-->
			</div>
			<!--序列号按钮-->
			<div class="btn_list">
				<span class="curr"></span><span></span><span></span><span></span><span></span>
			</div>
		</div>
	</div>
	<!--轮播图 结束 --> </section>
	<!-- 新歌首发 -->
	<div class="main" id="newSong">
		<div class="main-inner">
			<div class="main-title">
				<h2 class="title">
					<font size=50px;>新歌首发</font>
				</h2>
				<span class="line line-left"></span> <span class="line line-right"></span>
			</div>
			<div class="main-slider tab-cont">
				<ul class="slider-wrapper" id="indexnew">

				<c:forEach items="${newsong }" var="new_song" varStatus="stat">
				<c:if test="${stat.count<=4 }">

					<li><a href="/music/detail?mid=${new_song.musicid}" target='new'
						class="img"> <img src="${new_song.image }" width="100%" height="100%"
							alt="#"> <span class="mask"></span> <i class="icon-play"></i>
					</a>
						<div class="info">
							<div class="title">
								<a href="/music/detail?mid=${new_song.musicid}" target='new'>${new_song.title}</a>
							</div>
							<a href="/music/detail?mid=${new_song.musicid}" target='new' class="author">${new_song.sname }</a>
						</div></li>
				</c:if>
				</c:forEach>
				</ul>
				<div class="slider-btns">
					<span class="cur"><i></i></span> <span><i></i></span> <span><i></i></span>
				</div>
			</div>
		</div>
	</div>
	<!-- MV -->
	<div class="main" id="mv">
		<div class="main-inner">
			<div class="main-title">
				<h2 class="title">
					<font size=50px;>热门歌曲</font>
				</h2>
				<span class="line line-left"></span> <span class="line line-right"></span>
			</div>
			<ul class="mv-list tab-cont">

			<c:forEach items="${hot}" var="hot_song" varStatus="stat">
			<c:if test="${stat.count<=8 }">

			<li class="item"><a href="/music/detail?mid=${hot_song.musicid }"
					target='new' class="img"><img
						src="${hot_song.image }"  alt="#"><i
						class="icon-play"></i></a>
					<div class="info">
						<a href="/music/detail?mid=${hot_song.musicid}" target='new' class="title">${hot_song.title }</a>
						<a href="/music/detail?mid=${hot_song.musicid}" target='new' class="author">${hot_song.sname }</a>
						<span class="play-total"><i class="icon-sprite"></i>${hot_song.playsum }万</span>
					</div></li>
			</c:if>

			</c:forEach>
			</ul>
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
			<p>© 2018 Qingdao University of Technology| LPJ</p>
			<p>
				<a href="http://www.miitbeian.gov.cn">鲁ICP备18010745号</a>
			</p>
		</div>
	</div>
	</footer>
	<script type="text/javascript"
		src="source/content-top-resource/js/index.js"></script>
</body>
</html>
