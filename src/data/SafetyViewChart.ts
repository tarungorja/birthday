export const safetyIncidentsChartLayout: Partial<Plotly.Layout> = {
    // title: 'Temperature Heatmap',
    height: 400,
    margin: {
        t: 20, // Adjust the top margin
    },
    xaxis: {
        title: 'Date',
        type: 'date',
        tickformat: '%Y-%m-%d',
    },
    yaxis: {
        title: 'Number of incidents',
        fixedrange: true,
        tickmode: 'linear',
        tick0: 0,
        dtick: 1,
    },
    titlefont: { size: 15 },
    autosize: true,
    showlegend: true,
};

export const safetyTemperatureChartLayout: Partial<Plotly.Layout> = {
    // title: 'Temperature Heatmap',
    height: 400,
    margin: {
        t: 20
    },
    xaxis: {
        title: 'Date',
        type: 'date',
        tickformat: '%Y-%m-%d',
    },
    yaxis: {
        title: 'Time',
        fixedrange: true,
        tick0: 0,
        dtick: 2
    },
    titlefont: { size: 15 },
    autosize: true,
    showlegend: true,

};

export const intialSafetyChartData = {
    x: [],
    y: [],
    mode: 'markers',
    marker: {
        size: [],
        sizeref: 0.1,
        sizemode: 'area'
    },
    customdata: [],
    hovertemplate: ''
};


export const getSafetyIncidentChartData = (chartData: ISafetyIncidentsData) => {
    return {
        x: chartData.x,
        y: chartData.y,
        mode: 'markers',
        marker: {
            size: chartData.z,
            sizeref: 0.003,
            sizemode: 'area'
        },
        customdata: chartData.customdata,
        hovertemplate: ' Signal_Date: %{x}<br> Number of Incidents : %{y}<br>Signal Title: %{customdata[1]}<br> (Click on the bubble for details)<br><extra></extra>',
    };

};

export const getHourlyTempChartData = (chartData: IHeatMapData) => {
    return {
        x: chartData.x,
        y: chartData.y,
        z: chartData.z,
        type: 'heatmap',
        zmin: 0,
        zmax: 60,
        colorscale: [
            [0, 'lightgreen'], // Yellow
            [0.3, 'yellow'],
            [0.58, 'orange'],
            [1, '#FF0000']
        ],
        colorbar: {
            title: {
                text: 'Temperature (°C)',
                side: 'right',
            },
            tickvals: [0, 10, 20, 30, 40, 50, 60],
            ticktext: ['0°C', '10°C', '20°C', '30°C', '40°C', '50°C', '60°C'],
        },
        showscale: true,
        hovertemplate: 'Date: %{x}<br>Hours: %{y}<br>Max Temperature: %{z}°C<extra></extra>',
    };

};
const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

const generateDateLabels = (startDate: string, endDate: string, numLabels: number): string[] => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    const intervalInDays = Math.floor(totalDays / (numLabels - 1));

    const dateLabels: string[] = [];

    for (let i = 0; i < numLabels - 1; i++) {
        const date = addDays(start, i * intervalInDays);
        dateLabels.push(date.toISOString().split('T')[0]);
    }

    dateLabels.push(end.toISOString().split('T')[0]);

    return dateLabels;
};

export function setLayout(layout: Partial<Plotly.Layout>, oldestSignalDate: string, latestSignalDate: string): Partial<Plotly.Layout> {
    const dateLabels = generateDateLabels(oldestSignalDate, latestSignalDate, 10);
    console.log(dateLabels);
    layout.xaxis = {
        ...layout.xaxis,
        tickvals: dateLabels,
        ticktext: dateLabels
    };
    return layout;
}

