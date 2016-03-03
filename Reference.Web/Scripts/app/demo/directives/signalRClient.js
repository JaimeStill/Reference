(function () {
    var signalRClientCtrl = function ($scope, demoSvc, assignmentRt) {
        demoSvc.getAssignmentRadar();

        assignmentRt.initializeClient(demoSvc.getAssignments, demoSvc.getAssignmentRadar);
    };

    signalRClientCtrl.$inject = ['$scope', 'demoSvc', 'assignmentRt'];

    var signalRClient = function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/Content/templates/demo/signal-r-client.html',
            scope: {},
            controller: signalRClientCtrl
        };
    };

    referenceApp.directive('signalRClient', signalRClient);
}());