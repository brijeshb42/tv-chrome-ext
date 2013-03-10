tv.page = 2;

$(document).ready(function(){
    $("#todayList").html("");
    $(".showLink").live("mouseenter",function(){
        $(this).find('.overview').show();
    });
    $(".showLink").live("mouseleave",function(){
    	$(this).find('.overview').hide();
    });
    $("#addShow").click(function(){
        chrome.tabs.create({url:"background.html"});
        window.close();
    });
    tv.indexedDB.open();
});