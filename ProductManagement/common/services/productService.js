(function(){
    "use strict";
    //registering with common.services
    angular
        .module("common.services")
        .factory("productService",productService);

    function productService(){

        function calculateTAX(basic,tax)
        {

            var tax =  (basic * tax)/100;
            tax = Math.round(tax);

            return tax;
        }
        
        //can have multiple functions in single service.
        return {
            calculateTAX: calculateTAX,
           
        };
    }
}());