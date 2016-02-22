﻿(function () {
    var demoSvc = function ($http, $q, uploadRt, toastrSvc) {
        var
            recordModel = function () {
                var records = {};

                return {
                    records: records
                };
            },
            getRecords = function () {
                var deferred = $q.defer();

                $http({
                    url: '/api/files/getRecords',
                    method: 'GET'
                }).success(function (data) {
                    toastrSvc.alertSuccess("Records retrieved", "demoSvc - getRecords()");
                    recordModel.records = data;
                    deferred.resolve(data);
                }).error(function (data) {
                    toastrSvc.alertError("Error getting records", "demoSvc - getRecords()");
                    deferred.reject(data);
                });

                return deferred.promise;
            },
            deleteRecord = function (id) {
                var deferred = $q.defer();

                $http({
                    url: '/api/files/deleteRecord',
                    method: 'POST',
                    data: id
                }).success(function (data) {
                    toastrSvc.alertSuccess("Record deleted", "demoSvc - deleteRecord()");
                    uploadRt.send().then(function () {
                        toastrSvc.alertSuccess("fileHub.server.send");
                    });
                    getRecords();
                    deferred.resolve(data);
                }).error(function (data) {
                    toastrSvc.alertError("Error deleting record", "demoSvc - deleteRecord()");
                    deferred.reject(data);
                });

                return deferred.promise;
            };

        uploadRt.initializeClient(getRecords);

        return {
            recordModel: recordModel,
            getRecords: getRecords,
            deleteRecord: deleteRecord
        };
    };

    demoSvc.$inject = ['$http', '$q', 'uploadRt', 'toastrSvc'];

    referenceApp.factory('demoSvc', demoSvc);
}());