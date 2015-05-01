var TRELLO = TRELLO || {};

TRELLO.list = function(name){
	this.name = name;
	this.cards = [];
}

TRELLO.list.render = function(){
	var html = '<div id="' + this.name + '"></div>';
	return html;
}

TRELLO.list.prototype.addCard = function(card){
	
	if(Array.isArray(card)){
		for(var i = 0, len = card.length; i < len; i+= 1){
			this.cards.push(new TRELLO.card(card[i]));
		}
	}
	else{
		this.cards.unshift(new TRELLO.card(card));
	}
}
TRELLO.list.prototype.moveCard = function(cardId,source,destination){
	for (var i = this.cards.length - 1; i >= 0; i--) {
		if(this.cards[i].id === cardId){
			var card = document.getElementById(cardId);
			document.getElementById(destination).appendChild(card);
			// card.parentNode.removeChild(card);
			return true;
		}
	};
}
TRELLO.list.prototype.findCard = function(cardId){
	for (var i = this.cards.length - 1; i >= 0; i--) {
		if(this.cards[i].id === cardId){
			return this.cards[i];
		}
	};
}
TRELLO.list.prototype.removeCard = function(cardId){
	for (var i = this.cards.length - 1; i >= 0; i--) {
		if(this.cards[i].id === cardId){
			this.cards.splice(i,1);
			var card = document.getElementById(cardId);
			card.parentNode.removeChild(card);
			return true;
		}
	}
};