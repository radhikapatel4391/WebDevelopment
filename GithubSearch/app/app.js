var app = angular.module('myApp',['ngRoute']);
app.config(['$routeProvider',
	function($routeProvider)
	{
		$routeProvider.
						when('/listView',
						{
							templateUrl: 'app/listView.html',
						})
	
	}
])

	app.controller('gitHubSearch',['$http',searchController]);
		function searchController($http)
		{	
			var vm = this;
			var counter = 0;
			var userResponseData;
			var repoResponseData;
			var repocount=0;
			vm.searchButton = function()
			{
				$http.get('https://api.github.com/search/users?q=angular')
						.success(function(userResponse)
				{ 
					 userResponseData = userResponse.items;
				});
				$http.get('https://api.github.com/search/repositories?q=angular')
						.success(function(repoResponse)
				{ 	
					 repoResponseData = repoResponse.items;
				});
				vm.searchGithub();
			}
			
			
					
			vm.searchGithub = function ()
			{	counter +=1;
				console.log(counter);
				var sub = angular.lowercase(vm.searchText);
				var userLog = [];
				var repoLog = [];
				
				
					angular.forEach(userResponseData, function(value, key)
					{
						var str = angular.lowercase(value.login);
						if(str.search(sub) > -1)
						{	
							this.push(value);
						}
							
					}, userLog);
				vm.userLog = userLog;
				
					angular.forEach(repoResponseData, function(value, key)
					{	
						var str = angular.lowercase(value.full_name);
						if(str.search(sub) > -1)
						{	
							repocount += 1;
							this.push(value);
						}
							
					}, repoLog);
				vm.repoLog = repoLog;
				console.log("repocounter is",repocount);
			}
			
		}