(function(){
angular.module('routerApp')
		.controller('TodoController',['Item','firstList', function(Item, firstList){
			//local variables
			var vm = this;
			//bound functions
			vm.addTask = addTask; 
			vm.remove = remove;
			vm.setEdit = setEdit;
			vm.isSet = isSet;
			vm.resetEdit = resetEdit;
			vm.saveEdit = saveEdit;
			vm.findById = findById;
			//bound variables
			vm.newTodo = {};
			vm.editMode = null;
			vm.currentItem = null;
			vm.list = firstList

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
					vm.list.splice(vm.findById(id,vm.list),1);
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
					var index = vm.findById(todo.id,vm.list);
					vm.list[index] = vm.currentItem;
					vm.currentItem = {};
					vm.editMode = null;
				}, function(response){
					console.log('ERRPOR!!');
				});
			}
			//helper functions
			function findById(id, list){
				for(var i = 0; i < list.length; i++){
					if(list[i].id === id){
						return i;
					}
				}
			}
		}])
		.controller('JokeController',['Joke','firstJoke', function(Joke, firstJoke){
			var vm = this;
			//bound functions
			vm.getJoke = getJoke;
			//bound variables
			vm.currentJoke = firstJoke;

			//bound function implementation
			function getJoke(){
				Joke.get().then(function(response){
					vm.currentJoke = response.data.value.joke;
				});
				console.log(this.currentJoke);
			}
		}]);
})();