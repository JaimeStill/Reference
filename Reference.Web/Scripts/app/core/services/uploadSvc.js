(function () {
    var uploadSvc = function ($http, $q, uploadRt, toastrSvc) {
        var
            pendingFilesModel = function () {
                var files = {};

                return {
                    files: files
                };
            },
            uploadModel = function () {
                var loading = false;

                return {
                    loading: loading
                };
            },
            updateFiles = function (files) {
                pendingFilesModel.files = files;
            },
            uploadFiles = function (url) {
                if (pendingFilesModel.files.length > 0) {
                    uploadModel.loading = true;

                    var deferred = $q.defer();

                    $http({
                        url: url,
                        method: 'PUT',
                        headers: { 'Content-Type': undefined },
                        transformRequest: function (data) {
                            var formData = new FormData();

                            for (var i = 0; i < data.files.length; i++) {
                                formData.append("file" + i, data.files[i]);
                            }

                            return formData;
                        },
                        data: { files: pendingFilesModel.files }
                    }).success(function (data) {
                        for (var i = 0; i < pendingFilesModel.files.length; i++) {
                            toastrSvc.alertSuccess(pendingFilesModel.files[i].name + " uplaoded", "uploadSvc - uploadFiles()");
                        }
                        pendingFilesModel.files = {};
                        uploadRt.send().then(function () {
                            toastrSvc.alertSuccess("fileHub.server.send");
                        });
                        deferred.resolve(data);
                    }).error(function (data) {
                        toastrSvc.alertError("Error uploading file(s)", "uplaodSvc - uploadFiles()");
                        deferred.reject(data);
                    }).finally(function () {
                        uploadModel.loading = false;
                    });

                    return deferred.promise;
                } else {
                    toastrSvc.alertInfo("No files pending upload", "uploadSvc - uploadFiles()");
                }
            };

        return {
            pendingFilesModel: pendingFilesModel,
            uploadModel: uploadModel,
            updateFiles: updateFiles,
            uploadFiles: uploadFiles
        };
    };
    referenceApp.$inject = ['$http', '$q', 'uploadRt', 'toastrSvc'];
    referenceApp.factory('uploadSvc', uploadSvc);
}());