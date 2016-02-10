(function () {
    var pendingFilesCtrl = function ($scope, uploadSvc) {
        $scope.model = uploadSvc.pendingFilesModel;
    };

    pendingFilesCtrl.$inject = ['$scope', 'uploadSvc'];

    var pendingFiles = function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/Content/templates/core/pending-files.html',
            scope: {},
            controller: pendingFilesCtrl
        };
    };

    referenceApp.directive('pendingFiles', pendingFiles);
}());