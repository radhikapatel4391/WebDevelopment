var app = angular.module('myApp',['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        
        
        .state('listView', {
            url: '/listView/',
            templateUrl: 'app/listView.html'
        })
		.state('userView', {
            url: '/userView/',
            templateUrl: 'app/userView.html'
        })
        .state('repoView', {
            url: '/repoView/',
            templateUrl: 'app/repoView.html'
        });
        
});

	app.controller('gitHubSearch',['makeAjaxcalls','$window',searchController]);

		function searchController(makeAjaxcalls,$window)
		{	//$location.path("/listView");
			var methodType = 'get';
			var vm = this;
			if($window.sessionStorage.getItem("searchBoxClass"))
			{
				vm.searchBoxClass = $window.sessionStorage.getItem("searchBoxClass")
				vm.searchButtonClass = $window.sessionStorage.getItem("searchButtonClass");
				console.log("in if ",vm.searchBoxClass);
			}
			else
			{
				vm.searchBoxClass = "searchBox";
				vm.searchButtonClass = "searchButton";
			}
			vm.flagl=true;

			var userResponseData;
			var repoResponseData;
			
			vm.searchButton = function()
			{
				vm.searchBoxClass = "defaultSerchBox ";
				vm.searchButtonClass = "defaultButton";
				$window.sessionStorage.setItem("searchBoxClass", vm.searchBoxClass);
				$window.sessionStorage.setItem("searchButtonClass", vm.searchButtonClass);
				//window.localStorage.setItem("searchBoxClass", vm.searchBoxClass);
				//window.localStorage.setItem("searchButtonClass", vm.searchButtonClass);
				//console.log(vm.searchBoxClass);
				console.log($window.sessionStorage.getItem("searchBoxClass"));
				var url= 'https://api.github.com/search/users?q=angular';
				//ajax call for userlist load
				makeAjaxcalls.makeAjaxCall(url,methodType).then(function(resp){
					//userResponseData = makeAjaxcalls.responce.items;
					//console.log("in controller response",resp);
					//console.log("in controller response items",resp.items);
					userResponseData = resp.items;
					vm.searchGithub();
					 vm.flagl=false;
				},function(err){
					console.log(err);
				});
				//ajax call for repolist load
				var url= 'https://api.github.com/search/repositories?q=angular';
				makeAjaxcalls.makeAjaxCall(url,methodType).then(function(resp){
					//repoResponseData = makeAjaxcalls.responce.items;
					repoResponseData = resp.items;
					vm.searchGithub();
					 vm.flagl=false;
				},function(err){
					console.log(err);
				});
			}
				
			vm.searchGithub = function ()
			{	
				vm.searchBoxClass = "defaultSerchBox ";
				vm.searchButtonClass = "defaultButton";
				var sub = angular.lowercase(vm.searchText);
				var userLog = [];
				var repoLog = [];
				
				//based on serchbox value get the matching username and reponame from data
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
			//specific userdetail view information retrival
			vm.userDetail = function(url,repos_url)
			{	
				makeAjaxcalls.makeAjaxCall(url,methodType).then(function(resp){
					//vm.specUser = makeAjaxcalls.resp;
					vm.specUser = resp;
					(function ()
					{	
					makeAjaxcalls.makeAjaxCall(repos_url,methodType).then(function(resp){
					//vm.specUserRepoLog = makeAjaxcalls.resp;
					vm.specUserRepoLog = resp;
					
						},function(err){
							console.log(err);
							});
					})();
					
				},function(err){
					console.log(err);
				});
				
			}
			//repoview detail extraction
			vm.repoDetail = function(url)
			{	
				makeAjaxcalls.makeAjaxCall(url,methodType).then(function(resp){
					//vm.specRepo = makeAjaxcalls.resp;
					vm.specRepo = resp;
					
						},function(err){
							console.log(err);
							});
				
			}
			
		}