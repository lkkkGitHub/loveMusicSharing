//取消关注好友
function moveFriend(friend) {
    $.ajax({
        url: "deleteFriend.do",
        type: "post",
        async: false,//(默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
        contentType: "application/x-www-form-urlencoded",
        data: {
            friend: friend,
        },
        success: function (data) {
        }
    });
}


function move(friend) {
    qikoo.dialog2.confirm('确定要取消关注吗？', function () {
        moveFriend(friend); //删除好友
        window.location.reload();
    }, function () {
    });
}

//function shareDynamic(){
//	var i = $('#MusicId option:selected').text();
//	if(i==null||i==""){
//		alert("暂无歌曲，请上传后再分享");
//	}else{
//	$("#shareform").submit();
//	}
//}

//$(".date-dz-pl pl-hf hf-con-block pull-left").click(function(t){
////	if(flag){
////	$(t).parent().parent().next().hide();
////	flag = false;
////	}else{
////		$(t).parent().parent().next().show();
////		flag = true;
////	}
//},function(){});


$(function () {
//$("#fans").click(function(){
//	$(".guanzhu").hide();
//	$(".phInner").hide();
//	$(".playBd").hide();
//	$(".fans").show();
//	$(".shangchuan").hide();
//});
// search 反馈结果


//$("#add").click(function(){
//	$("#tupian").hide();
//	$("#fudong").show();
//});

    $(".textarea").on("input propertychange", function () {
        var $this = $(this),
            _val = $this.val();
        if (_val.length > 300) {
            $this.val(_val.substring(0, 300));
        }
    });


    $("#talk").click(function () {
        alert("123");
        $(this).parent().parent().parent().find(".commentAll").show();
    }, function () {
        $(this).parent().parent().parent().find(".commentAll").hide();
    });


    $("#guanzhu").click(function () {
        $(".fans").hide();
        $(".phInner").hide();
        $(".playBd").hide();
        $(".guanzhu").show();
        $(".shangchuan").hide();
        $(".share").hide();
        $(".listen").hide();
    });

    $("#playall").click(function () {
        $(".fans").hide();
        $(".phInner").show();
        $(".playBd").show();
        $(".guanzhu").hide();
        $(".shangchuan").hide();
        $(".share").hide();
        $(".listen").hide();
    });

    $("#shangchuan").click(function () {
        $(".fans").hide();
        $(".phInner").hide();
        $(".playBd").hide();
        $(".guanzhu").hide();
        $(".shangchuan").show();
        $(".share").hide();
        $(".listen").hide();
    });
    $("#friendshow").click(function () {
        $(".phInner").show();
        $(".playBd").show();
        $(".listen124").hide();
    });
    $("#listen123").click(function () {
        $(".phInner").hide();
        $(".playBd").hide();
        $(".listen124").show();
    });

    $("#share").click(function () {
        $(".fans").hide();
        $(".phInner").hide();
        $(".playBd").hide();
        $(".guanzhu").hide();
        $(".shangchuan").hide();
        $(".listen").hide();
        $(".share").show();
    });

    $("#listening").click(function () {
        $(".fans").hide();
        $(".phInner").hide();
        $(".playBd").hide();
        $(".guanzhu").hide();
        $(".shangchuan").hide();
        $(".share").hide();
        $(".listen").show();
    });

    $(".songList").hover(function () {
        $(this).find(".dele").show();
    }, function () {
        $(this).find(".dele").hide();
    });

    $(".dele").click(function () {
        var sid = $(this).attr("sonID");
        qikoo.dialog2.confirm('确定要将歌曲从当前列表删除吗？', function () {
            moveMusic(sid); //从列表中删除
            window.location.reload();
        }, function () {
        });
    });
//
    $("#add").click(function (event) {
        event.stopPropagation();//阻止mousedown 事件冒泡（注意只阻止了mousedown事件）
        event.preventDefault();//阻止当前元素默认事件
        $("#tupian").hide();
        $("#fudong").show();
        $("#fudong2").hide();
        $(".manyfriend").hide();

    });

    $("#add2").click(function (event) {
        event.stopPropagation();//阻止mousedown 事件冒泡（注意只阻止了mousedown事件）
        event.preventDefault();//阻止当前元素默认事件
        $("#tupian").hide();
        $("#fudong2").show();
        $(".manyfriend").hide();
        $("#fudong").hide();

    });
    $(document).click(function () {
        $("#fudong").hide();
        $("#fudong2").hide();
        $(".manyfriend").show();
    });


});

function userLogin(username) {
    if (username == null || username == "" || typeof(username) == "undefined") {
        qikoo.dialog3.alert("用户未登录，请登录");
    }
}

function moveMusic(sid) {
    $.ajax({
        url: "deleteMyMusic.do",
        type: "post",
        async: false,//(默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
        contentType: "application/x-www-form-urlencoded",
        data: {
            id: sid,
        },
        success: function (data) {
        }

    });
}

function sumbitjiance() {
    var hp = parseInt($('.demo').get(0).offsetHeight);//doucument.getElementById("demo").style.height;
    alert(hp);
}
