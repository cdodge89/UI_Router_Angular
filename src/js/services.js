(function(){
	angular.module('routerApp')
		.factory('Item',['$http', item])
		.factory('Joke',['$http', joke]);

		function item($http){
			service = {
				test: test,
				list: list,
				add: add,
				remove: remove,
				update: update
			};
			return service;

			function test(){
				return 'Hello World';
			}

			function list(){
				return $http.get('http://secret-escarpment-99471.herokuapp.com/item');
			}

			function add(title,description){
				return $http.post('http://secret-escarpment-99471.herokuapp.com/item', {title:title, description:description});
			}

			function remove(id){
				return $http.delete('http://secret-escarpment-99471.herokuapp.com/item/'+id);
			}
			function update(updatedObj){
				return $http.put('http://secret-escarpment-99471.herokuapp.com/item/'+updatedObj.id, updatedObj);
			}
		}

		function joke($http){
			service = {
				get: get
			};
			return service;

			function get(){
				return $http.get('http://api.icndb.com/jokes/random/?escape=javascript?exclude=[Explicit]');
			}
		}
})();