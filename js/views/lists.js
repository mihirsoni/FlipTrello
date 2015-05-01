var TRELLO = TRELLO || {};
TRELLO.views = TRELLO.views || {};


TRELLO.views.lists = function(element){
	var addListButton = document.getElementById('addNewList'),	
	cardTemplate = document.getElementById('cardItemTemplate').innerHTML,
	el = element,
	subscribedEvents = [],
	list,
	addNewList = "addNewList";
	cardMoved = 'cardMoved';
	TRELLO.utils.addListener( addListButton, 'click', function(){
		if(subscribedEvents[addNewList]){
			subscribedEvents[addNewList]();
		} 
	});


	function render(activeList){
		var newList = document.createElement('div');
		newList.setAttribute('id',activeList.name);
		newList.setAttribute('class','list');
		var html = '<div class="list-header" attr="name"><h2 class="list-header-name">'+activeList.name+'</h2></div>',
		card;
		list = activeList;

		if(list.cards.length > 0){
			for(var i = 0, len = list.cards.length; i < len; i+=1){
				card = list.cards[i];
				html += cardTemplate.replace(/{{card_id}}/g, card.id);
				html = html.replace(/{{title}}/g, card.title);
				html = html.replace(/{{timestamp}}/g, TRELLO.utils.getFormattedTime(card.timeStamp));
			}
			newList.innerHTML = html;
				//el.innerHTML = el.innerHTML + html;
				document.querySelector("#board").appendChild(newList);
				initDnD(activeList);
			}
			else{
				el.innerHTML = ''
			}
		}

		function initDnD(activeList){
			var cards = document.querySelectorAll('#'+activeList.name+' div');
			
			var that = this;
			for (var i = 0; i < cards.length; i++) {
				var el = cards[i];
				TRELLO.utils.addListener(el,'click',function(e){
					if(this.getAttribute('contenteditable')){
						this.getAttribute('contenteditable',!this.getAttribute('contenteditable'));	
					}
				})
				TRELLO.utils.addListener(el, 'dragstart', function (e) {
					e.dataTransfer.setData('cardId', this.id);
					e.dataTransfer.setData('listName', e.currentTarget.parentElement.id);
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
			on: on,
			CARDMOVED: cardMoved,
			ADDNEWLIST : addNewList
		}
	}

