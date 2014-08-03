define([
	'bublikApp',
	'angular',
	'css!components/utils/imagedrop/imagedrop.css'
], function(app, angular){
	"use strict";

	var directive = function(){
		return {
			restrict: "C",
			scope: {
				onLoadImage: "="
			},
			templateUrl: "../components/utils/imagedrop/imagedrop.html",
			link: function(scope, element, attrs){

				var loadFile = function(file){
					scope.imgSrc = file.target.result;
					scope.$apply();
					scope.onLoadImage &&
						angular.isFunction(scope.onLoadImage) &&
						scope.onLoadImage(scope.imgSrc);
				};

				var onDragEnd = function(e){
					e.preventDefault();
				};

				element.bind("dragover", onDragEnd)
					.bind("dragleave", onDragEnd)
					.bind("drop", function(e){
						onDragEnd(e);
						var reader = new FileReader();
						reader.onload = function(file){
							loadFile(file);
						};
						reader.readAsDataURL(e.originalEvent.dataTransfer.files[0]);
					});

			}
		}
	};
	directive.$inject = [];
	app.directive('glxImageDrop', directive)
});

