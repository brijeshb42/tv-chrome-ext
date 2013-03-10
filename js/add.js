tv.page = 2;

$(document).ready(function(){
    $("#seriesname").focus();
    tv.indexedDB.open();
    $("#searchForm").submit(function(){
        $("#loadingBar").show();
        var a = $("#seriesname").val();
        if(a==""){
            $("#loadingBar").hide();
            bootbox.alert("Enter a show name.",function(){
                $("#seriesname").focus();
            });
            return false;
        }
        $("#searchList").html("");
        $("#searchHeading").html("<span class='icon icon-search'></span>&nbsp;Searching for "+a);
        $("#searchHeading").show();
        $("#searchResult").show();
        tv.network.searchShow(a);
        return false;
    });

    $(".showLink").live("click",function(){
        return false;
    });

    $(".addShowBtn").live("click", function(event){
        $("#loadingBar").show();
        tv.network.getShow($(this).data("id"));
    });

    $("#clear").click(function(){
        $("#seriesname").val("");
        $("#searchList").html("");
        $("#seriesname").focus();
        $("#searchHeading").hide();
    });
});