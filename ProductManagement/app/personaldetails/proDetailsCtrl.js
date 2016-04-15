(function(){
   "use strict";

    angular
        .module("productManagement")
        .controller("ProductDetailController",["product","productService",ProductDetailController]);
    function ProductDetailController(product,productService){

        var vm=this;
        vm.product =  product;
        vm.title="Product Details" + vm.product.pname;
        vm.taxAmount = productService.calculateTAX(vm.product.basic,vm.product.tax);
        //vm.othAllAmount = employeeService.calculateHRA(vm.employee.basic,vm.employee.otherAllowance);
        vm.price = vm.product.basic + vm.taxAmount;

    }
}());
