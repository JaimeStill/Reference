(function () {
    var lineChartCtrl = function ($scope, chartSvc) {
        $scope.chartData = chartSvc.chartData;
        $scope.shared = chartSvc.sharedScope;
    };

    lineChartCtrl.$inject = ['$scope', 'chartSvc'];

    var lineChart = function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/Content/templates/core/line-chart.html',
            scope: {
                chartHeight: '='
            },
            controller: lineChartCtrl,
            link: function (scope, element, attrs, controller) {
                scope.shared.renderChart = function () {
                    Chart.defaults.global.responsive = true;

                    var ctx = $(element)[0].getContext('2d');

                    if (scope.lineChart !== undefined && scope.lineChart !== null) {
                        scope.lineChart.destroy();
                    }

                    scope.chart = new Chart(ctx);
                    scope.lineChart = scope.chart.Line(scope.chartData.data);
                };
            }
        };
    };

    referenceApp.directive('lineChart', lineChart);
}());