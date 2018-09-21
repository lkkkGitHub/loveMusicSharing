
//增加下载

function musicdown(musicurl){
	$.ajax({
		url:"/file/downlowd",
		type:"get",
		dataType:'json',
		data:{musicurl:musicurl},
		success:function(data){
			if(data==200){
				alert("下载成功,请在桌面查看");
			}else{
				alert("下载失败");
			}
		}
	})
}

// 添加评论
function submit1() {
	var context = $("#content").val();
	if( context == null || context.trim()=='') return ;
	send(context, null);
	$("#content").val('');
}

function send(context, rid) {
	if( loginId == null || loginId=='' ) {
		alert("请先登录..");
		return ;
	}
	$.ajax({
		url : "/music/comment", 
		type: "post", 
		async:false,//(默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
		contentType:"application/x-www-form-urlencoded",
		data: {
			uid:loginId,
			mid:musicId,
			content:context,
			cid:rid,
        },
        dataType:'json',
        success: function(json, textStatus){//如果调用servlet成功，响应200。请求成功后回调函数。这个方法有两个参数：服务器返回数据，返回状态(可以缺省)。
			alert(json);
			var pageIndex = $(".js-selected").text();
			if( pageIndex == null ) pageIndex = 0;
			goPage(pageIndex);
		},
		error:function (XMLHttpRequest, textStatus, errorThrown) {//如果调用servlet出现问题，响应非200（这里响应405）。通常情况下textStatus和errorThown只有其中一个有值 。(默认: 自动判断 (xml 或 html)) 请求失败时将调用此方法。这个方法有三个参数：XMLHttpRequest 对象，错误信息，（可能）捕获的错误对象。
	         alert("评论出错！");
	    }
	});
}

// 删除评论
function deleteComment(mid) {
	$.ajax({
		url : "/music/comment/delete", 
		type: "post", 
		async:false,//(默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
		contentType:"application/x-www-form-urlencoded",
		data: {
			cdid:mid,
        },
        dataType:'json',
        success: function(json, textStatus){//如果调用servlet成功，响应200。请求成功后回调函数。这个方法有两个参数：服务器返回数据，返回状态(可以缺省)。
        	alert(json);
        	var pageIndex = $(".js-selected").text();
			goPage(pageIndex);
		},
		error:function (XMLHttpRequest, textStatus, errorThrown) {//如果调用servlet出现问题，响应非200（这里响应405）。通常情况下textStatus和errorThown只有其中一个有值 。(默认: 自动判断 (xml 或 html)) 请求失败时将调用此方法。这个方法有三个参数：XMLHttpRequest 对象，错误信息，（可能）捕获的错误对象。
	         alert("删除出错！");
	    }
	});
}

// 异步分页请求
function goPage(index) {
	$.ajax({
		url : "/music/commentPage", 
		type: "post", 
		async:true,
		contentType:"application/x-www-form-urlencoded",
		data: {
			mid:musicId,
			pageIndex:index,
        },
        dataType:'json',
        success: function(json, textStatus){
        	if( typeof json == "string" ) json = data.parse(json);
        	$("#count").text(json.total);
        	// 数据
        	var data = json.list;
        	// 页面
        	var pagelist = json.navigatepageNums;
        	var zxplStr = '';
        	$("#jcpl").html('');
        	data.forEach(function(ite, ind) {
        		zxplStr += '<div class="itm" ><div class="head"><a href="/user/home?id='+ite.user.uid + '">';
        		zxplStr += '<img src="'+ite.user.image+'"></a></div><div class="cntwrap"><div class="">';
        		zxplStr += '<div class="cnt f-brk"><a href="/user/home?id='+ite.user.uid+'" class="s-fc7">';
        		zxplStr += ite.user.uname+'</a>：'+ite.content+'</div></div><div class="rp">';
        		zxplStr += '<div class="time s-fc4">'+dateFtt(new Date(ite.cdate), "yyyy-MM-dd")+'</div>';
        		// 等待修改
        		zxplStr += '<a onclick="dianzan('+ite.cdid+')"><i class="zan u-icn2 u-icn2-12"></i> ('+ite.likesum+')';
        		zxplStr += '</a><span class="sep">|</span><a class="s-fc3" onclick="showReplay(\'zxpl'+ind+'\')">回复</a>';
        		if( loginId!=null && loginId==ite.user.uid ) {
        			zxplStr += '<span class="sep">|</span><a class="s-fc3" onclick="deleteComment('+ite.cdid+')">删除</a>';
        		}
        		zxplStr += '</div></div></div><div id="zxpl'+ind+'" style="display:none;">';
        		zxplStr += '<div class="rept m-quk m-quk-1 f-pr"><div class="iner">';
        		zxplStr += '<div class="corr u-arr u-arr-1"><em class="arrline">◆</em>';
        		zxplStr += '<span class="arrclr">◆</span></div><div class="m-cmmtipt m-cmmtipt-1 f-cb f-pr">';
        		zxplStr += '<div class="u-txtwrap holder-parent f-pr j-wrap" style="display: block;">';
        		zxplStr += '<textarea class="u-txt area j-flag" id="zxpl'+ite.cdid+'" placeholder="回复';
        		zxplStr += ite.user.uname+'" style="overflow: hidden;">回复'+ite.user.uname+':</textarea>';
        		zxplStr += '</div><div class="btns f-cb f-pr"><a class="btn u-btn u-btn-1 j-flag" rpid="';
        		zxplStr += ite.cdid+'" onclick="replay(this, \'#zxpl'+ite.cdid+'\')">回复</a>';
        		zxplStr += '</div></div></div></div></div></div>';
        	});
        	// 评论列表
        	$("#zxpl").html(zxplStr);
        	
        	// 分页
        	var pageStr = '';
        	// 上一页样式控制
        	if( json.hasPreviousPage ) {
    			pageStr += '<a class="zbtn zprv" onclick="goPage('+json.prePage+')">上一页</a>';
    		} else {
    			pageStr += '<a class="zbtn zprv js-disabled">上一页</a>';
    		}
        	pagelist.forEach(function(ite, ind){// 页标控制
        		if( ite == json.pageNum ) {
        			pageStr += '<a class="zpgi zpg9 js-selected">'+json.pageNum+'</a>';
        		} else {
        			pageStr += '<a class="zpgi zpg9" onclick="goPage('+ite+')">'+ite+'</a>';
        		}
        	});
        	if( json.pages > 5 && json.lastPage!=json.pages ) {// 最后一页样式设置
    			pageStr += '<span class="zdot">...</span>';
    			pageStr += '<a class="zpgi zpg9" onclick="goPage('+json.pages+')">'+json.pages+'</a>';
    		}
        	if( json.hasNextPage ) {// 下一页样式设置
    			pageStr += '<a class="zbtn znxt" onclick="goPage('+json.nextPage+')">下一页</a>';
    		} else {
    			pageStr += '<a class="zbtn znxt js-disabled">下一页</a>';
    		}
        	$("#pageinfo").html(pageStr);
		},
		error:function (XMLHttpRequest, textStatus, errorThrown) {
	    }
	});
}


/**************************************时间格式化处理************************************/
function dateFtt(date, fmt)   
{ //author: meizz   
  var o = {   
    "M+" : date.getMonth()+1,                 //月份   
    "d+" : date.getDate(),                    //日   
    "h+" : date.getHours(),                   //小时   
    "m+" : date.getMinutes(),                 //分   
    "s+" : date.getSeconds(),                 //秒   
    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
    "S"  : date.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}


// 显示/隐藏回复框
function showReplay(ind) {
	$("#"+ind).toggle();
}

function replay(obj, txtid) {
	var rid = $(obj).attr("rpid");
	var content = $(txtid).val();
	if( content == null || content.trim()=='') return ;
	send(content, rid);
}


function dianzan(cid) {
	if( loginId == null || loginId=='' ) {
		alert("请先登录..");
		return ;
	}
	$.ajax({
		url : "/music/comment/dianzan", 
		type: "post", 
		async:false,//(默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
		contentType:"application/x-www-form-urlencoded",
		data: {
			uid:loginId,
			cdid:cid,
        },
        dataType:'json',
        success: function(json, textStatus){//如果调用servlet成功，响应200。请求成功后回调函数。这个方法有两个参数：服务器返回数据，返回状态(可以缺省)。
        	alert(json);
        	var pageIndex = $(".js-selected").text();
			goPage(pageIndex);
		},
		error:function (XMLHttpRequest, textStatus, errorThrown) {//如果调用servlet出现问题，响应非200（这里响应405）。通常情况下textStatus和errorThown只有其中一个有值 。(默认: 自动判断 (xml 或 html)) 请求失败时将调用此方法。这个方法有三个参数：XMLHttpRequest 对象，错误信息，（可能）捕获的错误对象。
	         alert("点赞出错！");
	    }
	});
}

function showList() {
	if( loginId == null || loginId=='' ) {
		alert("请先登录..");
		return ;
	}
	$(".songSingleChoose").toggle();
}

function addList(obj) {
	if( loginId == null || loginId=='' ) {
		alert("请先登录..");
		return ;
	}
	var mlid = $(obj).attr("single");
	$.ajax({
		url : "/addList", 
		type: "post", 
		async:false,//(默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
		contentType:"application/x-www-form-urlencoded",
		data: {
			id:musicId,
			lid:mlid,
        },
		success: function(data){
			data = JSON.parse(data);
			alert(data);
			showList();
		}
	});
}
