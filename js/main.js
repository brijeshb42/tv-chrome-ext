tv.page = 1;

$(document).ready(function(){
    $(".deleteShow").live("click",function(){
        var id = $(this).data("show");
        console.log(id);
        bootbox.confirm("Delete show ?",function(r){
            if(r){
                tv.indexedDB.deleteShow(id);
            }
        });
    });
    tv.indexedDB.open();
});