/**
 * 
 */
function searchName(){
	$("#searchform1").submit();
}
//关注好友
function addFriendToBaseData(friend1){
	//alert(friend1);
		$.ajax({
		    url : "addFriend.do", 
			type: "post", 
			async:false,//(默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
			contentType:"application/x-www-form-urlencoded",
			data: {friend:friend1,
	        },
			success: function(data){
			}   
		});
	}
//取消关注好友
function moveFriend(friend){
	$.ajax({
	    url : "deleteFriend.do", 
		type: "post", 
		async:true,//(默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
		contentType:"application/x-www-form-urlencoded",
		data: {friend:friend,
        },
		success: function(data){
		}   
	});
}


function addFriend(friend,isfriend){
	if($("#addguanzhu").attr("hp")==1){
	qikoo.dialog2.confirm('确定要取消关注吗？',function(){
		$("#addguanzhu").html("添加关注");
		$("#addguanzhu").css("background-color","#fff");
		$("#addguanzhu").hover(function(){
			$(this).css("background-color","#ededed")
		},function(){
		    $(this).css("background-color","#fff");
		});
		moveFriend(friend); //删除好友 
	    },function(){	
		});
	$("#addguanzhu").attr("hp","0");
	}else{
	$("#addguanzhu").html("已关注");
	$("#addguanzhu").hover(function(){
		$(this).css("background-color","#ededed");
	},function(){
	    $(this).css("background-color","#ededed");
	});
	qikoo.dialog2.alert("关注成功");
	$("#addguanzhu").attr("hp","1");
	addFriendToBaseData(friend);
	}
}

