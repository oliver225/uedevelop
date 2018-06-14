// 文档加载完毕
$(function(){
    $.ajax({
        url:"/collect/is-collect",
        type:"GET",
        dataType:"json",
        data:"contentId="+$("#contentId").val(),
        success:function(data){
            if(data.status == 'RESPONSE_OK'){
                $("#collectBtn span").text("已收藏");
                $("#collectBtn").attr("disabled","disabled");
            }
        }
    });
    $.ajax({
        url:"/follower/is-follow",
        type:"GET",
        dataType:"json",
        data:"followerId="+$("#userA").attr("value"),
        success:function(data){
            if(data.status == 'RESPONSE_OK'){
                $("#followBtn span").text("已关注");
                $("#followBtn").attr("disabled","disabled");
            }
        }
    });
})
// 收藏按钮点击事件
$("#collectBtn").click(function() {
    $.ajax({
        url:"/collect/collect",
        type:"POST",
        dataType:"json",
        data:"contentId="+$("#contentId").val(),
        success:function(data){
            if(data.status == 'RESPONSE_OK'){
                $("#collectBtn span").text("已收藏");
                $("#collectBtn").attr("disabled","disabled");
                $("#collectNum").text(parseInt($("#collectNum").text())+1);
            }else{
                alert(data.msg);
            }
        }
    });
});

// 关注按钮点击事件
$("#followBtn").click(function() {
    $.ajax({
        url:"/follower/follow",
        type:"GET",
        dataType:"json",
        data:"followerId="+$("#userA").attr("value"),
        success:function(data){
            if(data.status == 'RESPONSE_OK'){
                $("#followBtn span").text("已关注");
                $("#followBtn").attr("disabled","disabled");
            }else{
                alert("关注失败!");
            }
        }
    });
});

// 提交评论按钮点击事件
$("#submit_comment").click(function() {
    var contentId = $("#contentId").attr("value");
    var contentAuthor = $("#contentAuthor").attr("value");
    var commentContent = $("#comment_content").val();
    var commentId = $(this).val();
    $.ajax({
        url:"/comment/add",
        type:"POST",
        dataType:"json",
        data:{"contentId":contentId,"contentAuthor":contentAuthor,"commentContent":commentContent,"commentType":"TO_CONTENT","commentParentId":commentId},
        success:function(data){

        }
    });
});
//回复按钮点击事件
$(".comment-reply-button").click(function () {
    $(".comment-reply-content").css("display","none");
    $(".comment-reply-button").css("display","block");
    $(this).next("div").css("display","block");
    $(this).css("display","none");
});
//提交回复内容
$(".submit_reply_content").click(function () {
    var contentId = $("#contentId").attr("value");
    var contentAuthor = $(this).attr("value");
    var commentContent = $(this).prev().val();
    var commentId = $(this).next().val();
    $.ajax({
        url:"/comment/add",
        type:"POST",
        dataType:"json",
        data:{"contentId":contentId,"contentAuthor":contentAuthor,"commentContent":commentContent,"commentType":"TO_PERSON","commentParentId":commentId},
        success:function(data){
            $(".comment-reply-button").next("div").css("display","none");
        }
    });
});
//取消回复
$(".qu_submit").click(function () {
    $(".comment-reply-content").css("display","none");
    $(".comment-reply-button").css("display","block");
});