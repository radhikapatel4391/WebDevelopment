
(function(){
    "use strict";
    var app = angular
                .module("accountResourceMock",["ngMockE2E"]);

    app.run(function($httpBackend){
         var accounts=[
             {
                 "accountId":1,
                 "name": "Brokerage Account 3",
                 "marketValue": 1999990,
                 "cash": 1995826,
                 "legend": "orange"
             },
             {
                 "accountId":9,
                 "name": 'Joint Account 2',
                 "marketValue": 10000,
                 "cash": 10000,
                 "legend": 'maroon'
             },
             {
                 "accountId":2,
                 "name": 'Account 3',
                 "marketValue": 1949990,
                 "cash": 1695856,
                 "legend": 'gray'
             },
             {
                 "accountId":3,
                 "name": 'Brokerage Account 1',
                 "marketValue": 1349990,
                 "cash": 1595866,
                 "legend": 'red'
             },
             {
                 "accountId":4,
                 "name": 'Brokerage Account 4',
                 "marketValue": 155990,
                 "cash": 160826,
                 "legend": 'blue'
             },
             {
                 "accountId":5,
                 "name": 'Brokerage Account 2',
                 "marketValue": 74560,
                 "cash": 19956,
                 "legend": 'black'
             },
             {
                 "accountId":6,
                 "name": 'Account 4',
                 "marketValue": 55006,
                 "cash": 53006,
                 "legend": 'salmon'
             },
             {
                 "accountId":7,
                 "name": 'Account 13',
                 "marketValue": 37340,
                 "cash": 0,
                 "legend": 'green'
             },
             {
                 "accountId":8,
                 "name": 'Joint Account 1',
                 "marketValue": 28308,
                 "cash": 4167,
                 "legend": 'fuchsia'
             }

         ];
        var accountUrl = "/api/accounts";
        $httpBackend.whenGET(accountUrl).respond(accounts);

        //var editingRegex = new RegExp(accountUrl+ "/[0-9][0-9]*",'');

       /* $httpBackend.whenGET(editingRegex).respond(function(method,url,data){


            var account = {"accountId":0};
            var parameters=url.split('/');            
            var length = parameters.length;
            var id = parameters[length - 1];
           

            if(id>0)
            {
                for(var i=0;i< accounts.length;i++) {
                    if(accounts[i].accountId==id) {
                        account = accounts[i];
                        break;
                    }
                };
            }
            console.log("I am account in get resource mock which return", account);
            return [200,account,{}];

        });*/

        $httpBackend.whenPOST(accountUrl).respond(function(method,url,data){
            console.log("I am in Post resource",data);
            var account = angular.fromJson(data);           
            console.log("I am in Post resource",account);
            if (!account.accountId) {
                // new employee Id
                account.accountId = accounts[accounts.length - 1].accountId + 1;
                accounts.push(account);
            }
           /* else {
                // Updated employee
                for (var i = 0; i < accounts.length; i++) {
                    if (accounts[i].accountId == account.accountId) {
                        accounts[i] = account;
                        break;
                    }
                };
            }*/
            return [200, account, {}];

        });

        $httpBackend.whenGET(/app/).passThrough();
    });


}());