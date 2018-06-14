// 定义文章当前浏览页数
var articlePage = 0;
// 定义问答当前浏览页数
var questionPage = 0;
// 页面初始化方法
$(function(){
    // 初始化文章
    loadContent(articlePage,"article");
    // 初始化问答
    loadContent(questionPage,"question");
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
        url:"/content/find-contents-by-category",
        type:"GET",
        dataType:"json",
        data:"contentCategory="+$("#categoryId").val()+"&contentPage="+page+"&contentType="+type,
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