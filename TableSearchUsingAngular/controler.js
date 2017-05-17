app.controller('MyCalc',MyCalc);

    function MyCalc($scope)
	{
       
					$scope.products =	[
								{productCode : '1001' , productName : 'Laptop' , price : '600$' },
								{productCode : '1002' , productName : 'Television' , price : '300$' },
								{productCode : '1003' , productName : 'Mobile' , price : '200$' },
								{productCode : '1004' , productName : 'Washing Machine' , price : '800$' },
								{productCode : '1005' , productName : 'Microwave' , price : '100$' }
								]
						
					
	}


