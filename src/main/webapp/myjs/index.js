function getFansAndAttention(uid) {
	$.ajax({
		url:"/attention/selectAttentionAndFans",
		type:'post',
		async:false,
		contentType:"application/x-www-form-urlencoded",
		data:{
			uid:uid,
		},
		dataType:'json',
		success:function(data) {
			var str = "";
			str += data[0];
			$('#attention').html(str);
			str = "";
			str += data[1];
			$('#fans').html(str);
		}
	})
}

$(function () {
	$.ajax({
		type : 'get',
		url : '/admin/queryMenuAll',
		data : {
			menuid : menuid
		},
		success : function(data) {
			var str = "";
			var str1 = "";
			for (var i = 0; i < data[3].length; i++) {
				if (data[0] == 3) {
					if (data[3][i].parentmid == 12) {
						if (data[3][i].mid == data[0]) {
							str += "<li><a href='#' class='header-nav__cur'>"
									+ data[3][i].mname + "</a></li>";
						} else {
							str += "<li><a href='/" + data[3][i].ename
									+ "?menuid=" + data[3][i].mid + "' >"
									+ data[3][i].mname + "</a></li>";
						}
					} else if (data[3][i].parentmid != 12) {
						if(data[3][i].mid==14){
							str1 += "<a class='open-vip' href='/play' target='_new'>"
								+ data[3][i].mname + "</a>";
						}else{
							str1 += "<a class='open-vip' href='#'>"
								+ data[3][i].mname + "</a>";
						}
						
					} else {
						alert("sdfsdfsdfsd")
					}
				} else {
					if (data[3][i].parentmid == 12) {
						if (data[3][i].mid == data[0]) {
							str += "<li><a href='#' class='header-nav__cur'>"
									+ data[3][i].mname + "</a></li>";
						} else {
							str += "<li><a href='/" + data[3][i].ename
									+ "?menuid=" + data[3][i].mid + "' >"
									+ data[3][i].mname + "</a></li>";
						}
					} else if (data[3][i].parentmid != 12) {
						if (data[3][i].mid == data[1]) {
							str1 += "<li><a href='#' class='subNav-cur'>"
									+ data[3][i].mname + "</a></li>";
						} else {
							str1 += "<li><a href='/" + data[3][i].ename
									+ "?menuid=" + data[3][i].mid + "' >"
									+ data[3][i].mname + "</a></li>";
						}
					} else {
						alert("sdfsdfsdfsd")
					}
				}

			}
			$("#top" + data[2]).html(str);
			$("#top" + data[2] + "Child").html(str1);
			if (data.length == 5) {
				childMenu(data[4])
			}
		}
	})
})


$(function(){
	$("#vid").click(function (event) {
	    event.stopPropagation();//阻止mousedown 事件冒泡（注意只阻止了mousedown事件）
	    event.preventDefault();//阻止当前元素默认事件
		 $(".videoFrame").show();
	});
	$(document).click(function() {
		$(".videoFrame").hide();
	});
})

function getName(name) {
	if (name != "" && name != null) {
		$("#login").hide();
		$("#reg").hide();
		$("#nameicon").show();
		$("#name").show();
	}
}

function xianshi() {
	// $("#xianshi").show();
	$("#name").next("div").slideDown(500);
}
function xiaoshi2() {
	setTimeout("xiaoshi()", 3000);
}
function xiaoshi() {
	// $("#xianshi").hide();
	$("#name").next("div").slideUp(500);
}

function search() {
	$("#searchform").submit();
}

function videoDemo(event) {
	event.stopPropagation();// 阻止mousedown 事件冒泡（注意只阻止了mousedown事件）
	event.preventDefault();// 阻止当前元素默认事件
	$(".videoFrame").show();
}

function videoSearch() {
	$.ajax({
		url : "VideoSearchServlet.do",
		data : {
			user : 1
		},
		async : false,
		type : "POST",
		contentType : "application/x-www-form-urlencoded",
		success : function(re) {
			window.location.href = "SearchMusicServlet.do?musicName=" + re
					+ "&page=1";
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("失败")
		}
	});
}

function red() {
	$("#haoyou").css("background-color", "#fa3b4a");
	$("#haoyou").css("color", "#fff");
	$("#quanbu").css("background-color", "#fff");
	$("#quanbu").css("color", "black");
}
function red2() {
	$("#haoyou").css("background-color", "#fff");
	$("#haoyou").css("color", "black");
	$("#quanbu").css("background-color", "#fa3b4a");
	$("#quanbu").css("color", "#fff");
}

// 点击回复弹出或收起评论消息
function hideTalk(t) {
	var hp = $(t).attr("hp");
	if (hp == 0) {
		$(t).parent().parent().parent().find(".commentAll").show();
		$(t).attr("hp", 1);

	} else {
		$(t).parent().parent().parent().find(".commentAll").hide();
		$(t).attr("hp", 0);
	}
}

// 用户未登录弹出窗口
function userLogin(username) {
	if (username == null || username == "" || typeof (username) == "undefined") {
		qikoo.dialog3.alert("用户未登录，请登录");
	}
}
function userLogin2(username) {
	qikoo.dialog3.alert("用户未登录，请登录");
}

function childMenu(tbMenu) {
	var str = "";
	if (menuid == 4) {
		for (var i = 0; i < tbMenu.length; i++) {
			var name = tbMenu[i].mname;
			if (tbMenu[i].mname == '新歌榜') {
				str += "<div class='mod mod-song-rank js-mod mod-newsong monkey='H_NI_billboard_new data-js-mod-name='new_index_billboard_new' >";
			} else if (tbMenu[i].mname == '热歌榜') {
				str += "<div class='mod mod-song-rank js-mod mod-hotsong monkey='H_NI_billboard_hot data-js-mod-name='new_index_billboard_hot' >";
			} else if (tbMenu[i].mname == '歌手榜') {
				str += "<div class='mod mod-song-rank js-mod mod-artistsong monkey='H_NI_billboard_artist data-js-mod-name='new_index_billboard_artist' >";
			}
			str += "<div class='hd'>";
			str += "<h2 class='title'>" + name + "</h2>";
			str += "<span><a href='javascript:;' class='icon-play-all play-all js-play-song'></a></span>";
			str += "</div>";
			str += "	<div class='bd'>";
			str += "<ul class='song-list'>";
			str += topRank(tbMenu[i].mid,tbMenu[i].ename);
			str += "</ul>";
			str += "</div></div>";
		}
		$("#ranktop").html(str);
	} 

}

function topRank(mid,type) {
	var str = "";
	$
			.ajax({
				type : 'get',
				data : {
					mid : mid,
					type: type
				},
				url : '/musicClassify/rank',
				async : false,
				success : function(data) {
					for (var i = 0; i < data.length; i++) {
						str += "<li class=' top" + (i+1) + "'><div class='index'>"
								+ (i + 1) + "</div>";
						str += "<div class='status status-steady'>";
						str += "<i class='icon-status'></i>";					
						if(mid==17){
							str +=" <strong class='num'></strong>";
							str +=	"</div>";
							str +=	"<div class='song artist-rank'>";
							str +=	"	<a title='"+data[i].sname+"' href='/searchBySname?sname="+encodeURI(encodeURI(data[i].sname))+"' >"+data[i].sname+"</a>"
						}else{
							str += "</div><div class='song-info'><div class='info'><div class='song'>";
							str += "<a  title='"+ data[i].title+ "' style='text-decoration:none;' href='play?id="+data[i].musicid+"' target='_new'>"+data[i].title+"</a><span class='artist'>";
							str += " <span class='author_list'  title='"+ data[i].sname+ "' style='float:right' ><a hidefocus='true' href='play?id="+data[i].musicid+"' target='_new'>"+ data[i].sname+ "</a>";
							str += "</span></span></div></div></div>";
							str += "<div class='opera-icon' >";
							str += "<a href='javascript:;' class='opera-icon-play icon icon-music-play js-play-song'></a>";
							str += "<a href='javascript:;' class='opera-icon-add icon icon-music-collect js-add'></a>";
						}
						
						str += "</div></li>";
					}
				}
			})
	return str;
}




