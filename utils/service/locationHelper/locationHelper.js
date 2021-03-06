angular.module('glxUtils').factory('glxLocationHelper',function($location) {

	var glxLocationHelper = {
        isWeLocatedHere: function(here){
            return here === $location.path();
        },
        redirectTo: function(path){
            $location.path(path);
        },
        currentPath: function(){
            return $location.path();
        }
    };

	return glxLocationHelper;
});