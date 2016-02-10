(function () {
    var randomizeChartCtrl = function ($scope, chartSvc) {
        $scope.randomizeChart = function () {
            chartSvc.randomizeChart();
        };
    };

    randomizeChartCtrl.$inject = ['$scope', 'chartSvc'];

    var randomizeChart = function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/Content/templates/core/randomize-chart.html',
            controller: randomizeChartCtrl,
            scope: {}
        };
    };

    referenceApp.directive('randomizeChart', randomizeChart);
}());