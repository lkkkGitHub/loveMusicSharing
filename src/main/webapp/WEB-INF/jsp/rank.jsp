<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
<meta charset="UTF-8">
<title>排行榜</title>
<!-- 头部 -->
<link rel="shortcut icon" href="../../source/images/logo-b.png" />
<link rel="stylesheet" href="../../source/css/reset.css">
<link rel="stylesheet" href="../../source/css/index.css">
  <script src="../../source/js/jquery.min.js"></script>
  <script src="../../source/js/script.js"></script>
  <script src="/myjs/index.js"></script>
  <script src="/myjs/rank.js"></script>
  <script src="/myjs/searcher.js"></script>
<!-- 排行榜 -->
          
<link rel="stylesheet" data-dist="true" href="../../source/content/css/lomegwdp.css"/>
<style>
/*滚动条*/
::-webkit-scrollbar{width:6px; height:6px;}
::-webkit-scrollbar-track-piece{background-color:;}
body::-webkit-scrollbar-track-piece{background-color:#ccc;}
::-webkit-scrollbar-track-piece:no-button{}
::-webkit-scrollbar-thumb{background-color:#F5B5B6;border-radius: 2px;}
::-webkit-scrollbar-thumb:hover{background-color:#F5B5B6;}
::-webkit-scrollbar-thumb:active{background-color:#F5B5B6;}
/*/滚动条*/



#rankbg {
height: 600px
}
</style>
<!-- 提示框 -->
<link href="../../source/SearchMusic/css/qikoo.css" type="text/css" rel="stylesheet" />
<script src="../../source/SearchMusic/js/qikoo.js"></script>
<script type="text/javascript">
var menuid=${menuid}
</script>
</head>
<body onload="getName('${username}');">
   <header class="header">
    <div class="header-container"  style="width:1200px;">
            <div class="header-top">
        <a href="../../index.jsp" class="logo"></a>
        <nav class="header-nav">
          <ul id="toprank">
            
           
          </ul>
        </nav>
        <div class="header-search" style="margin-left:-20px;">
        <form action="/seacher" method="post" id="searchform" onsubmit="return searchNull()">
          <input style="width:170px;" type="text" class="text" placeholder="我是歌手第四季" name="musicName" id="musicName" speech x-webkit-speech onkeyup="searchStr(this.value)" />
          <span class="btn" id="vid" style="float:left;"><i><img  style="margin-top:6px;"src="../../source/images/video.png" ></i></span>
          <span class="btn" onclick="search();"><i class="icon-sprite"></i></span>
          </form>
          <div class="videoFrame">
           <iframe  frameborder=0 width=290 height=330 marginheight=0 marginwidth=0 scrolling=no src="video.jsp"></iframe>
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
        
         <div id="nameicon" class="center_header" style="margin-left:60px;margin-right:10px;float:left;display:none">
         <c:choose>
        <c:when test="${imgstr== null or imgstr==''}">
            <a href="/personal"><img src="../../source/images/user.png" id="img1"/></a>
        </c:when>
        <c:otherwise>
        <a href="/personal"><img src="${imgstr}" id="img2"/></a>
        </c:otherwise>
        </c:choose>
         </div>
         <div id="name" style="display:none;padding-top:35px;"><a href="userInfo.do" style="cursor:pointer" ><i  onmouseover = "xianshi()"  onmouseout = "xiaoshi2()">${username}</i></a></div>
         <div id="xianshi">
         	<p style="margin-left: 5px; margin-top: 3px;">
					<a href="personal"><img src="/images/person.png"></a>
				</p>
				<p style="margin-left: 4px; margin-top: 5px;">
					<a href="User/exit"><img src="/images/exit.png"></a>
			</p>
         </div>
        <div class="header-login"style="margin-right:-10px;">
          <a href="/login" class="open-green" id="login">登录</a>
          <a href="/regist" class="open-vip" id="reg">注册</a>
        </div>
      </div>
      <ul class="header-subNav" style="margin-top:20px;" id="toprankChild">
      </ul>
    </div>
  </header>
	<!-- 排行榜-->
	<div class="responsive" style="margin-top:40px;" id="rankbg">
		<!-- start 页面上部左右分栏 -->
		<div class="main-top-wrapper" monkey="H_NI_header">
			<div class="main-top screen-hd clearfix">
				<!-- start 上方左边模块 -->
				<div class="main" style="margin-top:50px;">
					
					<div class='ranklist-wrapper clearfix'
						style="margin: 0 auto; width: 920px;" id="ranktop" >
						
						
					</div>
				</div>
				<!-- end 上方右边模块 -->
			</div>
			<!-- end 页面上部左右分栏 -->
		</div>
	</div>
<!-- footer -->
          <footer class="footer" style="height:170px;width:100%;">
            <div class="footer-inner" style="height:170px;width:100%;">              
              <div class="footer-copyright" style="height:90px;padding-top:40px;width:100%;">
<p><a href="#">关于我们</a><span>|</span><a href="#">帮助中心</a><span>|</span><a href="#">意见反馈</a><span>|</span><a href="#">独立音乐人合作</a><span>|</span><a href="#">音乐专栏</a><span>|</span><a href="#">校园小助手</a></p>
                <p>© 2018 Qingdao University of Technology| LPJ</p>
                <p><a href="http://www.miitbeian.gov.cn">鲁ICP备18010745号</a></p>
              </div>
            </div>
          </footer>       
</body>
</html>