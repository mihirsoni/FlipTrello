var TRELLO = TRELLO || {};

TRELLO.boards = (function(){
	var lists = [],
	activeList,
			trelloUI = {};

	function init(listsNames, element){
		for (var i = 0 , len = listsNames.length; i < len; i+=1) {
			lists.push(new TRELLO.list(listsNames[i]));
		};
		initUI(element);
	};
	function initUI(element){
		trelloUI.list = TRELLO.views.lists(element);
		//Add New Card
		trelloUI.list.on(trelloUI.list.ADDNEWCARD,function(currentList){
			var list = findList(currentList);
			list.addCard({title :'fromUI',timeStamp:new Date()});
			trelloUI.list.addCard(currentList,list.cards[0]);

		});
		//Edit Existing card Title
		trelloUI.list.on(trelloUI.list.CARDEDIT,function(cardId,currentList){
			var el = document.getElementById(cardId);
			var editEl = el.children[0].children[1];
			if(editEl.innerHTML == "Edit"){
						editEl.previousElementSibling.setAttribute('contenteditable',true);
						editEl.previousElementSibling.focus();
						editEl.innerHTML = "Update";	
			} else {
					editEl.previousElementSibling.setAttribute('contenteditable',false);
					var list =findList(currentList);
					var card = list.findCard(cardId);
					card.title = "Testing";
					editEl.innerHTML = "Edit";
			}
		})
		trelloUI.list.on(trelloUI.list.ADDNEWLIST,function(){
			var newList = 'newList'+(lists.length+1);
			lists.push(new TRELLO.list(newList));
			loadLists(newList, TRELLO.demoCards1);
		});
		trelloUI.list.on(trelloUI.list.CARDMOVED, function(cardId,source,destination){
			var source = findList(source);
			var dest = findList(destination);
			var card = source.findCard(cardId);
			dest.addCard(card);
			source.moveCard(cardId,source,destination);
		});
	}
	function loadLists(listName, cards){
		var list = findList(listName);
		activeList = list;
		if(list){
			list.addCard(cards);
			trelloUI.list.render(list);
		}
	};
	function findList(listName){
		for(var i = 0, len = lists.length; i < len; i+=1){
			if(lists[i].name === listName){
				return lists[i];
			}	
		}
	};
	return {
		init:init,
		loadLists : loadLists,
		lists: lists
	}
})();