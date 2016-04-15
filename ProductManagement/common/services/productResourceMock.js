
(function(){
    "use strict";
    var app = angular
                .module("productResourceMock",["ngMockE2E"]);

    app.run(function($httpBackend){
         var products=[
         {
         "proId":1,
         "pcode":"E-1001",
         "pname": "Mobile",
         //"joiningDate": "January 29, 2014",
         "basic":200,
         "tax":8,
         //"otherAllowance":6,
         "imageUrl": "images/phone1.jpg"
         },
         {
         "proId":2,
         "pcode":"E-1002",
         "pname": "TV",
         //"joiningDate": "January 29, 2014",
         "basic":400,
         "tax":10,
         //"otherAllowance":6,
         "imageUrl": "images/tv.jpg"
         },
         {
         "proId":3,
         "pcode":"E-1003",
         "pname": "Refregerater",
         //"joiningDate": "January 29, 2014",
         "basic":1000,
         "tax":12,
         //"otherAllowance":6,
         "imageUrl": "images/refregerater.jpg"
         },
		 {
         "proId":4,
         "pcode":"E-1004",
         "pname": "Camera",
         //"joiningDate": "January 29, 2014",
         "basic":50,
         "tax":5,
         //"otherAllowance":6,
         "imageUrl": "images/camera1.jpg"
         },
		 {
         "proId":5,
         "pcode":"E-1005",
         "pname": "Head Phone",
         //"joiningDate": "January 29, 2014",
         "basic":20,
         "tax":7,
         //"otherAllowance":6,
         "imageUrl": "images/headphone1.jpg"
         },
		 {
         "proId":6,
         "pcode":"E-1006",
         "pname": "Printer",
         //"joiningDate": "January 29, 2014",
         "basic":70,
         "tax":10,
         //"otherAllowance":6,
         "imageUrl": "images/printer1.jpg"
         }
         ];

        var proUrl = "/api/products";
        $httpBackend.whenGET(proUrl).respond(products);

         var editingRegex = new RegExp(proUrl+ "/[0-9][0-9]*",'');

         $httpBackend.whenGET(editingRegex).respond(function(method,url,data){


              var product = {"proId":0};
              var parameters=url.split('/');
              var length = parameters.length;
              var id = parameters[length - 1];


              if(id>0)
              {
                   for(var i=0;i< products.length;i++) {
                        if(products[i].proId==id) {
                            product = products[i];
                             break;
                        }
                   };
              }
              return [200,product,{}];

         });

         $httpBackend.whenPOST(proUrl).respond(function(method,url,data){
            var product = angular.fromJson(data);

              if (!product.proId) {
                   // new product Id
                  product.proId = products[products.length - 1].proId + 1;
                   products.push(product);
              }
              else {
                   // Updated product
                   for (var i = 0; i < products.length; i++) {
                        if (products[i].proId == product.proId) {
                             products[i] = product;
                             break;
                        }
                   };
              }
              return [200, product, {}];

         });

         $httpBackend.whenGET(/app/).passThrough();
    });


}());