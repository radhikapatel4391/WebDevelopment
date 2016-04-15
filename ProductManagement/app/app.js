(function() {
    "use strict";
    var app = angular.module("productManagement",
        ["common.services",
            "ui.router",
            "ui.mask",
            "ui.bootstrap",
            "angularCharts",
         "productResourceMock"]);

    app.config(function ($provide) {
        $provide.decorator("$exceptionHandler",
            ["$delegate",
                function ($delegate) {
                    return function (exception, cause) {
                        exception.message = "User friendly message goes here!!! \n Message: " +
                        exception.message;
                        $delegate(exception, cause);
                        alert(exception.message);
                    };
                }]);
    });

    app.config(["$stateProvider",
                "$urlRouterProvider",
                    function($stateProvider,$urlRouterProvider){
                        //console.log($urlRouterProvider);
                        $urlRouterProvider.otherwise("/");


                        $stateProvider

                            .state("home",{
                                url:"/",
                                templateUrl:"app/mainView.html"

                            })
                            .state("proList",{
                                url:"/personaldetails",
                                templateUrl:"app/personaldetails/proListView.html",
                                controller: "ProductListController as vm"
                            })
                            .state("proEdit",{
                                abstract:true,
                                url:"/personaldetails/edit/:proId",
                                templateUrl:"app/personaldetails/proEditView.html",
                                controller: "ProductEditController as vm",
                                resolve:{
                                    productResource :"productResource", //defining dependency, key name can be any name
                                    product: function(productResource,$stateParams) {

                                        var proId = $stateParams.proId;
                                        return productResource.get({proId: proId}).$promise;
                                    }
                                }

                            })
                            .state("proEdit.personal",{
                                url:"/personal",
                                templateUrl:"app/personaldetails/proEditPersonalView.html"

                            })
                            .state("emplEdit.price",{
                                url:"/price",
                                templateUrl:"app/personaldetails/proEditPriceView.html"

                            })

                            .state("proDetail",{
                                url:"/personaldetails/:proId",
                                templateUrl:"app/personaldetails/proDetailsView.html",
                                controller: "ProductDetailController as vm", //Once resolve returned success, controller created
                                resolve:{
                                    productResource :"productResource", //defining dependency, key name can be any name
                                    product: function(productResource,$stateParams) {

                                        var proId = $stateParams.proId;
                                        return productResource.get({proId: proId}).$promise;
                                    }
                                }
                            })

                            .state("dataAnalytics",{

                                url: "/dataAnalytics",
                                templateUrl:"app/pricedetails/dataAnalyticsView.html",
                                controller:"DataAnalyticsController",
                                resolve: {
                                    productResource : "productResource",
                                    products: function(productResource){

                                        return productResource.query(function(response) {
                                                // no code needed for success
                                            },
                                            function(response) {
                                                if (response.status == 404) {
                                                    alert("Desired message for 404 error- " +
                                                    response.config.method + " " +response.config.url);
                                                } else {
                                                    alert(response.statusText);
                                                }
                                            }).$promise;
                                    }
                                }
                            })
                    }]

    );

}());
