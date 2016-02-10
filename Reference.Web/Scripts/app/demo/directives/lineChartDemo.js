(function () {
    var lineChartDemoCtrl = function ($scope, $timeout, chartSvc) {
        $scope.model = chartSvc.sampleData;

        $timeout(function () {
            chartSvc.randomizeChart();
        });
    };

    lineChartDemoCtrl.$inject = ['$scope', '$timeout', 'chartSvc'];

    var lineChartDemo = function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/Content/templates/demo/line-chart-demo.html',
            controller: lineChartDemoCtrl,
            scope: {}
        };
    };

    referenceApp.directive('lineChartDemo', lineChartDemo);
}());