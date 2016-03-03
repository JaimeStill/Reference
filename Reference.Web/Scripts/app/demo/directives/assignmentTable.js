(function () {
    var assignmentTableCtrl = function ($scope, demoSvc) {
        $scope.model = demoSvc.assignmentModel;
        demoSvc.getAssignments();
    };

    assignmentTableCtrl.$inject = ['$scope', 'demoSvc'];

    var assignmentTable = function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/Content/templates/demo/assignment-table.html',
            scope: {},
            controller: assignmentTableCtrl
        };
    };

    referenceApp.directive('assignmentTable', assignmentTable);
}());