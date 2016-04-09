var app = angular.module('myApp',['ngRoute']);
app.config(['$routeProvider',
	function($routeProvider)
	{	
		$routeProvider.
						when('/listView',
						{
							templateUrl: 'app/listView.html',
						}).
						when('/userView',
						{
							templateUrl: 'app/userView.html'
							
						}).
						when('/repoView',
						{
							templateUrl: 'app/repoView.html'
							
						})
						
	
	}
])

	app.controller('gitHubSearch',['$http',searchController]);
		function searchController($http,$location)
		{	//$location.path("/listView")
			var vm = this;
			
			vm.searchBoxClass = "searchBox";
			vm.searchButtonClass = "searchButton";
			vm.flagl=true;
			//var counter = 0;
			var userResponseData;
			var repoResponseData;
			//var repocount=0;
			vm.searchButton = function()
			{	//console.log("serchbutton call");
				vm.searchBoxClass = "defaultSerchBox ";
				vm.searchButtonClass = "defaultButton";
				
				
				$http.get('https://api.github.com/search/users?q=angular')
						.success(function(userResponse)
				{ 
					 userResponseData = userResponse.items;
					// console.log("userdata got");
					 vm.searchGithub();
					 vm.flagl=false;
				});
				$http.get('https://api.github.com/search/repositories?q=angular')
						.success(function(repoResponse)
				{ 	
					 repoResponseData = repoResponse.items;
					 vm.searchGithub();
					 vm.flagl=false;
				});
				
				
			
				
				
			}
					
			vm.searchGithub = function ()
			{	
				vm.searchBoxClass = "defaultSerchBox ";
				vm.searchButtonClass = "defaultButton";
				var sub = angular.lowercase(vm.searchText);
				var userLog = [];
				var repoLog = [];
				
				
					angular.forEach(userResponseData, function(value, key)
					{
						var str = angular.lowercase(value.login);
						if(str.search(sub) > -1)
						{	//counter +=1;
							this.push(value);
						}
							
					}, userLog);
				vm.userLog = userLog;
				
					angular.forEach(repoResponseData, function(value, key)
					{	
						var str = angular.lowercase(value.full_name);
						if(str.search(sub) > -1)
						{	
							//repocount += 1;
							this.push(value);
						}
							
					}, repoLog);
				vm.repoLog = repoLog;
				//console.log("I am user",counter);
				//console.log("I am repository",vm.repoLog);
				//console.log(vm.flagl);
			}
			vm.userDetail = function(url,repos_url)
			{	
				$http.get(url)
						.success(function(userRespo)
				{ 
						vm.specUser = userRespo;
						 (function ()
						{	//console.log(repos_url);
							$http.get(repos_url)
									.success(function(userRepoRespo)
							{ 
								vm.specUserRepoLog = userRepoRespo;
								//console.log(vm.specUserRepoLog);
								//console.log(vm.specUserRepoLog.full_name);
								//console.log(vm.specUserRepoLog.html_url);
							});
							
						})();
						//console.log(vm.secUser);
						//console.log(vm.secUser.login);
				});
			}
			vm.repoDetail = function(url)
			{	
				$http.get(url)
						.success(function(repoRespo)
				{ 
						vm.specRepo = repoRespo;
						//console.log(vm.specRepo);
						console.log(vm.specRepo.owner.following_url);
						
				});
			}
			
		}