(function () {
    var radarChartCtrl = function ($scope, radarSvc) {
        $scope.radarData = radarSvc.radarData;
        $scope.shared = radarSvc.sharedScope;
    }

    radarChartCtrl.$inject = ['$scope', 'radarSvc'];

    var radarChart = function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/Content/templates/core/radar-chart.html',
            scope: {},
            controller: radarChartCtrl,
            link: function (scope, element, attrs, controller) {
                scope.shared.renderChart = function () {
                    Chart.defaults.global.responsive = true;

                    var ctx = $(element)[0].getContext('2d');

                    if (scope.radarChart !== undefined && scope.radarChart !== null) {
                        scope.radarChart.destroy();
                    }

                    scope.chart = new Chart(ctx);
                    scope.radarChart = scope.chart.Radar(scope.radarData.data);
                }
            }
        };
    };

    radarChart.$inject = ['radarSvc'];
    referenceApp.directive('radarChart', radarChart);
}());