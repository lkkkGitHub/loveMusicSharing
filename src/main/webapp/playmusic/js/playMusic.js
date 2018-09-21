//用户未登录弹出框
function userLogin(username) {
	if (username == null || username == "" || typeof (username) == "undefined") {
		qikoo.dialog3.alert("用户未登录，请登录");
	}
}
        //弹出新建歌单对话框	
		function payment(){   	
			$(".dialog").show();
        }
		//关闭新建歌单对话框
		function closeDialog(){
			$(".dialog").hide();
		}
		//验证歌单
		function valSongSingle(){
			var songSingle = $('#musicListName').val();
			//alert(songSingle)
			$.ajax({
			    url : "/addMusicList", 
				type: "post", 
				async:false,//(默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
				contentType:"application/x-www-form-urlencoded",
				data: {musicListName:songSingle,
					   s:"v",
		        },
		        dataType:'json',
		        success: function(json, textStatus){//如果调用servlet成功，响应200。请求成功后回调函数。这个方法有两个参数：服务器返回数据，返回状态(可以缺省)。
					console.log(textStatus);
					var flag = json.flag;
				    if(flag == 'true'){
                        if(songSingle==1||songSingle==2||songSingle==3){
                        	$(".showMessage").html("歌单名称非法");
                        }else{
                        	createSongsingle(songSingle);
                        	$(".showMessage").html("");
                        }
					}else if(flag == 'false'){
						$(".showMessage").html("歌单名已存在");
					}
				},
				error:function (XMLHttpRequest, textStatus, errorThrown) {//如果调用servlet出现问题，响应非200（这里响应405）。通常情况下textStatus和errorThown只有其中一个有值 。(默认: 自动判断 (xml 或 html)) 请求失败时将调用此方法。这个方法有三个参数：XMLHttpRequest 对象，错误信息，（可能）捕获的错误对象。
			         console.log(textStatus);
					 $(".showMessage").html("请求失败");
			    }   
			});
		}
		//创建歌单
		function createSongsingle(musicListName){
			$.ajax({
			    url : "/addMusicList", 
				type: "post", 
				async:true,
				contentType:"application/x-www-form-urlencoded",
				data: {musicListName:musicListName,
					   s:"w",
		        },
		        success: function(data){//如果调用servlet成功，响应200。请求成功后回调函数。这个方法有两个参数：服务器返回数据，返回状态(可以缺省)。
		        	if( typeof data == "string" ) data = JSON.parse(data);
		        	$(".dialog").hide();
					$(".menuUL2").append("<li class='menuLi2 cur'>"+"<div  class='beijing hp'"+"single2="+musicListName+">"+
							"<i class='icon isplay2'>"+"</i>"+"<a href=/play?type="+data.mlid+" style='color:black; background-color:transparent;'>"+musicListName+"</a>"+
							"<i class='cicon dele2' single3="+data.mlid+">"+"</i>"+"</div>"+"</li>");
		        }
			});
		}
		//删除对话框
		function Confirm(){
	    qikoo.dialog2.confirm('确定要删除此歌曲吗？',function(){
			 			 
        },function(){
			alert("取消啦！");
	    });
        }
		
		//logo点击切换颜色
		function huan(){
			 $(".logoaichang").css("color","#fa3b4a");
			}
		function huan2(){
			 $(".logoaichang").css("color","#fff");
			}
			
		//切换播放方式
		function mode2(){       //单曲
			$(".mode2").show();
			$(".mode").hide();
			$(".modeshunxv").hide();
            $(".modedanqu").show();
			setTimeout("yincangdanqu()",1000);
			$(".playerCon").attr("playStyle","1");
			}
		function mode3(){     //随机
			$(".mode3").show();
			$(".mode2").hide();
			$(".modedanqu").hide();
			$(".modesuiji").show();
			setTimeout("yincangsuiji()",1000);
			$(".playerCon").attr("playStyle","2");
			}
		function mode(){      //顺序
			$(".mode").show();
			$(".mode3").hide();
			$(".modesuiji").hide();
            $(".modeshunxv").show();
			setTimeout("yincangshunxv()",1000);
			$(".playerCon").attr("playStyle","0");
			}
		function yincangsuiji(){
			$(".modesuiji").hide();
			}
        function yincangshunxv(){
			$(".modeshunxv").hide();
			}
		function yincangdanqu(){
			$(".modedanqu").hide();
			}

		//右侧功能按钮点击变色	 
		function menuLi(){
			$(".bianse3").css("background-color","#fff");
			$(".bianse2").css("background-color","#fff");
			$(".bianse").css("background-color","#f0f0f0");
			playasynch("now");
		}
		function menuLi3(){
			$(".bianse").css("background-color","#fff");
			$(".bianse3").css("background-color","#fff");
			$(".bianse2").css("background-color","#f0f0f0");
			playasynch("history");
		}
		function menuLi4(){
			//$(".bianse2").css("background-color","#fff");
		}
		function menuLi5(){
			$(".bianse").css("background-color","#fff");
			$(".bianse2").css("background-color","#fff");
			$(".bianse3").css("background-color","#f0f0f0");
			playasynch("myLove");
		}
		
		//播放页面的异步请求
		function playasynch(type){
			$.ajax({
			    url : "/play/playasynch", 
				type: "post", 
				async:true,
				contentType:"application/x-www-form-urlencoded",
				data: {"type":type},
		        success: function(data){//如果调用servlet成功，响应200。请求成功后回调函数。这个方法有两个参数：服务器返回数据，返回状态(可以缺省)。
		        	$(".songUL").find("li").remove();
		        	$.each(data.musics,function(n,music){
		        		var str = "<li class=\"songList\" ListName=\""+music.mid+"\">";
		        		str+="<div class=\"songLMain\"><div class=\"check\"><input class=\"checkIn\" name=\"choose\" type=\"checkbox\" select=\"0\" value=\""+music.mid+"\"></div>";
		        		str+="<div class=\"start\">";
		        		str+="<em  sonN=\""+music.mid+"\" lrc=\""+music.lyricsurl+"\" musicUrl=\""+music.fileurl+"\" imgurl=\""+music.image+"\" ListId=\""+n+"\"><input type=\"text\" style=\"display:none;\" name=\"son\" value=\""+music.mid+"\">"+(parseInt(n)+1)+"</em>";
		        		str+="</div><div class=\"songBd\">";
		        		str+="<div class=\"col colsn\">"+music.mname+"</div>";
		        		str+="<div class=\"col colcn\">"+music.sname+"</div>";
		        		str+="<div class=\"col\">待添加</div></div>";
		        		str+="<div class=\"control hp\">";
		        		if(data.loves!=null&&$.inArray(music.mid,data.loves)>-1){
		        			str+="<a class=\"cicon love\" style=\"background-position:0 -131px\" loveN=\"1\"></a>";
		        		}else{
		        			str+="<a class=\"cicon love\" loveN=\"0\"></a>";
		        		}
		        		str+="<a href=\"/music/detail?mid="+music.mid+"\" title=\"音乐详情\" class=\"cicon more\"  target=\"_blank\"></a>";
		        		str+="<a class=\"cicon dele\" ></a></div></div></li>";
		        		$(".songUL").append(str);
		        		if(music.mid==data.nowMid){
		        			var html="";
		        			html+='<div class="manyou">';
		        			html+='<a href="/music/detail?mid='+music.mid+'" class="manyouA"  target="_blank">查看详细信息</a>';
		        			html+='</div>';
		        			$(".start em").css({
		        				"background":"",
		        				"color":""
		        			});
		        			$(".manyou").remove();
		        			$(".songList").css("background-color","#f5f5f5");
		        			$("ul em:eq("+(parseInt(n))+")").css({
		        				"background":'url("playmusic/css/images/T1X4JEFq8qXXXaYEA_-11-12.gif") no-repeat',
		        				"color":""
		        			});
		        			$("ul em:eq("+(parseInt(n))+")").parent().parent().parent().append(html);
		        			$("ul em:eq("+(parseInt(n))+")").parent().parent().parent().css("background-color","#f0f0f0");
		        		}
		        	});
		        }
			});
		}
		
		function bian(type){
			if(type==1){
				menuLi();
			};
			if(type==2){
				menuLi3();
			};
			if(type==3){
				menuLi5();
			};
		}
		
		//静音切换
		var flag = false;
		function volSpeakerchange(){
			if(flag){
			$(".volSpeaker").css("background-position","0 -295px");
					var l=$(".dian2").css("left");
					var le = parseInt(l);
					audio.volume=(le/80);
			flag=false;
			}else{
			$(".volSpeaker").css("background-position","0 -313px");
					audio.volume=(0);
			flag=true;
			}
			
			}
		
		//纯净播放
		var flag3 = false;
		function pinBtnchange(){
			if(flag3){
				$(".mainOuther").addClass('he');
				$(".pinBtn").removeClass('changeBg');
				$(".mainBody").show();
				$(".leftBar").show();
				$(".mainOuther").removeClass('mainOuther2');
				$(".albumCover").removeClass('albumCover2');
				$(".canvas1").removeClass('canvas12');
				$(".albumSale").removeClass('albumSale2');
				$(".lyr").css("font-size","12px");
				$(".lyr").css("line-height","normal");
				$(".lyr").css("color","black");
				$(".middle").css("background-color","#fff");
				$(".middle").removeClass('bg');
				flag3=false;
			} else {
				$(".mainOuther").removeClass('he');
				$(".pinBtn").addClass('changeBg');
				$(".mainBody").hide();
				$(".leftBar").hide();
				$(".mainOuther").addClass('mainOuther2');
				$(".albumCover").addClass('albumCover2');
				$(".canvas1").addClass('canvas12');
				$(".albumSale").addClass('albumSale2');
				$(".lyr").css("font-size","18px");
				$(".lyr").css("line-height","26px");
			    $(".lyr").css("color","#fff");
				$(".middle").addClass('bg');
				flag3=true;
			}
		}

		//喜爱音乐添加
		function addLoveMusic(sid){
				$.ajax({
				    url : "/loveMusic", 
					type: "post", 
					async:false,//(默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
					contentType:"application/x-www-form-urlencoded",
					data: {
						id:sid
			        },
					success: function(data){
					}  
				});
			}
		
		//音乐从列表删除
		function moveMusic(sid){
				$.ajax({
				    url : "/delMusicFromList", 
					type: "post", 
					async:false,//(默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
					contentType:"application/x-www-form-urlencoded",
					data: {
						id:sid
			        },
					success: function(data){
					}  
					
				});
			}
		
		//将音乐添加到歌单
		function addSongsingle(sid,single){
				$.ajax({
				    url : "/addList", 
					type: "post", 
					async:false,//(默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
					contentType:"application/x-www-form-urlencoded",
					data: {id:sid,
						   lid:single,
			        },
					success: function(data){
						data = JSON.parse(data);
						alert(data);
					}
					
				});
			}
		//删除歌单
		function moveSongSingle(single){
				$.ajax({
				    url : "/deletMusicList", 
					type: "post", 
					async:false,//(默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
					contentType:"application/x-www-form-urlencoded",
					data: {
						musicListId:single,
			        },
					success: function(data){
					},
					error:function (XMLHttpRequest, textStatus, errorThrown) {
				    }   
					
				});
			}
		    
	     function getListening(sid){
	    	 alert("yeyeye")
	     }
	 	var qw = true	
		var songName2//歌曲名称
		var singerName2//歌手名称
		var sid2//歌曲ID
$(function(){

	//我喜爱的音乐，小红心系列操作
	$(".songUL").on("click",".love",function(){
		var loveN=$(this).attr("loveN");
		var sid=$(this).parent().parent().find(".start em").attr("sonN");
		var singID = $(".songName").attr("singID");
		if(loveN==0){
			$(this).css("background-position","0 -131px");
			$(this).attr("loveN","1");
			if(sid==singID){
			  $(".tc1").css("background-position","0 -131px");
			}
			addLoveMusic(sid);//添加到我喜爱的音乐列表
		};
		if(loveN==1){
			var i = this;
			//删除我喜爱音乐的歌曲
		    qikoo.dialog2.confirm('确定要将歌曲从我喜欢的音乐删除吗？',function(){
		    moveMusic(sid, "myLove") //从我喜爱的音乐列表中删除
		    $(i).css("background-position","-28px -130px");
		    $(i).attr("loveN","0");
		    if(sid==singID){
		    	$(".tc1").css("background-position","0 -241px");
			}
	        },function(){
	        $(i).attr("loveN","1");
		    });
			
		};
	});
    //下部小红心点击事件	
	
	function shuaxin(){
		if(type==3){
			window.location.reload();
	    }
	}
	
	//点击列表中的删除按钮删除歌曲
	$(".songUL").on("click",".dele",function(){
		var sid=$(this).parent().parent().find(".start em").attr("sonN");
		var ListId=$(this).parent().parent().find(".start em").text()-1;
		qikoo.dialog2.confirm('确定要将歌曲从当前列表删除吗？', function(){
				$(".songUL li:eq("+ListId+")").remove();
				moveMusic(sid,type); //从列表中删除 
				for(var i=0; i<$(".songUL li").length; i++){
					$(".songUL li:eq("+i+")").find(".start em").html(i+1);
				}
				var len = $(".songUL li").length-1;
				$(".mainBody").find("#gequ").html("歌曲("+len+")");
			},
		function(){});
	});
	
	//点击删除歌单
	$(".dele2").click(function(){
		var single=$(this).attr("single3");
		var delNo = $(this).attr("delNo");
		qikoo.dialog2.confirm('确定要将此歌单删除吗？',function(){
		moveSongSingle(single); //从列表中删除 
			$(".menuUL2 li:eq("+delNo+")").remove();
	    },function(){
		});
	});

	/*歌曲列表效果*/
	$(".songList").hover(function(){
		$(this).find(".more").show();
		$(this).find(".dele").show();
	},function(){
		$(this).find(".more").hide();
		$(this).find(".dele").hide();
	});
	
	$(".menuLi2").hover(function(){
		$(this).find(".dele2").show();
	},function(){
		$(this).find(".dele2").hide();
	});
	/*自定义滚动条*/
	$(".songUL").rollbar({zIndex:80});
	$(".menuUL2").rollbar({zIndex:80});
	//$("#lyr").rollbar({zIndex:80});
	/*复选框*/
	
	//点选
	$(".songUL").on("click",".checkIn",(function(){
		var s=$(this).attr("select");
		if (s==0) {
			$(this).css("background-position","-37px -710px");
			$(this).attr("select","1");
		};
		if (s==1) {
			$(this).css("background-position","");
			$(this).attr("select","0");
		};		
	}));
	
	//全选
	$(".checkAll").click(function(){
		var s=$(this).attr("select");
		var ch=document.getElementsByName("choose");
		if(document.getElementsByName("allChecked")[0].checked==true)
		{
		for(var i=0;i<ch.length;i++)
		{
		ch[i].checked=true;
		}
		}else{
		for(var i=0;i<ch.length;i++)
		{
		ch[i].checked=false;
		}
		}
		if (s==0) {
			$(this).css("background-position","-37px -710px");
			$(".checkIn[select='0']").css("background-position","-37px -710px");
			$(".checkIn[select='0']").attr("select","1");
			$(this).attr("select","1");
		};
		if (s==1) {
			$(this).css("background-position","");
			$(".checkIn[select='1']").css("background-position","");
			$(".checkIn[select='1']").attr("select","0");
			$(this).attr("select","0");
		};
		
	});
	
	
	//播放列表下方功能栏 删除歌曲功能
	$(".itDele").click(function(){
        var j = 0;
		var ch=document.getElementsByName("choose");
		for(var i=0;i<ch.length;i++){
			if(ch[i].checked){
				j++;
		    }
		}
		if(j==0){
			qikoo.dialog2.alert("未选择歌曲");
		}else{
			qikoo.dialog2.confirm('确定要删除所选的歌曲吗？',function(){
				for(var i=0;i<ch.length;i++){
					if(ch[i].checked){
						moveMusic(ch[i].value);
					}
				}
				var listlen = $(".songUL li").length-1;
				var myc = new Array();
				var h=0;
				for(var i=0; i<listlen; i++){//获取到被勾选的歌曲的列表序号
					if($(".songUL li:eq("+i+")").find(".checkIn").attr("select")==1){
						myc[h++]=$(".songUL li:eq("+i+")").find(".start em").text()-1;//将其存储到一个数组中
					}
				}
				//这边是遍历一下数组，对照列表中的序号，如果数组中的序号存在于列表，就将该序号所代表的li去掉
				for(var i=0; i<myc.length; i++){
					//alert(myc[i])
					for(var j=0; j<$(".songUL li").length-1; j++){
					if($(".songUL li:eq("+j+")").find(".start em").text()-1==myc[i]){
						$(".songUL li:eq("+j+")").remove();
					}
				}
				}
				//重新恢复列表顺序
				for(var i=0; i<$(".songUL li").length; i++){
					$(".songUL li:eq("+i+")").find(".start em").html(i+1);
				}
				//重新获取列表歌曲的数量
				var len = $(".songUL li").length-1;
				$(".mainBody").find("#gequ").html("歌曲("+len+")");
	        },function(){
	        	
		    }); 
		}
	});
	
	
	//播放列表下方功能栏 收藏功能
	$(".itShou").click(function(){
        var j = 0;
		var ch=document.getElementsByName("choose");
		for(var i=0;i<ch.length;i++){
			if(ch[i].checked){
				j++;
		    }
		}
		if(j==0){
			qikoo.dialog2.alert("未选择歌曲");
		}else{
			qikoo.dialog2.confirm('确定将所选的歌曲加入到我喜欢的音乐？',function(){
				var singID = $(".songName").attr("singID");
				for(var i=0;i<ch.length;i++){
					if(ch[i].checked){
						addLoveMusic(ch[i].value);
						if(ch[i].value==singID){
							  $(".tc1").css("background-position","0 -131px");
							}
					}
				}
				var listlen = $(".songUL li").length-1;
				for(var i=0; i<listlen; i++){//获取到被勾选的歌曲的列表序号
					if($(".songUL li:eq("+i+")").find(".checkIn").attr("select")==1){
						//alert($(".songUL li:eq("+i+")").find(".cicon love").attr("loveN"))
						$(".songUL li:eq("+i+")").find(".love").css("background-position","0 -131px");
						$(".songUL li:eq("+i+")").find(".love").attr("loveN","1");
						$(".songUL li:eq("+i+")").find(".checkIn").css("background-position","");
						$(".songUL li:eq("+i+")").find(".checkIn").attr("select","0");
					}
				}
				
	        },function(){
	        	
		    }); 
		}
	});
	
	//播放列表下方功能栏 添加到歌单功能

	
	$(".itJin").click(function (event) {
	    event.stopPropagation();//阻止mousedown 事件冒泡（注意只阻止了mousedown事件）
	    event.preventDefault();//阻止当前元素默认事件
		 var j = 0;
			var ch=document.getElementsByName("choose");
			var pankong = $(this).parent().parent().parent().parent().find(".beijing").attr("single");
			for(var i=0;i<ch.length;i++){
				if(ch[i].checked){
					j++;
			    }
			}
			if(j==0){
				qikoo.dialog2.alert("未选择歌曲");
			}else if(typeof(pankong)=='undefined'){
				qikoo.dialog2.alert("歌单为空，请新建歌单");
			}else{
				 $(".songSingleChoose").show();
				 $(".menuLi3").click(function(){
					 var single = $(this).find(".beijing").attr("single"); 
					for(var i=0;i<ch.length;i++){
					    if(ch[i].checked){
							addSongsingle(ch[i].value,single);
						}
					}
					$(".songSingleChoose").hide();
					var listlen = $(".songUL li").length-1;
					for(var i=0; i<listlen; i++){//获取到被勾选的歌曲的列表序号
							$(".songUL li:eq("+i+")").find(".checkIn").css("background-position","");
							$(".songUL li:eq("+i+")").find(".checkIn").attr("select","0");
					}
				 });
			}
	});
	$(document).click(function () {
		$(".songSingleChoose").hide();
	});

	
	/*点击列表播放按钮*/
	$(".songUL").on("click",".start em",function(){
		qw = true
		/*开始放歌*/
		var sid=$(this).attr("sonN");
		sid2=$(this).attr("sonN");
		$(".songName").attr("singID",sid);
		var murl = $(this).attr("musicUrl");
		var loveN = $(this).parent().parent().find(".love").attr("loveN");
		$.ajax({
			url : "/play/playmusic", 
			type: "post", 
			async:false,
			contentType:"application/x-www-form-urlencoded",
			data: {
				mid:sid,
	        },
			success: function(data){
			},
			error:function (XMLHttpRequest, textStatus, errorThrown) {
				alert("服务器错误，无法保存历史歌单");
		    }   
		});
		if(loveN==1){
			$(".tc1").css("background-position","0 -131px");
		}else{
			$(".tc1").css("background-position","0 -241px");
		}
		songIndex=sid;
		$("#audio").attr("src", murl);
		var audio=document.getElementById("audio");//获得音频元素
		/*显示歌曲总长度*/
		if(audio.paused){
			audio.play();
		} 				
		else{
			audio.pause();
		}
		audio.addEventListener('timeupdate',updateProgress,false);
		audio.addEventListener('play',audioPlay,false);
		audio.addEventListener('pause',audioPause,false);
		audio.addEventListener('ended',audioEnded,false);
		songName2=$(this).parent().parent().find(".colsn").html();//获取歌曲名称
		singerName2 =$(this).parent().parent().find(".colcn").html();//获取歌手名称
		/*播放歌词*/
		var lrcUrl = $(this).attr("lrc");
		getReady(lrcUrl, songName2, singerName2, sid);//准备播放
		mPlay();//显示歌词
		//对audio元素监听pause事件
		/*外观改变*/
		var html="";
		html+='<div class="manyou">';
		html+='<a href="/music/detail?mid='+sid+'" class="manyouA"  target="_blank">查看详细信息</a>';
		html+='</div>';
		$(".start em").css({
			"background":"",
			"color":""
		});
		$(".manyou").remove();
		$(".songList").css("background-color","#f5f5f5");
		$(this).css({
			"background":'url("playmusic/css/images/T1X4JEFq8qXXXaYEA_-11-12.gif") no-repeat',
			"color":""
		});
		$(this).parent().parent().parent().append(html);
		$(this).parent().parent().parent().css("background-color","#f0f0f0");

		/*底部显示歌曲信息*/
		var songName=$(this).parent().parent().find(".colsn").html();
		var singerName =$(this).parent().parent().find(".colcn").html();
		$(".songName").html(songName);
		$(".songPlayer").html(singerName);
		$(".tc3").attr("href", "/music/detail?mid="+sid);
		$(".tc3").attr("target", "_blank");
		/*换右侧图片*/
		var urlImg = $(this).attr("imgurl");
		$("#canvas1").attr("src", urlImg);
		$("#canvas1").load(function(){
			loadBG();
		});
		$(".blur").css("opacity","0");
		$(".blur").animate({opacity:"1"},1000);
		
	});
	
	/*双击播放*/
	$(".songList").dblclick(function(){
		var sid = $(this).find(".start em").attr("sonN");
		$(".start em[sonN="+sid+"]").click();
	});
	/*底部进度条控制*/
	$( ".dian" ).draggable({ 
		containment:".pro2",
		drag: function() {
			var l=$(".dian").css("left");
			var le = parseInt(l);
			audio.currentTime = audio.duration*(le/678);
      	}
	});
	/*音量控制*/
	$( ".dian2" ).draggable({ 
		containment:".volControl",
		drag: function() {
			var l=$(".dian2").css("left");
			var le = parseInt(l);
			audio.volume=(le/80);
      }
	});
	/*底部播放按钮*/
	$(".playBtn").click(function(){	
		var p = $(this).attr("isplay");		
		if (p==0) {
			$(this).css("background-position","0 -30px");
			$(this).attr("isplay","1");
		};
		if (p==1) {
			$(this).css("background-position","");
			$(this).attr("isplay","0");
		};
		if(audio.paused) 
			audio.play();
		else
			audio.pause();
		
	});
	$(".mode").click(function(){
	});
	/*切歌*/
	//后退
	$(".prevBtn").click(function(){
		var ch=document.getElementsByName("son");
		for(var i=0;i<ch.length;i++){
			if(ch[i].value==songIndex){
				break;
		    }
		}
		if(i==0){
			i=ch.length;
		}
		var sid = parseInt(i)-1;
		$(".start em[sonN="+ch[sid].value+"]").click();
	});
	
	//前进
	$(".nextBtn").click(function(){
		var ch=document.getElementsByName("son");
		for(var i=0;i<ch.length;i++){
			if(ch[i].value==songIndex){
				break;
		    }
		}
		if(i==ch.length-1){
			i=-1;
		}
		var sid = parseInt(i)+1;
		$(".start em[sonN="+ch[sid].value+"]").click();			
	});
	
	
	function audioEnded(ev){
		var playStyle = $(".playerCon").attr("playStyle");
		if(playStyle==0){
			shunXv(ev)
		};if(playStyle==1){
			danQv(ev)
		};
		if(playStyle==2){
			suiJi(ev)
		};
		}
	
	
	function shunXv(ev){  //顺序播放   1
		 var ch=document.getElementsByName("son");
			for(var i=0;i<ch.length;i++){
				if(ch[i].value==songIndex){
					break;
			    }
			}
			if(i==ch.length-1){
				i=-1;
			}
			var sid = parseInt(i)+1;
			$(".start em[sonN="+ch[sid].value+"]").click();
	 }
	
	function danQv(ev){  //单曲循环   2
		$(".start em[sonN="+songIndex+"]").click();
	 }
	
	function suiJi(ev){  //随机播放  3
		var ch=document.getElementsByName("son");
		var j = ch.length-1;
	    var i = Math.floor(Math.random()*j+1);
		var sid = parseInt(i);
		$(".start em[sonN="+ch[sid].value+"]").click();
	}
	
	

});

/*首尾模糊效果*/
function loadBG(){
	var c=document.getElementById("canvas");
	var ctx=c.getContext("2d");
	var img=document.getElementById("canvas1");
	ctx.drawImage(img,45,45,139,115,0,0,1366,700);
	// stackBlurCanvasRGBA('canvas',0,0,1366,700,5);
}
function calcTime(time){
	var hour;         	var minute;    	var second;
	hour = String ( parseInt ( time / 3600 , 10 ));
	if (hour.length ==1 )   hour='0'+hour;
	minute=String(parseInt((time%3600)/60,10));
	if(minute.length==1) minute='0'+minute;
	second=String(parseInt(time%60,10));
	if(second.length==1)second='0'+second;
	return minute+":"+second;
}

function updateProgress(ev){

	/*显示歌曲总长度*/
	var songTime = calcTime(Math.floor(audio.duration));
	$(".duration").html(songTime);
	/*显示歌曲当前时间*/
	var curTime = calcTime(Math.floor(audio.currentTime));
	$(".position").html(curTime);
	/*进度条*/
	var lef = 678*(Math.floor(audio.currentTime)/Math.floor(audio.duration));
	var llef = Math.floor(lef).toString()+"px";
	$(".dian").css("left",llef);
	if(this.currentTime>60&&qw==true){
		qw = false;
	}
}
function audioPlay(ev){
	$(".iplay").css("background",'url("playmusic/css/images/T1oHFEFwGeXXXYdLba-18-18.gif") 0 0');
	$(".playBtn").css("background-position","0 -30px");
	$(".playBtn").attr("isplay","1");
}
function audioPause(ev){
	$(".iplay").css("background","");
}

 
 
 

/*显示歌词部分*/
var scrollt=0; var tflag=0;//存放时间和歌词的数组的下标
var lytext=new Array();//放存汉字的歌词 
var lytime=new Array();//存放时间
var delay=10; var line=0; var scrollh=0; 
var songIndex=2;
function getLy(src, mname, sname, mid)//取得歌词 
{ 	
	var ly="";
	// 初始化
	lytext=new Array();
	lytime=new Array();
	$.ajax({
		url : "/getLy", 
		type: "post", 
		async: false,//(默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
		contentType:"application/x-www-form-urlencoded",
		data: {
			url:src,
			songName:mname,
			singerName:sname,
			id:mid,
        },
		success: function(data){
			if( typeof data == "string" ) data = JSON.parse(data);
			ly = data.lrc;
		}
	});
 	return ly; 
} 
function show(t)//显示歌词 
{
	var div1=document.getElementById("lyr");//取得层
	document.getElementById("lyr").innerHTML=" ";//每次调用清空以前的一次
	if( lytime.length == 0 ){
		document.getElementById("lyr").innerHTML="暂无歌词";
		return ;
	}
	if(t<lytime[lytime.length-1])//先舍弃数组的最后一个
		{ 	
			for(var k=0;k<lytext.length;k++)
				{ 
	   			if(lytime[k]<=t&&t<lytime[k+1]) 
	   			{ scrollh=k*25;//让当前的滚动条的顶部改变一行的高度 
	   			div1.innerHTML+="<font color=#fa3b4a style=font-weight:bold>"+lytext[k]+"</font><br>"; 
	   			} 
	   			else if(t<lytime[lytime.length-1])//数组的最后一个要舍弃
	   	 		div1.innerHTML+=lytext[k]+"<br>"; 
	 			} 
 		}
   else//加上数组的最后一个
      { 
         for(var j=0;j<lytext.length-1;j++) 
            div1.innerHTML+=lytext[j]+"<br>"; 
            div1.innerHTML+="<font  color=#fa3b4a style=font-weight:bold>"+lytext[lytext.length-1]+"</font><br>"; 
      } 
} 
function scrollBar()//设置滚动条的滚动 
{ 
      if(document.getElementById("lyr").scrollTop<=scrollh) 
         document.getElementById("lyr").scrollTop+=1; 
      if(document.getElementById("lyr").scrollTop>=scrollh+50) 
         document.getElementById("lyr").scrollTop-=1; 
      window.setTimeout("scrollBar()",delay); 
} 
function getReady(src, mname, sname, mid)//在显示歌词前做好准备工作 
{ 	
	var ly=getLy(src, mname, sname, mid);//得到歌词
	if (ly=="" || ly==null || typeof(ly) == "undefined") {
		$("#lry").html("本歌暂无歌词！");
		return ;
	};
	var arrly=ly.split("\n");//转化成数组
  	tflag=0;
  	for( var i=0;i<lytext.length;i++)
	{
		lytext[i]="";
	}
	for( var i=0;i<lytime.length;i++)
	{
		lytime[i]="";
	}
  	$("#lry").html(" ");
  	document.getElementById("lyr").scrollTop=0;
	for(var i=0;i<arrly.length;i++) 
  	sToArray(arrly[i]);
	sortAr();
	scrollBar(); 
}
function sToArray(str)
{  
	
   var left=0;//"["的个数
   var leftAr=new Array(); 
   for(var k=0;k<str.length;k++) 
   { 
      if(str.charAt(k)=="[") { leftAr[left]=k; left++; } 
   } 
   if(left!=0) 
   {
      for(var i=0;i<leftAr.length;i++) 
      {  
         lytext[tflag]=str.substring(str.lastIndexOf("]")+1);//放歌词 
         lytime[tflag]=conSeconds(str.substring(leftAr[i]+1,leftAr[i]+9));//放时间
         tflag++; 
      } 
   } 
} 
function sortAr()//按时间重新排序时间和歌词的数组 
{ 
	var temp=null; var temp1=null; for(var k=0;k<lytime.length;k++) { for(var j=0;j<lytime.length-k;j++) { if(lytime[j]>lytime[j+1]) { temp=lytime[j]; temp1=lytext[j]; lytime[j]=lytime[j+1]; lytext[j]=lytext[j+1]; lytime[j+1]=temp; lytext[j+1]=temp1; } } } 
} 
function conSeconds(t)//把形如：01：25的时间转化成秒；
{	
   var m=t.substring(0,t.indexOf(":")); 
   var s=t.substring(t.indexOf(":")+1); 
   m=parseInt(m.replace(/0/,""));
   var totalt=parseInt(m)*60+parseFloat(s); 
   return totalt; 
} 

function mPlay()//开始播放
{ 
   var ms =audio.currentTime;
   show(ms); 
	window.setTimeout("mPlay()",100) 
}
function fPlay(songIndex){
	$(".start em[sonN="+songIndex+"]").click();
}
function bian(type){
	if(type=="now"){
		menuLi();
	} else if(type=="history"){
		menuLi3();
	} else if(type=="myLove"){
		menuLi5();
	} else {
		
	}
}