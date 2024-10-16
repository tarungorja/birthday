import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const SignalCategoryGraphs = (props: ISignalCategoryGraphProps) => {
    const { batterySignals } = props;
    const [plotData, setPlotData] = useState<{ data: ISignalCategoryGraphData[]; layout: Partial<Plotly.Layout>; }>({
        data: [],
        layout: {},
    });
    useEffect(() => {
        const dates: Date[] = [];
        const categories: string[] = [];
        const bubble_sizes: number[] = [];
        const colors: string[] = [];
        const hoverData: string[] = [];
        batterySignals?.forEach((doc) => {

            const bubble_size = doc.severity === 'Critical' ? 4 : doc.severity === 'Major' ? 3 : doc.severity === 'Moderate' ? 2 : 1;
            const [datePart, timePart] = doc.signal_date.split('T');
            const [day, month, year] = datePart.split('-').map(Number);
            const signal_date = new Date(year, month - 1, day, ...timePart.split(':').map(Number));
            dates.push(signal_date);
            categories.push(doc.category);
            bubble_sizes.push(bubble_size);
            hoverData.push(
                JSON.stringify({
                    severity: doc.severity,
                    category: doc.category,
                    title: doc.event_details.title,
                    description: doc.event_details.description,
                })
            );
            const color = bubble_size === 4 ? '#FF0000' : bubble_size === 3 ? '#FFFF00' : bubble_size === 2 ? '#FFA500' : 'green';
            colors.push(color);
        });

        const plot: ISignalCategoryGraphData = {
            x: dates,
            y: categories,
            mode: 'markers',
            marker: {
                size: bubble_sizes,
                sizeref: (2.0 * Math.max(...bubble_sizes)) / 30 ** 2,
                sizemode: 'area',
                color: colors,
            },
            hovertemplate: 'Date: %{x|%Y-%m-%d %H:%M:%S}<br>' + '%{text}<br><extra></extra>',
            text: hoverData.map((data) => {
                const parsed = JSON.parse(data);
                return `Severity: ${parsed.severity}<br>Category:${parsed.category}<br>Title: ${parsed.title}<br>Description: ${parsed.description}`;
            }),
            type: 'scatter',
        };

        const layout: Partial<Plotly.Layout> = {
            title: `Category Plot of ${batterySignals && batterySignals[0].bat_name}`,
            xaxis: {
                title: 'Date',
                showline: true,
                linecolor: 'black',
                showgrid: false,
            },
            yaxis: {
                showline: false,
                showticklabels: false,
                showgrid: false,
            },
            plot_bgcolor: 'white',
        };
        setPlotData({ data: [plot], layout });
    }, [batterySignals]);

    return (
        <Plot
            data={plotData.data}
            layout={plotData.layout}
            config={{ displayModeBar: true, showTips: false }}
            style={{ width: '100%', height: '500px' }}
        />
    );
};

export default SignalCategoryGraphs;
