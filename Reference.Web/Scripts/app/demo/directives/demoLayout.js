(function () {
    var demoLayoutCtrl = function ($scope, $timeout, chartSvc) {
        $scope.contents = [
            {
                name: "Line Chart",
                directive: "line-chart-demo",
                id: 1
            },
            {
                name: "File Upload",
                directive: "file-demo",
                id: 2
            }
        ];

        $scope.$on('tabShown', function (anchorId) {
            $timeout(function () {
                if (anchorId == 1) {
                    chartSvc.sharedScope.renderChart();
                }
            });
        });
    };

    demoLayoutCtrl.$inject = ['$scope', '$timeout', 'chartSvc'];

    var demoLayout = function (chartSvc) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/Content/templates/demo/demo-layout.html',
            controller: demoLayoutCtrl
        };
    };

    referenceApp.directive('demoLayout', demoLayout);
}());