angular.module('myApp')
		.service('makeAjaxcalls',function($http,$q)
		{
			
			
			this.responce={};
			this.makeAjaxCall = function (url, methodType)
			{	var def =$q.defer();
				var xhr = new XMLHttpRequest();
				xhr.open(methodType, url);
				xhr.send();
				xhr.onreadystatechange = function()
				{
					if (xhr.readyState === 4)
					{
						if (xhr.status === 200)
						{
							//console.log("xhr done successfully", xhr.responseText);
							//this.responce = xhr.responseText;
							var respJson = JSON.parse(xhr.responseText);
							def.resolve(respJson);
						}
						else
						{
							def.reject(err,xhr.status);
						}
					}
					else
					{
						console.log("xhr processing going on");
					}

				}
				return def.promise;
			}
		});