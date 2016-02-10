(function () {
    var chartSvc = function () {
        var
            chartData = {
                data: {
                    labels: [],
                    datasets: []
                }
            },
            sharedScope = {},
            updateChart = function (labels, datasets) {
                chartData.data.labels = labels;
                chartData.data.datasets = datasets;
                sharedScope.renderChart();
            },
            randomizeChart = function () {
                var
                    labels = ['sampleOne', 'sampleTwo', 'sampleThree', 'sampleFour', 'sampleFive'],
                    datasets = [],
                    setLabels = [
                        "setOne",
                        "setTwo",
                        "setThree"
                    ],
                    fillColors = [
                        "rgba(140, 0, 0, 0.2)",
                        "rgba(0, 140, 0, 0.2)",
                        "rgba(0, 0, 140, 0.2)"
                    ],
                    strokeColors = [
                        "rgba(140, 0, 0, 0.4)",
                        "rgba(0, 140, 0, 0.4)",
                        "rgba(0, 0, 140, 0.4)"
                    ],
                    pointColors = [
                        "rgba(140, 0, 0, 0.6)",
                        "rgba(0, 140, 0, 0.6)",
                        "rgba(0, 0, 140, 0.6)"
                    ],
                    pointStrokColorsAndHighlightFills = [
                        "#800",
                        "#080",
                        "#008"
                    ],
                    pointHighlightStrokes = [
                        "rgba(100, 0, 0, 1)",
                        "rgba(0, 100, 0, 1)",
                        "rgba(0, 0, 100, 1)"
                    ];

                for (var i = 0; i < 3; i++) {
                    var data = [
                        Math.floor((Math.random() * 10) + 1),
                        Math.floor((Math.random() * 10) + 1),
                        Math.floor((Math.random() * 10) + 1),
                        Math.floor((Math.random() * 10) + 1),
                        Math.floor((Math.random() * 10) + 1)
                    ];

                    var dataset = {
                        label: labels[i],
                        fillColor: fillColors[i],
                        strokeColor: strokeColors[i],
                        pointColor: pointColors[i],
                        pointStrokeColor: pointStrokColorsAndHighlightFills[i],
                        pointHighlightFill: pointStrokColorsAndHighlightFills[i],
                        pointHighlightStroke: pointHighlightStrokes[i],
                        data: data
                    };

                    datasets.push(dataset);
                }

                updateChart(labels, datasets);
            };

        return {
            chartData: chartData,
            updateChart: updateChart,
            sharedScope: sharedScope,
            randomizeChart: randomizeChart
        };
    };

    referenceApp.factory('chartSvc', chartSvc);
}());