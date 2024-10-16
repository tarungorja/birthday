// function reqYLabels(value: number): string {
//     if (value === 0 || value === 20 || value === 80 || value === 100) {
//         return value.toFixed();
//     }
//     return '';
// }
// function dataLabelsEdit(value: number): number {
//     return Math.floor(value);
// }
export const operationalSOCRangeGraphOption: ApexCharts.ApexOptions = {
    chart: {
        type: 'area',
        events: { zoomed: () => { } },
        toolbar: {
            tools: {
                download: false,
                zoom: true,
                zoomin: true,
                zoomout: true,
                pan: false,
                reset: true,
            },
            offsetY: 20,
            offsetX: -10,
        },
        stacked: true,
    },
    colors: ['#4f6fd9', '#506fd9'],
    grid: {
        borderColor: 'rgba(72,94,144,0.08)',
        padding: { top: -20 },
        yaxis: {
            lines: { show: false },
        },
    },
    stroke: {
        curve: 'smooth',
        width: [2, 0],
    },
    xaxis: {
        type: 'datetime',
        tickAmount: 13,
        axisBorder: { show: false },
        labels: {
            style: {
                colors: '#6e7985',
                fontSize: '11px',
            },
        },
    },
    yaxis: {
        min: 0,
        // max: 10,
        show: true,
        title: {
            text: 'Run Hours',
            style: {
                fontSize: '12px',
                fontWeight: 'normal',
            },
        },
        labels: {
            formatter: function (val) {
                val = Math.floor(val);
                return val.toFixed();
            }
        }
    },

    fill: {
        type: 'gradient',
        gradient: {
            opacityFrom: 0.5,
            opacityTo: 0,
        },
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    tooltip: {
        enabled: true,
        x: {
            format: 'dd/MM/yy'
        },
        y: {
            title: {
                formatter: (seriesName) => seriesName,
            },
        },
        custom: function ({ seriesIndex, dataPointIndex, w }) {
            const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
            // return '<ul>' +
            //     '<li><b>Duration</b>: ' + data.y + '<b>Hrs</b></li>' +
            //     '<li><b>start_soc</b>: \'' + data.start_soc + '\'</li>' +
            //     '<li><b>end_soc</b>: \'' + data.end_soc + '\'</li>' +
            //     // '<li><b>Site</b>: \'' + data.site + '\'</li>' +
            //     '</ul>';
            return '<div style="background-color: #eaeefb; padding: 10px; border: 1px solid #b0c4de; border-radius: 6px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">' +
                '<ul style="list-style: none; margin: 0; padding: 0; font-size: 14px;">' +
                '<li style="margin-bottom: 6px;"><strong>Duration</strong>: ' + data.y + ' Hrs</li>' +
                '<li style="margin-bottom: 6px;"><strong>Start SOC</strong>: ' + data.start_soc + '</li>' +
                '<li><strong>End SOC</strong>: ' + data.end_soc + '</li>' +
                '</ul>' +
                '</div>';
        },

    },
};

export const operationalValuedSOCGraphOption: ApexCharts.ApexOptions = {
    chart: {
        type: 'area',
        events: { zoomed: () => { } },
        toolbar: {
            tools: {
                download: false,
                zoom: true,
                zoomin: true,
                zoomout: true,
                pan: false,
                reset: true,
            },
            offsetY: 20,
            offsetX: -10,
        },
        stacked: true,
    },
    colors: ['#4f6fd9', '#506fd9'],
    grid: {
        borderColor: 'rgba(72,94,144,0.08)',
        padding: { top: -20 },
        yaxis: {
            lines: { show: false },
        },
    },
    stroke: {
        curve: 'smooth',
        width: [2, 0],
    },
    xaxis: {
        type: 'datetime',
        tickAmount: 13,
        axisBorder: { show: false },
        labels: {
            style: {
                colors: '#6e7985',
                fontSize: '11px',
            },
        },
    },
    yaxis: {
        min: 0,
        // max: 10,
        show: true,
        title: {
            text: 'Backup Time',
            style: {
                fontSize: '12px',
                fontWeight: 'normal',
            },
        },
        labels: {
            formatter: function (val) {
                val = Math.floor(val);
                return val.toFixed();
            }
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
            opacityFrom: 0.5,
            opacityTo: 0,
        },
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    tooltip: {
        enabled: true,
        x: {
            format: 'dd/MM/yy'
        },
        y: {
            title: {
                formatter: (seriesName) => seriesName,
            },
        },
        custom: function ({ seriesIndex, dataPointIndex, w }) {
            const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
            // return '<ul>' +
            //     '<li><b>Duration</b>: ' + data.y + '<b>Hrs</b></li>' +
            //     '<li><b>start_soc</b>: \'' + data.start_soc + '\'</li>' +
            //     '<li><b>end_soc</b>: \'' + data.end_soc + '\'</li>' +
            //     // '<li><b>Site</b>: \'' + data.site + '\'</li>' +
            //     '</ul>';
            return '<div style="background-color: #eaeefb; padding: 10px; border: 1px solid #b0c4de; border-radius: 6px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">' +
                '<ul style="list-style: none; margin: 0; padding: 0; font-size: 14px;">' +
                '<li style="margin-bottom: 6px;"><strong>Backup Time</strong>: ' + data.y + ' Hrs</li>' +
                '</ul>' +
                '</div>';
        },
    },
};

export const chargingCyclesGraphOptions: ApexCharts.ApexOptions = {
    chart: {
        type: 'scatter',
        height: 300,
        zoom: {
            type: 'x'
        }
    },
    xaxis: {
        type: 'datetime',
        title: {
            text: 'Date',
        }
    },
    yaxis: {
        min: 0,
        max: 100,
        title: {
            text: 'SoC'
        },
    },
    legend: {
        show: false,
    },
    // markers: {
    //     size: 5,
    //     // discrete: [{
    //     //     seriesIndex: 0,
    //     //     dataPointIndex: ,
    //     //     fillColor: '#FF0000', // Color for data points with y > 80
    //     //     strokeColor: '#FF0000',
    //     //     size: 7
    //     // }]
    //     colors: ['#188DE7', '#ff0a00']
    // },
    grid: {
        show: true,
    },
    // legend: {
    //     show: true,
    //     showForSingleSeries: true,
    // },
    tooltip: {
        followCursor: true,
    },
    annotations: {
        yaxis: [
            {
                y: 0,
                borderColor: '#000',
                strokeDashArray: 0,
                borderWidth: 1,
            },
            {
                y: 20,
                borderColor: '#000',
                strokeDashArray: 0,
                borderWidth: 1,
            },
            {
                y: 80,
                borderColor: '#000',
                strokeDashArray: 0,
                borderWidth: 1,
            },
            {
                y: 100,
                borderColor: '#000',
                strokeDashArray: 0,
                borderWidth: 1,
            },
        ]
    }
};