<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
<meta charset="UTF-8">
<title>音乐搜索</title>
<link rel="shortcut icon" href="../../source/images/logo-b.png" />
<link rel="stylesheet" href="../../source/css/index.css">
<link rel="stylesheet" href="../../source/css/reset.css">
<link rel="stylesheet" href="/myjs/bootstrap.min.css">



<script src="../../source/js/jquery.min.js"></script>
<script src="/myjs/index.js"></script>
<script src="/myjs/searcher.js"></script>
<script src="/myjs/bootstrap.min.js"></script>
<!-- 中部样式 -->
<link rel="stylesheet" type="text/css"
	href="../../source/SearchMusic/css/scroll.css">
<link rel="stylesheet" type="text/css"
	href="../../source/SearchMusic/css/lovesearch.css">
<script type="text/javascript"
	src="../../source/SearchMusic/js/canvas.js"></script>
<script type="text/javascript"
	src="../../source/SearchMusic/js/mousewheel.js"></script>
<script type="text/javascript"
	src="../../source/SearchMusic/js/scroll.js"></script>
<script type="text/javascript" src="../../source/SearchMusic/js/love.js"></script>
<!-- 分页样式 -->
<link rel="stylesheet" type="text/css"
	href="../../source/SearchMusic/fenye/css/zxf_page.css" />
<!--提示框-->
<link href="../../source/SearchMusic/css/qikoo.css" type="text/css"
	rel="stylesheet" />
<script src="../../myjs/qikoo.js"></script>
<script language="javascript">
        userLogin('${username}')
        
        
        
     // 功能栏 歌曲添加到歌单功能
    	var flag6 = false;
        var objname = "";
    	function add() {
    		var j = 0;
    		var ch = document.getElementsByName("choose");
    		var pankong = $(".menuUL3").find("li").length>0;
    		for (var i = 0; i < ch.length; i++) {
    			if (ch[i].checked) {
    				j++;
    			}
    		}
    		if (j == 0) {
    			qikoo.dialog2.alert("未选择歌曲");
    		} else if (!pankong) {
    			qikoo.dialog2.alert("歌单为空，请新建歌单");
    		} else {
    			if (flag6) {
    				$(".jump").hide();
    				flag6 = false;
    			} else {
    				$(".jump").show();
					$(".menuLi3").click(function () {
						for(var i=0;i<ch.length;i++){
							if(ch[i].checked){
								var str = addSongsingle(ch[i].value, objname);	
								if(str==false){
									alert("已有该歌曲");
								}else{
									alert("添加成功");
								}
							}
						}
						$(".jump").hide();
    					for (var i = 0; i < ch.length; i++) {
    						ch[i].checked = false;
    					}
    					$(".checkIn").hide();
    					$("#piliang").html("批量选择");
    					flag = false;
					})			 
    				flag6 = true;
    			}
    		
    		}
    	}
      
    function name1(obj){	
    	objname = obj.getAttribute("single")
    }
    
    
    function addSongsingle(sid, single) {
var str = "";
    	$.ajax({
    		type : 'get',
    		url : '/serachAdd',
    		async : false,// (默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为
    						// false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
    		data : {
    			mid : sid,
    			mlid : single,
    		},
    		success : function(data) {
    			str = data;
    		}

    	});
    	return str;
    }
    

   function queryBySname(obj){
       //获取查询条件的用户名 
       var sname = obj.getAttribute("sname")
       //进行后台跳转
        window.location.href="/searchBySname?sname="+encodeURI(encodeURI(sname)); 
       
   }  
  
    </script>
</head>
<body onload="getName('${username}');">

	<header class="header">
	<div class="header-container">
		<div class="header-top">
			<a href="../../index.jsp" class="logo"></a>
			<nav class="header-nav">
			<ul>
				<c:forEach items="${TbMenu }" var="tbmenu" varStatus="stat">
					<c:if test="${stat.count==1 }">
						<li><a href="index?menuid=2" class="header-nav__cur">${tbmenu.mname}</a></li>
					</c:if>
					<c:if test="${stat.count!=1 }">
						<li><a href="/${tbmenu.ename }?menuid=${tbmenu.mid}">${tbmenu.mname}</a></li>

					</c:if>
				</c:forEach>
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
			
	</header>

	<!-- 精彩推荐 -->
	<div class="main" id="recommend" style="height: 300px">
		<div class="main-inner">
			<div class="carousel">
				<div class="carousel-slider">
					<a href="#" class="item item-pic1"><img
						src="../../source/images/cont/11.png" alt="#"></a> <a href="#"
						class="item item-pic2"><img
						src="../../source/images/cont/22.png" alt="#"></a> <a href="#"
						class="item item-pic3"><img
						src="../../source/images/cont/33.png" alt="#"></a> <a href="#"
						class="item item-pic4"><img
						src="../../source/images/cont/44.jpg" alt="#"></a> <a href="#"
						class="item item-pic5"><img
						src="../../source/images/cont/55.jpg" alt="#"></a> <a href="#"
						class="item item-pic6"><img
						src="../../source/images/cont/66.jpg" alt="#"></a>
				</div>
			</div>
		</div>
		<div class="main-operate">
			<a href="#" class="slider-prev"><i class="icon-sprite"></i></a> <a
				href="#" class="slider-next"><i class="icon-sprite"></i></a>
		</div>
	</div>
	<!-- 结束 -->

	<!-- 中部按钮 -->

	<!-- 结束 -->

	<!-- 中部 <div class="col" style="margin-right: 62px;">
				<span style="float: left; margin-top: 10px; margin-right: 45px;">
				<input  type="checkbox" name="allChecked" id="allChecked" onclick="DoCheck()"  class="checkIn" >
				</span>
				歌曲(${musicListSize})
			</div>-->		
			<div class="tabbable playHb " id="tabs-791225"  style="margin-top:-0%; margin-left: 70px; width: 1200px;">
				<ul class="nav nav-tabs">
					<li class="active">
						<a href="#panel-109245" data-toggle="tab">歌曲</a>
					</li>
					<li>
						<a href="#panel-455747" data-toggle="tab">歌手</a>
					</li>
				</ul>
				<div class="tab-content">
					<div class="tab-pane active" id="panel-109245">
								
	<div style="margin-top: 100px">
		<div class="header-login2" style="margin-top: -5%">
 	<a class="open-vip" id="addTo" onclick="add()">添加到</a>
			<div class="jump">
				<div class="inner-container">

					<ul class="menuUL3" style="width: 120px; height: 200px;">

						<c:forEach items="${musicList}" var="music" varStatus="index1">
							<li class="menuLi3 cur"><a class="beijing"
								single="${music.mlid}" onclick="name1(this)"> ${music.name}</a></li>
						</c:forEach>
					</ul>
				</div>
			</div>

			<a class="open-vip" id="piliang" onclick="checkIn()">批量操作</a>
		</div>

		<div class="phInner" id="displaycol">
			<div style="float: left; margin-top: 10px; width: 10px;">
				<input type="checkbox" name="allChecked" id="allChecked"
					onclick="DoCheck()" class="checkIn">
			</div>
			<div class="col" style="margin-left: 54px;">
				歌曲(${song.song.size()})</div>
			<div class="col" style="margin-left:-50px ">演唱者</div>
			<div class="col" style="margin-left:-25px ">专辑</div>
			<div class="col"  style="margin-left:-25px ">上传时间</div>
		</div>
	</div>
	<div >
		<div class="scrollView">
			<ul class="songUL" id="display">
				<c:forEach items="${song.song}" var="music" varStatus="index">
					<li class="songList">
						<div class="songLmain">
							<div class="check">
								<input class="checkIn" type="checkbox" name="choose"
									value="${music.mid}">
							</div>
							<div class="start">
								<em sonN="2" style="font-size: 16px;">${index.index+1 }</em>
							</div>
							<div class="songBd">
								<div class="col colsn" style="font-size: 16px;">
									<a href="play?id=${music.mid }" target='_new' ">${music.mname}</a>
								</div>
								<div class="col colcn" style="font-size: 16px;">
									<a>${music.sname }</a>
								</div>
								<div class="col colcn" style="font-size: 16px;">
									<a>${music.mname }</a>
								</div>
								<div class="col colcn" style="font-size: 16px;">
									<fmt:formatDate value="${music.uploaddate}" pattern="yyy-MM-dd" />
								</div>
							</div>
							<div class="control">
								<a class="cicon more"></a>
							</div>
						</div>
					</li>
				</c:forEach>
				
			</ul>
		</div>
	</div>
					</div>
					<div class="tab-pane" id="panel-455747">
						<div style="margin-top: 0px">
		

		<div class="phInner" id="displaycol">
			
			<div class="col" style="margin-left: 54px;">
				歌手名称</div>
		</div>
	</div>
	<div >
		<div class="scrollView">
			<ul class="songUL" id="display">
				<c:forEach items="${song.songer}" var="music" varStatus="index">
					<li class="songList">
						<div class="songLmain">
							<div class="start">
								<em sonN="2" style="font-size: 16px;">${index.index+1 }</em>
							</div>
							<div class="songBd">
								<div class="col colsn" style="font-size: 16px;">
									<a href="javascript:void(0)" onclick="queryBySname(this)" sname="${music }" >${music}</a>
								</div>
								
							</div>
							<div class="control">
								<a class="cicon more"></a>
							</div>
						</div>
					</li>
				</c:forEach>
			</ul>
		</div>
	</div>
					</div>
				</div>
			</div>
			
			
	
	<!-- 分页部分 -->
	<script src="../../source/SearchMusic/fenye/js/jquery.min.js"
		type="text/javascript"></script>
	<script src="../../source/SearchMusic/fenye/js/zxf_page.js"
		type="text/javascript"></script>



	<!-- footer -->
	<footer class="footer" style="height:170px;width:100%;margin-top:30%">
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

	<script src="../../source/js/jquery.min.js"></script>
	<script src="../../source/js/script.js"></script>


</body>
</html>