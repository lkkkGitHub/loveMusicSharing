function searchStr(str1) {
	$.ajax({
		type : 'post',
		url : '/search',
		data : {
			musicName : str1
		},
		success : function(data) {
			var strs = "";
			if (str1 != "") {
				var str = "<p style=' font-size:18px'>歌曲</p>";
				for ( var item in data["song"]) {
					if(parseInt(item)<3){
						str += "<a href='/play?id=" + data["song"][item].mid
						+ "' target='_new' class='result-item'>";
				str += "<span class='rank'>" + (parseInt(item) + 1)
						+ "</span><span class='title'>"
						+ data["song"][item].mname + "</span>";
				str += "<span class='num'>" + data["song"][item].playsum
						+ "万</span></a>";	
					}
					
				}
				str += "<p style=' font-size:18px' >歌手</p>";
				for ( var item in data["songer"]) {
					if(parseInt(item)<3){
						str += "<a href='/searchBySname?sname="+encodeURI(encodeURI(data["songer"][item]))
						+ "'  class='result-item'>";
				str += "<span class='rank'>" + (parseInt(item) + 1)
						+ "</span><span class='title'>" + data["songer"][item]
						+ "</span>";
				str += "</a>";	
					}
					
				}
				strs = str;
			} else {
				var str = "";
				for ( var item in data["song"]) {
					if(parseInt(item)<6){
						str += "<a  class='result-item' href='play?id="
							+ data["song"][item].musicid + "' >";
					str += "<span class='rank'>" + (parseInt(item) + 1)
							+ "</span>";
					str += "<span class='title'>" + data["song"][item].title
							+ "</span> <span class='num'>"
							+ data["song"][item].playsum + "万</span></a>"	
					}				
				}
				strs = str;
			}
			/*strs += "<p style=' font-size:10px' >历史记录</p>";
				for(var item in data["history"]){
					strs +="<a href='/seacher?musicName="+encodeURI(encodeURI(data["songer"][item]))+"'>"+data["history"][item]+"</a>"
				}*/
			$("#searchBox").html(strs);
		}
	})

}


function searchNull(){
	  var input=document.getElementById("musicName");//通过id获取文本框对象
	        if(input.value==""){
	        	alert("搜索值不能为空!!!");
	        	return false;
	        }      
}











