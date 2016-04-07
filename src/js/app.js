(function(){
	//var routerApp = angular.module('routerApp', ['ui.router']);

	angular.module('routerApp', ['ui.router']).config(function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/todos');

		$stateProvider
			.state('todos', {
				url: '/todos',
				templateUrl: '../views/partial-todos.html',
				controller: function(Item){
					//local variables
					var vm = this;
					//bound functions
					vm.addTask = addTask; 
					vm.remove = remove;
					vm.setEdit = setEdit;
					vm.isSet = isSet;
					vm.resetEdit = resetEdit;
					vm.saveEdit = saveEdit;
					//bound variables
					vm.newTodo = {};
					vm.editMode = null;
					vm.currentItem = null;

					init();
					//bound function implementations
					function addTask(){
						console.log(vm.newTodo.description);
						if(vm.newTodo.description || vm.newTodo.title){
							Item.add(vm.newTodo.title, vm.newTodo.description).then(function(response){
								vm.newTodo.id = response.data;
								vm.list.push(vm.newTodo);
								vm.newTodo = {};
								console.log(vm.list);
							});
						}
					}
					function remove(id){
						Item.remove(id).then(function(){
							for(var i = 0; i < vm.list.length; i++){
								if(vm.list[i].id === id){
									vm.list.splice(i,1);
								}
							}
						});
					}
					function setEdit(todo){
						vm.editMode = todo.id;
						vm.currentItem = angular.copy(todo); //this break the reference chain, so it isn't a direct reference to the object, it make a deep copy of the object.
						console.log(vm.currentItem);
					}
					function isSet(id){
						return vm.editMode === id;
					}
					function resetEdit(){
						vm.editMode = null;
						console.log(vm.editMode);
						console.log('in');
					}
					function saveEdit(todo){
						Item.update(vm.currentItem).then(function(){
							vm.currentItem = {};
							vm.editMode = null;
							init();
						}, function(response){
							console.log('ERRPOR!!');
						});
					}
					//helper functions
					function init(){
						Item.list().then(function(response){
							vm.list = response.data;
							console.log(vm.list);
						});
					}
				},
				controllerAs: 'todos'
			})
			.state('jokes', {
				url:'/jokes',
				templateUrl: '../views/partial-jokes.html',
				controller: function(Joke){
					var vm = this;
					//bound functions
					vm.getJoke = getJoke;
					//bound variables
					vm.currentJoke = 'Click the Button!';

					function getJoke(){
						Joke.get().then(function(response){
							vm.currentJoke = response.data.value.joke;
						});
						console.log(this.currentJoke);
					}
				},
				controllerAs: 'joke'
			});
	});
})();