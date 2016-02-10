(function () {
    var lineChartCtrl = function ($scope, chartSvc) {
        $scope.shared = chartSvc.sharedScope;
    };

    lineChartCtrl.$inject = ['$scope', 'chartSvc'];

    var lineChart = function (chartSvc) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/Content/templates/core/line-chart.html',
            scope: {
                chartHeight: '='
            },
            controller: lineChartCtrl,
            link: function (scope, element, attrs, controller) {
                var canvas = $(element)[0],
                    ctx = canvas.getContext('2d'),
                    lineChart = null,
                    lineChartOptions = {
                        scaleGridLineColor: 'rgba(0, 0, 0, .05)',
                        responsive: true,
                        animation: true
                    };

                if (scope.chartHeight) {
                    canvas.height = scope.chartHeight;
                }

                scope.shared.renderChart = function () {

                    if (lineChart !== undefined && lineChart !== null) {
                        lineChart.destroy();
                    }

                    lineChart = new Chart(ctx).Line(chartSvc.chartData.data, lineChartOptions);
                };
            }
        };
    };

    lineChart.$inject = ['chartSvc'];
    referenceApp.directive('lineChart', lineChart);
}());