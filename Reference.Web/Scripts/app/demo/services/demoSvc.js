(function () {
    var demoSvc = function ($http, $q, uploadRt, toastrSvc, radarSvc, assignmentRt) {
        var
            recordModel = function () {
                var records = {};

                return {
                    records: records
                };
            },
            categoryModel = function () {
                var categories = {};

                return {
                    categories: categories
                };
            },
            assignmentModel = function () {
                var assignments = {},
                    categories = {}; 1

                return {
                    assignments: assignments,
                    categories: categories
                };
            },
            radarModel = function () {
                var categories = [],
                    maxHours = [],
                    avgHours = [],
                    minHours = [];

                return {
                    categories: categories,
                    maxHours: maxHours,
                    avgHours: avgHours,
                    minHours: minHours
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
            getCategories = function () {
                var deferred = $q.defer();

                $http({
                    url: '/api/rt/getCategories',
                    method: 'GET'
                }).success(function (data) {
                    categoryModel.categories = data;
                    assignmentModel.categories = data;
                    deferred.resolve(data);
                }).error(function (data) {
                    toastrSvc.alertError(data.Message, "Error: Get Categories");
                    deferred.reject(data);
                });

                return deferred.promise;
            },
            getAssignments = function () {
                var deferred = $q.defer();

                $http({
                    url: '/api/rt/getAssignments',
                    method: 'GET'
                }).success(function (data) {
                    assignmentModel.assignments = data;
                    deferred.resolve(data);
                }).error(function (data) {
                    toastrSvc.alertError(data.Message, "Error: Get Assignments");
                    deferred.reject(data);
                });

                return deferred.promise;
            },
            addAssignment = function (assignment) {
                var deferred = $q.defer();

                $http({
                    url: '/api/rt/addAssignment',
                    method: 'POST',
                    data: assignment
                }).success(function (data) {
                    assignmentRt.send();
                    getAssignments();
                    toastrSvc.alertSuccess("Assignment Added", "Success!");
                    deferred.resolve(data);
                }).error(function (data) {
                    toastrSvc.alertError(data.Message, "Error: Add Assignment");
                    deferred.reject(data);
                });

                return deferred.promise;
            },
            updateAssignment = function (assignment) {
                var deferred = $q.defer();

                $http({
                    url: '/api/rt/updateAssignment',
                    method: 'POST',
                    data: assignment
                }).success(function (data) {
                    assignmentRt.send();
                    getAssignments();
                    toastrSvc.alertSuccess("Assignment Updated", "Success!");
                    deferred.resolve(data);
                }).error(function (data) {
                    toastrSvc.alertError(data.Message, "Error: Update Assignment");
                    deferred.reject(data);
                });

                return deferred.promise;
            },
            deleteAssignment = function (assignment) {
                var deferred = $q.defer();

                $http({
                    url: '/api/rt/deleteAssignment',
                    method: 'POST',
                    data: assignment.id
                }).success(function (data) {
                    assignmentRt.send();
                    getAssignments();
                    toastrSvc.alertSuccess(assignment.description + " deleted", "Success!");
                    deferred.resolve(data);
                }).error(function (data) {
                    toastrSvc.alertError(data.Message, "Error: Delete Assignment");
                    deferred.reject(data);
                })
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
            },
            getAssignmentRadar = function () {
                var deferred = $q.defer();

                $http({
                    url: '/api/rt/getAssignmentRadar'
                }).success(function (data) {
                    radarModel.categories = data.categories;
                    radarModel.maxHours = data.maxHours;
                    radarModel.avgHours = data.avgHours;
                    radarModel.minHours = data.minHours;
                    renderRadar();
                    deferred.resolve(data);
                }).error(function (data) {
                    toastrSvc.alertError(data.Message, "Error: Get Assignment Radar");
                    deferred.reject(data);
                });

                return deferred.promise;
            },
            renderRadar = function () {
                var
                    maxChartOptions = {
                        label: 'Max',
                        fillColor: 'rgba(140, 0, 0, 0.2)',
                        strokeColor: 'rgba(140, 0, 0, 0.4)',
                        pointColor: 'rgba(140, 0, 0, 0.6)',
                        pointStrokeColor: 'rgba(140, 0, 0, 1)',
                        pointHighlightFill: 'rgba(140, 0, 0, 1)',
                        pointHighlightStroke: 'rgba(100, 0, 0, 1)',
                        data: radarModel.maxHours
                    },
                    avgChartOptions = {
                        label: 'Average',
                        fillColor: 'rgba(0, 140, 0, 0.2)',
                        strokecolor: 'rgba(0, 140, 0, 0.4)',
                        pointColor: 'rgba(0, 140, 0, 0.6)',
                        pointStrokeColor: 'rgba(0, 140, 0, 1)',
                        pointHighlightFill: 'rgba(0, 140, 0, 1)',
                        pointHighlightStroke: 'rgba(0, 100, 0, 1)',
                        data: radarModel.avgHours
                    },
                    minChartOptions = {
                        label: 'Min',
                        fillColor: 'rgba(0, 0, 140, 0.2)',
                        strokeColor: 'rgba(0, 0, 140, 0.4)',
                        pointColor: 'rgba(0, 0, 140, 0.6)',
                        pointStrokeColor: 'rgbaI0, 0, 140, 1)',
                        pointHighlightFill: 'rgba(0, 0, 140, 1)',
                        pointHighlightStroke: 'rgba(0, 0, 100, 1)',
                        data: radarModel.minHours
                    },
                    datasets = [];

                datasets.push(maxChartOptions);
                datasets.push(avgChartOptions);
                datasets.push(minChartOptions);

                radarSvc.updateRadar(radarModel.categories, datasets);
            };

        uploadRt.initializeClient(getRecords);

        return {
            recordModel: recordModel,
            getRecords: getRecords,
            categoryModel: categoryModel,
            assignmentModel: assignmentModel,
            radarModel: radarModel,
            getCategories: getCategories,
            getAssignments: getAssignments,
            addAssignment: addAssignment,
            updateAssignment: updateAssignment,
            deleteAssignment: deleteAssignment,
            deleteRecord: deleteRecord,
            getAssignmentRadar: getAssignmentRadar,
            renderRadar: renderRadar
        };
    };

    demoSvc.$inject = ['$http', '$q', 'uploadRt', 'toastrSvc', 'radarSvc', 'assignmentRt'];

    referenceApp.factory('demoSvc', demoSvc);
}());