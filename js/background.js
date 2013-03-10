window.indexedDB 		= window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction   = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange 		= window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;


var tv = {};
tv.indexedDB = {};
var DB = "tv_man";
var DB_show = "tv_shows";
var DB_epi = "tv_episodes";
var DB_img = "tv_images";

tv.indexedDB.db = null;

tv.indexedDB.open = function(){
	var version = 2;
	var request = indexedDB.open(DB,version);

	request.onupgradeneeded = function(e){
		var db = e.target.result;
		e.target.transaction.onerror = function(){
			console.log("Transaction error.");
		};
		if(db.objectStoreNames.contains(DB)){
			db.deleteObjectStore(DB);
		}
		var store = db.createObjectStore(DB_show,{keyPath:"showid"});
		store.createIndex("name","name",{unique:false});
		store.createIndex("day","day",{unique:false});
		store.createIndex("deleted","deleted",{unique:false});
		var store2 = db.createObjectStore(DB_epi,{keyPath:"episodeID"});
		store2.createIndex("showid","showid",{unique:false});
		store2.createIndex("airdate","airdate",{unique:false});
		store2.createIndex("season","season",{unique:false});
		store2.createIndex("episode","episode",{unique:false});
		var store3 = db.createObjectStore(DB_img,{keyPath:"showid"});
	};

	request.onsuccess = function(e){
		tv.indexedDB.db = e.target.result;
		tv.indexedDB.getTodayCount();
	};

	request.onerror = function(){
		console.log("Error opening db.");
	};
};

tv.indexedDB.getTodayCount = function(){
	var db = tv.indexedDB.db;
	var trans = db.transaction([DB_epi],"readwrite");
	var store = trans.objectStore(DB_epi);
	var date = "";
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();
	if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm}
		date = yyyy+'-'+mm+'-'+dd;
	console.log(date);
	var index = store.index("airdate");
	var singleKeyRange = IDBKeyRange.only(date);
	var req = index.count(singleKeyRange);
	req.onsuccess = function(e){
		var count = e.target.result;
		var c = count.toString();
		chrome.browserAction.setBadgeText({text:c});
		console.log(count);
	};
};

tv.indexedDB.open();