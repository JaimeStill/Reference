(function () {
    var addAssignmentCtrl = function ($scope, demoSvc, toastrSvc) {
        $scope.loading = false;
        $scope.model = demoSvc.categoryModel;

        demoSvc.getCategories();

        $scope.saveAssignment = function () {
            var valid = true;

            if ($scope.description === null || $scope.description === undefined) {
                valid = false;
                toastrSvc.alertWarning("Description must have a value", "Invalid!");
            }

            if ($scope.category === null || $scope.category === undefined) {
                valid = false;
                toastrSvc.alertWarning("Category must be selected", "Invalid!");
            }

            if ($scope.hours === null || $scope.hours === undefined) {
                valid = false;
                toastrSvc.alertWarning("Hours must have a numeric value", "Invalid!");
            } else if (typeof $scope.hours !== "number") {
                valid = false;
                toastrSvc.alertWarning("Hours must be a numeric value", "Invalid!");
            }

            if (valid) {
                $scope.loading = true;

                var assignment = {
                    description: $scope.description,
                    hours: $scope.hours,
                    category: $scope.category
                };

                demoSvc.addAssignment(assignment).then(function () {
                    $scope.description = '';
                    $scope.hours = '';
                    $scope.category = '';
                }).finally(function () {
                    $scope.loading = false;
                });
            }
        };
    };

    addAssignmentCtrl.$inject = ['$scope', 'demoSvc', 'toastrSvc'];

    var addAssignment = function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/Content/templates/demo/add-assignment.html',
            scope: {},
            controller: addAssignmentCtrl
        };
    };

    referenceApp.directive('addAssignment', addAssignment);
}());