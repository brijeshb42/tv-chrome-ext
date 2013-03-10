tv.page = 3;

$(document).ready(function(){
    $("#upcomingList").html("");

    $(".deleteShow").live("click",function(){
        var id = $(this).data("show");
        console.log(id);
        bootbox.confirm("Delete show ?",function(r){
            if(r){
                tv.indexedDB.deleteShow(id);
            }
        });
    });

    $(".updateEpi").live("click",function(){
        var id = $(this).data("id");
        var show = $(this).data("show");
        tv.network.updateEpisode(id,show);
        return false;
    });
    tv.indexedDB.open();
});