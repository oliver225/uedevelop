$(function () {
    var swiper = new Swiper('.swiper-container',{

            autoplay: 4000,
            autoplayDisableOnInteraction: false
    });
    $('#myTabs a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    })
})
