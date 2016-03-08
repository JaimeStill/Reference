(function () {
    var uploadRt = function ($q) {
        // Private
        var
            fileHub = $.connection.fileHub,
            fileConnection = $.connection.hub.start();
        fileCallback = function () { };

        fileHub.client.getRecords = function () {
            fileCallback();
        };

        // Public
        var
            send = function () {
                var deferred = $q.defer();

                fileHub.server.send().done(function () {
                    deferred.resolve();
                });

                return deferred.promise;
            },
            initializeClient = function (getRecords) {
                $.connection.hub.stop();
                fileCallback = getRecords;
                fileConnection = $.connection.hub.start();
            };

        return {
            send: send,
            initializeClient: initializeClient
        };
    };

    uploadRt.$inject = ['$q'];
    referenceApp.factory('uploadRt', uploadRt);
}());