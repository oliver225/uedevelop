// 保存内容信息
$("#submitBtn").click(function(){
    // 判断标题是否为空
    if($("#contentTitle").val().length == 0){
        alert("标题不能为空");
        return;
    }
    // 提交表单
    $("#editor-from").submit();
});
// 更新内容信息
$("#submitUpdateBtn").click(function(){
    // 判断标题是否为空
    if($("#contentTitle").val().length == 0){
        alert("标题不能为空");
        return;
    }
    // 提交表单
    $("#editor-from").submit();
});