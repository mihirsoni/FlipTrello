var TRELLO = TRELLO || {};
(function(){
	TRELLO.utils = {
		//Guid Generator
		guid: function(){
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	         s4() + '-' + s4() + s4() + s4();	
		},
	 	getFormattedTime: function(dateTime){
	 		var timeStamp = new Date(dateTime);
			var timeStampHours = timeStamp.getHours(),
					timeStampMinutes = timeStamp.getMinutes();
			
			timeStampHours = timeStampHours < 10 ? ("0"+timeStampHours) : timeStampHours;
			timeStampMinutes = timeStampMinutes < 10 ? ("0"+timeStampMinutes) : timeStampMinutes;
			return timeStampHours + ":" + timeStampMinutes;
		}
	};
	//
	var utils = TRELLO.utils;
	//Based on the type event handler supported by browser assign appropriate methods
//	var newHandle = function(event) { handle(event, ); };
	if (typeof window.addEventListener === 'function') {
		utils.addListener = function (el, type, fn) {
			el.addEventListener(type, fn, false);
		};
		utils.removeListener = function (el, type, fn) {
			el.removeEventListener(type, fn, false);
		};
	} else if (typeof document.attachEvent === 'function') { // IE
		utils.addListener = function (el, type, fn) {
			el.attachEvent('on' + type, fn);
		};
		utils.removeListener = function (el, type, fn) {
			el.detachEvent('on' + type, fn);
		};
	} else { // older browsers
		utils.addListener = function (el, type, fn) {
			el['on' + type] = fn;
		};
		utils.removeListener = function (el, type, fn) {
			el['on' + type] = null;
		};
	}
	//GUID helper function
	function s4(){
		return Math.floor((1 + Math.random()) * 0x10000)
	         .toString(16)
	         .substring(1);
 	};

 	//Test for Arrayness
 	if (typeof Array.isArray === "undefined") {
	    Array.isArray = function (arg) {
	        return Object.prototype.toString.call(arg) === "[object Array]";
	    };
	}
})();
