(function(){
    "use strict";
    angular
        .module("common.services")
        .factory("userResource",["$resource",userResource]);

    function userResource($resource){

        return $resource ("/api/userItems/:emplId");
    }

}());
