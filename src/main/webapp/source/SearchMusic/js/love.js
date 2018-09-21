var m =false;
function isVisitListening() {// 关闭或开启访客访问
	if (m){
		m=false;
		$("#han").text("关闭访客查看")
		$("#han").css("color","black")
	}else{
		m=true;
		$("#han").text("开启访客查看")
		$("#han").css("color","#586063")
	}
	//alert(!m)
	$.ajax({
		url : "isListenList.do",
		type : "post",
		async : false,// (默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为
						// false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
		contentType : "application/x-www-form-urlencoded",
		data : {
			isL : !m,
		},
		success : function(data) {
		}
	});
}
var n =true;
function isVisitListening2() {// 关闭或开启访客访问
	if (n){
		n=false;
		$("#han").text("关闭访客查看")
		$("#han").css("color","black")
	}else{
		n=true;
		$("#han").text("开启访客查看")
		$("#han").css("color","#586063")
	}
	//alert(!n)
	$.ajax({
		url : "isListenList.do",
		type : "post",
		async : false,// (默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为
						// false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
		contentType : "application/x-www-form-urlencoded",
		data : {
			isL : !n,
		},
		success : function(data) {
		}
	});
}


function userLogin(username) {
	if (username == null || username == "" || typeof (username) == "undefined") {
		qikoo.dialog3.alert("用户未登录，请登录");
	}
}
function chufaLogin(userName) {
	// alert(userName);
	if (userName == null || userName == "" || typeof (userName) == "undefined") {
		qikoo.dialog3.alert("用户未登录，请登录");
	}
}

var flag2 = false;
function redlove() {
	if (flag2) {
		flag2 = false;
		$(".love").css("background-position", "-28px -130px");
	} else {
		flag2 = true;
		$(".love:hover").css("background-position", "0px -130px");
	}
}

function DoCheck() {
	var ch = document.getElementsByName("choose");
	if (document.getElementsByName("allChecked")[0].checked == true) {
		for (var i = 0; i < ch.length; i++) {
			ch[i].checked = true;
		}
	} else {
		for (var i = 0; i < ch.length; i++) {
			ch[i].checked = false;
		}
	}
}
var flag = false;
function checkIn() {
	if (flag) {
		flag = false;
		$(".checkIn").hide();
		$("#piliang").html("批量选择");
		var ch = document.getElementsByName("choose");
		document.getElementsByName("allChecked")[0].checked = false;
		for (var i = 0; i < ch.length; i++) {
			ch[i].checked = false;
		}
	} else {
		flag = true;
		$(".checkIn").show();
		$("#piliang").html("取消批量选择");
	}

}

// function redlove(){
// var s=$(".love${index.index+1 }").attr("select");
// if (s==0) {
// $(".love:hover").css("background-position","-0px -130px");
// $(".love${index.index+1 }").attr("select","1");
// }
// if (s==1) {
// $(".love${index.index+1 }").css("background-position","-28px -130px");
// $(".love${index.index+1 }").attr("select","0");
// }
// }

// 将音乐添加到当前播放
function playAll(sid) {
	$.ajax({
		url : "playMusic.do",
		type : "post",
		async : false,// (默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为
						// false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
		contentType : "application/x-www-form-urlencoded",
		data : {
			id : sid,
			type : 1,
		},
		success : function(data) {
		}

	});
}

// 将音乐添加到歌单
function addSongsingle(sid, single) {
	$.ajax({
		url : "playMusic.do",
		type : "post",
		async : false,// (默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为
						// false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
		contentType : "application/x-www-form-urlencoded",
		data : {
			id : sid,
			musicListName : single,
			type : "sing",
		},
		success : function(data) {
		}

	});
}

$(window).load(function() {
	// loadBG();
	fPlay();
});
$(function() {

	// setTimeout("fPlay()",500);
	// 全部播放 批量操作
	$("#playall").click(function() {
		var ch = document.getElementsByName("choose");
		var j = 0;
		for (var i = 0; i < ch.length; i++) {
			if (ch[i].checked) {
				j++;
			}
		}
		if (j == 0) {
			qikoo.dialog2.alert("请进行批量操作");
		} else {
			for (var i = 0; i < ch.length; i++) {
				if (ch[i].checked) {
					playAll(ch[i].value);
				}
			}
			for (var i = 0; i < ch.length; i++) {
				if (ch[i].checked) {
					break;
				}
			}
			var sid = ch[i].value;
			window.location.href = ("playMusic.do?id=" + sid + "&type=1");
		}
	});

	// 功能栏 歌曲添加到歌单功能
	var flag6 = false;
	$("#addTo").click(function() {
		var j = 0;
		var ch = document.getElementsByName("choose");
		var pankong = $(this).parent().find(".beijing").attr("single");
		// alert(pankong);
		for (var i = 0; i < ch.length; i++) {
			if (ch[i].checked) {
				j++;
			}
		}
		if (j == 0) {
			qikoo.dialog2.alert("未选择歌曲");
		} else if (typeof (pankong) == 'undefined') {
			qikoo.dialog2.alert("歌单为空，请新建歌单");
		} else {
			if (flag6) {
				$(".jump").hide();
				flag6 = false;
			} else {
				$(".jump").show();
				// qikoo.dialog2.confirm('确定将所选的歌曲加入到我喜欢的音乐？',function(){
				$(".menuLi3").click(function() {
					var single = $(this).find(".beijing").attr("single");
					for (var i = 0; i < ch.length; i++) {
						if (ch[i].checked) {
							addSongsingle(ch[i].value, single);
						}
					}
					$(".jump").hide();
					qikoo.dialog2.alert("添加成功");
					for (var i = 0; i < ch.length; i++) {
						ch[i].checked = false;
					}
					$(".checkIn").hide();
					$("#piliang").html("批量选择");
					flag = false;
				});
				flag6 = true;
			}

		}

	});

	/* 歌曲列表效果 */
	$(".songList").hover(function() {
		$(this).find(".more").show();
		$(this).find(".dele").show();
	}, function() {
		$(this).find(".more").hide();
		$(this).find(".dele").hide();
	});
	/* 自定义滚动条 */
	$(".songUL").rollbar({
		zIndex : 80
	});
	// $("#lyr").rollbar({zIndex:80});
	/* 复选框 */
	// $(".checkIn").click(function(){
	// alert("123");
	// var s=$(this).attr("select");
	// if (s==0) {
	// $(this).css("background-position","-37px -710px");
	// $(this).attr("select","1");
	// };
	// if (s==1) {
	// $(this).css("background-position","");
	// $(this).attr("select","0");
	// };
	// });
	// $(".checkAll").click(function(){
	// var s=$(this).attr("select");
	// if (s==0) {
	// $(this).css("background-position","-37px -710px");
	// $(".checkIn[select='0']").css("background-position","-37px -710px");
	// $(".checkIn[select='0']").attr("select","1");
	// $(this).attr("select","1");
	// };
	// if (s==1) {
	// $(this).css("background-position","");
	// $(".checkIn[select='1']").css("background-position","");
	// $(".checkIn[select='1']").attr("select","0");
	// $(this).attr("select","0");
	// };
	//		
	// });
	/* 点击列表播放按钮 */
	$(".start em")
			.click(
					function() {
						/* 开始放歌 */
						var sid = $(this).attr("sonN");
						songIndex = sid;
						$("#audio").attr("src", 'songs/' + sid + '.mp3');
						audio = document.getElementById("audio");// 获得音频元素
						/* 显示歌曲总长度 */
						if (audio.paused) {
							audio.play();
						} else
							audio.pause();
						audio.addEventListener('timeupdate', updateProgress,
								false);

						audio.addEventListener('play', audioPlay, false);
						audio.addEventListener('pause', audioPause, false);
						audio.addEventListener('ended', audioEnded, false);
						/* 播放歌词 */
						getReady(sid);// 准备播放
						mPlay();// 显示歌词
						// 对audio元素监听pause事件
						/* 外观改变 */
						var html = "";
						html += '<div class="manyou">';
						html += '	<a href="#" class="manyouA">漫游相似歌曲</a>';
						html += '</div>';
						$(".start em").css({
							"background" : "",
							"color" : ""
						});
						$(".manyou").remove();
						$(".songList").css("background-color", "#f5f5f5");
						$(this)
								.css(
										{
											"background" : 'url("css/images/T1X4JEFq8qXXXaYEA_-11-12.gif") no-repeat',
											"color" : "transparent"
										});
						$(this).parent().parent().parent().append(html);
						$(this).parent().parent().parent().css(
								"background-color", "#f0f0f0");

						/* 底部显示歌曲信息 */
						var songName = $(this).parent().parent().find(".colsn")
								.html();
						var singerName = $(this).parent().parent().find(
								".colcn").html();
						$(".songName").html(songName);
						$(".songPlayer").html(singerName);
						/* 换右侧图片 */
						$("#canvas1").attr("src", 'images/' + sid + '.jpg');
						$("#canvas1").load(function() {
							loadBG();
						});
						// setTimeout('loadBG()',100);
						$(".blur").css("opacity", "0");
						$(".blur").animate({
							opacity : "1"
						}, 1000);

					});
	/* 双击播放 */
	$(".songList").dblclick(function() {
		var sid = $(this).find(".start em").html();
		$(".start em[sonN=" + sid + "]").click();
	});
	/* 底部进度条控制 */
	$(".dian").draggable({
		containment : ".pro2",
		drag : function() {
			var l = $(".dian").css("left");
			var le = parseInt(l);
			audio.currentTime = audio.duration * (le / 678);
		}
	});
	/* 音量控制 */
	$(".dian2").draggable({
		containment : ".volControl",
		drag : function() {
			var l = $(".dian2").css("left");
			var le = parseInt(l);
			audio.volume = (le / 80);
		}
	});
	/* 底部播放按钮 */
	$(".playBtn").click(function() {
		var p = $(this).attr("isplay");
		if (p == 0) {
			$(this).css("background-position", "0 -30px");
			$(this).attr("isplay", "1");
		}
		;
		if (p == 1) {
			$(this).css("background-position", "");
			$(this).attr("isplay", "0");
		}
		;
		if (audio.paused)
			audio.play();
		else
			audio.pause();

	});
	$(".mode").click(function() {
		// var t =
		// calcTime(Math.floor(audio.currentTime))+'/'+calcTime(Math.floor(audio.duration));
		// //alert(t);
		// var p =Math.floor(audio.currentTime)/Math.floor(audio.duration);
		// alert(p);
		// alert(lytext[1]);
	});
	/* 切歌 */
	$(".prevBtn").click(function() {
		var sid = parseInt(songIndex) - 1;
		$(".start em[sonN=" + sid + "]").click();
	});
	$(".nextBtn").click(function() {
		var sid = parseInt(songIndex) + 1;
		$(".start em[sonN=" + sid + "]").click();
	});

});

/* 首尾模糊效果 */
function loadBG() {
	// alert();
	// stackBlurImage('canvas1', 'canvas', 60, false);
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	var img = document.getElementById("canvas1");
	ctx.drawImage(img, 45, 45, 139, 115, 0, 0, 1366, 700);
	stackBlurCanvasRGBA('canvas', 0, 0, 1366, 700, 60);
}
function calcTime(time) {
	var hour;
	var minute;
	var second;
	hour = String(parseInt(time / 3600, 10));
	if (hour.length == 1)
		hour = '0' + hour;
	minute = String(parseInt((time % 3600) / 60, 10));
	if (minute.length == 1)
		minute = '0' + minute;
	second = String(parseInt(time % 60, 10));
	if (second.length == 1)
		second = '0' + second;
	return minute + ":" + second;
}
function updateProgress(ev) {
	/* 显示歌曲总长度 */
	var songTime = calcTime(Math.floor(audio.duration));
	$(".duration").html(songTime);
	/* 显示歌曲当前时间 */
	var curTime = calcTime(Math.floor(audio.currentTime));
	$(".position").html(curTime);
	/* 进度条 */
	var lef = 678 * (Math.floor(audio.currentTime) / Math.floor(audio.duration));
	var llef = Math.floor(lef).toString() + "px";
	$(".dian").css("left", llef);
}
function audioPlay(ev) {
	$(".iplay").css("background",
			'url("css/images/T1oHFEFwGeXXXYdLba-18-18.gif") 0 0');
	$(".playBtn").css("background-position", "0 -30px");
	$(".playBtn").attr("isplay", "1");
}
function audioPause(ev) {
	$(".iplay").css("background", "");
	// $(".start em").css({
	// "background":'url("css/images/pause.png") no-repeat 50% 50%',
	// "color":"transparent"
	// });
}
function audioEnded(ev) {
	var sid = parseInt(songIndex) + 1;
	$(".start em[sonN=" + sid + "]").click();
}
