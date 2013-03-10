tv.ui = {};

tv.ui.formatDate =  function(date){
		if(date==null || date==undefined || date.length<10){
			return "Not specified";
		}
		var d = date.split('-');
		var dt = d[2]+'-'+d[1]+'-'+d[0];
		return dt;
};

tv.ui.showSearchList = function(data){
	$("#searchList").html("");
	$("#searchHeading").html("Search Complete")
	if($(data).find("Series").length<1){
		$("#loadingBar").hide();
		$("#searchList").html('<li class="alert alert-warning"><h2>Nothing found</h2></li>');
		$("#searchList").show();
		return;
	}
	$(data).find("Series").each(function(){
		var  li = '<li class="showInfo" data-val="'+$(this).find("seriesid").text()+'">'+
            '<a class="showLink" href="#">'+
              '<h4>'+$(this).find("SeriesName").text()+'</h4>'+
              '<h6>First Aired:&nbsp;'+tv.ui.formatDate($(this).find("FirstAired").text())+'</h6>'+
              '<p class="overview">'+$(this).find("Overview").text()+'</p>'+
              '<button data-id="'+$(this).find("seriesid").text()+'" class="addShowBtn btn btn-mini btn-info">Add Show</button>'+
            '</a></li>';
        $("#searchList").append(li);
	});
	$("#loadingBar").hide();
	$("#searchList").show();
};

tv.ui.renderShows = function(data){
	if(data===0){
		var div = '<div class="span4"></div><div class="span4"><p>You have not added any show yet.</p>'+
		'<a class="btn btn-large btn-info" href="add.html">Add Now</a></div><div class="span4"></div>';
		$("#showHomeList").append(div);
		return;
	}
    var div = '<div class="shows span12" id="'+data.showid+'">'+
      		'<div class="thumbnail">'+
      			'<div class="row-fluid">'+
              '<div class="span2">'+
                '<img class="img-polaroid" id="img-'+data.showid+'" src="">'+
              '</div>'+
              '<div class="span10">'+
                '<div class="caption">'+
              	'<div class="btn-group pull-left">'+
                '<button title="Options" class="btn btn-mini dropdown-toggle" data-toggle="dropdown"><span class="caret"</span></button>'+
                '<ul class="dropdown-menu">'+
                  '<!--<li><a href="#" data-show="'+data.showid+'" class="fullInfo"><span class="icon icon-th-list"></span>&nbsp;Full Info</a></li>'+
                  '<li><a href="#" data-show="'+data.showid+'" class="reUpdate"><span class="icon icon-refresh"></span>&nbsp;Re Update</a></li>-->'+
                  '<li><a href="#" data-show="'+data.showid+'" class="deleteShow"><span class="icon icon-trash"></span>&nbsp;Delete Show</a></li>'+
                '</ul>'+
              	'</div>'+
              	'<p class="label label-info pull-right">'+data.day+'&nbsp;'+data.time+'</p>'+
              	'<h3>'+data.name+'</h3>'+
              	'<p class="overview">'+data.overview+'</p>'+
            	'</div>'+
              '</div>'+
            '</div>'+
      		'</div>'+
      	'</div>';
    $("#showHomeList").append(div);
};


tv.ui.renderImg = function(img){
	$("#img-"+img.showid).attr("src",img.poster);
};


tv.ui.addShow = function(data){
	var show = {};
	$(data).find("Series").each(function(){
		show.name = $(this).find("SeriesName").text();
		show.showid = $(this).find("id").text();
		show.overview = $(this).find("Overview").text();
		show.actors = $(this).find("Actors").text();
		show.day = $(this).find("Airs_DayOfWeek").text();
		show.time = $(this).find("Airs_Time").text();
		show.firstAired = $(this).find("FirstAired").text();
		show.genre = $(this).find("Genre").text();
		show.imdbid = $(this).find("IMDB_ID").text();
		show.rating = $(this).find("Rating").text();
		show.status = $(this).find("Status").text();
		show.banner = $(this).find("banner").text();
		show.fanart = $(this).find("fanart").text();
		show.poster = $(this).find("poster").text();
		show.lastUpdated = $(this).find("lastupdated").text();
		show.deleted = 0;
	});
	//console.log(show);
	tv.indexedDB.addShow(show);
};

tv.ui.addEpisodes = function(data){
	var show = {};
	$(data).find("Series").each(function(){
		show.showid = $(this).find("id").text();
		show.poster = $(this).find("poster").text();
		show.name = $(this).find("SeriesName").text();
	});
	var episodes = [];
	$(data).find("Episode").each(function(){
		var epi = {};
		epi.name = $(this).find("EpisodeName").text();
		epi.showname = show.name;
		epi.showid = $(this).find("seriesid").text();
		epi.episodeID = $(this).find("id").text();
		epi.overview = $(this).find("Overview").text();
		epi.guestStars = $(this).find("GuestStars").text();
		epi.airdate = $(this).find("FirstAired").text();
		epi.season = $(this).find("SeasonNumber").text();
		epi.episode = $(this).find("EpisodeNumber").text();
		epi.lastUpdated = $(this).find("lastupdated").text();
		episodes.push(epi);
	});
	tv.indexedDB.addEpisodes(episodes,show);
};

tv.ui.renderHome = function(){
	$("#showHomeList").html("");
	tv.indexedDB.getAllShows();
};

tv.ui.getDataUrl = function(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/jpeg");
    //return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    return dataURL;
};

tv.ui.renderPopup = function(episode){
	if(episode==0){
		var li = '<li class="showInfo"><a class="showLink" href="#"><h4>No Show Today</h4></a></li>';
    	$("#todayList").html(li);
    	return;
	}
	if(episode.season<10){
		episode.season='0'+episode.season;
	}
	if(episode.episode<10){
		episode.episode='0'+episode.episode;
	}
	var li = '<li class="showInfo" id="'+episode.episodeID+'">'+
            '<a class="showLink" href="#'+episode.episodeID+'">'+
              '<h4>'+episode.showname+'</h4>'+'<h6>'+episode.name+'&nbsp;(s'+episode.season+'e'+episode.episode+')</h6>'+
              '<p class="overview">'+episode.overview+'</p>'+
            '</a>'+
          '</li>';
    $("#todayList").append(li);
};

tv.ui.renderUpcoming = function(epi){
	if(epi.season<10)
		epi.season = '0'+epi.season;
	if(epi.episode<10)
		epi.episode = '0'+epi.episode;
	if(epi.name.toLowerCase()=="tba" || epi.name=="")
		epi.name == 'To Be Announced';
	if(epi.overview.toLowerCase()=="tba" || epi.overview=="")
		epi.overview == 'To Be Announced';
	var div = '<div class="upcoming span12" id="'+epi.episodeID+'">'+
      		'<div class="thumbnail">'+
      			'<div class="caption">'+
              '<p class="pull-right">s<b>'+epi.season+'</b>e<b>'+epi.episode+'</b>&nbsp;&nbsp;----&nbsp;<b>'+tv.ui.formatDate(epi.airdate)+'</b></p>'+
      				'<h3>'+epi.showname+'</h3>'+
              '<p><b>'+epi.name+'</b><a href="#" class="updateEpi btn btn-mini btn-inverse pull-right" data-show="'+epi.showname+'" data-id="'+epi.episodeID+'">Update Info</a></p>'+
      				'<p>'+epi.overview+'</p>'+
      			'</div>'+
      		'</div>'+
      	'</div>';
     $("#upcomingList").append(div);
};

tv.ui.getDate = function(d){
	if(d==null){
		d=0;
	}
	var yDate = "";
	var yest = new Date();
	yest.setDate(yest.getDate()+d);
	var dd = yest.getDate();
	var mm = yest.getMonth()+1;
	var yyyy = yest.getFullYear();
	if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm}
		yDate = yyyy+'-'+mm+'-'+dd;
	return yDate;
};