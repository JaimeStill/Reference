(function () {
    var tabAnchor = function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/Content/templates/core/tab-anchor.html',
            scope: {
                anchorId: '=',
                displayName: '='
            },
            link: function (scope, element, attrs, controller) {
                $(element).click(function (e) {
                    e.preventDefault();
                    $(this).tab('show');
                    scope.$emit('tabNavigation', scope.anchorId);
                });
            }
        };
    };

    referenceApp.directive('tabAnchor', tabAnchor);
}());