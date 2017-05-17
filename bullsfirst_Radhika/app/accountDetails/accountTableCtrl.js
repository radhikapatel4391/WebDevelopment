
(function(){
     "use strict";
    angular
        .module("bullsFirst") //using the getter method
        .controller("accountTableController",["accountResource",accountTableController]); //passing reference of function instead of writing
     
    function accountTableController(accountResource){
        var vm=this;    //going to use "ControllerAs" syntax, vm is for view model
        vm.marketValue = 0;
        vm.cash = 0;
        vm.reverse = false;
        vm.getClass = "arrow-up";
        vm.colors=[];
        var chartData=[];
        vm.reverceMe = function(){
            vm.reverse = (!vm.reverse);
            vm.getClass = vm.reverse ? 'arrow-down' : 'arrow-up';            
        };
        accountResource.query(function(data){
           vm.accounts = data;
            for (var i = 0; i < vm.accounts.length; i++) {
                vm.marketValue += vm.accounts[i].marketValue;
                vm.cash += vm.accounts[i].cash;
                chartData.push({
                    x:vm.accounts[i].name,
                    y:[vm.accounts[i].marketValue]
                });
                
                vm.colors[i]=vm.accounts[i].legend;
            }

        });
        vm.config = {
            title: 'ALL Accounts',
            tooltips: true,
            labels: false,
            mouseover: function() {},
            mouseout: function() {},
            click: function() {},
            legend: {
                display: false,
                //could be 'left, right'
                position: 'right'
            },
            colors : vm.colors
        };
        
        vm.data = {            
            data : chartData
        };
        }

}());