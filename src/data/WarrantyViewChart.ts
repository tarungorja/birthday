
export const SoHBMSChartConfig: ApexCharts.ApexOptions = {
    chart: {
        parentHeightOffset: 0,
        type: 'area',

        toolbar: {
            tools: {
                download: false,
                zoom: true,
                zoomin: true,
                zoomout: true,
                pan: false,
                reset: true,
            },
            offsetY: -20,
            offsetX: -10,
        },
        stacked: false,
        events: {
            zoomed: () => { },

        },
    },
    colors: ['#506fd9', '#0dcaf0'],
    grid: {
        borderColor: 'rgba(72,94,144,0.08)',
        padding: { top: -20 },
        yaxis: {
            lines: { show: false },
        },
    },
    stroke: {
        curve: 'straight',
        width: [2, 2],
    },
    xaxis: {
        min: 1676367260000,
        max: new Date('2028-02-14').getTime(),
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
        show: true,
        title: {
            text: 'BMS - SoH(%)',
            style: {
                fontSize: '12px',
                fontWeight: 'normal',
            },
        },
    },
    annotations: {
        xaxis: [
            {
                x: new Date('2023-02-14').getTime(),
                borderColor: '#f7ef02',
                borderWidth: 2,
                strokeDashArray: 0,
                label: {
                    borderColor: '#f7ef02',
                    style: {
                        background: '#f7ef02',
                    },
                    orientation: 'horizontal',
                    text: 'Begining of Warranty',
                    textAnchor: 'start',
                    offsetY: 270
                }
            },
            {
                x: new Date('2028-02-14').getTime(),
                borderColor: '#FF0000',
                borderWidth: 2,
                strokeDashArray: 0,
                label: {
                    borderColor: '#FF0000',
                    style: {
                        background: '#FF0000',
                        color: '#fff'
                    },
                    orientation: 'horizontal',
                    text: 'End of Warranty',
                    textAnchor: 'end',
                    offsetY: 270
                }
            }
        ],
    },
    fill: {
        type: 'gradient',
        gradient: {
            opacityFrom: 0.5,
            opacityTo: 0,
        },
    },
    dataLabels: { enabled: false },
    legend: { show: true },
    tooltip: {
        enabled: true,
    },
};


export const equivalentCyclesChartConfig: ApexCharts.ApexOptions = {
    chart: {
        parentHeightOffset: 0,
        type: 'area',

        toolbar: {
            tools: {
                download: false,
                zoom: true,
                zoomin: true,
                zoomout: true,
                pan: false,
                reset: true,
            },
            offsetY: -20,
            offsetX: -10,
        },
        stacked: false,
        events: { zoomed: () => { } },
    },
    colors: ['#506fd9', '#0dcaf0'],
    grid: {
        borderColor: 'rgba(72,94,144,0.08)',
        padding: { top: -20 },
        yaxis: {
            lines: { show: false },
        },
    },
    stroke: {
        curve: 'straight',
        width: [2, 2],
    },
    xaxis: {
        min: new Date('2023-02-14').getTime(),
        max: new Date('2028-02-14').getTime(),
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
        max: 50,
        show: true,
        title: {
            text: 'Equivalent Cycles',
            style: {
                fontSize: '12px',
                fontWeight: 'normal',
            },
        },
    },
    annotations: {
        xaxis: [
            {
                x: new Date('2023-02-14').getTime(),
                borderColor: '#f7ef02',
                borderWidth: 2,
                strokeDashArray: 0,
                label: {
                    borderColor: '#f7ef02',
                    style: {
                        background: '#f7ef02',
                    },
                    orientation: 'horizontal',
                    text: 'Begining of Warranty',
                    textAnchor: 'start',
                    offsetY: 270
                }
            },
            {
                x: new Date('2028-02-14').getTime(),
                borderColor: '#FF0000',
                borderWidth: 2,
                strokeDashArray: 0,
                label: {
                    borderColor: '#FF0000',
                    style: {
                        background: '#FF0000',
                        color: '#fff'
                    },
                    orientation: 'horizontal',
                    text: 'End of Warranty',
                    textAnchor: 'end',
                    offsetY: 270
                }
            }
        ],
    },
    fill: {
        type: 'gradient',
        gradient: {
            opacityFrom: 0.5,
            opacityTo: 0,
        },
    },
    dataLabels: { enabled: false },
    legend: { show: true },
    tooltip: {
        enabled: true,
    },
};

export function changeWarrantyDate(chartOptions: ApexCharts.ApexOptions, warrantyStartDate: number, warrantyEndDate: number): ApexCharts.ApexOptions {
    const annotations = [
        {
            x: warrantyStartDate,
            borderColor: '#f7ef02',
            borderWidth: 2,
            strokeDashArray: 0,
            label: {
                borderColor: '#f7ef02',
                style: {
                    background: '#f7ef02',
                },
                orientation: 'horizontal',
                text: 'Begining of Warranty',
                textAnchor: 'start',
                offsetY: 270
            }
        },
        {
            x: warrantyEndDate,
            borderColor: '#FF0000',
            borderWidth: 2,
            strokeDashArray: 0,
            label: {
                borderColor: '#FF0000',
                style: {
                    background: '#FF0000',
                    color: '#fff'
                },
                orientation: 'horizontal',
                text: 'End of Warranty',
                textAnchor: 'end',
                offsetY: 270
            }
        }
    ];
    if (chartOptions.annotations?.xaxis) {
        chartOptions.annotations.xaxis = annotations;
    }
    if (chartOptions.xaxis) {
        chartOptions.xaxis.min = warrantyStartDate;
        chartOptions.xaxis.max = warrantyEndDate;
    }
    if (chartOptions.chart?.events && chartOptions.annotations?.xaxis) {
        chartOptions.chart.events.beforeResetZoom = (chartContext) => {
            chartContext.updateOptions({
                xaxis: {
                    min: warrantyStartDate,
                    max: warrantyEndDate
                },
            });
            return false;
        };
        chartOptions.annotations.xaxis = annotations;
    }
    return chartOptions;
}