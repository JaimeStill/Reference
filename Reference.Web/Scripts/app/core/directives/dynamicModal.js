(function () {
    var dynamicModal = function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/Content/templates/core/dynamic-modal.html',
            scope: {
                modalOptions: '='
            }
        };
    };

    referenceApp.directive('dynamicModal', dynamicModal);
}());