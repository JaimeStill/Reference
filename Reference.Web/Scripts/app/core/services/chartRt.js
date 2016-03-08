(function () {
    var chartRt = function ($q) {
        // Private
        var
            chartHub = $.connection.chartHub,
            chartConnection = $.connection.hub.start(),
            chartCallback = function () { },
            sampleCallback = function () { },
            clientScope = {};

        chartHub.client.updateChart = function (labels, datasets, samples) {
            clientScope.$apply(function () {
                chartCallback(labels, datasets);
                sampleCallback(samples);
            });
        };

        // Public
        var
            send = function (labels, datasets, samples) {
                var deferred = $q.defer();

                chartHub.server.send(labels, datasets, samples).done(function () {
                    deferred.resolve();
                });

                return deferred.promise;
            },
            initializeServer = function (updateChart, updateSample) {
                $.connection.hub.stop();
                chartCallback = updateChart;
                sampleCallback = updateSample;
                chartConnection = $.connection.hub.start();
            },
            initializeClient = function (scope) {
                $.connection.hub.stop();
                clientScope = scope;
                chartConnection = $.connection.hub.start();
            };

        return {
            send: send,
            initializeServer: initializeServer,
            initializeClient: initializeClient
        };
    };

    chartRt.$inject = ['$q'];
    referenceApp.factory('chartRt', chartRt);
}());