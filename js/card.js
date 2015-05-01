var TRELLO = TRELLO || {};

TRELLO.card = function(cardObj){
	this.id = TRELLO.utils.guid();
	this.title = cardObj.title;
	this.timeStamp = cardObj.timeStamp || new Date();
}