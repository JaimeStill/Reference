(function () {
    var editAssignmentCtrl = function ($scope, demoSvc, toastrSvc, assignmentRt) {
        $scope.model = demoSvc.assignmentModel;
        $scope.categoryModel = demoSvc.categoryModel;

        demoSvc.getAssignments();
        demoSvc.getCategories().then(function () {
            console.log($scope.categoryModel.categories);
        });

        assignmentRt.initializeClient(demoSvc.getAssignments);

        $scope.updateAssignment = function (assignment) {
            var valid = true;

            if (assignment.description === null || assignment.description === undefined) {
                valid = false;
                toastrSvc.alertWarning("Description must have a value", "Invalid!");
            }

            if (assignment.category === null || assignment.category === undefined) {
                valid = false;
                toastrSvc.alertWarning("Category must be selected", "Invalid!");
            }

            if (assignment.hours === null || assignment.hours === undefined) {
                valid = false;
                toastrSvc.alertWarning("Hours must have a numeric value", "Invalid!");
            } else if (typeof assignment.hours !== "number") {
                valid = false;
                toastrSvc.alertWarning("Hours must be a numeric value", "Invalid!");
            }

            if (valid) {
                demoSvc.updateAssignment(assignment);
            }
        };

        $scope.deleteAssignment = function (assignment) {
            demoSvc.deleteAssignment(assignment);
        };
    };

    editAssignmentCtrl.$inject = ['$scope', 'demoSvc', 'toastrSvc', 'assignmentRt'];

    var editAssignment = function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/Content/templates/demo/edit-assignment.html',
            scope: {},
            controller: editAssignmentCtrl
        };
    };

    referenceApp.directive('editAssignment', editAssignment);
}());