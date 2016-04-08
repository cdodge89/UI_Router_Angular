(function(){
	//var routerApp = angular.module('routerApp', ['ui.router']);

	angular.module('routerApp', ['ui.router']).config(function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/todos');

		$stateProvider
			.state('todos', {
				url: '/todos',
				templateUrl: '../views/partial-todos.html',
				resolve: {
					firstList: function(Item){
						return Item.list().then(function(response){
							return response.data;
						});
					}
				},
				controller: 'TodoController',
				controllerAs: 'todos'
			})
			.state('jokes', {
				url:'/jokes',
				templateUrl: '../views/partial-jokes.html',
				resolve: {
					firstJoke: function(Joke){
						return Joke.get().then(function(response){
							return response.data.value.joke;
						});
					}
				},
				controller: 'JokeController',
				controllerAs: 'joke'
			});
	});
})();