import { HealthViewGraphSubCategory } from '../enums/healthViewTypes';

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
            text: 'SoH-BMS (%)',
            style: {
                fontSize: '12px',
                fontWeight: 'normal',
            },
        },
    },
    annotations: {
        yaxis: [
            {
                y: 70,
                borderColor: '#FF0000',
                label: {
                    borderColor: '#FF0000',
                    style: {
                        color: '#fff',
                        background: '#FF0000',
                    },
                    text: 'Threshold: 70',
                    position: 'center',
                    offsetY: 6,
                },
                strokeDashArray: 5,
                borderWidth: 2,
            },
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

export const SoHCloudChartConfig: ApexCharts.ApexOptions = {
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
            text: 'SoH-Cloud (%)',
            style: {
                fontSize: '12px',
                fontWeight: 'normal',
            },
        },
    },
    annotations: {
        yaxis: [
            {
                y: 70,
                borderColor: '#FF0000',
                label: {
                    borderColor: '#FF0000',
                    style: {
                        color: '#fff',
                        background: '#FF0000',
                    },
                    text: 'Threshold: 70',
                    position: 'center',
                    offsetY: 6,
                },
                strokeDashArray: 5,
                borderWidth: 2,
            },
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

export const CapacityChartConfig: ApexCharts.ApexOptions = {
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
            text: 'Capacity (Ah)',
            style: {
                fontSize: '12px',
                fontWeight: 'normal',
            },
        },
    },
    // annotations: {
    //     yaxis: [
    //         {
    //             y: 70,
    //             borderColor: 'red',
    //             label: {
    //                 borderColor: 'red',
    //                 style: {
    //                     color: 'white',
    //                     background: 'red',
    //                 },
    //                 position: 'center',
    //                 offsetY: 6,
    //                 text: 'End of Life(70)',
    //             },
    //         },
    //     ],
    // },
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

export const CycleChartConfig: ApexCharts.ApexOptions = {
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
            text: 'Cycles',
            style: {
                fontSize: '12px',
                fontWeight: 'normal',
            },
        },
        max: 50
    },
    annotations: {
        yaxis: [
            {
                y: 2200,
                borderColor: '#FF0000',
                label: {
                    borderColor: 'red',
                    style: {
                        color: 'white',
                        background: 'red',
                    },
                    offsetY: 5,
                    position: 'center',
                    textAnchor: 'end',
                    text: 'Rated Cycles',
                },
            },
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

export function HealthChartConfig(healthGraphState: IHealthViewGraphState): ApexCharts.ApexOptions {
    switch (healthGraphState.subCategory) {
        case HealthViewGraphSubCategory.SoHBMS:
            return SoHBMSChartConfig;
        case HealthViewGraphSubCategory.SoHCloud:
            return SoHCloudChartConfig;
        case HealthViewGraphSubCategory.Capacity:
            return CapacityChartConfig;
        case HealthViewGraphSubCategory.Cycle:
            return CycleChartConfig;
        default:
            return SoHBMSChartConfig;
    }
}
