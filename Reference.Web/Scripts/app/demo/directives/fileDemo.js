(function () {
    var fileDemoCtrl = function ($scope, uploadSvc, demoSvc) {
        $scope.model = demoSvc.recordModel;
        demoSvc.getRecords();

        $scope.setDeleteId = function (id) {
            $scope.deleteId = id;
        };

        $scope.uploadOptions = {
            accept: "*/*",
            fileSelectText: "Browse...",
            uploadText: "Upload",
            upload: function () {
                uploadSvc.uploadFiles("/api/files/uploadRecords").finally(function (data) {
                    demoSvc.getRecords();
                });
            }
        };

        $scope.modalOptions = {
            modalId: 'records-modal',
            headerText: 'Delete Record',
            bodyText: 'Are you sure you want to delete this record?',
            closeButtonText: 'Cancel',
            actionButtonText: 'Delete',
            ok: function () {
                if ($scope.deleteId) {
                    demoSvc.deleteRecord($scope.deleteId);
                }
            },
            cancel: function () {
                $scope.deleteId = null;
            }
        };
    };

    fileDemoCtrl.$inject = ['$scope', 'uploadSvc', 'demoSvc'];

    var fileDemo = function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/Content/templates/demo/file-demo.html',
            scope: {},
            controller: fileDemoCtrl
        };
    };

    referenceApp.directive('fileDemo', fileDemo);
}());