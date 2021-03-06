﻿(function () {
    var demoLayoutCtrl = function ($scope, $timeout, chartSvc, chartRt) {
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

        //$scope.contents = [
        //    {
        //        name: "File Upload",
        //        directive: "file-demo",
        //        id: 2
        //    },
        //    {
        //        name: "Line Chart",
        //        directive: "line-chart-demo",
        //        id: 1
        //    }
        //];

        chartRt.initializeClient($scope);

        $scope.$on('tabShown', function (e, anchorId) {
            $timeout(function () {
                if (anchorId == 1) {
                    chartSvc.sharedScope.renderChart();
                }
            });
        });
    };

    demoLayoutCtrl.$inject = ['$scope', '$timeout', 'chartSvc', 'chartRt'];

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