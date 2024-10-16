export const seriesThree = [
    {
        data: [{
            x: '18-04-2024',
            y: [20, 80]
        }, {
            x: '19-04-2024',
            y: [35, 95]
        }, {
            x: '20-04-2024',
            y: [30, 78]
        }, {
            x: '21-04-2024',
            y: [50, 90]
        }, {
            x: '22-04-2024',
            y: [35, 90]
        }, {
            x: '23-04-2024',
            y: [30, 95]
        }, {
            x: '24-04-2024',
            y: [25, 85]
        }

        ]
    }
];

export const optionThree: ApexCharts.ApexOptions = {
    chart: {
        type: 'rangeBar',
        height: 350
    },
    plotOptions: {
        bar: {
            horizontal: false
        }
    },
    dataLabels: {
        enabled: true,
    }
};
export const seriesFour = [95];

export const optionFour = {
    plotOptions: {
        radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
                background: '#e7e7e7',
                strokeWidth: '97%',
                margin: 5, // margin is in pixels
                dropShadow: {
                    enabled: true,
                    top: 2,
                    left: 0,
                    color: '#999',
                    opacity: 1,
                    blur: 2
                }
            },
            dataLabels: {
                name: {
                    show: true
                },
                value: {
                    offsetY: -40,
                    fontSize: '22px'
                }
            }
        }
    },
    grid: {
        padding: {
            top: -10
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'light',
            shadeIntensity: 0.4,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 53, 91]
        },
    },
    labels: ['Excellent', 'Range Score'],
};
export const seriesFive = [
    {
        name: 'Temperature',
        data: [28, 29, 33, 36, 32, 32, 33],
    }
];

function addUnits(value: number): string {
    const valueString = value.toString();
    const resultString = `${valueString}°C`;
    return resultString;
}
export const optionFive: ApexCharts.ApexOptions = {
    chart: {
        height: 250,
        type: 'line',
        dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
        },
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false
        }
    },
    colors: ['#77B6EA', '#545454'],
    dataLabels: {
        enabled: true,
        formatter: addUnits,
    },
    stroke: {
        curve: 'smooth'
    },
    grid: {
        borderColor: '#e7e7e7',
        row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
        },
    },
    markers: {
        size: 1,
    },
    xaxis: {
        categories: ['18-04-2024', '19-04-2024', '20-04-2024', '21-04-2024', '22-04-2024', '23-04-2024', '24-04-2024'],
    },
    yaxis: {
        title: {
            text: 'Temperature'
        },
        min: 5,
        max: 40
    },
    tooltip: {
        enabled: true,
        y: {
            formatter: addUnits
        }
    },
    legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
    }
};
export const seriesSix = [
    {
        // name: 'Scatter plot',
        data: [
            [1360710000000, 38.81],
            [1360796400000, 38.61],
            [1360882800000, 38.63],
            [1361228400000, 38.99],
            [1361314800000, 38.77],
            [1361401200000, 38.34],
            [1361487600000, 38.55],
            [1361746800000, 38.11],
            [1361833200000, 38.59],
            [1361919600000, 39.60],
        ]
    }
];
function reqYLabels(value: number): string {
    if (value === 0 || value === 20 || value === 80 || value === 100) {
        return value.toFixed();
    }
    return '';
}
export const optionSix: ApexCharts.ApexOptions = {
    chart: {
        type: 'scatter',
        height: 300,
        zoom: {
            type: 'xy'
        }
    },
    xaxis: {
        type: 'datetime'
    },
    yaxis: {
        min: 0,
        max: 100,
        labels: {
            formatter: reqYLabels,
        }
    },
    grid: {
        show: false,
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