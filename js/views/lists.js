
var TRELLO = TRELLO || {};
TRELLO.views = TRELLO.views || {};


TRELLO.views.lists = function(element){
	var addListButton = document.getElementById('addNewList'),	
	cardTemplate = document.getElementById('cardItemTemplate').innerHTML,
	el = element,
	subscribedEvents = [],
	list,
	addNewList = "addNewList",
	cardMoved = 'cardMoved',
	cardEdit = 'cardEdit',
	addNewCard = 'addNewCard'
	TRELLO.utils.addListener( addListButton, 'click', function(){
		if(subscribedEvents[addNewList]){
			subscribedEvents[addNewList]();
		} 
	});


	function render(activeList){
		var cur = document.getElementById(activeList.name);
		if(cur) {
			cur.remove();
		}
		var newList = document.createElement('div');
		newList.setAttribute('id',activeList.name);
		newList.setAttribute('class','list');
		var html = '<div class="list-header" attr="name"><h2 class="list-header-name">'+activeList.name+'</h2></div>',
		card;
		list = activeList;

		if(list.cards.length > 0){
			for(var i = 0, len = list.cards.length; i < len; i+=1){
				card = list.cards[i];
				html += parseTemplate(card);
			}
			html+= '<a href="#" class="addNewCard"> Add Card</a>'
			newList.innerHTML = html;
			document.querySelector("#board").appendChild(newList);
			initDnD(activeList);
		}
		else{
			el.innerHTML = ''
		}
	}
	function addCard(activeList,card){
		var html = parseTemplate(card);
		var wrapper= document.createElement('div');
		wrapper.innerHTML= html
		var newCard= wrapper.children[0];
		var lastOucc = document.getElementById(activeList);
		lastOucc.insertBefore(newCard,lastOucc.lastChild);
		//Add required Listerns for new Item
		TRELLO.utils.addListener(newCard, 'dragstart', function (e) {
				e.dataTransfer.setData('cardId', this.id);
				e.dataTransfer.setData('listName', e.currentTarget.parentElement.id);
		});
		var editEl = newCard.children[0].children[1];
		TRELLO.utils.addListener(editEl,'click',function(e) {
			if(subscribedEvents[cardEdit]){
				subscribedEvents[cardEdit](e.currentTarget.parentElement.parentElement.id,activeList);
			} 
		});	
	}
	function parseTemplate(card){
		var html = "";
		html += cardTemplate.replace(/{{card_id}}/g, card.id);
		html = html.replace(/{{title}}/g, card.title);
		html = html.replace(/{{timestamp}}/g, TRELLO.utils.getFormattedTime(card.timeStamp));
		return html

	}

	function initDnD(activeList){
		//Attach Events
		var cards = document.querySelectorAll('#'+activeList.name+' .list-card');
		console.log(cards.length);
		var that = this;
		for (var i = 0; i < cards.length; i++) {
			var el = cards[i];
			TRELLO.utils.addListener(el, 'dragstart', function (e) {
				e.dataTransfer.setData('cardId', this.id);
				e.dataTransfer.setData('listName', e.currentTarget.parentElement.id);
			});
			//Edit listener
			var editEl = cards[i].children[0].children[1];
				TRELLO.utils.addListener(editEl,'click',function(e) {
					if(subscribedEvents[cardEdit]){
						subscribedEvents[cardEdit](e.currentTarget.parentElement.parentElement.id,activeList.name);
					} 
				});	
			}
			var addCard = document.querySelectorAll('#'+activeList.name+' .addNewCard');
			console.log(addCard[0].onclick);
			if(addCard[0].onclick == null){
				TRELLO.utils.addListener(addCard[0],'click',function(e){
				if(subscribedEvents[addNewCard]){
					subscribedEvents[addNewCard](activeList.name);
				}
			});	
			}
			
			var activeListName = document.getElementById(activeList.name);

			TRELLO.utils.addListener(activeListName, 'dragover', function (e) {
				if (e.preventDefault) e.preventDefault(); 
				return false;
			});
			
			TRELLO.utils.addListener(activeListName, 'dragenter', function (e) {
				if (e.preventDefault) e.preventDefault(); 
				return false;
			});

			TRELLO.utils.addListener(activeListName, 'drop', function (e) {
				if (e.stopPropagation) e.stopPropagation();
				e.preventDefault();	
				var elId = e.dataTransfer.getData('cardId');
				var source = e.dataTransfer.getData('listName');
				if(subscribedEvents[cardMoved]){
					subscribedEvents[cardMoved](elId,source,activeList.name);
				} 
				return false;
			});
		}
		function on(event, callback){
			subscribedEvents[event] = callback;
		}
		return {
			render: render,
			addCard:addCard,
			on: on,
			CARDMOVED: cardMoved,
			ADDNEWLIST : addNewList,
			CARDEDIT : cardEdit,
			ADDNEWCARD: addNewCard
		}
	}

