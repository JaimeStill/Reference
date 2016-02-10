(function () {
    var toastrSvc = function () {
        var
            options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": false,
                "progressBar": true,
                "positionClass": "toast-top-right",
                "preventDuplicates": true,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "500",
                "timeOut": "3500",
                "extendedTimeOut": "300",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "slideDown",
                "hideMethod": "fadeOut"
            },
            alertSuccess = function (message, title) {
                toastr.success(message, title);
            },
            alertInfo = function (message, title) {
                toastr.info(message, title);
            },
            alertWarning = function (message, title) {
                toastr.warning(message, title);
            },
            alertError = function (message, title) {
                toastr.error(message, title);
            },
            setToastrOptions = function (options) {
                toastr.options = options;
            };

        toastr.options = options;

        return {
            alertSuccess: alertSuccess,
            alertInfo: alertInfo,
            alertWarning: alertWarning,
            alertError: alertError,
            setToastrOptions: setToastrOptions
        };
    };

    referenceApp.factory('toastrSvc', toastrSvc);
}());