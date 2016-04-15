
(function(){
     "use strict";
    angular
        .module("productManagement") //using the getter method
        .controller("ProductListController",["productResource",ProductListController]); //passing reference of function instead of writing
     //makes function easier to read and more manageable, if defined as separate and passed as parameter in controller method
    //still it is users choice.
    function ProductListController(productResource){
        var vm=this;    //going to use "ControllerAs" syntax, vm is for view model



        productResource.query(function(data){
           vm.products = data;
        });
        vm.showImage=false;

        vm.toggleImage = function(){
            vm.showImage = !vm.showImage;
        }

        }

}());