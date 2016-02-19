(function () {
    var uploadRt = function ($q) {
        // Private
        var
            fileHub = $.connection.fileHub,
            fileCallback = function () { };

        fileHub.client.getRecords = function () {
            fileCallback();
        };

        // Public
        var
            send = function () {
                var deferred = $q.defer();

                $.connection.hub.start().done(function () {
                    fileHub.server.send().done(function () {
                        deferred.resolve();
                    });
                });

                return deferred.promise;
            },
            initializeClient = function (getRecords) {
                fileCallback = getRecords;
            };

        return {
            send: send,
            initializeClient: initializeClient
        };
    };

    uploadRt.$inject = ['$q'];
    referenceApp.factory('uploadRt', uploadRt);
}());