
$(function(){
	$("#vid").click(function (event) {
	    event.stopPropagation();//阻止mousedown 事件冒泡（注意只阻止了mousedown事件）
	    event.preventDefault();//阻止当前元素默认事件
		 $(".videoFrame").show();   
	});
	$(document).click(function () {
		$(".videoFrame").hide();
	});
})
function getName(name){
	if(name!=""&&name!=null){
		$("#login").hide();
		$("#reg").hide();
		$("#nameicon").show();
		$("#name").show();
	}
} 

function xianshi(){
	//$("#xianshi").show();
	$("#name").next("div").slideDown(500);
}
function xiaoshi2(){
	setTimeout("xiaoshi()",3000);
}
function xiaoshi(){
	//$("#xianshi").hide();
	$("#name").next("div").slideUp(500);
}

function search(){
	$("#searchform").submit();
}


function videoDemo(event) {
	event.stopPropagation();//阻止mousedown 事件冒泡（注意只阻止了mousedown事件）
    event.preventDefault();//阻止当前元素默认事件
	 $(".videoFrame").show();   
}

function videoSearch(){
	$.ajax({
		url: "VideoSearchServlet.do",
		data:{
	        user:1
		},
		async:false,
        type: "POST",
        contentType:"application/x-www-form-urlencoded",
        success: function(re) {
        	window.location.href="SearchMusicServlet.do?musicName="+re+"&page=1";
        },
	    error:function (XMLHttpRequest, textStatus, errorThrown) {
	    	alert("失败")
         }   
	});
}

function red(){
   $("#haoyou").css("background-color","#fa3b4a");
   $("#haoyou").css("color","#fff");
   $("#quanbu").css("background-color","#fff");
   $("#quanbu").css("color","black");
}
function red2(){
	   $("#haoyou").css("background-color","#fff");
	   $("#haoyou").css("color","black");
	   $("#quanbu").css("background-color","#fa3b4a");
	   $("#quanbu").css("color","#fff");
	}

//点击回复弹出或收起评论消息
function hideTalk(t){
    var hp = $(t).attr("hp");
	if(hp==0){
		$(t).parent().parent().parent().find(".commentAll").show();
		$(t).attr("hp",1);
		
	}else{
		$(t).parent().parent().parent().find(".commentAll").hide();
		$(t).attr("hp",0);
	}
}

//用户未登录弹出窗口
function userLogin(username){
	if(username==null||username==""||typeof(username)=="undefined"){
	qikoo.dialog3.alert("用户未登录，请登录");
	}
}
function userLogin2(username){	
	qikoo.dialog3.alert("用户未登录，请登录");
}



