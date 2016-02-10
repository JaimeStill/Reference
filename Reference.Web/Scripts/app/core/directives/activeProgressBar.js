(function () {
    var activeprogressBar = function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/Content/templates/core/active-progress-bar.html'
        };
    };

    referenceApp.directive('activeProgressBar', activeprogressBar);
}());