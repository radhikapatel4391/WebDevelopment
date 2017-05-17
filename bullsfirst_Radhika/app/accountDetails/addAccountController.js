(function(){
    "use strict";

    angular
        .module("bullsFirst")
        .controller("addAccountController",["accountResource","$state",addAccountController]);

    function addAccountController(accountResource,$state){
        var vm=this;
        vm.account = {
            "accountId":'',
            "name":'',
            "marketValue":'',
            "cash":'' ,
            "legend":''
        };
        vm.submit=function(){            
            accountResource.save(vm.account,function(data){                
                $state.go('accountTable');

            });

        }

        vm.cancel=function(){
            $state.go('accountTable');
        }


    }
}());

