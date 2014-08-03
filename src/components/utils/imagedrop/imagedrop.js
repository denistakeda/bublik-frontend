define([
	'bublikApp',
	'angular',
	'jcrop',
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
				var imgSelect = function(selection){
					console.log(selection);
				};

				var loadFile = function(file){
					console.log(file);
					scope.imgSrc = file.target.result;
					scope.$apply();
					scope.onLoadImage &&
					angular.isFunction(scope.onLoadImage) &&
					scope.onLoadImage(scope.imgSrc);
				};

				var onDragEnd = function(e){
					e.preventDefault();
				};
				var jcropApi;
				var crop = function(){
					var containerWidth = element.width();
					var imgElement = element.find("img.loaded-img");
					imgElement.Jcrop({
						bgColor: 'black',
						bgOpacity: .6,
						setSelect: [0, 0, 100, 100],
						aspectRatio: 1,
						onSelect: imgSelect,
						boxWidth: containerWidth,
						boxHeigth: containerWidth
					}, function(){
						jcropApi = this;
					});

				};

				element.bind("dragover", onDragEnd)
					.bind("dragleave", onDragEnd)
					.bind("drop", function(e){
						onDragEnd(e);
						console.log(e.originalEvent.dataTransfer.files[0]);
						var reader = new FileReader();
						reader.onload = function(file){
							jcropApi && jcropApi.destroy();
							loadFile(file);
							crop();
						};
						reader.readAsDataURL(e.originalEvent.dataTransfer.files[0]);
					});

			}
		}
	};
	directive.$inject = [];
	app.directive('glxImageDrop', directive)
});

