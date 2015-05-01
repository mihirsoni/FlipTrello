var TRELLO = TRELLO || {};

(function(){
	var lists = ['list1','list2'],
			 boards = TRELLO.boards;
	boards.init(lists, document.getElementById('board'));
	boards.loadLists(lists[0], TRELLO.demoCards);
	boards.loadLists(lists[1], TRELLO.demoCards2);	
	// for(var i=0;i<lists.length;i++){
	// 	boards.loadLists(lists[i], TRELLO.demoCards);	
	// }
})();