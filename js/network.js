urls = {
	proxy : "http://b2-apps.appspot.com/",
	api : "www.thetvdb.com/api/",
	id : "C973590B1E212580",
	banner : "www.thetvdb.com/banners/",
	search : "GetSeries.php",
	update : "https://dl.dropbox.com/u/51320501/tv-version.json"
}

tv.network = {};
tv.status = 0;
tv.network.searchShow = function(showName){
	var u = urls.proxy+urls.api+urls.search;
    $.get(u,{seriesname:showName},tv.ui.showSearchList);
};

tv.network.getShow = function(id){
	var u = urls.proxy+urls.api+urls.id+"/series/"+id+"/en.xml";
	window.addEventListener("beforeunload",tv.network.progressError,false);
	$.get(u,tv.ui.addShow);
}

tv.network.getEpisodes = function(id){
	var u = urls.proxy+urls.api+urls.id+"/series/"+id+"/all/en.xml";
	$.get(u,tv.ui.addEpisodes);
};

tv.network.updateEpisode = function(id,show){
	var u = urls.proxy+urls.api+urls.id+"/episodes/"+id+"/en.xml";
	//console.log(u);
$.get(u,function(data){
	var epi = {};
	$(data).find("Episode").each(function(){
		epi.name = $(this).find("EpisodeName").text();
		epi.showname = show;
		epi.showid = $(this).find("seriesid").text();
		epi.episodeID = $(this).find("id").text();
		epi.overview = $(this).find("Overview").text();
		epi.guestStars = $(this).find("GuestStars").text();
		epi.airdate = $(this).find("FirstAired").text();
		epi.season = $(this).find("SeasonNumber").text();
		epi.episode = $(this).find("EpisodeNumber").text();
		epi.lastUpdated = $(this).find("lastupdated").text();
	});
	tv.indexedDB.updateEpisode(epi);
});
};

tv.network.error = function(e){
	bootbox.alert("Error while searching.");
};

tv.network.progressError = function(){
	return "File download in progress.";
};

tv.network.getPoster = function(show){
	var u = urls.proxy+urls.banner+show.poster;
	var img = new Image();
	img.addEventListener("load",function(e){
		window.removeEventListener("beforeunload",tv.network.progressError,false);
		var dataUrl = tv.ui.getDataUrl(img);
		var s = {};
		s.showid = show.showid;
		s.poster = dataUrl;
		tv.indexedDB.savePoster(s);
		$("#loadingBar").hide();
	})
	img.src = u;
};