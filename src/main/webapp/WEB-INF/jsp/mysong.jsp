<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page isELIgnored="false" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>我的歌声</title>
    <link rel="shortcut icon" href="../../source/images/logo-b.png"/>
    <!-- 头部 -->
    <link rel="stylesheet" href="../../source/css/reset.css">
    <link rel="stylesheet" href="../../source/css/index.css">
    <script src="../../source/js/jquery.js"></script>
    <script src="../../source/js/script.js"></script>
    <script src="/myjs/index.js"></script>
    <!-- 主体 -->
    <link rel="stylesheet" href="../../source/mysong/css/main.css">
    <script src="../../source/mysong/js/main.js"></script>
    <script type="text/javascript" src="../../source/js/jquery.flexText.js"></script>
    <script src="/myjs/searcher.js"></script>
    <!-- 音乐上传 -->
    <!-- 引用控制层插件样式 -->
    <link rel="stylesheet" href="../../source/mysong/control/css/zyUpload.css"
          type="text/css">

    <!-- 引用核心层插件 -->
    <script type="text/javascript" src="../../source/mysong/core/zyFile.js"></script>
    <!-- 引用控制层插件 -->
    <script type="text/javascript"
            src="../../source/mysong/control/js/zyUpload.js"></script>
    <!-- 引用初始化JS -->
    <script type="text/javascript" src="../../source/mysong/demo.js"></script>
    <!-- 图片 -->
    <link type="text/css" rel="stylesheet"
          href="../../source/css/bootstrap-fileinput.css">
    <!-- 分页样式 -->
    <link rel="stylesheet" type="text/css"
          href="../../source/SearchMusic/fenye/css/zxf_page.css"/>
    <style>
        /*滚动条*/
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }

        ::-webkit-scrollbar-track-piece {
            background-color:;
        }

        body::-webkit-scrollbar-track-piece {
            background-color: #ccc;
        }

        ::-webkit-scrollbar-track-piece:no-button {

        }

        ::-webkit-scrollbar-thumb {
            background-color: #F5B5B6;
            border-radius: 2px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background-color: #F5B5B6;
        }

        ::-webkit-scrollbar-thumb:active {
            background-color: #F5B5B6;
        }

        /*/滚动条*/
    </style>
    <!-- 提示框 -->
    <link href="../../source/SearchMusic/css/qikoo.css" type="text/css"
          rel="stylesheet"/>
    <script src="../../myjs/qikoo.js"></script>
    <script type="text/javascript">
        var menuid = ${menuid}
        
        function queryAttention(id){
        	$.ajax({
        		type:'get',
        		url:'/attention/queryAttentioned',
        		data:{id:id},
        		success:function(data){
        			var str = "";
        			if(data.length==0){
        				str+="<div style='margin-left:40%'><img id='tupian' src='../../source/mysong/images/guanzhu.jpg' height='51px' width='52px'/></div>";
        			}
        			for(var i=0;i<data.length;i++){
        				str+="<div  style='margin-left:20px;float:left'><a href='/User/personalInfo?uid="+data[i].uid+"' target=\"new\"><img src='"+data[i].image+"' height='51px' width='52px'></a>";
        				str+="<a >"+data[i].uname+"</a></div>";
        			}
        			
        			$("#guanzhu").html(str)
        		}
        	})
        }
        function queryFans(id){
        	$.ajax({
        		type:'get',
        		url:'/attention/queryFans',
        		data:{id:id},
        		success:function(data){
        			var str = "";
        			if(data.length==0){
        				str+="<div style='margin-left:40%'><img   id='tupian' src='../../source/mysong/images/guanzhu.jpg'/></div>";
        			}
        			for(var i=0;i<data.length;i++){
        				str+="<div  style='margin-left:20px;float:left'><a href='/User/personalInfo?uid="+data[i].uid+"' target=\"new\"><img src='"+data[i].image+"' height='51px' width='52px'></a>";
        				str+="<a >"+data[i].uname+"</a></div>";
        			}
        			
        			$("#guanzhu").html(str)
        		}
        	})
        }
        
    </script>
</head>
<body onload="getName('${sessionScope.username}');userLogin('${username}');
getFansAndAttention('${user.uid	}')">




<header class="header">
    <div class="header-container" style="width:1200px;">
        <div class="header-top">
            <a href="../../index.jsp" class="logo"></a>
            <nav class="header-nav">
                <ul id="topmysong">

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
                    <a href="/User/exit"><img src="/images/exit.png"></a>
                </p>
            </div>
            <div class="header-login" style="margin-right: -10px;">
                <a href="/login" class="open-green" id="login">登录</a> <a
                    href="/regist" class="open-vip" id="reg">注册</a>
            </div>
        </div>

    </div>
</header>
<!-- 中部上 -->
<section id="banner" style="margin-top:30px; color:#FFFFFF">
    <div class="image round" style="margin-top: -50px;">
        <a><img src="${imgstr}" id="img2" /></a>
    </div>
    <div class="header1">
        <div
                style="float: left; margin-left: 541px; margin-right: 15px; margin-top: 10px;">
            <h3 id="attention">${attention}</h3>
            <a style="margin-top: 10px;color: white;font-size: 22px" href="javascript:queryAttention('${user.uid }')" >关注</a>
        </div>
        <div style="float: left;" class="jiange"></div>
        <div style="float: left; margin-left: 15px; margin-top: 10px;">
            <h3 id="fans">${fans}</h3>
            <a style="margin-top: 10px;color: white;font-size: 22px"  href="javascript:queryFans('${user.uid }')">粉丝</a>
        </div>
    </div>
</section>
<!-- end -->
<!-- 中部中 -->
<div class="header-login3" style="margin-top: 20px;" id="topmysongChild">

</div>


<!-- 关注界面 -->
<div id="guanzhu" style="margin-left: 5% ">

</div>



<!-- footer -->
<footer class="footer" style="height:170px;width:100%;margin-top:120px">
    <div class="footer-inner" style="height: 170px; width: 100%;">
        <div class="footer-copyright"
             style="height: 90px; padding-top: 40px; width: 100%;">
            <p><a href="#">关于我们</a><span>|</span><a href="#">帮助中心</a><span>|</span><a href="#">意见反馈</a><span>|</span><a
                    href="#">独立音乐人合作</a><span>|</span><a href="#">音乐专栏</a><span>|</span><a href="#">校园小助手</a></p>
            <p>© 2018 Qingdao University of Technology| LPJ</p>
            <p><a href="http://www.miitbeian.gov.cn">鲁ICP备18010745号</a></p>
        </div>
    </div>
</footer>

</body>
</html>