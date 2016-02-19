(function () {
    var chartRt = function ($q) {
        // Private
        var
            chartHub = $.connection.chartHub,
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

                $.connection.hub.start().done(function () {
                    chartHub.server.send(labels, datasets, samples).done(function () {
                        deferred.resolve();
                    });
                });

                return deferred.promise;
            },
            initializeServer = function (updateChart, updateSample) {
                chartCallback = updateChart;
                sampleCallback = updateSample;
            },
            initializeClient = function (scope) {
                clientScope = scope;
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