try {	
	var kw_logger = {};
	kw_logger.oldConsoleLog = null;
	kw_logger.enableLogger =  function() {
		console.log("[AsyncAdsetup] ENABLING CONSOLE");
		if(kw_logger.oldConsoleLog == null) {
			return;
		} else {
			window['console']['log'] = kw_logger.oldConsoleLog;
		};
	}
	kw_logger.disableLogger = function() {
		console.log("[AsyncAdsetup] DISABLING CONSOLE");
		kw_logger.oldConsoleLog = console.log;
		window['console']['log'] = function() {};
	};
	// Check Cookie
	var kw_kwdebugCookie = false;
	for(var a in document.cookie.split("; ")) {
		if(document.cookie.split("; ")[a].split("=")[0] == "kwdebug" && document.cookie.split("; ")[a].split("=")[1] === "true") {
			kw_kwdebugCookie = true;
			break;
		}
	}
	if(window.location.href.toString().indexOf("kwdebug=true") > -1 || kw_kwdebugCookie === true) { 
		kw_logger.enableLogger();
	} else {
		kw_logger.disableLogger();
	}
} catch(e) {
	console.log("[AsyncAdsetup] ERROR DISABLING CONSOLE", e);
}
var cookie_handler = {
    "setCookie": function (name, value, days, path) {
		if(!path) {
			path = "/"; 
		}
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			var expires = "; expires=" + date.toGMTString();
		} else {
			var expires = "";
		}
		document.cookie = name + "=" + value + expires + "; path="+path;
	}
    , "setCookieMinutes": function (name, value, days, hours, minutes, seconds) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * hours * minutes * seconds * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else {
            var expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }
    , "getCookie": function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)
                return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    , "eraseCookie": function (name, domain) {
        cookie_handler.setCookie(name, "", -1, domain);
    }
};

window.getActiveHost = function() {
	try { 
		var kw_tlh_activeHosts = ["messaggeroveneto", "corrierealpi", "gazzettadimodena", "gazzettadireggio", "nuovavenezia", "gazzettadimantova", "lanuovaferrara", "laprovinciapavese", "tribunatreviso", "lasentinella", "ilpiccolo", "iltirreno", "mattinopadova", "repubblica"];
		var kw_tlh_checkHostUrl = window.location.host.toString();
		window.kw_tlh_activeHost = "";
		for(var a=0; a<kw_tlh_activeHosts.length; a++) {
			if(kw_tlh_checkHostUrl.toString().indexOf(kw_tlh_activeHosts[a]) > -1) {
				window.kw_tlh_activeHost = kw_tlh_activeHosts[a];
			}
		}
	} catch(e) {
		window.kw_tlh_activeBrand = "";
		window.kw_tlh_activeHost = "";
		window.kw_tlh_active = false;
	}
}

window.getBrand = function() {
	window.kw_tlh_activeBrand = "";
	if (location.href.match(tlh_regex)) {
        window.kw_tlh_activeBrand = "gelocal";
    } else if(location.href.match(tlh_regex_2)) {
        window.kw_tlh_activeBrand = "repubblica";
		if(location.href.indexOf("espresso.repubblica.it") > -1) {
			window.kw_tlh_activeBrand = "espresso";	
			window.kw_tlh_activeHost = "espresso";
		}
		if(location.href.indexOf("https://d.repubblica.it") > -1) {
			window.kw_tlh_activeBrand = "repubblica";	
			window.kw_tlh_activeHost = "drepubblica";
		}
	} else if(location.href.match(tlh_regex_3)) {
		window.kw_tlh_activeBrand = "businessinsider";	
		window.kw_tlh_activeHost = "businessinsider";
    } else if(location.href.match(tlh_regex_4)) {
		window.kw_tlh_activeBrand = "deejay";	
		window.kw_tlh_activeHost = "deejay";
	} else if(location.href.match(tlh_regex_4a) || location.href.match(tlh_regex_5c)) {
		window.kw_tlh_activeBrand = "lescienze";	
		window.kw_tlh_activeHost = "lescienze";	
	} else if(location.href.match(tlh_regex_4b)) {
		window.kw_tlh_activeBrand = "ilsecoloxix";	
		window.kw_tlh_activeHost = "ilsecoloxix";		
		
	} else if(location.href.match(tlh_regex_5a)) {
		window.kw_tlh_activeBrand = "repubblica";		
		window.kw_tlh_activeHost = "rep";
	} else if(location.href.match(tlh_regex_5b)) {		
		window.kw_tlh_activeBrand = "gedivisual";	
		window.kw_tlh_activeHost = "gedivisual";
	} else if(location.href.match(tlh_regex_6)) {		
		window.kw_tlh_activeBrand = "lastampa";	
		window.kw_tlh_activeHost = "lastampa";
    } else if(location.href.match(tlh_regex_testdev)) {
		window.kw_tlh_activeBrand = "lastampa";	
		window.kw_tlh_activeHost = "lastampa";
    } else if(location.href.match(tlh_regex_7)) {
		window.kw_tlh_activeBrand = "3nz";	
		window.kw_tlh_activeHost = "3nz";
	} else if(location.href.match(tlh_regex_8)) {
		window.kw_tlh_activeBrand = "huffingtonpost";	
		window.kw_tlh_activeHost = "huffingtonpost";
	} else if(location.href.match(tlh_regex_9)) {
		window.kw_tlh_activeBrand = "consigli";	
		window.kw_tlh_activeHost = "consigli";
	} else if(location.href.match(tlh_regex_10)) {
		window.kw_tlh_activeBrand = "kataweb";	
		window.kw_tlh_activeHost = "tvzap";
	} else if(location.href.match(tlh_regex_11)) {
		window.kw_tlh_activeBrand = "lab gedidigital";	
		window.kw_tlh_activeHost = "lab gedidigital";
	} else if(location.href.match(tlh_regex_12)) {
		window.kw_tlh_activeBrand = "repubblica";	
		window.kw_tlh_activeHost = "drepubblica";
	} else if(location.href.match(tlh_regex_13)) {
		window.kw_tlh_activeBrand = "lanuovasardegna";	
		window.kw_tlh_activeHost = "lanuovasardegna";
	} else if(location.href.match(tlh_regex_14)) {
		window.kw_tlh_activeBrand = "itedisitiesterni";	
		window.kw_tlh_activeHost = window.location.host.split(".")[window.location.host.split(".").length-2]+"."+window.location.host.split(".")[window.location.host.split(".").length-1];
	} else if(location.href.match(tlh_regex_15)) {
		window.kw_tlh_activeBrand = "capital";	
		window.kw_tlh_activeHost = "capital";
	} else if(location.href.match(tlh_regex_16)) {
		window.kw_tlh_activeBrand = "m2o";	
		window.kw_tlh_activeHost = "m2o";
	} else if(location.href.match(tlh_regex_17)) {
		window.kw_tlh_activeBrand = "kataweb";	
		window.kw_tlh_activeHost = "ilmiolibro";	
	} else if(location.href.match(tlh_regex_18)) {
		window.kw_tlh_activeBrand = "limesonline";	
		window.kw_tlh_activeHost = "limesonline";
	} else if(location.href.match(tlh_regex_19)) {
		window.kw_tlh_activeBrand = "repubblica";	
		window.kw_tlh_activeHost = "cucina";
	} else if(location.href.match(tlh_regex_20)) {
		window.kw_tlh_activeBrand = "repubblica";	
		window.kw_tlh_activeHost = "entietrinunali";
	} else if(location.href.match(tlh_regex_21)) {
		window.kw_tlh_activeBrand = "natgeo";	
		window.kw_tlh_activeHost = "natgeo";
	} else if(location.href.match(tlh_regex_22)) {
		window.kw_tlh_activeBrand = "espresso";	
		window.kw_tlh_activeHost = "espresso";	
	} else if(location.href.match(tlh_regex_23)) {
		window.kw_tlh_activeBrand = "repubblica";	
		window.kw_tlh_activeHost = "blog";	
	} else if(location.href.match(tlh_regex_24)) {
		window.kw_tlh_activeBrand = "kataweb";	
		window.kw_tlh_activeHost = "login";	
	} else if(location.href.match(tlh_regex_25)) {
		window.kw_tlh_activeBrand = "eventi";	
		window.kw_tlh_activeHost = "eventi";		
	} else if(location.href.match(tlh_regex_26)) {
		window.kw_tlh_activeBrand = "themeditelegraph";	
		window.kw_tlh_activeHost = "themeditelegraph";			
	}
}

// Allowed domains
var tlh_regex = /^https?:\/\/((test(\.|-))?((amp\-)?video\.)?(elezioni\.|annunci\.|necrologie\.)?(messaggeroveneto|corrierealpi|gazzettadimodena|gazzettadireggio|nuovavenezia|gazzettadimantova|lanuovaferrara|laprovinciapavese|tribunatreviso|lasentinella|ilpiccolo|iltirreno|mattinopadova|quotidiani|eventi))\.gelocal\.it/;
var tlh_regex_2 = /^https?:\/\/(((test(\.|-))?(community\-londra|video|temi|quotidiano|annunci|necrologie|finanza|xl|video\.xl|inchieste|design|meteo|elezioni|scuola|dizionari|((m\.)?(elezioni\.)?espresso)|d|eventi|roma|firenze|napoli|bari|palermo|torino|milano|genova|parma|bologna|bocca\.blogautore))|(www3?))\.repubblica\.it/;
var tlh_regex_3 =  /^https?:\/\/(test\.)?(video\.)?it\.businessinsider\.com/;
var tlh_regex_4 =  /^https?:\/\/(www\.)?(test\.)?(video\.)?(deejayten\.)?deejay\.it/;
var tlh_regex_4a = /^https?:\/\/(test\-)?www\.lescienze\.it/;
var tlh_regex_4b = /^https?:\/\/(test\.video|video|test|pre|www|necrologie|annunci)\.ilsecoloxix\.it/;
var tlh_regex_5a = /^https?:\/\/(test\.)?video\.rep\.repubblica\.it/;
var tlh_regex_5b = /^https?:\/\/video\.gedivisual\.it/;
var tlh_regex_5c = /^https?:\/\/video\.lescienze\.it/;
var tlh_regex_6 =  /^https?:\/\/(test\-eventi|eventi|video|test\.video|test|pre|www|necrologie|annunci|stellacortesia)\.lastampa\.it/;
var tlh_regex_7 =  /^https?:\/\/(test\-)?www\.3nz\.it/;
var tlh_regex_8 =  /^https?:\/\/(test\.)?video\.(huffingtonpost|hff\.kataweb)\.it/;
var tlh_regex_9 =  /^https?:\/\/(test\.)?video\.consigli\.it/;
var tlh_regex_testdev = /dev\.(repubblica|mi\.kataweb)\.it/;
var tlh_regex_10 =  /^https?:\/\/(((test\-)?tvzap)|((test\.)?video\.tvzap))\.kataweb\.it/;
var tlh_regex_11 =  /^https?:\/\/(dev\-)?lab\.gedidigital\.it/;
var tlh_regex_12 =  /^https?:\/\/(test\.)?(oroscopo\.|video\.)d\.repubblica\.it/;
var tlh_regex_13 =  /^https?:\/\/(test\.|pre\.|test\.video\.|video\.|www\.|necrologie\.|annunci\.)lanuovasardegna\.it/;
var tlh_regex_14 =  /^https?:\/\/((test\.)?video\.|www\.|live\.)(stile|turismo|sport|film)\.it/;
var tlh_regex_15 =  /^https?:\/\/((test\-|www\.)?)(test\.)?(video\.)?(capital)\.it/;
var tlh_regex_16 =  /^https?:\/\/((test\-|www\.)?)(test\.)?(video\.)?(m2o)\.it/;
var tlh_regex_17 =  /^https?:\/\/(test\.)?(ilmiolibro\.kataweb)\.it/;
var tlh_regex_18 =  /^https?:\/\/(test\.|www\.)?(limesonline)\.com/;
var tlh_regex_19 =  /^https?:\/\/la\.repubblica\.it\/cucina/;
var tlh_regex_20 =  /^https?:\/\/www\.entietribunali\.it/;
var tlh_regex_21 =  /^https?:\/\/www\.nationalgeographic\.it/;
var tlh_regex_22 =  /^https?:\/\/video\.espresso\.repubblica\.it/;
var tlh_regex_23 =  /^http(s)?\:\/\/.+\.blogautore\.(espresso\.)?repubblica\.it/;
var tlh_regex_24 =  /^https?:\/\/login\.kataweb\.it\/static\/privacy/;
var tlh_regex_25 =  /^https?:\/\/dev\.interlaced\.it/;
var tlh_regex_26 =  /^https?:\/\/(pre|test|www|(test\.)?video)\.themeditelegraph\.com/;

//var tlh_regex_13 =  /^https?:\/\/(test\.|www\.)?(video\.)?lanuovasardegna\.it/;
// Is Video Frontend
var tlh_videoConfig_regex = /^https?:\/\/(test\.)?(video\.)(((messaggeroveneto|corrierealpi|gazzettadimodena|gazzettadireggio|nuovavenezia|gazzettadimantova|lanuovaferrara|laprovinciapavese|tribunatreviso|lasentinella|ilpiccolo|iltirreno|mattinopadova)\.gelocal\.it)|(rep\.repubblica\.it)|(consigli\.repubblica\.it)|(gedivisual\.it)|(lescienze\.it)|(ilsecoloxix\.it)|(lastampa\.it)|(huffingtonpost\.it)|(repubblica\.it))/;

window.kw_tlh_active = false;

if (location.href.match(tlh_regex) || location.href.match(tlh_regex_2) || location.href.match(tlh_regex_3) || location.href.match(tlh_regex_4) || location.href.match(tlh_regex_4a) || location.href.match(tlh_regex_4b) || location.href.match(tlh_regex_5a) || location.href.match(tlh_regex_5b) || location.href.match(tlh_regex_5c)  || location.href.match(tlh_regex_6) || location.href.match(tlh_regex_testdev) || location.href.match(tlh_regex_7) || location.href.match(tlh_regex_8) || location.href.match(tlh_regex_9) || location.href.match(tlh_regex_10) || location.href.match(tlh_regex_11) || (location.href.match(tlh_regex_12)) || location.href.match(tlh_regex_13) || location.href.match(tlh_regex_14) || location.href.match(tlh_regex_15) || location.href.match(tlh_regex_16) || location.href.match(tlh_regex_17) || location.href.match(tlh_regex_18) || location.href.match(tlh_regex_19) || location.href.match(tlh_regex_20) || location.href.match(tlh_regex_21) || location.href.match(tlh_regex_22) || location.href.match(tlh_regex_23) || location.href.match(tlh_regex_24) || location.href.match(tlh_regex_25) || location.href.match(tlh_regex_26)) {
	window.kw_tlh_active = true;
	window.getActiveHost();
	window.getBrand();
	console.log("[AsyncAdSetup] Matched a RegExp - BRAND: "+window.kw_tlh_activeBrand +" - HOST: "+ window.kw_tlh_activeHost);
} else {
	console.log("[AsyncAdSetup] Did not match any RegExp");
}

var kw_tlh_isVideoFE = location.href.match(tlh_videoConfig_regex);
try { 
	// Exception for tvzap test env
	var video_fe_tlh_regex_9 =  /^https?:\/\/(test\.)?video\.it\.businessinsider\.com/;
	if(location.href.match(video_fe_tlh_regex_9)) {
		kw_tlh_isVideoFE = true;
	}
	// Exception for tvzap test env
	var video_fe_tlh_regex_10 =  /^https?:\/\/(test\.)?video\.tvzap\.kataweb\.it/;
	if(location.href.match(video_fe_tlh_regex_10)) {
		kw_tlh_isVideoFE = true;
	}
	var video_fe_tlh_regex_11 =  /^https?:\/\/(test\.)?video\.lanuovasardegna\.it/;
	if(location.href.match(video_fe_tlh_regex_11)) {
		kw_tlh_isVideoFE = true;
	}
	var video_fe_tlh_regex_12 =  /^https?:\/\/(test\.)?video\.d\.repubblica\.it/;
	if(location.href.match(video_fe_tlh_regex_12)) {
		kw_tlh_isVideoFE = true;
	}
	var video_fe_tlh_regex_14 =  /^https?:\/\/((test\.)?video\.)(stile|turismo|sport|film|capital|m2o|deejay)\.it/;
	if(location.href.match(video_fe_tlh_regex_14)) {
		kw_tlh_isVideoFE = true;
	}
	var video_fe_tlh_regex_15 =  /^https?:\/\/(test\.)?video\.espresso.repubblica\.it/;
	if(location.href.match(video_fe_tlh_regex_15)) {
		kw_tlh_isVideoFE = true;
	}
	var video_fe_tlh_regex_16 =  /^https?:\/\/(test\.)?video\.themeditelegraph\.com/;
	if(location.href.match(video_fe_tlh_regex_16)) {
		kw_tlh_isVideoFE = true;
	}
} catch(e) {}
if(kw_tlh_isVideoFE === true) {
	console.log("[AsyncAdSetup] Matched a Video RegExp");
}
console.log("[AsyncAdsetup] IS TLH ACTIVE? ", window.kw_tlh_active);
window.kwLoadAdMantx = true;
var kwasyncregex = /^https?:\/\/(tangeri|rep)\.repubblica\.it($|\/.*$)/;
if (location.href.match(kwasyncregex)) {
        window.kwasyncsetup = true;
}

var noadagiolibload = /^https?:\/\/(tangeri|rep)\.repubblica\.it($|\/.*$)/;
if (location.href.match(noadagiolibload)) {
	window.kwLoadAdagio = false;
	window.kwLoadAdSetupReal = false;
	window.kwLoadAdMantx = false;
}

try {
    if(window.kwasyncsetup === null || window.kwasyncsetup === undefined){
        window.kwasyncsetup = false;
    }
} catch(e) {
    window.kwasyncsetup = false;
}
var kwdntraw=''; var kwdnt=-1; var kwuuid='0xa0a9660983a20ac571a93911f4381f92c421da4b'; kwdom = '3nz.it|capital.it|deejay.it|entietribunali.it|gedi.it|gedidigital.it|gelocal.it|gruppoespresso.it|huffingtonpost.it|ilsecoloxix.it|it.businessinsider.com|katamail.com|kataweb.it|lanuovasardegna.it|lastampa.it|lastampashop.it|lescienze.it|limesonline.com|m2o.it|micromega.net|nationalgeographic.it|ondalatina.it|repubblica.it|sport.it|storiebrevi.it';
var kwlocalnet=false;
window.kwloggeduser=false;
window.wt_device_type='desktop';
window.kw_p2s='{"swgt":"NA"}';
try {
	site2pixel = /^https?:\/\/(www|elezioni|bari|bologna|firenze|genova|milano|napoli|palermo|parma|roma|torino|sport|video|d)\.repubblica\.it($|\/.*$)/;
	hprepubblicait = /^https?:\/\/www\.repubblica\.it(\/(index\.html)?)?(\?.*)?$/;
	hprepit = /^https?:\/\/rep\.repubblica\.it(\/(index\.html)?)?(\?.*)?$/;
	site2pixel_ls = /^https?:\/\/www\.lastampa\.it/;
	site2pixel_bi = /^https?:\/\/it\.businessinsider\.com/;
	site2pixel_dj = /^https?:\/\/.*\.deejay\.it/;

	if ((location.href.match(site2pixel) || location.href.match(site2pixel_ls) || location.href.match(site2pixel_bi) || location.href.match(site2pixel_dj)) && !location.href.match(hprepit) ) {
		console.log('%c[fb_pixel] %c DOWNLOADING FACEBOOK PIXEL LIBRARY', 'padding: 2px; background: orangered; color: #000', 'padding: 2px; color: #F0F');
		!function(f,b,e,v,n,t,s){if(f.fbq)return;
		n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
		if(!f._fbq)f._fbq=n;
		n.push=n
		;n.loaded=!0;
		n.version='2.0';
		n.queue=[];
		t=b.createElement(e);
		t.async=!0;
		t.src=v;
		s=b.getElementsByTagName(e)[0];
		s.parentNode.insertBefore(t,s)}(window,document,'script','//connect.facebook.net/en_US/fbevents.js');
	}

	if (location.href.match(site2pixel) && !location.href.match(hprepit)) {
		fbq('init', '247428115450514');
		fbq('track', "PageView");
		fbq('track', 'ViewContent');
	}
} catch(e) {
	console.log('%c[fb_pixel] %c ERROR SENDING FB PIXEL OR DOWNLOADING LIBRARY', 'padding: 2px; background: orangered; color: #000', 'padding: 2px; color: #F0F');
}


try {	
	var kw_mnzFbPixel_allowedDomain = false;
	var kw_mnzFbPixel_regex = [/(www|d)\.repubblica\.it/, /it\.businessinsider\.com/, /deejay\.it/, /lastampa\.it/];
	for(var a in kw_mnzFbPixel_regex) {
		if(window.location.href.toString().match(kw_mnzFbPixel_regex[a])) {
			kw_mnzFbPixel_allowedDomain = true;
		}
	}
	
	var kw_mnzFbPixel_allowingStrings = ["velux-outsidein2019"];
	var kw_mnzFbPixel_allowed = false;
	for(var a =0; a < document.getElementsByTagName("script").length; a++) {
		if(document.getElementsByTagName("script")[a].src.indexOf("adsetup.js") > -1) {
			console.log('%c[pixel_mnz] %c FOUND ADSETUP ==>> ' + document.getElementsByTagName("script")[a].src, 'padding: 2px; background: orangered; color: #000', 'padding: 2px; color: #F0F');
			var tagToAnalyze = document.getElementsByTagName("script")[a].src.split("?")[1];
			if(tagToAnalyze !== undefined) {
				for(var b = 0; b < kw_mnzFbPixel_allowingStrings.length; b++) {
					if(tagToAnalyze.indexOf(kw_mnzFbPixel_allowingStrings[b]) > -1) {
						kw_mnzFbPixel_allowed = true;
						console.log('%c[pixel_mnz] %c FOUND Sensitive Tag ==>> '+kw_mnzFbPixel_allowingStrings[b] + ' inside adsetup params ..... allowing second pixel', 'padding: 2px; background: orangered; color: #000', 'padding: 2px; color: #F0F');
					}
				}
			}
			break;
		}
	}
	
	try {
		if(window.location.toString().split("?")[0] === "https://www.repubblica.it/dossier-native/salute/luce-e-benessere/" || window.location.toString().split("?")[0] === "https://www.repubblica.it/dossier-native/salute/luce-e-benessere") {
			kw_mnzFbPixel_allowedDomain = true;
			kw_mnzFbPixel_allowed = true;
		}
	} catch(e) {
		console.log("%c[pixel_mnz] %c Error mapping specific homepage", 'padding: 2px; background: orangered; color: #000', 'padding: 2px; color: #F0F');
		console.log(e);
	}

	if(kw_mnzFbPixel_allowed === true && kw_mnzFbPixel_allowedDomain === true) {	
		console.log('%c[pixel_mnz] %c PAGE ALLOWED TO FIRE MNZ VELUX FACEBOOK PIXEL', 'padding: 2px; background: orangered; color: #000', 'padding: 2px; color: #F0F');							
		window.pixelFbMnzCount = 0;
		window.pixelFbMnz = function() {
			if(window.kw_tlh_adSetupAvailable !== false) {
				if ((window.kwdnt === undefined || window.kwdnt === 0 || window.kwdnt === 1)) {
					try { 
						if(fbq) {
							console.log('%c[pixel_mnz] %c  Facebook pixel downloaded -> sending events', 'padding: 2px; background: orangered; color: #000', 'padding: 2px; color: #F0F');							
							fbq('init', '167210373647733');
							fbq('trackSingle', '167210373647733', 'PageView');
						}
					} catch(e) {
						
						if(window.pixelFbMnzCount < 5) {
							console.log('%c[pixel_mnz] %c  Facebook pixel not yet downloaded -> setting timeout.... '+window.pixelFbMnzCount+' / 4', 'padding: 2px; background: orangered; color: #000', 'padding: 2px; color: #F0F');							
							setTimeout(window.pixelFbMnz, 500);
							window.pixelFbMnzCount++;
						} else {
							console.log('%c[pixel_mnz] %c  Facebook pixel not yet downloaded -> giving up', 'padding: 2px; background: orangered; color: #000', 'padding: 2px; color: #F0F');							
						}
					}
				}
			}
		}
		window.pixelFbMnz();
	} else {
		console.log('%c[pixel_mnz] %c PAGE NOT ALLOWED TO FIRE SECOND FACEBOOK PIXEL - Tag is present: '+kw_mnzFbPixel_allowed+' - Domain allowed: '+kw_mnzFbPixel_allowedDomain, 'padding: 2px; background: orangered; color: #000', 'padding: 2px; color: #F0F');							
	}
} catch(e) {
	console.log('%c[pixel_mnz] %c ERROR HAPPENED - allowed pixel:'+kw_mnzFbPixel_allowed+' - Domain allowed: '+kw_mnzFbPixel_allowedDomain, 'padding: 2px; background: orangered; color: #000', 'padding: 2px; color: #F0F', e);
}
try {
	if (((location.href.match(site2pixel) || location.href.match(hprepit)) && !location.href.match(hprepubblicait)) || location.href.indexOf("https://quotidiano.repubblica.it/edicola/catalogogenerale.jsp") > -1) {	
		var gtg = document.createElement('script');
		gtg.type = 'text/javascript';
		gtg.src = "https://www.googletagmanager.com/gtag/js?id=AW-967792575";
		gtg.async = true;
		document.getElementsByTagName('head')[0].appendChild(gtg);
		
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'AW-967792575');
	}
} catch(e) {
	console.log("Error Loading Google Tag Manager", e);
}
window.kw_cmp_domReady = false;
window.kw_cmp_cmpReady = false;
window.kw_cmp_retryLimit = 0;
window.cmpLoadWrapper = function(set_timeout) {	
	console.log('%c[head.js] %c Calling window.cmpLoadWrapper - if not available set timeout => '+set_timeout, 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');
	if(window.kw_cmp_retryLimit > 15) { 
		console.log('%c[head.js] %c mnz_advReady NOT AVAILABLE - TRIED enough.....GIVING UP', 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');
		return; 
	}
	if(kw_cmp_domReady === true && kw_cmp_cmpReady === true) {
		try { 
			mnz_advReady(); 
		} catch(e) {
			console.log("ERROR EXECUTING mnz_advReady");
			console.log(e);
			if(set_timeout === true) {
				//console.log('%c[head.js] %c mnz_advReady NOT YET AVAILABLE - setting timeout', 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');
				window.kw_cmp_retryLimit++;
				setTimeout(function() { window.cmpLoadWrapper(true); }, 500);
			} else {
				//console.log('%c[head.js] %c mnz_advReady NOT YET AVAILABLE - waiting.....', 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');
			}
		}
	} else {
		console.log('%c[head.js] %c CONDITIONS TO CALL mnz_advReady NOT SATISFIED - DOM: '+kw_cmp_domReady+' - CMP: '+kw_cmp_cmpReady, 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');
	}		
}
if(window.kwasyncsetup === true) {
	if(document.readyState !== "complete" && document.readyState !== "interactive") {
		document.addEventListener("DOMContentLoaded", function() {        
			console.log('%c[head.js] %cDOM CONTENT LOADED - setting DOM ready', 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');
			window.kw_cmp_domReady = true;		
			try { window.cmpLoadWrapper(); } catch(e) {
				console.log('%c[head.js] %c SOMETHING WENT WRONG CALLING cmpLoadWrapper', 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');
			}
		}); 
	} else {
		console.log('%c[head.js] %cDOM CONTENT ALREADY LOADED - Calling CMPLoadwrapper', 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');
		window.kw_cmp_domReady = true;
		try { window.cmpLoadWrapper(); } catch(e) {
			console.log('%c[head.js] %c SOMETHING WENT WRONG CALLING cmpLoadWrapper', 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');
		}
	}
} else {
	try { 
		
		if(document.readyState !== "complete") {
			console.log('%c[head.js] %c SYNC CONTEXT - setting LISTENER - readystate not complete', 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');
			try {
				document.addEventListener("readystatechange", function() {        	
					if(document.readyState === "complete") {
						window.kw_cmp_domReady = true;
						window.kw_cmp_cmpReady = true;
						console.log('%c[head.js] %c SYNC CONTEXT - calling cmploadwrapper', 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');
						try { window.cmpLoadWrapper(); } catch(e) {
							console.log('%c[head.js] %c SOMETHING WENT WRONG CALLING cmpLoadWrapper', 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');
						}
					}
				});
			} catch(e) {
				console.log('%c[head.js] %c SYNC CONTEXT - ERROR HAPPENED - calling cmploadwrapper', 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');
				window.kw_cmp_domReady = true;
				window.kw_cmp_cmpReady = true;
				try { window.cmpLoadWrapper(); } catch(e) {
					console.log('%c[head.js] %c SOMETHING WENT WRONG CALLING cmpLoadWrapper', 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');
				}
			}
		} else {
			console.log('%c[head.js] %c SYNC CONTEXT - READYSTATE ALREADY COMPLETE calling cmploadwrapper', 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');
			window.kw_cmp_domReady = true;
			window.kw_cmp_cmpReady = true;
			try {
				window.cmpLoadWrapper(true);
			} catch(e) {
				console.log('%c[head.js] %c SYNC CONTEXT - no loadWrapper Found - Something must have gone wrong', 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');
			}
		}
	} catch(e) {}
}	



	function loadCMPLibrary() {
            try {
				console.log("%c[CMP LOG] %c KWDNT CHECKED......" + window.kwdnt+" - in privacy? =>"+(window.location.href.toString().indexOf(window.kw_cmp.infoestesa)> -1), 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');
				if(window.location.href.toString().indexOf(window.kw_cmp.infoestesa)> -1) {
					// Exception for Extended Privacy page  ||do not verify kwdnt||
					var t = document.createElement('script');
					t.async = true;
					t.src = window.kw_cmp.library;
					var tag = document.getElementsByTagName('head')[0];
					tag.appendChild(t);
				} else {
					// Normal behaviour -> check for KWDNT
					if (window.kwdnt === undefined) {
						setTimeout(loadCMPLibrary, 100);
						console.log("%c[CMP LOG] %c Aborting kwdnt do not exists", 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');
					} else {
						if (window.kwdnt === -1) {
							console.log("%c[CMP LOG] %c Infoprivacy visible!!!!! - CMP won't load until user will click to accept", 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');
						} else {
							console.log("%c[CMP LOG] %c Kwdnt exists", 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');
							var t = document.createElement('script');
							t.async = true;
							t.src = window.kw_cmp.library;
							var tag = document.getElementsByTagName('head')[0];
							tag.appendChild(t);
						}
					}
				}
            } catch(e) { console.log("%c[CMP ERROR] %c Error Loading CMP Library", 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F', e); }    
	}
	function forwardedCmpEvents(evt) {
		try {
			if(evt == "Notify event: isLoaded") {
				
				console.log("%c[CMP LOG] %c ", 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F', evt);
			}
			if(evt == "Notify event: cmpReady") {
				console.log("%c[CMP LOG] %c ", 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F', evt);
				try {
					window.kw_cmp_cmpReady = true;                   
					window.cmpLoadWrapper(); 
					console.log("%c[CMP LOG] %c Called mnz_advReady - Manzoni can refresh ADV", 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');
				} catch(e) { 
					console.log("%c[CMP ERROR] %c Did not find kwcmpReady function in adv configuration", 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');
				}
				try { 
					kw_tlh_cmp_complete(); 
					console.log("%c[CMP LOG] %c Called kw_tlh_cmp_complete - FE VIDEO Async ADV can be launched", 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');
				} catch(e) { 
					console.log("%c[CMP LOG] %c Did not find FE VIDEO TLH in page. Not worrying about writing adv in page", 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');
				}
				try {
					console.log("Getting Publisher Consent For PersonalizedAds");
					__cmp("getPublisherConsents", "", function(result) { window.kwCmpPurposes = {"standardPurposes":result.standardPurposes, "customPurposes":result.customPurposes}});
				} catch(e) {
					console.log(e);
					window.kwCmpPurposes = null;
				}
			}
		} catch(e) {}
	}	
	console.log("||||||||||||||||||||||||||||||");
	console.log("|||CMP CONFIG SCRIPT LOADED|||");
	console.log("||||||||||||||||||||||||||||||");

	window.kw_cmp = {};
	window.kw_cmp.library = 'https://gedi.mgr.consensu.org/kwcmp/cmp.js?v=1';
	window.kw_cmp.infoestesa = '//login.kataweb.it/static/privacy';
	window.kw_cmp.vendorlist = 'https://'+window.location.host+'/kwcmp-prx/vendorlist.json';
	window.kw_cmp.purposes = 'https://'+window.location.host+'/kwcmp-prx/purposes.json';
	window.kw_cmp.portal = 'https://gedi.mgr.consensu.org/kwcmp/portal.html';

	window.prepareCMP = function(window, document) {
		console.log("%c[CMP LOG] %c Going to prepare CMP", 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');
		if (!window.__cmp) {
			window.__cmp = (function () {
				var listen = window.attachEvent || window.addEventListener;
				listen('message', function (event) {
					window.__cmp.receiveMessage(event);
				}, false);

				function addLocatorFrame() {
					if (!window.frames['__cmpLocator']) {
						if (document.body) {
							var frame = document.createElement('iframe');
							frame.style.display = 'none';
							frame.name = '__cmpLocator';
							document.body.appendChild(frame);
						} else {
							setTimeout(addLocatorFrame, 5);
						}
					}
				}
				addLocatorFrame();

				var commandQueue = [];
				var cmp = function (command, parameter, callback) {
					if (command === 'ping') {
						if (callback) {
							callback({
								gdprAppliesGlobally: !!(window.__cmp && window.__cmp.config && window.__cmp.config.gdprAppliesGlobally),
								cmpLoaded: false
							});
						}
					} else {
						commandQueue.push({
							command: command,
							parameter: parameter,
							callback: callback
						});
					}
				}
				cmp.commandQueue = commandQueue;
				cmp.receiveMessage = function (event) {
					var data = event && event.data && event.data.__cmpCall;
					if (data) {
						commandQueue.push({
							callId: data.callId,
							command: data.command,
							parameter: data.parameter,
							event: event
						});
					}
				};
				cmp.config = {
					globalVendorListLocation: window.kw_cmp.vendorlist,
					globalConsentLocation: window.kw_cmp.portal,
					customPurposeListLocation: window.kw_cmp.purposes,
					storeConsentGlobally: true,
					gdprApplies: true,
					storePublisherData: false,
					gdprAppliesGlobally: true,
					logging: 'debug',
				}
				return cmp;
			}());
			console.log("%c[CMP LOG] %c Going to load CMP....verifying in kwdnt exists", 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');			
			window.loadCMPLibrary();
		}
	}

	if(window.location.href.toString().indexOf("cmp2=dcmgpd") > -1) {
		window.prepareCMP(window, document);
	}

if(window.kw_tlh_active === true) {

	/* ### LIBRARY CODE ### */
	
	var tlhl = (function () {    
		return function (_name, _configObject) { //_callback, _library, _libraryLoadSuccess, _libraryLoadError, _async) {
			// Private Methods and properties
			var name = "";
			var console_prefix = "";
			var zconsole_prefix = "";
			var callback = function () {};
			var externalDependencies = [];
			var externalLibDependencies = [];
			var lights = {};        
			var liblights = {};
			var libraryToLoad = "";
			var libraryLoadSuccess = function() {};
			var libraryLoadError = function() {};
			var async = true;
			var logMode = 1;  //paranoid verbose info minimal disabled
			var tlhconsole = {};
			var internalReference;
			var complete = false;
			tlhconsole.log = function(logMsg, logLevel, _obj) {
				if(window.location.href.toString().indexOf("kwdebugtlh=true") === -1) { return; }
				if(!logLevel) { logLevel = 1; }
				var colorsLevel = ["#000", "#000", "#FF00FF", "#FF0000"];
				if(logMode >= logLevel) {
					//console.log(logMsg, 'background: #222; color: #bada55');
					if(_obj) {
						console.log('%c'+zconsole_prefix+' %c'+logMsg, 'padding: 2px; background: #E52524; color: #FFF', 'padding: 2px; color: '+colorsLevel[logLevel], _obj);
					} else {
						console.log('%c'+zconsole_prefix+' %c'+logMsg, 'padding: 2px; background: #E52524; color: #FFF', 'padding: 2px; color: '+colorsLevel[logLevel]);
					}
				}
			}
			var error = function(errorID) {
				var err;
				var abort = false;
				switch(errorID) {
					case 0:
						//err = new TypeError("ReferenceError", "Light as Object Not Valid (no tlh identified) - Discarded");
						break;
					case 1:
						err = new RangeError("Name Not Defined");
						break;
					case 2:
						err = new EvalError("Light Not Found");
						break;
					case 3:
						err = new TypeError("Light as Object Not Valid (no tlh identified) - Discarded");
						break;
					case 4:
						err = new TypeError("Light Not Valid - Discarded");
						break;
					case 5:
						err = new EvalError("Light Already exsiting");
						break;
					case 6:
						err = new ReferenceError("Can't greenify a tlh object as light - Check its status before");
						break;
					case 7:
						err = new RangeError("Callback passed is not valid. Pass null to disable callback");
						break;
					case 8:
						err = new ReferenceError("Can't add this tlh to itself.");
						break;    
					case 9:
						err = new ReferenceError("Light name not allowed.");
						break;
					default:
						err = new Error("Something Went Wrong and I don't know what. Debug better!");
						abort = true;
						break;
				}            
				/* if(abort === true) {                
					try {
						console.log("[TLH ERROR] ", err);
					} catch(e) {}
				} else { */
					try {
						console.log("[TLH ERROR] ", err);
					} catch(e) {}
				//}
			}
			var _loadLibrary = function() {                        
				if(libraryToLoad !== "" && lights['library'] === false) {
					lights['library'] = "downloading";
					/* console */ tlhconsole.log(console_prefix+" Library downloading started "+libraryToLoad, 3);
					var script = document.createElement('script');
					script.async = async;
					script.onload = function (e, elem) { 
						/* console */ tlhconsole.log(console_prefix+" Library downloading completed "+libraryToLoad, 1);
						/* console */ tlhconsole.log(e, 1);
						/* console */ tlhconsole.log(elem, 1);
						setTimeout(function() {
							_libraryLoaded(); 
							libraryLoadSuccess();
						}, 20);
						//document.head.appendChild(script)
					};
					script.onerror = function () { 
						/* console */ tlhconsole.log(console_prefix+" Library downloading completed with errors "+libraryToLoad, 1);
						try { _libraryLoaded(); } catch(e) {}
						try { libraryLoadError(); } catch(e) {}
					};
					script.src = libraryToLoad;
					document.head.appendChild(script); //or something of the likes
					 // call _libraryLoaded when done            
				}
			}
			var _loadCssLibrary = function() {                        
				if(libraryToLoad !== "" && lights['library'] === false) {
					/* console */ tlhconsole.log(console_prefix+" CSSLibrary downloading started "+libraryToLoad, 3);
					var cssscript = document.createElement('link');
					cssscript.async = async;
					cssscript.onload = function (e, elem) { 
						/* console */ tlhconsole.log(console_prefix+" CSSLibrary downloading completed "+libraryToLoad, 1);
						_libraryLoaded(); 
						libraryLoadSuccess();
						//document.head.appendChild(cssscript)
					};
					cssscript.onerror = function () { 
						/* console */ tlhconsole.log(console_prefix+" CSSLibrary downloading completed with errors "+libraryToLoad, 1);
						try { _libraryLoaded(); } catch(e) {}
						try { libraryLoadError(); } catch(e) {}
					};
					cssscript.rel = "stylesheet";
					cssscript.href = libraryToLoad;
					document.head.appendChild(cssscript); //or something of the likes
					 // call _libraryLoaded when done            
				}
			}
			var _libraryLoaded = function() {
				lights['library'] = true;
				internalReference.getStatus(true);
			}
			var _addExternalDependency = function(elem, prop) {
				// Do not check if an object has been added twice because it can happen for some reasons
				externalDependencies.push([prop, elem]);
			}
			var _addExternalLibDependency = function(elem, prop) {
				// Do not check if an object has been added twice because it can happen for some reasons
				externalLibDependencies.push([prop, elem]);
			}
			
			var _executeCallback = function () {
				switch(typeof callback) {
					case "function":
						/* console */ tlhconsole.log(console_prefix+" Callback is a function", 3);
						callback();
						break;
					case "string":
						if(callback === null) { 
							/* console */ tlhconsole.log(console_prefix+" Callback is null. Not executing anything", 3);
						} else if (callback.indexOf("()") > -1) {
							/* console */ tlhconsole.log(console_prefix+" Callback is a string with curls", 3);
							/* console */ tlhconsole.log(callback);
							eval(callback);
						} else {
							/* console */ tlhconsole.log(console_prefix+" Callback is a string without curls -> adding", 3);
							eval(callback + "()");
						}
						break;
					default:
						return false;
						break;
				}
				/* console */ tlhconsole.log(console_prefix+" Callback Executed", 1);
				return true;
			}
			
			var _loopLibLights = function () {
				/* console */ tlhconsole.log(console_prefix+" _loopLibLights START", 3);
				for (var a in liblights) {
					// check if current light is an object that has been destroyed, if it returns null or undefined or empty                                
					var loopRes = _loopSingleLight(liblights[a]);                                    
					/* console */ tlhconsole.log(console_prefix+" _loopLibLights "+a+" -> typeof expected: "+typeof(liblights[a])+" - completed: "+loopRes, 2, liblights[a]);
					if (loopRes === false) {
						return false;
					}
				}
				/* console */ tlhconsole.log(console_prefix+" _loopLibLights END - COMPLETED - going to load Library "+libraryToLoad, 3);
				return true;
			}
			
			var _loopLights = function () {
				/* console */ tlhconsole.log(console_prefix+" _loopLights START", 3);
				for (var a in lights) {
					// check if current light is an object that has been destroyed, if it returns null or undefined or empty                                
					// tlhconsole.log(console_prefix+" LOOPING light "+a);
					var loopRes = _loopSingleLight(lights[a]);                               
					/* console */ tlhconsole.log(console_prefix+" _loopLights "+a+" -> typeof expected: "+typeof(lights[a])+" - completed: "+loopRes, 2, lights[a]);
					if (loopRes === false) {
						return false;
					}
				}
				/* console */ tlhconsole.log(console_prefix+" _loopLights END", 3);
				return true;
			}
			var _loopSingleLight = function(l) {
				var loopRes = "";
				/* console */ tlhconsole.log(console_prefix+" _loopSingleLight  typeof expected: "+typeof(l), 4);
				switch(typeof l) {
					case "boolean":
						/* console */ tlhconsole.log(console_prefix+" _loopSingleLight BOOLEAN", 4, l.toString());
						return l;
					case "string":
						/* console */ tlhconsole.log(console_prefix+" _loopSingleLight STRING", 4, "downloading|false");
						var retval = "";
						if(l === "downloading")  {retval =  "downloading"; } else { retval =  false; }						
						return retval;
					case "object":
						/* console */ tlhconsole.log(console_prefix+" _loopSingleLight OBJECT", 4, l.hasCompleted());
						return l.hasCompleted();
					case "function":
						/* console */ tlhconsole.log(console_prefix+" _loopSingleLight FUNCTION", 4, l());
						return l();
					default:
						/* console */ tlhconsole.log(console_prefix+" _loopSingleLight DEFAULT", 4, "true");
						return true;
				}
				
			}
			var _greenifyExternalDependencies = function() {
				// Check if this object is in other traffic lights
				for(var z = 0; z < externalDependencies.length; z++) {
					// Call Green Light Method for that object on that property
					/* console */ tlhconsole.log(console_prefix+" Greenifying external dependency in "+externalDependencies[z][1].getName()+" tlh object - property : "+externalDependencies[z][0], 2);
					externalDependencies[z][1].setGreenLight(externalDependencies[z][0], true, true);
				}
				for(var z = 0; z < externalLibDependencies.length; z++) {
					// Call Green Light Method for that object on that property
					/* console */ tlhconsole.log(console_prefix+" Greenifying lib external dependency in "+externalLibDependencies[z][1].getName()+" tlh object - property : "+externalLibDependencies[z][0], 2);
					externalLibDependencies[z][1].setLibGreenLight(externalLibDependencies[z][0], true, true);
				}
			}
			
			
			// ################################### START CONSTRUCTOR ###################################
			 
			// CHECKING AND SETTING NAME
			if (_name === "" || _name === null || _name === undefined || typeof _name !== "string") {
				error(1);
			} else {
				name = _name;
			}
			console_prefix = "";
			zconsole_prefix = "[ tlh _ " + name + " ]";
			// CHECKING AND SETTING CALLBACK
			if(_configObject.cb === null) {
				callback = null;
			} else if (typeof _configObject.cb === "function" || ( typeof _configObject.cb === "string" && _configObject.cb !== "")) {
				callback = _configObject.cb;
			} else {
				/* console */ return error(7);
			}
			if(_configObject.libUrl != "" && _configObject.libUrl != undefined) {            
				lights['library'] = false;
				libraryToLoad = _configObject.libUrl;
			}
			if(typeof _configObject.libCbSuccess === "function") {
				libraryLoadSuccess = _configObject.libCbSuccess;
			}
			if(typeof _configObject.libCbError === "function") {
				libraryLoadError = _configObject.libCbError;
			}
			if(typeof _configObject.async === "boolean") {
				async = _configObject.async;
			}        
			// ##################################### END CONSTRUCTOR ####################################
			
			return {
			// PUBLIC OBJECT
				getName: function () { return name; },
				getObject: function () {
					try {
						/* console */ tlhconsole.log(console_prefix + "Library Lights", 1, liblights);
						/* console */ tlhconsole.log(console_prefix + "Lights", 1, lights);
					} catch(e) {
						
					}
				},
				getLibBlockers: function () {
					
				},
				
				getBlockers: function (mode) {
					if(!mode || mode == "library") {
						/* console */ tlhconsole.log(console_prefix + " ########  LIB BLOCKERS START ######### ", 1);
						var libblockers = [];
						for (var a in liblights) {
							switch(typeof liblights[a]) {
								case "boolean":
									if(liblights[a] === false) { libblockers.push(a+" - RED"); }
									break;
								case "object":
									if(liblights[a].getStatus() === false) { libblockers.push(a + " [this element is a tlh] NOT COMPLETED"); }
									break;
								case "function":
									try {
										if(liblights[a]() === false) { libblockers.push(a + " [this element is a function condition] NOT COMPLETED"); }
									} catch(e) {
										libblockers.push(a + " [this element is a function condition] CONDITION VERIFY RETURNED ERROR");
										}
									break;
								default:
									break;
							}                    
						}
						if ((libblockers.length > 0)) {                    
							/* console */ tlhconsole.log(libblockers, 1);
						} else {
							/* console */ tlhconsole.log(console_prefix + " No library blocker active", 1);
						}
						/* console */ tlhconsole.log(console_prefix + " ########  LIB BLOCKERS END ######### ", 1);
					}
					if(!mode || mode == "tlh") {
						/* console */ tlhconsole.log(console_prefix + " ########  BLOCKERS START ######### ", 1);
						var blockers = [];
						for (var a in lights) {
							switch(typeof lights[a]) {
								case "boolean":
									if(lights[a] === false) { blockers.push(a+" - RED"); }
									break;
								case "object":
									if(lights[a].getStatus() === false) { blockers.push(a + " [tlh] NOT COMPLETED"); }
									break;
								case "function":
									try {
										if(lights[a]() === false) { blockers.push(a + " [this element is a function condition] NOT COMPLETED"); }
									} catch(e) {
										blockers.push(a + " [this element is a function condition] CONDITION VERIFY RETURNED ERROR -  NOT COMPLETED");
									}
									break;
								default:
									break;
							}                    
						}
						
						if ((blockers.length > 0)) {                    
							/* console */ tlhconsole.log(blockers, 1);
						} else {
							/* console */ tlhconsole.log(console_prefix + " No blocker active", 1);
						}
						/* console */ tlhconsole.log(console_prefix + " ########  BLOCKERS END ######### ", 1);
					}
				},
				execute: function() {
					this.getStatus(true, true);
				},				
				hasCompleted: function () {
					return complete;
				},
				getStatus: function (doCallback) {
					if(complete === true) { 
						/* console */ tlhconsole.log(console_prefix+" Status COMPLETED - GREEN - SHORT RESPONSE", 1);
						return true;
					}
					/* console */ tlhconsole.log(console_prefix+" Getting TLH status....has library property..."+lights.hasOwnProperty("library"), 3);
					if(lights.hasOwnProperty("library") === true) {
						if(_loopSingleLight(lights['library']) !== true && _loopSingleLight(lights['library']) !== "downloading") {
							var liblightsLooped = _loopLibLights();
							if (liblightsLooped === true) {
								if (doCallback === true) {
									internalReference = this;
									if(libraryToLoad.indexOf(".js") > 0) { 
										_loadLibrary();
									} else if(libraryToLoad.indexOf(".css") > 0) {
										_loadCssLibrary();
									} else {
										_loadLibrary();
									}
									return false;
								} else {
									/* console */ tlhconsole.log(console_prefix+" Library Status COMPLETED - GREEN", 1);
								}
							} else if (lightsLooped === false) {
								/* console */ tlhconsole.log(console_prefix+" Library Status NOT COMPLETED - RED", 1);
								if (doCallback === true) {
									return false;
								}
							}
						} else if(_loopSingleLight(lights['library']) === "downloading") {
							/* console */ tlhconsole.log(console_prefix+" Library Downloading - Status NOT COMPLETED - RED", 1);
							/* if (doCallback === true) {
								return;
							} */
							return false;
						}
						
					} 
					
					
					var lightsLooped = _loopLights();
					if (lightsLooped === true) {
						if (doCallback === true) {
							/* console */ tlhconsole.log(console_prefix+" Status COMPLETED - YELLOW", 1);
							complete = true;
							/* console */ tlhconsole.log(console_prefix+" Executing Callback", 1);
							_executeCallback();
							/* console */ tlhconsole.log(console_prefix+" Status COMPLETED AND EXECUTED - GREEN", 1);
							/* console */ tlhconsole.log(console_prefix+" Checking if this object is in other tlhs and informing them this is green", 1);
							_greenifyExternalDependencies();
						} else {
							if(complete === false) {
								/* console */ tlhconsole.log(console_prefix+" Status COMPLETED but not EXECUTED - YELLOW", 1);
							} 
						}
						return true;
					} else if (lightsLooped === false) {
						/* console */ tlhconsole.log(console_prefix+" Status NOT COMPLETED - RED", 1);
						return false;
					}
				},
				
				addRedLight: function (_light, _status) {
					if(_light === "library") {
						return error(9);
					}
					if (lights.hasOwnProperty(_light)) { 
						return error(5);
					}
					if (liblights.hasOwnProperty(_light)) { 
						return error(5);
					}
					if(_status === undefined) {
						_status = false;
					}
					var status;                
					switch(typeof _status) {
						case "object":
							try {
								if(_status.hasOwnProperty("addExternalDependency") === true) {
									status = _status;                                
									var added = status.addExternalDependency(this, _light);
									if(added !== true) {
										return error(added);
									}
								} else {
									return error(3);
								}
							} catch(e) {
								return error(3);
							}
							break;
						
						case "boolean":
							status = false;
							break;
							
						case "function":
							// TO VERIFY
							status = _status;
							// #########
							break;
							
						default:
							return error(4);
							break;
					}                
					lights[_light] = status;
					/* console */ tlhconsole.log(console_prefix+" Adding "+_light+" as RED LIGHT", 1);
					return true;
				},
				
				addLibRedLight: function (_light, _status) {
					if(_light === "library") {
						return error(9);
					}
					if (lights.hasOwnProperty(_light)) { 
						return error(5);
					}
					if (liblights.hasOwnProperty(_light)) { 
						return error(5);
					}
					if(_status === undefined) {
						_status = false;
					}
					var status;                
					switch(typeof _status) {
						case "object":
							try {
								if(_status.hasOwnProperty("addExternalLibDependency") === true) {
									status = _status;                                
									var added = status.addExternalLibDependency(this, _light);
									if(added !== true) {
										return error(added);
									}
								} else {
									return error(3);
								}
							} catch(e) {
								return error(3);
							}
							break;
						
						case "boolean":
							status = false;
							break;
							
						case "function":
							// TO VERIFY
							status = _status;
							// #########
							break;
							
						default:
							return error(4);
							break;
					}                
					liblights[_light] = status;
					/* console */ tlhconsole.log(console_prefix+" Adding "+_light+" as LIBRARY RED LIGHT", 1);
					return true;
				},
				
				
				setLibGreenLight: function (_light, _checkStatus, _doCallback) {
					if (!liblights.hasOwnProperty(_light)) {
						return error(2);
					}
					switch(typeof liblights[_light]) {
						case "object":
							// Do nothing because the only need is to check the object
							break;                    
						case "boolean":
							liblights[_light] = true;
							break;
						case "function":
							// TO VERIFY
							// #########
							break;
						default:
							return error(6);
							break;
					}
					/* console */ tlhconsole.log(console_prefix+" Set green light for property "+_light, 1);
					if (_checkStatus === true) {
						/* console */ tlhconsole.log(console_prefix+" Checking status after greenifying "+_light, 2);
						this.getStatus(_doCallback);
					}
					return true;
					
				},
				
				setGreenLight: function (_light, _checkStatus, _doCallback) {
					if (!lights.hasOwnProperty(_light)) {
						return error(2);
					}
					switch(typeof lights[_light]) {
						case "object":
							// Do nothing because the only need is to check the object
							break;                    
						case "boolean":
							lights[_light] = true;
							break;
						case "function":
							// TO VERIFY
							// #########
							break;
						default:
							return error(6);
							break;
					}
					/* console */ tlhconsole.log(console_prefix+" Set green light for property "+_light, 1);
					if (_checkStatus === true) {
						/* console */ tlhconsole.log(console_prefix+" Checking status after greenifying "+_light, 2);
						this.getStatus(_doCallback);
					}
					return true;
					
				},
				
				removeLight: function (_light) {
					/* console */ tlhconsole.log(console_prefix+" Removing light "+_light, 3);
					if (lights.hasOwnProperty(_light)) {
						lights[_light] = undefined;
						delete lights[_light];
						return true;
					} else {
						return error(2);
					}
				},
				removeLibLight: function (_light) {
					/* console */ tlhconsole.log(console_prefix+" Removing liblight "+_light, 3);
					if (liblights.hasOwnProperty(_light)) {
						liblights[_light] = undefined;
						delete liblights[_light];
						return true;
					} else {
						return error(2);
					}
				},
				
				addExternalLibDependency: function(obj, tlh_property_added) {
					// Do not try to add itself to itself
					if(obj === this) { 
						return (8);                    
					}
					// Do not add empty properties
					if(tlh_property_added === "") { 
						return (9);                    
					}
					_addExternalLibDependency(obj, tlh_property_added);
					return true;
				},
				addExternalDependency: function(obj, tlh_property_added) {
					// Do not try to add itself to itself
					if(obj === this) { 
						return (8);                    
					}
					// Do not add empty properties
					if(tlh_property_added === "") { 
						return (9);                    
					}
					_addExternalDependency(obj, tlh_property_added);
					return true;
				},
				skipLibrary: function(checkStatus) {
					/* console */ tlhconsole.log(console_prefix+" Skipping library download", 1);
					delete lights['library'];
					//lights['library'] = true;
					liblights = {};
					libraryToLoad = "";
					libraryLoadSuccess = function() {};
					libraryLoadError = function() {};
					/* console */ tlhconsole.log(console_prefix+" Must check status before ending library skip? -> "+checkStatus, 3);
					if(checkStatus === true) {
						/* console */ tlhconsole.log(console_prefix+" Checking status", 1);
						this.getStatus(true);
					}
				}
			}
		}
	})();
	try { 
		window.kw_tlhavailable = true;
		document.dispatchEvent(new Event('tlhavailable'));
	} catch(e) {
		try { 
			document.dispatchEvent(new CustomEvent("tlhavailable"));
		} catch(e) {}
	}
}	
if(window.kw_tlh_active === true) {	

	/* ### APPLICATIVE CODE ### */
	function tlhControlObject(_cb, _libUrl, _libCbSuccess, _libCbError, _async) {
		return {"cb":_cb, "libUrl":_libUrl,"libCbSuccess": _libCbSuccess, "libCbError": _libCbError, "async":_async };
	}
	// TLH Single Specific Light Toggle
	function kw_tlh_wt_send() { // Evento send di Webtrekk
		window.kw_tlh_wt_send = null;
		try { window.kw_tlh.webtrekk.setGreenLight("wt_send", true, true); } catch(e) {} 
	}
	function kw_tlh_wt_init() { // Init della libreria di Webtrekk
		window.kw_tlh_wt_init = null;
		try { window.kw_tlh.webtrekk.setGreenLight("wt_init", true, true); } catch(e) {} 
	}
	function kw_tlh_asr() { // AdSetupReal completed
		window.kw_tlh_asr = null;
		
		try { 
			window.kw_cmp_cmpReady = true;
			window.cmpLoadWrapper(true); 
		} catch(e) {
			console.log('%c[head.js] %c SOMETHING WENT WRONG CALLING cmpLoadWrapper', 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');
		}	
		window.kw_tlh.login.setGreenLight("login_info");			
		window.kw_tlh.adsetup.setGreenLight("adsetupreal", true, true);			
	}
	try {
		if(typeof(asr_complete) !== "function") {
			function asr_complete() { // AdSetupReal completed
				window.kw_tlh_asr();
			}
		}
	} catch(e) {
		function asr_complete() { // AdSetupReal completed
			window.kw_tlh_asr();
		}
	}
	function kw_tlh_pw() { // Paywall Assistant Info Now Available
		window.kw_tlh_pw = null;
		try { window.kw_tlh.paywall.setGreenLight("pw_info", true, true); } catch(e) {} 
	}
	function kw_run_webtrekk() {
		console.log("[adsetup.js] Trying to launch kw_run_webtrekk checking webtrekkConfig");
		if(typeof(webtrekkConfig) === "undefined") {
			console.log("[adsetup.js] Retrying to queue kw_run_webtrekk - webtrekkConfig not available");
			setTimeout(kw_run_webtrekk, 50);
			return;
		} else {
			window.kw_run_webtrekk = null;
			if(window.pageAutoRunTracking !== false) { 
				console.log("[adsetup.js] webtrekkConfig AVAILABLE -> launching wt_init");	
				try {  
					window.wt_init(); 
				} catch(e) { 
					console.log(e); 
				} 
			} else {
				try {
					if (typeof pageCallback != 'undefined' && pageCallback != null && eval("typeof " + pageCallback + " == 'function'")) {
						eval(pageCallback + "()");
					}
				} catch(e) {}
				kw_tlh_wt_init();
				kw_tlh_wt_send();
			}
		}
	}
	function kw_webtrekk_complete() {
		// Paywall Related Events - PREMIUM GELOCAL
		try { 
			pw.getStatus(function(ev, args){			
				if(args.status == "blocked" && !isNaN(args.pageviews.blocked)){				
					if(window.WebTrekkUtil) WebTrekkUtil.sendEvent("paywall.view."+args.pageviews.blocked);				
				}			
			});
		} catch(e) {}
	}
	window.recallNeoDataTag = function() {
		if(window.pageHref !== "http://www.repubblica.it/" && window.pageHref !== "https://www.repubblica.it/") {
			//console.log("Recalling NeodataCallback"); 
			try { 
				window.callNeodataTag(); 
			} catch(e) { 
				//console.log("NeodataCb still not avail. Set timeout"); 
				setTimeout(window.recallNeoDataTag, 500); 
			}
		}
	}
	function neodataComplete() {
		try { 
			window.callNeodataTag(); 
		} catch(e) { 
			//console.log("NeodataCb still not avail. Set timeout"); 
			setTimeout(window.recallNeoDataTag, 500); 
		}
	}
	function kw_tlh_wtPremiumManager_dataFormatted() {
		window.kw_tlh.webtrekk_premium_manager.setGreenLight("premium_data_formatted", true, true);
	}
	
	window.loadWidgetsTaboola = function() {
		console.log('%c[head.js] %c DomContentLoaded called for TABOOLA inside LoadWidgetsTaboola', 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');
		if(kw_tlh_configs.hasOwnProperty("taboola_library") === true) {        
			console.log('%c[head.js] %c EXECUTING TABOOLA_LIBRARY inside LoadWidgetsTaboola', 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');
			window.kw_tlh.taboola_library.execute();
		} else {
			console.log('%c[head.js] %c EXECUTING TABOOLA_WIDGETS inside LoadWidgetsTaboola', 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');
			window.kw_tlh.taboola_widgets.execute();
		}
		try { 
			document.removeEventListener("touchmove", window.loadWidgetsTaboola, {passive: true});
		} catch(e) {
			document.removeEventListener("touchmove", window.loadWidgetsTaboola);
		}
	}
	
	// TLH Greenified Object Callbacks
	var kw_tlh_configs = {};
	kw_tlh_configs.adsetup = tlhControlObject(null, undefined, null, null, null);
	
	
	if(window.kw_tlh_activeBrand == "businessinsider") {
		kw_tlh_configs.taboola_widgets = tlhControlObject(null, "https://www.repstatic.it/cless/common/taboola/taboola_"+window.kw_tlh_activeHost+".js?v=1", null, null, true);
	} else if(kw_tlh_isVideoFE && (window.kw_tlh_activeBrand == "gelocal" || window.kw_tlh_activeBrand == "ilsecoloxix")) {
		kw_tlh_configs.taboola_library = tlhControlObject(null, "https://cdn.taboola.com/libtrc/groupoespresso-network/loader.js", null, null, true);
		kw_tlh_configs.taboola_widgets = tlhControlObject(null, "https://www.repstatic.it/cless/common/taboola/taboola_"+window.kw_tlh_activeHost+".js?v=1", null, null, true);
	} else if(window.kw_tlh_activeBrand == "deejay") {
		kw_tlh_configs.taboola_library = tlhControlObject(null, "https://cdn.taboola.com/libtrc/gruppoespresso-deejay/loader.js", null, null, true);
		kw_tlh_configs.taboola_widgets = tlhControlObject(null, "https://www.repstatic.it/cless/common/taboola/taboola_"+window.kw_tlh_activeHost+".js?v=1", null, null, true);
	} else if(window.kw_tlh_activeBrand == "lastampa") {
		kw_tlh_configs.taboola_library = tlhControlObject(null, "https://cdn.taboola.com/libtrc/gedi-lastampa/loader.js", null, null, true);
		kw_tlh_configs.taboola_widgets = tlhControlObject(null, "https://www.repstatic.it/cless/common/taboola/taboola_"+window.kw_tlh_activeHost+".js?v=2a", null, null, true);
	}
	
	kw_tlh_configs.kwdnt = tlhControlObject(null, undefined, null, null, true);   
	if(window.kw_tlh_activeHost != "limesonline") {
		kw_tlh_configs.webtrekk_premium_manager = tlhControlObject(null, "https://www.repstatic.it/cless/common/stable/js/script/wt/wt_premium_manager.js?ver=14", function() { window.webtrekk_premium_manager.setup(); }, kw_tlh_wtPremiumManager_dataFormatted, true);   
	} else {
		kw_tlh_configs.limes_wt_premium = tlhControlObject(null, "//www.limesonline.com/edicola/manager?service=web.trekk.info", null, null, true);
	}
	if(window.pageHref !== "http://www.repubblica.it/" && window.pageHref !== "https://www.repubblica.it/") { // Eccezione per homepage di Repubblica.it che ha mapping hardcoded in pagina
		if(window.kw_tlh_activeBrand == "businessinsider") {
            kw_tlh_configs.webtrekk_mapping = tlhControlObject(null, "https://scripts.kataweb.it/wt/wt.js?__wt_section="+(window.__wt_section ? encodeURIComponent(window.__wt_section.toLowerCase()) : ""), null, null, true);
		} else {
			kw_tlh_configs.webtrekk_mapping = tlhControlObject(null,"https://scripts.kataweb.it/wt/wt.js?pageurl="+encodeURIComponent(location.href.toString()),null,null);
		}
	}
	
	// SETUP COMMON
	kw_tlh_configs.webtrekk = tlhControlObject(window.kw_webtrekk_complete, "https://www.repstatic.it/minify/sites/common/config_webtrekk_01.cache.php?name=webtrekk_441_4", window.kw_run_webtrekk, null, true);     
	
	kw_tlh_configs.login = tlhControlObject(null, undefined, null, null, true);
	if(window.kw_tlh_activeBrand === "lanuovasardegna" && window === window.top) {
		kw_tlh_configs.nielsen = tlhControlObject(null, "https://www.repstatic.it/cless/common/stable/include/nielsen/nielsen_static_lanuovasardegna.js", null, null, true);
	}
	
	if(window.kwloggeduser === true && window.wt_device_type == "mobile" && window.location.toString().indexOf(".repubblica.it") > -1) {
		try {
			var userNavId = cookie_handler.getCookie("navid");
			var contentId = window.location.toString().match(/https?:\/\/(.*)\/(.*)-([0-9]{3,})(\/?)(.*)/);
			if(contentId !== null && contentId[3] !== null) {
				kw_tlh_configs.cwevents = tlhControlObject(null, "https://scripts.kataweb.it/cwevents.js?action=open&id="+contentId[3]+"&hashid="+userNavId, null, null, true);    
			} 
		} catch(e) {
			
		}
	}
	
	kw_tlh_configs.chartbeat = tlhControlObject(function() { window.loadChartbeat(); }, "https://www.repstatic.it/cless/common/chartbeat/chartbeat_v4.js?ver=5", null, null, true);    
	kw_tlh_configs.paywall = tlhControlObject(null, undefined, null, null, true);        
	if(!kw_tlh_isVideoFE) {
		kw_tlh_configs.neodata = tlhControlObject(window.neodataComplete, undefined, null, null, true);
	}

	
	// TLHs Configuration
	window.kw_tlh = {};
	if(kw_tlh_configs.hasOwnProperty("adsetup") === true) {
		window.kw_tlh.adsetup = new tlhl("adsetup", kw_tlh_configs.adsetup);
		window.kw_tlh.adsetup.addRedLight("adsetupreal");
	}
	
	if(kw_tlh_configs.hasOwnProperty("nielsen") === true) {
		window.kw_tlh.nielsen = new tlhl("nielsen", kw_tlh_configs.nielsen);
		window.kw_tlh.nielsen.execute();
	}
	window.kw_tlh.kwdnt = new tlhl("kwdnt", kw_tlh_configs.kwdnt);
	window.kw_tlh.kwdnt.addRedLight("infoprivacy"); 
	
    if(kw_tlh_configs.hasOwnProperty("login") === true) {        
		window.kw_tlh.login = new tlhl("login", kw_tlh_configs.login);
		window.kw_tlh.login.addRedLight("login_info");
        window.kw_tlh.login.addRedLight("adsetup", window.kw_tlh.adsetup);
	}
	
	if(kw_tlh_configs.hasOwnProperty("cwevents") === true) {        
		window.kw_tlh.cwevents = new tlhl("cwevents", kw_tlh_configs.cwevents);
		window.kw_tlh.cwevents.addLibRedLight("login", window.kw_tlh.login);
	}
	
	if(kw_tlh_configs.hasOwnProperty("webtrekk_premium_manager") === true) {
		window.kw_tlh.webtrekk_premium_manager = new tlhl("webtrekk_premium_manager", kw_tlh_configs.webtrekk_premium_manager);
        window.kw_tlh.webtrekk_premium_manager.addLibRedLight("adsetup", window.kw_tlh.adsetup);        
		window.kw_tlh.webtrekk_premium_manager.addRedLight("premium_data_formatted");        
	}
	if(kw_tlh_configs.hasOwnProperty("limes_wt_premium") === true) {
		window.kw_tlh.limes_wt_premium = new tlhl("limes_wt_premium", kw_tlh_configs.limes_wt_premium);
        window.kw_tlh.limes_wt_premium.addLibRedLight("adsetup", window.kw_tlh.adsetup);		
	}
	
	if(kw_tlh_configs.hasOwnProperty("webtrekk_mapping") === true) {
		window.kw_tlh.webtrekk_mapping = new tlhl("webtrekk_mapping", kw_tlh_configs.webtrekk_mapping);
		window.kw_tlh.webtrekk_mapping.addLibRedLight("adsetup", window.kw_tlh.adsetup);
	}

	if(kw_tlh_configs.hasOwnProperty("webtrekk") === true) {
		window.kw_tlh.webtrekk = new tlhl("webtrekk", kw_tlh_configs.webtrekk);		
		if(kw_tlh_configs.hasOwnProperty("webtrekk_premium_manager") === true) {
			window.kw_tlh.webtrekk.addLibRedLight("webtrekk_premium_manager", window.kw_tlh.webtrekk_premium_manager);	
		}
		if(kw_tlh_configs.hasOwnProperty("limes_wt_premium") === true) {
			window.kw_tlh.webtrekk.addLibRedLight("limes_wt_premium", window.kw_tlh.limes_wt_premium);	
		}
		if(kw_tlh_configs.hasOwnProperty("webtrekk_mapping") === true) {
			window.kw_tlh.webtrekk.addLibRedLight("webtrekk_mapping", window.kw_tlh.webtrekk_mapping);
		}		
		if(kw_tlh_configs.hasOwnProperty("adsetup") === true) {
			window.kw_tlh.webtrekk.addLibRedLight("adsetup", window.kw_tlh.adsetup);    
		}
		window.kw_tlh.webtrekk.addRedLight("wt_init");
		window.kw_tlh.webtrekk.addRedLight("wt_send");
	}
	
	if(kw_tlh_configs.hasOwnProperty("chartbeat") === true) {
		window.kw_tlh.chartbeat = new tlhl("chartbeat", kw_tlh_configs.chartbeat);
		if(kw_tlh_configs.hasOwnProperty("webtrekk_premium_manager") === true) {
			window.kw_tlh.chartbeat.addLibRedLight("wt_premium_manager", window.kw_tlh.webtrekk_premium_manager);
		}
		if(kw_tlh_configs.hasOwnProperty("webtrekk_mapping") === true) {
			window.kw_tlh.chartbeat.addLibRedLight("webtrekk_mapping", window.kw_tlh.webtrekk_mapping);
		}
		window.kw_tlh.chartbeat.execute();
	}
	
	if(kw_tlh_configs.hasOwnProperty("taboola_library") === true) {        
		window.kw_tlh.taboola_library = new tlhl("taboola_library", kw_tlh_configs.taboola_library);
		
	}
	if(kw_tlh_configs.hasOwnProperty("taboola_widgets") === true) {        		
		window.kw_tlh.taboola_widgets = new tlhl("taboola_widgets", kw_tlh_configs.taboola_widgets);
		//window.kw_tlh.taboola_widgets.addRedLight("webtrekk", window.kw_tlh.webtrekk);
		if(kw_tlh_configs.hasOwnProperty("taboola_library") === true) { 
			window.kw_tlh.taboola_widgets.addLibRedLight("taboola_library", window.kw_tlh.taboola_library);        
		}
		window.kw_tlh.taboola_widgets.addRedLight("kwdnt", window.kw_tlh.kwdnt); 
		if(!kw_tlh_isVideoFE) {
			console.log('%c[head.js] %c Handling TABOOLA - Devie: '+window.wt_device_type+' - ReadyState: '+document.readyState, 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');
			if(window.wt_device_type === "mobile") {
				try {
					document.addEventListener("touchmove", window.loadWidgetsTaboola, {passive: true});
				} catch(e) {
					document.addEventListener("touchmove", window.loadWidgetsTaboola);
				}
			} else {
				if(document.readyState != "loading") {
					console.log('%c[head.js] %c LOADING TABOOLA ReadyState is not loading =>  '+document.readyState, 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');
					window.loadWidgetsTaboola();
				} else {
					console.log('%c[head.js] %c Setting DomContentLoaded for TABOOLA ReadyState is loading =>  '+document.readyState, 'padding: 2px; background: yellow; color: #000', 'padding: 2px; color: #00F');
					document.addEventListener("DOMContentLoaded", function() { window.loadWidgetsTaboola(); });        						
				}
			}
		}
	}
	if(window.kwdnt != -1) {
		window.kw_tlh.kwdnt.setGreenLight("infoprivacy", true, true);
	}
	if(kw_tlh_configs.hasOwnProperty("paywall") === true) {
		window.kw_tlh.paywall = new tlhl("paywall", kw_tlh_configs.paywall);
		window.kw_tlh.paywall.addRedLight("pw_info");
	}

	if(kw_tlh_configs.hasOwnProperty("neodata") === true) {
		window.kw_tlh.neodata = new tlhl("neodata", kw_tlh_configs.neodata);
		if(kw_tlh_configs.hasOwnProperty("adsetup") === true) {
			window.kw_tlh.neodata.addRedLight("adsetup", window.kw_tlh.adsetup);
		}
		if(kw_tlh_configs.hasOwnProperty("paywall") === true) {
			window.kw_tlh.neodata.addRedLight("paywall", window.kw_tlh.paywall);
		}
		if(kw_tlh_configs.hasOwnProperty("login") === true) {
			window.kw_tlh.neodata.addRedLight("login", window.kw_tlh.login);
		}
		if(kw_tlh_configs.hasOwnProperty("webtrekk") === true) {
			window.kw_tlh.neodata.addRedLight("webtrekk", window.kw_tlh.webtrekk);    
		}    
	}
	
}
try {
	window.kw_tlhready = true;	
	document.dispatchEvent(new Event('tlhready')); 
} catch(e) {
	try { 
		document.dispatchEvent(new CustomEvent("tlhready"));
	} catch(e) {}
}


//Cookie Policy
(function(){
	

	var basePrivacy = "https://login.kataweb.it/static/privacy";
	var basePrivacyRegExp = new RegExp("http(s?)\:\/\/login\.kataweb\.it\/static\/privacy");
	window.nuovasardegna_excl_regexp = /^http(s)?\:\/\/(test\.|pre\.|test\.video\.|video\.|www\.)lanuovasardegna\.it/;
    var loadWrapper = function(script, fn, errfn) {
        //console.log("[AsyncAdSetup] loadWrapper...."+script);
        if(window.kwasyncsetup === true) {
            //console.log("[AsyncAdSetup] Async Active");
            loadAsync(script, fn, errfn);
        } else {
            //console.log("[AsyncAdSetup] Sync Active");
            if(script === undefined) {
                fn();
            } else {
                loadSync(script, fn);
            }
        }
    }

    var ready = function (fn) {
        //console.log("[AsyncAdSetup] ready function");
        if(window.kwasyncsetup === true) {
            //console.log("[AsyncAdSetup] Async executing of callback");
            fn();
        } else {
            //console.log("[AsyncAdSetup] Sync Ready Waiting for DomReady");
            if (document.readyState == 'complete') {
                fn();
            } else if (document.addEventListener) {
                document.addEventListener('DOMContentLoaded', fn);
            } else {
                document.attachEvent('onreadystatechange', function () {
                    if (document.readyState == 'complete')
                        fn();
                });
            }
        }
    }

	var loadEl = function(el, fn){
	  if(el.readyState){
		if(el.readyState == 'loaded' || el.readyState == 'complete') fn();
		else {
			el.onreadystatechange = function() {
				if (this.readyState == 'loaded' || this.readyState == 'complete') {
					this.onreadystatechange = null;
					fn();
				}
			};  
		}
	  } else {
	  	el.onload = fn
	  }
	}

	var loadAsync = function(script, fn, errfn){
		var s = document.createElement('script');
		s.type = 'text/javascript';
		s.src = script;
		s.async = true;

                if(errfn) { s.onerror = errfn; }
		if(fn) loadEl(s, fn)

		document.getElementsByTagName('head')[0].appendChild(s);
	}

	var loadSync = function(script, fn){
		if(script){
			
			document.write("<script src='" + script + "'></script>");
		}
		if(fn){
			window.onLoadSync = function(){
				fn();
				//delete window.onLoadSync;
			}
			document.write("<script>window.onLoadSync();</script>");
		}
	}
	
	var addListener = function(el , name, fn){
		if(el.attachEvent){
		
		   el.attachEvent("on" + name, fn);

	    } else if(el.addEventListener){
	    	
	    	el.addEventListener(name, fn, 0);
	    	
	    } else {
	    	el["on" + name] = fn
	    }
		
	}
	addListener(window, "unload", function(){});

	var onready = function(){

		var onscript = function(){
			if(window.kwCookiePolicy) kwCookiePolicy();
		}
		if(window.location.href.match(window.nuovasardegna_excl_regexp)) {
			loadAsync(basePrivacy + "/js/info-breve_nuovasardegna.js", onscript);
		} else {
			loadAsync(basePrivacy + "/js/info-breve.js", onscript);
		}
	};
	
	window.kwPrivacyLink = function(gotochoice){
            var ret = basePrivacy + "/";
            var link = this.href;
            var regMatch = basePrivacyRegExp;
            var matchResult = regMatch.test(this.href.toString().split("?")[0]);
            if(matchResult === true) {
                ret = link;
            }
            ret += (ret.indexOf("?")>=0) ? "&" : "?";
            ret += "backurl=" + encodeURIComponent(window.location.href.toString().split("#")[0]);
            if(gotochoice) {
                ret += "#kwdnt-form";
            }
            this.href = ret;
	}
	
	window.kwdntBlocked = function(id, fn){
		if(!id || window.kwdnt === 0) return;
		loadAsync(basePrivacy + "/js/blocked/dnt/" + id + ".js", fn);
	}
	
	// Link Footer 
	var kwPrivacyLink = function(){
			var footerLink = document.getElementById('kw-privacy-link');
			
			if ( footerLink != null){
				
				footerLink.onclick = function(ev){ 
					window.kwPrivacyLink.call(footerLink, false);
				};
			}
	}	
	
	
	var deleteRedir = function(){
		var d = document.domain.split(".");
		d = d.slice(d.length-2);
		d = "." + d.join(".")
		
		var exp = new Date(0).toUTCString();
		exp = "expires=" + exp;
		document.cookie = "kwdnt-redir-c=0; domain=" + d + "; path=/; " + exp;
	}

	var setRedir = function(c){
		
		var d = document.domain.split(".");
		d = d.slice(d.length-2);
		d = "." + d.join(".")
		
		var exp = new Date().getTime() + 1000 * 60 * 60 * 24 * 7; 
		exp = new Date(exp).toUTCString();
		exp = "expires=" + exp;
		document.cookie = "kwdnt-redir-c=" + c + "; domain=" + d + "; path=/; " + exp;
		
		var c1 = document.cookie;
		if(c1.indexOf(exp)>=0) return false;		
		var c1 = c1.match(/kwdnt\-redir\-c=([0-9]+)/);
		if(c1 && c1[1]){
			c1 = parseInt(c1[1]);
		}
		return c1 === c;
	}
	
	var getRedir = function(){
		var c = document.cookie.match(/kwdnt\-redir\-c=([0-9]+)/);
		if(c && c[1]){
			c = parseInt(c[1]);
		}
		if(c!==null && isNaN(c)) c=null;
		return c;
	}
	
	var checkRedirAndCookiesEnabled = function(){
		var c = getRedir();
		window.kw_cookie_enabled = c !== null;
		if(c===null){

			var success = setRedir(0);
			window.kw_cookie_enabled = success;
			if(!success) window.kwdnt = 2;
			return success;
			
		} else {
			var success = c<2;
			window.kw_max_redirect_reached = !success;
			return success;
		}
	}
				
        var containsScript = function(src){
            var scripts = document.getElementsByTagName('script');
            for(var i=0;i<scripts.length;i++){
                var script = scripts[i];
                if(script.src && script.src.indexOf(src) >= 0){
                        return true;
                }
            }
            return false;
        }

	window.initInfoPrivacy = function() {
		var excludedHostRegExp =  /^http(s?)\:\/\/(natgeotv\.nationalgeographic|(www\.|m\.)huffingtonpost)?\.(it|com)/;
		var currHostLocation = window.location.href.toString().split("?")[0];
		var dnvShortInfo = excludedHostRegExp.test(currHostLocation);    
		var viewShortInfo = (window.kwdnt===-1 && window.kwInfoPrivacy !== false && window.top == window && !window.kw_max_redirect_reached) && (!dnvShortInfo);
		if(viewShortInfo){
		        ready(onready);
		}
		if(window.kwdnt === 0 || window.kwdnt === 1){
			deleteRedir();
		}
	}

	// Codice per brandizzare la sorgente UpDay	
var rep =  /^https?:\/\/(.*)?\.repubblica\.it/;
var excludedRep = /^https?:\/\/(tangeri\.|rep\.|quotidiano\.){1}repubblica\.it/;
var excludedRep_2 = /^https?:\/\/www\.repubblica\.it\/(oncologia|speciali\/sportsenzabarriere|dossier\/salute)/;
var currentPage = window.location.href.toString();

if(currentPage.match(rep) && (!currentPage.match(excludedRep) && !currentPage.match(excludedRep_2))  && currentPage.indexOf("ref=uppr") > -1) {
	document.addEventListener("DOMContentLoaded", function() {        
		console.log('%c[adsetup.js] %cDOM CONTENT LOADED - UpDay DOM READY Handler', 'padding: 2px; background: green; color: #FFF', 'padding: 2px; color: #00F');
		try {
			var hook = document.querySelectorAll("aside.tags")[0];
			var hookClass = "tags";
			if(hook === undefined) {		
				var hook = document.querySelectorAll("aside.content-tags")[0];	
				var hookClass = "content-tags";
			}
			if(hook === undefined) {		
				var hook = document.querySelectorAll("div.detail_tag")[0];	
				var hookClass = "detail_tag";
			}
			if(hook === undefined && document.querySelectorAll("div.detail_body").length > 0) {
				var hook = document.querySelectorAll("div.detail_body")[0];	
				var elToAdd = "<div class='with-upday' style='text-align:center;font-size:13px;color: #838383;'><br><br><em><strong>Repubblica </strong> per <strong>Upday </strong></em><br><br></div>";
				hook.insertAdjacentHTML('afterend', elToAdd);
				return;
			}				
			if(hook === undefined) {
				console.log('%c[adsetup.js] %cDOM CONTENT LOADED - ERROR setting UpDay DIV - Hook div not found in page', 'padding: 2px; background: green; color: #FFF', 'padding: 2px; color: #00F');		
				return;
			}
			var elToAdd = "<div class='with-upday' style='text-align:center;font-size:13px;color: #838383;'><br><br><em><strong>Repubblica </strong> per <strong>Upday </strong></em><br><br></div>";
			var hookHtml =  hook.innerHTML;
			hook.outerHTML = elToAdd+'<aside class="'+hookClass+'">'+hookHtml+'</aside>';
			console.log('%c[adsetup.js] %cDOM CONTENT LOADED - UpDay DIV COMPLETE', 'padding: 2px; background: green; color: #FFF', 'padding: 2px; color: #00F');
		} catch(e) {
			console.log('%c[adsetup.js] %cDOM CONTENT LOADED - ERROR setting UpDay DIV - Something went wrong', 'padding: 2px; background: green; color: #FFF', 'padding: 2px; color: #00F', e);
		}
	});
}
	
	function checkAdMantxResponse() {
	try { 
		if(window.ADX_CAT_1 == "processing") { 
			window.ADX_CAT_1 = "";
		}
		if(window.ADX_CAT_2 == "processing") { 
			window.ADX_CAT_2 = ""
		}
		if(window.ADX_CAT_3 == "processing") {
			window.ADX_CAT_3 = ""
		}
		if(window.ADX_CAT_4 == "processing") {
			window.ADX_CAT_4 = ""
		}
	} catch(e) {
		
	}		
}
function loadAdmantx() { 
	try {
		// START ADMANTX INCLUDE
		if(window !== window.top) {
			return;
		}
		
		var pageUrl = window.location.href.toString().split("?")[0];
		var pageUrl = pageUrl.split("index.html")[0];

		if(pageUrl == "https://www.repubblica.it/" ) {
			return;
		}
		
		var canonical = "";
		var links = document.getElementsByTagName("link");
		for (var i = 0; i < links.length; i ++) {
			if (links[i].getAttribute("rel") === "canonical") {
				canonical = links[i].getAttribute("href")
			}
		}
		if(canonical === "") {
			canonical = window.location.href.toString().split("?")[0];
		}
		
		try {
			if(canonical.indexOf("https:") !== 0 && canonical.indexOf("http:") !== 0) {
				if(canonical.indexOf("//") === 0) {
					canonical = window.location.protocol+canonical;
				} else {
					canonical = window.location.protocol+"//"+canonical;	
				}
			} 
		} catch(e) {
			canonical = window.location.href.toString().split("?")[0];
		}
		console.log("[adsetup.js] Calling AdMantx....", canonical);
		var kw_admantixUrl = 'https://euasync01.admantx.com/admantx/service?request={"key":"2cfe26aac603d2cc3b4d5fa2ed6b8f51f863acef0388c83a56c76011b639eb2f","method":"descriptor","mode":"async","decorator":"template.manzoni","filter":"default","type":"URL","body":'+canonical+'}';

		var admntx = document.createElement('script');
		admntx.type = 'text/javascript';
		admntx.src = kw_admantixUrl;
		admntx.async = true;
		admntx.onload = checkAdMantxResponse;
		//s.onerror = addAdMantixToKruxError;
		document.getElementsByTagName('head')[0].appendChild(admntx);
	} catch(e) {}
	// END ADMANTX INCLUDE
}
try {
	if(window.kwLoadAdMantx === true) {
		loadAdmantx();
	}
} catch(e) {
	loadAdmantx();
}

	// START REMARKETING
var include_remarketing = location.href.match(/^https?:\/\/(iltirreno|mattinopadova|messaggeroveneto|ilcentro|lanuovasardegna)\.gelocal\.it((\/[^\/]+)?(?!\/ricerca)(\/[^\/]+)?\/?)(\?.*)?$/);

if (window.kwdnt === undefined || window.kwdnt === 0 || window.kwdnt === 1) {
    if (include_remarketing) {
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','//connect.facebook.net/en_US/fbevents.js');
        fbq('init', '247428115450514');
        fbq('track', "PageView");

        var google_conversion_id = 967792575;
        var google_custom_params = window.google_tag_params;
        var google_remarketing_only = true;
        if(typeof loadAsync=="function") loadAsync('//www.googleadservices.com/pagead/conversion.js');

    }
}
// END REMARKETING

	
	try {
	/* Start Google Tag Manager */
	var kw_google360_domains = /^https?:\/\/((m\.)?iltirreno\.gelocal\.it|video\.gelocal\.it\/iltirreno|ricerca\.gelocal\.it\/ricerca\/iltirreno\-it|(video\.)?it\.businessinsider\.com)/;
	if(window.location.href.match(kw_google360_domains)) {
		(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-T8M296P');
	}
	/* End Google Tag Manager */
} catch(e) {
	console.log("Error Setting Google 360 Tag");
	console.log(e);
}		

		var getScriptURL = function(base) {
	    var scripts = document.getElementsByTagName('script');
	    var url = null;
	    for(var i=0;i<scripts.length;i++){
	    	var script = scripts[i];
	    	if(script.src && script.src.indexOf(base) >= 0){
	    		url = script.src;
	    		break;
	    	}
	    }
	    return url;
	};
	
	try  {
		
		if(window.location.href.match(window.nuovasardegna_excl_regexp)) {
			var base = "//oasjs.lanuovasardegna.it/adsetup.js";	
		} else {
			if(window.location.href.toString().indexOf("//www.capital.it/") > -1 || window.location.href.toString().indexOf("//video.tvzap.kataweb.it/") > -1 || window.location.href.toString().indexOf("//tvzap.kataweb.it/") > -1 || window.location.href.toString().indexOf("//www.3nz.it/") > -1) {
				var base = "//oasjs.kataweb.it/adsetup_pcmp.js";
			} else {
				var base = "//oasjs.kataweb.it/adsetup.js";
			}
		}
	} catch(e) {
		var base = "//oasjs.kataweb.it/adsetup.js";
	}
	var url = getScriptURL(base);
	var qs = "?";
	if(url && url.indexOf("?")>=0) qs = url.substring(url.indexOf("?")) + "&";

    var doInfoPrivacy = function () {
       //console.log("[AsyncAdSetup] Doing InfoPrivacy");
        window.initInfoPrivacy();
		try {
			window.kw_tlh.kwdnt.setGreenLight("infoprivacy", true, true); 
		} catch(e) {
			console.log("[AsyncAdSetup] Unable to brodcast kwdnt ready to TLH")
		}
        loadAdsetupReal();
    }

    var infoPrivacyBlocked = function() {
        window.kwdnt = undefined;
        try {
            asr_error();
        } catch(e) {}
    }

    var loadAdsetupReal = function () {
        //console.log("[AsyncAdSetup] loading loadAdSetupReal  ==>> "+window.kwLoadAdSetupReal);
        if (window.kwLoadAdSetupReal !== false) {
            try {
				qs = qs.replace(/'/g, "\\'");
				qs = qs.replace(/%2C/g, ",");
				qs=decodeURI(qs);
				qs=encodeURI(qs);
			} catch(e) {
				
			}
			console.log("[AsyncAdSetup] tags:  ==>> "+qs);
            loadWrapper("//oasjs.kataweb.it/adsetup.real.js" + qs + "ts=" + new Date().getTime());
			
        }
    }

    var onkataweb = function () {
        var oasdomains = {"businessinsider.com": "it.businessinsider.com", "lanuovasardegna.it": "lanuovasardegna.it"};
        //console.log("[AsyncAdSetup] onkataweb callback executed");
        if(window.kwasyncsetup === true) {
            /* ## ASYNC CODE START */
            try {
                var fld = document.domain.split(".");
                fld = fld.slice(fld.length - 2);
                fld = fld.join(".");
                if (fld in oasdomains)
                    fld = oasdomains[fld];
            } catch (e) {
                var fld = document.domain.split(".");
                fld = fld.slice(fld.length - 2);
                fld = fld.join(".");
            }
            try {
                if (window.kwdnt === -1 && fld != "kataweb.it") {
                    //console.log("[AsyncAdSetup] Loading kwdnt Asynch");
                    loadAsync("//oasjs." + fld + "/cookielex/kwdnt.js?ts=" + new Date().getTime(), doInfoPrivacy, infoPrivacyBlocked);
                } else {
                    //console.log("[AsyncAdSetup] doInfoPrivacy");
                    doInfoPrivacy();
                }
            } catch (e) {
                //console.log("[AsyncAdSetup] doInfoPrivacy");
                doInfoPrivacy();
            }
            /* ## ASYNC CODE END */
        } else {
            /* ## SYNC CODE START */
            if (window.kwdnt === -1) {
                var fld = document.domain.split(".");
                fld = fld.slice(fld.length - 2);
                fld = fld.join(".")
                if (fld in oasdomains)
                    fld = oasdomains[fld];
                if (fld != "kataweb.it") {
                    loadSync("//oasjs." + fld + "/cookielex/kwdnt.js?ts=" + new Date().getTime());
                }
            }
            //console.log("[AsyncAdSetup] Sync loading initInfoPrivacy");
            loadSync(undefined, initInfoPrivacy);
            //console.log("[AsyncAdSetup] Sync loading adsetupreal");
            loadAdsetupReal();
            /* ## SYNC CODE END */
        }
    }

	checkRedirAndCookiesEnabled();

	if(window.kw_cookie_enabled){
		if(window.location.toString().indexOf(".lanuovasardegna.it")  === -1) {
			loadWrapper("//oasjs.kataweb.it/cookielex/kwdnt.js?ts=" + new Date().getTime(), onkataweb, infoPrivacyBlocked);
		} else {
			loadWrapper("//oasjs.lanuovasardegna.it/cookielex/kwdnt.js?ts=" + new Date().getTime(), onkataweb, infoPrivacyBlocked);
		}
	
	} else {
		
	loadAdsetupReal();
	}

	if(window.kwasyncsetup === true) {
		addListener(window, "load", kwPrivacyLink);
	} else {
		ready(kwPrivacyLink);
	}
})();
//fine cookie policy
