var TRELLO = TRELLO || {};

(function(){
	var lists = ['list1','list2'],
			 boards = TRELLO.boards;
	boards.init(lists, document.getElementById('board'));
	boards.loadLists(lists[0], TRELLO.demoCards0);
	boards.loadLists(lists[1], TRELLO.demoCards1);	
})();