(function () {
    var fileUploadCtrl = function ($scope, uploadSvc) {
        $scope.loadstate = uploadSvc.uploadModel;
        $scope.updateFiles = function (files) {
            uploadSvc.updateFiles(files);
        };
    };

    fileUploadCtrl.$inject = ['$scope', 'uploadSvc'];

    var fileUpload = function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/Content/templates/core/file-upload.html',
            scope: {
                upload: '='
            },
            controller: fileUploadCtrl,
            link: function (scope, element, attrs, controller) {
                var fileInput = element.find('input')[0];
                var fileSelect = element.find('input')[1];

                fileInput.addEventListener('change', function (e) {
                    scope.$apply(scope.updateFiles(e.target.files));
                });

                fileSelect.addEventListener('click', function (e) {
                    if (fileInput) {
                        fileInput.click();
                    }
                    e.preventDefault();
                }, false);
            }
        };
    };

    referenceApp.directive('fileUpload', fileUpload);
}());