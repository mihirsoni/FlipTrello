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

		trelloUI.list.on(trelloUI.list.ADDNEWLIST,function(){
			var rand = Math.floor(Math.random() * 3);
			lists.push(new TRELLO.list('test'+Math.floor(Math.rand()*100)+1));
			loadLists('test', TRELLO.demoCards+rand);
		})
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