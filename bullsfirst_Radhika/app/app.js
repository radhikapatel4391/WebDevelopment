var appRoot = angular.module('bullsFirst',[]);
(function() {
    "use strict";
    var app = angular.module("bullsFirst",
        ["common.services",
            "ui.router",
         "accountResourceMock","angularCharts"]);


    app.config(["$stateProvider",
        "$urlRouterProvider",
        function($stateProvider,$urlRouterProvider){
            //console.log($urlRouterProvider);
            $urlRouterProvider.otherwise("/accountDetails");
                        $stateProvider

                            .state("accountTable",{
                                url:"/accountDetails",
                                templateUrl:"app/accountDetails/accountTableView.html",
                                controller: "accountTableController as vm"


                            })

                            .state("addAccount",{
                               // abstract:true,
                                url:"/accountDetails",
                                templateUrl:"app/accountDetails/addAccount.html",
                                controller: "addAccountController as vm"
                               
                            })
        }]

    );

}());


