$(document).ready(function(){
    $(".showLink").mouseenter(function(){
        $(this).find('.overview').show();
    });
    $(".showLink").mouseleave(function(){
    	$(this).find('.overview').hide();
    });
    $("#addShow").click(function(){
        
    });
    tv.indexedDB.open();
});