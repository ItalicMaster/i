

		
	window.onload = function() {
		newsletterGedi.injectFrame();
	}; 
	
(function(){
		var newsletterGedi = {"targetDomain" :"https://login.kataweb.it", 
			                  "origin"       :"widget",
							  "hiddenPreview":"N",}
		var eventMethod    = window.addEventListener ? "addEventListener" : "attachEvent";
		var eventer        = window[eventMethod];
		var messageEvent   = eventMethod == "attachEvent" ? "onmessage" : "message";
		
		var initNewsletterGediConf =  function(){
			if (window.nlgConf.targetDomain)  newsletterGedi.targetDomain  = window.nlgConf.targetDomain;
			if (window.nlgConf.origin)        newsletterGedi.origin        = window.nlgConf.origin;
		}
	
		newsletterGedi.injectFrame  = function() {
			
			var srcfatherurl = window.location.href+window.location.search;
			initNewsletterGediConf();
			var iframes = window.nlgConf.iframes;
			for(var i = 0; i < iframes.length; i += 1) {
			var ifr = iframes[i];
			var iframe_page = "";
			iframe_page += newsletterGedi.targetDomain + "/registrazione/newsletterwidget/launcher.html?service=nlwd.start";
			iframe_page += "&widgetListId=" + ifr.widgetListId;
            if (ifr.widgetListDist)  iframe_page += "&widgetListDistr="+ifr.widgetListDist;
            if (ifr.origin)  iframe_page += "&origin=" + ifr.origin; else iframe_page += "&origin=" + newsletterGedi.origin;
			if (ifr.hiddenPreview)iframe_page += "&hiddenPreview=" + ifr.hiddenPreview;
			iframe_page += "&ifid=form-iframe-"+i;
			iframe_page += "&targetDomain="+newsletterGedi.targetDomain;
			iframe_page += "&srcfatherurl="+encodeURIComponent(srcfatherurl);
			iframe_page += "&position="+ifr.position;
			if (ifr.optbackur)       iframe_page += "&optbackurl=" + encodeURIComponent(ifr.optbackurl);
			if (ifr.cbfunc)       iframe_page += "&cbfunc=" + ifr.cbfunc;


			console.log("PAR IFRAME_PAGE "+iframe_page);
			iframe = '<iframe id="form-iframe-'+i+'" name="nl-frame-'+i+'" style="margin:0; width:100%; height:0px; border:none; overflow:hidden;" scrolling="no" src="' + iframe_page + '"></iframe>';
			if (document.getElementById(ifr.targetIFrame)!=null)
			  {
				document.getElementById(ifr.targetIFrame).innerHTML = iframe; 
			  }
			}
		  }


		window.newsletterGedi = newsletterGedi;
		// Listen for a message from the iframe.
		eventer(messageEvent, function(e) {
			// funzione che ridimensiona la visualizzazione dell' iFrame
			if (e.origin !== newsletterGedi.targetDomain ) return;
			// Parse message back to json
			var messageObject = JSON.parse(e.data);
			var source = e.source;
			if (messageObject.cbfunc!=null && messageObject.cbfunc!='')
			  {
				var fn = window[messageObject.cbfunc];
				if (typeof fn === "function") fn();
			  }
			if (document.getElementById(messageObject.idiframe)!=null)
			  {
				document.getElementById(messageObject.idiframe).style.height = (messageObject.size) + 'px';
			  }
		}, false);
		
	 
})();












_targetDomain = 'https://login\.kataweb\.it';
_origin_sidebar = '';

_position_sidebar = '300';
_widgetListId_sidebar = ["rep_widget"];
_widgetListDist_sidebar = [100];
_targetIFrame_sidebar = 'gedi-newsletter-1';

_position_content = '';
_widgetListId_content = [];
_widgetListDist_content = [];
_targetIFrame_content = '';


window.nlgConf = {
    "targetDomain": _targetDomain,
    "origin": _origin_sidebar,
    "iframes":[]
};

if (_position_sidebar !== '' && _widgetListId_sidebar !== '' && _widgetListDist_sidebar !== '' && _targetIFrame_sidebar !== ''){
    window.nlgConf.iframes.push(
        {
            "position" : _position_sidebar,
            "widgetListId": _widgetListId_sidebar,
            "widgetListDist": _widgetListDist_sidebar,
            "targetIFrame": _targetIFrame_sidebar
        }
    )
    }

if (_position_content !== '' && _widgetListId_content !== '' && _widgetListDist_content !== '' && _targetIFrame_content !== ''){
    window.nlgConf.iframes.push(
        {
            "position" : _position_content,
            "widgetListId":_widgetListId_content,
            "widgetListDist":_widgetListDist_content,
            "targetIFrame": _targetIFrame_content
        }
    )
}
