angular.module('glxWidgets').directive('glxImageDrop', function () {
    return {
        restrict: 'E',
        scope: {
            onLoadImage: "=",
            onCropImage: "="
        },
        templateUrl: 'widgets/imageDrop/imageDrop.html',
        link: function (scope, element, attrs, fn) {
            var imgSelect = function (selection) {
                scope.onCropImage &&
                angular.isFunction(scope.onCropImage) &&
                scope.onCropImage(selection.x, selection.y, selection.w);
            };

            var loadFile = function (file, fileType) {
                scope.imgSrc = file.target.result;
                scope.$apply();
                scope.onLoadImage &&
                angular.isFunction(scope.onLoadImage) &&
                scope.onLoadImage(scope.imgSrc, fileType);
            };

            var jcropApi;
            var crop = function () {
                var imgElement = element.find("img.loaded-img");
                var containerWidth = element.width();
                imgElement.Jcrop({
                    bgColor: 'black',
                    bgOpacity: .6,
                    minSize: [100, 100],
                    setSelect: [0, 0, 100, 100],
                    aspectRatio: 1,
                    onSelect: imgSelect,
                    boxWidth: containerWidth,
                    boxHeigth: containerWidth
                }, function () {
                    jcropApi = this;
                });
            };

            var onDragEnd = function (e) {
                e.preventDefault();
            };

            element.bind("dragover", onDragEnd)
                .bind("dragleave", onDragEnd)
                .bind("drop", function (e) {
                    onDragEnd(e);
                    var reader = new FileReader();
                    var fileType = e.originalEvent.dataTransfer.files[0].type;
                    reader.onload = function (file, type) {
                        jcropApi && jcropApi.destroy();
                        loadFile(file, fileType);
                        crop();
                    };

                    reader.readAsDataURL(e.originalEvent.dataTransfer.files[0]);
                });
        }
    };
});
