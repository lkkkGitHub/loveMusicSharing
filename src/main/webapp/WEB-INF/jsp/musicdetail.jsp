<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="f"  %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<title>音乐详情</title>
		<meta charset="utf-8">
		<script type="text/javascript" async="" src="//wr.da.netease.com/ga.js"></script>
		<link rel="shortcut icon" href="/source/images/logo-b.png" />
		<link rel="stylesheet" type="text/css" href="/playmusic/css/playMusic.css">
		<link href="//s2.music.126.net/web/s/core_10d64aacd2e7ecff5b84bc1a4f0d256f.css?10d64aacd2e7ecff5b84bc1a4f0d256f" type="text/css" rel="stylesheet">
		<link href="//s2.music.126.net/web/s/pt_frame_cb90df5deb9e71bf7f9a7f1d407d3d32.css?cb90df5deb9e71bf7f9a7f1d407d3d32" type="text/css" rel="stylesheet">
		<script type="text/javascript" src="/playmusic/js/jquery-1.10.2.js"></script>
		<script type="text/javascript" charset="UTF-8" src="/playmusic/js/musicDetail.js"></script>
		<style>
			a:hover{
				text-decoration: none;
			}
		</style>
		<script>
			var loginId = '${sessionScope.user.uid}';
			var musicId = '${music.mid}';
		</script>
	</head>
	<body>
		<div class="top">
			<a style="display: inline-block;cursor: pointer;margin-top: 5px;margin-left: 20px;font-size: 32px;color: #FFF;" href="/index">爱唱音乐</a>
			<div class="mainNav" style="margin-top: 0px;">
				<div id="nameicon" class="center_header" style="margin-left:60px;margin-right:10px;float:left;">
        			<a href="/personal" target="_blank">
                           	<img src="${sessionScope.imgstr}"/>
        			</a>
        		</div>
		         <div id="name" style="padding-top:21px;">
		         	<a href="/personal" style="cursor:pointer;color:#fff" target="_blank" >${username}</a>
		         </div>
			</div>
		</div>
		<div class="g-bd4 f-cb" style="margin-top: 56px;">
			<div class="g-mn4">
				<div class="g-mn4c">
					<div class="g-wrap6">
						<div class="m-lycifo">
							<div class="f-cb">
								<div class="cvrwrap f-cb f-pr">
									<div class="u-cover u-cover-6 f-fl">
										<!-- 歌曲图片 -->
										<img src="${music.image }" class="j-img">
										<span class="msk f-alpha"></span>
									</div>
								</div>
								<div class="cnt">
									<div class="hd">
										<i class="lab u-icn u-icn-37"></i>
										<div class="tit">
											<!-- 歌曲名 -->
											<em class="f-ff2">${music.mname }</em>
										</div>
									</div>
									<p class="des s-fc4">歌手：<span >${music.sname }</span></p>
									<div class="m-info">
										<div id="content-operation" class="btns f-cb">
											<a href="/play?id=${music.mid}" target="_blank" class="u-btn2 u-btn2-2 u-btni-addply f-fl"  title="播放"><i><em class="ply"></em>播放</i></a>
											<a class="u-btni u-btni-fav " href="javascript:showList();">
												<i>添加到歌单</i>
											</a>
											<a class="u-btni u-btni-dl " onclick="musicdown('${music.fileurl}')"><i>下载</i></a>
											<a href="#commentList" class="u-btni u-btni-cmmt "><i>(<span id="cnt_comment_count">${counts}</span>)</i></a>
										</div>
									</div>
									<div class="songSingleChoose" style="margin-top: -15px;margin-left: 66px;">
									    <div class="inner-container"> 
											<ul class="menuUL3" style="width:120px;height:200px;">
												<c:forEach items="${mylist}" var="ite" varStatus="ind">
													<li class="menuLi3 cur">
														<a class="beijing" single="${ite.mlid}" onclick="addList(this)">
													 		<i class="icon isplay2"></i>${ite.name}
													 	</a>
													</li>
												</c:forEach>
											</ul>
									   </div>
									</div>
									<div id="lyric-content" class="bd bd-open f-brk f-ib" >${lrc}</div>
								</div>
							</div>
						</div>
						
						<!--评论块-->
						<div class="n-cmt" id="comment-box" >
							<div id="auto-id-U98sFDT6iBe13DBo">
								<div class="u-title u-title-1">
									<h3><span class="f-ff2">评论</span></h3><span class="sub s-fc3">共<span class="j-flag" id="count">${counts}</span>条评论</span>
								</div>
								<div class="m-cmmt">
									<div class="iptarea">
										<!--用户头像，没有的话使用默认头像-->
										<div class="head">
	                                           <img src="${sessionScope.imgstr}"/>
										</div>
										<div class="j-flag" id="commentList">
											<div>
												<div class="m-cmmtipt f-cb f-pr">
													<div class="u-txtwrap holder-parent f-pr" style="display: block;">
															<textarea class="u-txt area j-flag"  placeholder="评论" id="content"></textarea>
													</div>
													<div class="btns f-cb f-pr">
														<c:choose>
															 <c:when test="${sessionScope.user==null}">
															 	<a class="btn u-btn u-btn-1 j-flag" id="comment" onclick="submit1()">评论</a>
															 </c:when>
															 <c:otherwise>
															 	<a class="btn u-btn u-btn-1 j-flag" id="comment" onclick="submit1()">评论</a>
															 </c:otherwise>
														</c:choose>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div id="jcpl">
										<c:if test="${top10!=null and top10.size()>0}">
											<div class="cmmts j-flag" >
												<h3 class="u-hd4">精彩评论</h3>
												<c:forEach items="${top10}" var="ite" varStatus="ind">
													<div  class="itm" >
														<div class="head">
															<a href="/User/personalInfo?uid=${ ite.user.uid}">
																<img src="${ ite.user.image}">
															</a>
														</div>
														<div class="cntwrap">
															<div class="">
																<div class="cnt f-brk"><a href="/User/personalInfo?uid=${ ite.user.uid}" class="s-fc7">${ ite.user.uname}</a>：${ ite.content }</div>
															</div>
															<div class="rp">
																<div class="time s-fc4"><f:formatDate value="${ite.cdate}" pattern="yyyy-MM-dd"/></div>
																<a onclick="dianzan(${ite.cdid})">
																	<i class="zan u-icn2 u-icn2-12"></i> (${ite.likesum })
																</a>
																<span class="sep">|</span>
																<a class="s-fc3" onclick="showReplay('jcpl${ind.index}')" >回复</a>
																<c:choose>
																	<c:when test="${sessionScope.user != null and sessionScope.user.uid==ite.user.uid}">
																	<span class="sep">|</span>
																		<a class="s-fc3" onclick="deleteComment(${ite.cdid})">删除</a>
																	</c:when>
																</c:choose>
															</div>
														</div>
													</div>
													<div id="jcpl${ind.index}" style="display:none;">
														<div>
															<div class="rept m-quk m-quk-1 f-pr">
																<div class="iner">
																	<div class="corr u-arr u-arr-1">
																		<em class="arrline">◆</em>
																		<span class="arrclr">◆</span>
																	</div>
																	<div class="m-cmmtipt m-cmmtipt-1 f-cb f-pr">
																		<div class="u-txtwrap holder-parent f-pr j-wrap" style="display: block;">
																			<textarea class="u-txt area j-flag" id="zxpl${ite.cdid}" placeholder="回复${ite.user.uname}" style="overflow: hidden;">回复${ite.user.uname}:</textarea>
																		</div>
																		<div class="btns f-cb f-pr">
																			<a class="btn u-btn u-btn-1 j-flag" rpid="${ite.cdid}" onclick="replay(this,'#zxpl${ite.cdid}')">回复</a>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</c:forEach>
											</div><br/><br/>
										</c:if>
									</div>
									<div class="cmmts j-flag" >
										<h3 class="u-hd4">最新评论</h3>
										<div id="zxpl">
											<c:if test="${comments==null or comments.size()==0 }">
												<div class="itm">暂无评论</div>
											</c:if>
											<c:forEach items="${comments}" var="ite" varStatus="ind">
												<div class="itm" >
														<div class="head">
															<a href="/User/personalInfo?uid=${ite.user.uid}">
																<img src="${ ite.user.image}">
															</a>
														</div>
														<div class="cntwrap">
															<div class="">
																<div class="cnt f-brk"><a href="/User/personalInfo?uid=${ ite.user.uid}" class="s-fc7">${ite.user.uname}</a>：${ ite.content }</div>
															</div>
															<div class="rp">
																<div class="time s-fc4"><f:formatDate value="${ite.cdate}" pattern="yyyy-MM-dd"/></div>
																<a onclick="dianzan(${ite.cdid})">
																	<i class="zan u-icn2 u-icn2-12"></i> (${ite.likesum })
																</a>
																<span class="sep">|</span>
																<a class="s-fc3" onclick="showReplay('zxpl${ind.index}')">回复</a>
																<c:choose>
																	<c:when test="${sessionScope.user != null and sessionScope.user.uid==ite.user.uid}">
																		<span class="sep">|</span>
																		<a class="s-fc3" onclick="deleteComment(${ite.cdid})">删除</a>
                                                                 </c:when>
																</c:choose>
															</div>
														</div>
													</div>`
												<div id="zxpl${ind.index}" style="display:none;">
													<div>
														<div class="rept m-quk m-quk-1 f-pr">
															<div class="iner">
																<div class="corr u-arr u-arr-1">
																	<em class="arrline">◆</em>
																	<span class="arrclr">◆</span>
																</div>
																<div class="m-cmmtipt m-cmmtipt-1 f-cb f-pr">
																	<div class="u-txtwrap holder-parent f-pr j-wrap" style="display: block;">
																		<textarea class="u-txt area j-flag" id="zxpl${ite.cdid}" placeholder="回复${ite.user.uname}" style="overflow: hidden;">回复${ite.user.uname}:</textarea>
																	</div>
																	<div class="btns f-cb f-pr">
																		<a class="btn u-btn u-btn-1 j-flag" rpid="${ite.cdid}" onclick="replay(this, '#zxpl${ite.cdid}')">回复</a>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</c:forEach>
										</div>
									</div>
									<!--分页插件-->
									<c:if test="${comments!=null and comments.size()!=0 }">
										<div class="j-flag">
											<div class="u-page" id="pageinfo">
												<a class="zbtn zprv js-disabled">上一页</a>
												<c:forEach begin="1" end="${page}" var="ite" varStatus="ind">
													<c:choose>
														<c:when test="${ite==1}">
															<a class="zpgi zpg9 js-selected">${ite}</a>
														</c:when>
														<c:otherwise>
															<a class="zpgi zpg9" onclick="goPage(${ite})">${ite}</a>
														</c:otherwise>
													</c:choose>
												</c:forEach>
												<c:if test="${page>5}">
													<span class="zdot">...</span>
													<a class="zpgi zpg9" onclick="goPage(${page})">${page}</a>
												</c:if>
												<c:choose>
													<c:when test="${page>1}">
														<a class="zbtn znxt" onclick="goPage(1)">下一页</a>
													</c:when>
													<c:otherwise>
														<a class="zbtn znxt js-disabled">下一页</a>
													</c:otherwise>
												</c:choose>
											</div>
										</div>
									</c:if>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>