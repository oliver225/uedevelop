// 定义文章当前浏览页数
var articlePage = 0;
// 定义问答当前浏览页数
var questionPage = 0;
// 定义当前我的收藏浏览页数
var collectPage = 0;
// 删除判断
var delStatus = "";
// 页面初始化方法
$(function(){
    // 初始化我的文章
    loadContent(articlePage,"article");
    // 初始化我的问答
    loadContent(questionPage,"question");
    // 初始化我的收藏
    loadCollect(collectPage);
    // 我的关注
    $.ajax({
        url: "/follower/owner-follow",
        type: "GET",
        dataType: "json",
        success: function (data) {
            var html = "";
            if(data.length != 0){
                for(var i=0;i<data.length;i++){
                    var tmp = data[i];
                    html+='<a href="#">\n' +
                        '  <img class="img-circle small-header" src="'+tmp.userAvatar+'">' +
                        '</a>';
                }
            }
            $("#ownerFollow").append(html);
        }
    });
    // 我的粉丝
    $.ajax({
        url: "/follower/owner-follower",
        type: "GET",
        dataType: "json",
        success: function (data) {
            var html = "";
            if(data.length != 0){
                for(var i=0;i<data.length;i++){
                    var tmp = data[i];
                    html+='<a href="#">\n' +
                        '  <img class="img-circle small-header" src="'+tmp.userAvatar+'">' +
                        '</a>';
                }
            }
            $("#ownerFollowers").append(html);
        }
    });
});

// 加载我的收藏
function loadCollect(page){
    if(page == 0){
        $("#collect").empty();
    }
    // 加载数据
    $.ajax({
        url: "/collect/find-owner-collect",
        type: "POST",
        dataType: "json",
        data: "userId=" + $("#userId").val() + "&contentPage=" + page,
        success: function (data) {
            var html = '';
            // 判断是否请求的第一页,并且没有数据
            if(data.length == 0&&page==0) {
                html += '<div class="col-md-12 text-center" style="font-size: 17px;padding: 30px 0px;">暂时没有数据</div>';
                $("#collect").empty();
                $("#collect").append(html);
                return;
            }
            for(var i=0;i<data.length;i++){
                var tmp = data[i].contentItem;
                var categoryName = data[i].categoryName;
                var preview = '<div class="panel panel-default article">' +
                    '    <div class="panel-body">' +
                    '        <a value="'+data[i].collectId+'" class="article-title" href="/detail?contentId='+ tmp.contentId +' ">' +
                    '            <h4>' + tmp.contentTitle +
                    '        </a>' +
                    '        <p style="font-size: 14px;padding: 5px 0px;">' + tmp.contentDesc + '</p>' +
                    '    </div>' +
                    '    <div class="panel-footer">' +
                    '        <div class="row">' +
                    '            <div class="col-md-8 display-none" style="margin-top: 4px;">' +
                    '                <a class="article-label-blue">' + categoryName +
                    '                </a>' +
                    '                <span class="article-label-gray">' +
                    '                <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> '+tmp.contentViewCnt +
                    '            </span>' +
                    '                <span class="article-label-gray">' +
                    '                <span class="glyphicon glyphicon-heart" aria-hidden="true"></span> '+tmp.contentCollectCnt +
                    '            </span>' +
                    '                <span class="article-label-gray">' +
                    '                <span class="glyphicon glyphicon-comment" aria-hidden="true"></span> '+tmp.contentCommentCnt +
                    '            </span>' +
                    '            </div>' +
                    '            <div class="col-md-4 text-right">' +
                    '                <a id="del-collect-btn" class="btn btn-danger btn-radius">取消收藏</a>' +
                    '            </div>' +
                    '        </div>' +
                    '    </div>' +
                    '</div>';
                html += preview;
            }
            // 判断当前是否加载到最后一页
            if(data.length == 10){
                html+='<div id="loadMoreCollectDiv" class="col-md-12 text-right">' +
                    '    <button id="loadMoreCollectBtn" class="btn btn-success" style="margin: 5px 0px 15px 0px;">' +
                    '        <span class="glyphicon glyphicon-repeat"></span>' +
                    '        加载更多' +
                    '    </button>' +
                    '</div>';
            }
            $("#collect").append(html);

        }
    });
}
// 加载更多收藏按钮点击事件
$("body").on("click","#loadMoreCollectBtn",function(){
    // 加载下一页
    collectPage++;
    // 从服务器加载
    loadCollect(collectPage);
});
// 定义加载内容的方法
function loadContent(page,type){
    if(page == 0 && type == "article"){
        $("#article").empty();
    }
    if(page == 0 && type == "question"){
        $("#question").empty();
    }
    // 判断内容类型
    if(type == "article"){
        // 移除加载文章按钮
        $("#loadMoreArticleDiv").remove();
    }else{
        // 移除加载问答按钮
        $("#loadMoreQuestionDiv").remove();
    }
    // 加载数据
    $.ajax({
        url:"/mine/find-owner-content-items",
        type:"GET",
        dataType:"json",
        data:"contentAuthor="+$("#userId").val()+"&contentPage="+page+"&contentType="+type,
        success:function(data){
            var html = '';
            // 判断是否请求的第一页,并且没有数据
            if(data.length == 0&&page==0){
                html+='<div class="col-md-12 text-center" style="font-size: 17px;padding: 30px 0px;">暂时没有数据</div>';
                if(type=="article"){
                    $("#article").empty();
                    $("#article").append(html);
                }else{
                    $("#question").empty();
                    $("#question").append(html);
                }
                return 0;
            }
            for(var i=0;i<data.length;i++){
                var tmp = data[i].contentItem;
                var categoryName = data[i].categoryName;
                var preview = '<div class="panel panel-default article">' +
                    '    <div class="panel-body">' +
                    '        <a value="'+tmp.contentId+'" class="article-title" href="/detail?contentId='+ tmp.contentId +' ">' +
                    '            <h4>' + tmp.contentTitle +
                    '        </a>' +
                    '        <p style="font-size: 14px;padding: 5px 0px;">' + tmp.contentDesc + '</p>' +
                    '    </div>' +
                    '    <div class="panel-footer">' +
                    '        <div class="row">' +
                    '            <div class="col-md-8 display-none" style="margin-top: 4px;">' +
                    '                <a class="article-label-blue">' + categoryName +
                    '                </a>' +
                    '                <span class="article-label-gray">' +
                    '                <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> '+tmp.contentViewCnt +
                    '            </span>' +
                    '                <span class="article-label-gray">' +
                    '                <span class="glyphicon glyphicon-heart" aria-hidden="true"></span> '+tmp.contentCollectCnt +
                    '            </span>' +
                    '                <span class="article-label-gray">' +
                    '                <span class="glyphicon glyphicon-comment" aria-hidden="true"></span> '+tmp.contentCommentCnt +
                    '            </span>' +
                    '            </div>' +
                    '            <div class="col-md-4 text-right">' +
                    '                <a href="/editor/update-editor?contentId='+tmp.contentId+'" class="btn btn-success btn-radius">编辑</a>' +
                    '                <a id="del-content-btn" class="btn btn-danger btn-radius">删除</a>' +
                    '            </div>' +
                    '        </div>' +
                    '    </div>' +
                    '</div>';
                html += preview;
            }
            // 判断类型
            if(type == "article"){
                // 判断当前是否加载到最后一页
                if(data.length == 10){
                    html+='<div id="loadMoreArticleDiv" class="col-md-12 text-right">' +
                        '    <button id="loadMoreArticleBtn" class="btn btn-success" style="margin: 5px 0px 15px 0px;">' +
                        '        <span class="glyphicon glyphicon-repeat"></span>' +
                        '        加载更多' +
                        '    </button>' +
                        '</div>';
                }
                $("#article").append(html);
            }else{
                // 判断当前是否加载到最后一页
                if(data.length == 10){
                    html+='<div id="loadMoreQuestionDiv" class="col-md-12 text-right">' +
                        '    <button id="loadMoreQuestionBtn" class="btn btn-success" style="margin: 5px 0px 15px 0px;">' +
                        '        <span class="glyphicon glyphicon-repeat"></span>' +
                        '        加载更多' +
                        '    </button>' +
                        '</div>';
                }
                $("#question").append(html);
            }
        }
    });
}
// 加载更多文章按钮点击事件
$("body").on("click","#loadMoreArticleBtn",function(){
    // 加载下一页
    articlePage++;
    // 从服务器加载
    loadContent(articlePage,"article");
});
// 加载更多问题按钮点击事件
$("body").on("click","#loadMoreQuestionBtn",function(){
    // 加载下一页
    questionPage++;
    // 从服务器加载
    loadContent(questionPage,"question");
});
// 删除收藏点击事件
$("body").on("click","#del-collect-btn",function(){
    $("#sureText").text("确定要取消收藏该内容吗?");
    delStatus = "collect";
    // 弹出确认删除提示框
    $("#delete-modal").modal('toggle');
    var v = $(this).parents('.panel-footer').siblings('.panel-body').find('a').attr('value');
    // 设置隐藏域的值
    $("#del-id").val(v);
    // 设置删除的div的id
    $(this).parents('.panel-footer').parent().attr('id','del-div');
});
// 删除内容点击事件
$("body").on("click","#del-content-btn",function(){
    $("#sureText").text("您确定要删除吗(您可以尝试重新编辑文章,删除文章会同时扣除掉您的积分)?");
    delStatus = "content";
    // 弹出确认删除提示框
    $("#delete-modal").modal('toggle');
    var v = $(this).parents('.panel-footer').siblings('.panel-body').find('a').attr('value');
    // 设置隐藏域的值
    $("#del-id").val(v);
    // 设置删除的div的id
    $(this).parents('.panel-footer').parent().attr('id','del-div');
});
// 确认删除点击事件
$("#sure-del-btn").click(function(){
    var v = $("#del-id").val();
    if(v!=-1){
        if(delStatus=="content"){
            $.ajax({
                url:"/mine/del-content",
                type:"GET",
                dataType:"json",
                data:"contentId="+v,
                success:function(data) {
                    if(data.status == 'RESPONSE_OK'){
                        $("#delete-modal").modal('toggle');
                        // 移除div
                        $("#del-div").remove();
                        // 判断响应的数据
                        if(data.data == "article"){
                            // 积分扣除
                            var point = $("#user-points").text();
                            $("#user-points").text(point-20);
                            // 文章数量扣除
                            var num = $("#article-num").text();
                            $("#article-num").text(num-1);
                        }else{
                            // 积分扣除
                            var point = $("#user-points").text();
                            $("#user-points").text(point-5);
                            // 问答数量扣除
                            var num = $("#question-num").text();
                            $("#question-num").text(num-1);
                        }

                    }else{
                        alert("删除失败")
                    }
                    $("#del-id").val(-1);
                }
            });
        }else{
            $.ajax({
                url:"/collect/cancel-collect",
                type:"GET",
                dataType:"json",
                data:"collectId="+v,
                success:function(data) {
                    if(data.status == 'RESPONSE_OK'){
                        $("#delete-modal").modal('toggle');
                        // 移除div
                        $("#del-div").remove();
                    }else{
                        alert("取消收藏失败");
                    }
                    $("#del-id").val(-1);
                }
            });
        }
    }
});
// 保存个人信息
$("#mine-update-user-btn").click(function(){
    $.ajax({
        url:"/mine/edit-user-info",
        type:"POST",
        dataType:"json",
        data:$("#edit-user-form").serialize(),
        success:function(data){
            if(data.status == 'RESPONSE_OK'){
                $("#userEmail").text($("#inputEmail").val());
                $("#userSignature").text($("#inputSignature").val());
                $("#edit-userinfo-modal").modal('toggle');
            }else{
                alert("用户信息更新失败,请联系管理员");
            }
        }
    });
});
