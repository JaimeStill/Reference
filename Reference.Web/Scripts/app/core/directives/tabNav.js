(function () {
    var tabNav = function ($timeout) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/Content/templates/core/tab-nav.html',
            scope: {
                items: '='
            },
            link: function (scope, element, attrs, controller) {
                var initializeTabs = function () {
                    $(element).find('a:first').tab('show');
                    scope.$emit('tabNavigation', Number($(element).find('a:first')[0].hash[1]));
                };

                $timeout(function () {
                    if ($(element).find('a:first').length > 0) {
                        initializeTabs();
                    } else {
                        $timeout(function () {
                            if ($(element).find('a:first').length > 0) {
                                initializeTabs();
                            } else {
                                $timeout(function () {
                                    if ($(element).find('a:first').length > 0) {
                                        initializeTabs();
                                    }
                                }, 200);
                            }
                        }, 300);
                    }
                });
            }
        };
    };

    tabNav.$inject = ['$timeout'];
    referenceApp.directive('tabNav', tabNav);
}());