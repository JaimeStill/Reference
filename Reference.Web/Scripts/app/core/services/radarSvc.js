(function () {
    var radarSvc = function () {
        var
            radarData = {
                data: {
                    labels: [],
                    datasets: []
                }
            },
            sharedScope = {
                renderChart: function () { }
            },
            updateRadar = function (labels, datasets) {
                radarData.data.labels = labels;
                radarData.data.datasets = datasets;
                sharedScope.renderChart();
            };

        return {
            radarData: radarData,
            sharedScope: sharedScope,
            updateRadar: updateRadar
        };
    };

    referenceApp.factory('radarSvc', radarSvc);
}());