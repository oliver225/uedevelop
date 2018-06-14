// 定义热门文章当前浏览页数
var articleHotPage = 0;
// 定义最新文章当前浏览页数
var articleNewPage = 0;
// 定义热门问题当前浏览页数
var questionHotPage = 0;
// 定义未解答问题当前浏览页数
var questionNoPage = 0;
// 页面初始化方法
$(function(){
    // 初始化热门文章
    loadContent("/content/find-hot-contents",articleHotPage,"hot");
    // 初始化最新文章
    loadContent("/content/find-new-contents",articleNewPage,"new");
    // 初始化热门问题
    loadContent("/content/find-hot-questions",questionHotPage,"hot-question");
    // 初始化未解答问题
    loadContent("/content/find-no-questions",questionNoPage,"no-question");
});
// 定义加载内容的方法
function loadContent(url,page,type){
    // 提前清空加载内容
    if(page == 0 && type == "hot"){
        $("#hot").empty();
    }
    if(page == 0 && type == "new"){
        $("#new").empty();
    }
    if(page == 0 && type == "hot-question"){
        $("#hot-question").empty();
    }
    if(page == 0 && type == "no-question"){
        $("#no-question").empty();
    }
    // 移除加载按钮
    if(type == "hot"){
        $("#loadMoreHotArticleBtn").remove();
    }
    if(type == "new"){
        $("#loadMoreNewArticleBtn").remove();
    }
    if(type == "hot-question"){
        $("#loadMoreHotQuestionBtn").remove();
    }
    if(type == "no-question"){
        $("#loadMoreNoQuestionBtn").remove();
    }
    // 加载数据
    $.ajax({
        url:url,
        type:"GET",
        dataType:"json",
        data:"contentPage="+page,
        success:function(data){
            var html = '';
            // 判断是否请求的第一页,并且没有数据
            if(data.length == 0&&page==0){
                html+='<div class="col-md-12 text-center" style="font-size: 17px;padding: 30px 0px;">暂时没有数据</div>';
                if(type=="hot"){
                    $("#hot").empty();
                    $("#hot").append(html);
                }
                if(type=="hot-question"){
                    $("#hot-question").empty();
                    $("#hot-question").append(html);
                }
                if(type=="new"){
                    $("#new").empty();
                    $("#new").append(html);
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
                    '            <div class="col-md-4 text-right author-info-item">' +
                    '                <a class="author-info-thumb" href="#">' +
                    '                    <img class="author-header-thumb img-circle" src="'+data[i].userAvatar+'"> '+ data[i].userNickname +
                    '                </a>' +
                    '                ·<span>'+ tmp.contentUpdateDate +'</span>' +
                    '            </div>' +
                    '        </div>' +
                    '    </div>' +
                    '</div>';
                html += preview;
            }
            // 判断类型
            if(type == "hot"){
                // 判断当前是否加载到最后一页
                if(data.length == 10){
                    html+='<div class="col-md-12 text-right">' +
                        '    <button id="loadMoreHotArticleBtn" class="btn btn-success" style="margin: 5px 0px 15px 0px;">' +
                        '        <span class="glyphicon glyphicon-repeat"></span>' +
                        '        加载更多' +
                        '    </button>' +
                        '</div>';
                }
                $("#hot").append(html);
            }
            if(type == "new"){
                // 判断当前是否加载到最后一页
                if(data.length == 10){
                    html+='<div class="col-md-12 text-right">' +
                        '    <button id="loadMoreNewArticleBtn" class="btn btn-success" style="margin: 5px 0px 15px 0px;">' +
                        '        <span class="glyphicon glyphicon-repeat"></span>' +
                        '        加载更多' +
                        '    </button>' +
                        '</div>';
                }
                $("#new").append(html);
            }
            if(type == "hot-question"){
                // 判断当前是否加载到最后一页
                if(data.length == 10){
                    html+='<div class="col-md-12 text-right">' +
                        '    <button id="loadMoreHotQuestionBtn" class="btn btn-success" style="margin: 5px 0px 15px 0px;">' +
                        '        <span class="glyphicon glyphicon-repeat"></span>' +
                        '        加载更多' +
                        '    </button>' +
                        '</div>';
                }
                $("#hot-question").append(html);
            }
            if(type == "no-question"){
                // 判断当前是否加载到最后一页
                if(data.length == 10){
                    html+='<div class="col-md-12 text-right">' +
                        '    <button id="loadMoreNoQuestionBtn" class="btn btn-success" style="margin: 5px 0px 15px 0px;">' +
                        '        <span class="glyphicon glyphicon-repeat"></span>' +
                        '        加载更多' +
                        '    </button>' +
                        '</div>';
                }
                $("#no-question").append(html);
            }
        }
    });
}
// 加载更多热门文章按钮点击事件
$("body").on("click","#loadMoreHotArticleBtn",function(){
    // 加载下一页
    articleHotPage++;
    // 从服务器加载
    loadContent("/content/find-hot-contents",articleHotPage,"hot");
});
// 加载更多最新文章按钮点击事件
$("body").on("click","#loadMoreNewArticleBtn",function(){
    // 加载下一页
    articleNewPage++;
    // 从服务器加载
    loadContent("/content/find-new-contents",articleNewPage,"new");
});
// 加载更多热门问题按钮点击事件
$("body").on("click","#loadMoreHotQuestionBtn",function(){
    // 加载下一页
    questionHotPage++;
    // 从服务器加载
    loadContent("/content/find-hot-questions",questionHotPage,"hot-question");
});
// 加载更多未解答问题按钮点击事件
$("body").on("click","#loadMoreNoQuestionBtn",function(){
    // 加载下一页
    questionNoPage++;
    // 从服务器加载
    loadContent("/content/find-no-questions",questionNoPage,"no-question");
});