(function () {
    var assignmentRt = function ($q) {
        var
            assignmentHub = $.connection.assignmentHub,
            assignmentConnection = $.connection.hub.start(),
            chartCallback = function () { },
            dataCallback = function () { }

        assignmentHub.client.updateAssignments = function () {
            if (chartCallback) {
                chartCallback();
            }

            if (dataCallback) {
                dataCallback();
            }
        };

        var
            send = function () {
                var deferred = $q.defer();

                assignmentHub.server.send().done(function () {
                    deferred.resolve();
                });

                return deferred.promise;
            },
            initializeClient = function (data, chart) {
                if (data) {
                    $.connection.hub.stop();
                    dataCallback = data;
                    assignmentConnection = $.connection.hub.start();
                }

                if (chart) {
                    $.connection.hub.stop();
                    chartCallback = chart;
                    assignmentConnection = $.connection.hub.start();
                }
            };

        return {
            send: send,
            initializeClient: initializeClient
        };
    };

    assignmentRt.$inject = ['$q'];
    referenceApp.factory('assignmentRt', assignmentRt);
}());