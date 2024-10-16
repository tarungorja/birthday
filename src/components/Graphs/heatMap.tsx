import Plotly from 'plotly.js';
import React, { useMemo } from 'react';
import Plot from 'react-plotly.js';

const Heatmap = (props: IHeatmapProps) => {
    const { handleRelayout } = props;
    const memoizedLayout: Partial<Plotly.Layout> = useMemo(() => ({
        title: 'Temperature Heatmap',
        xaxis: {
            title: 'Date',
            type: 'date',
            tickformat: '%Y-%m-%d',
        },
        yaxis: {
            title: 'Hours',
            fixedrange: true,
        },
        titlefont: { size: 20 },
        autosize: true,
        showlegend: true,
    }), []);
    return (
        <div>
            <Plot
                key={JSON.stringify(props.data)}
                className='heatmap'
                data={[
                    props.data
                ]}
                layout={memoizedLayout}
                style={{ width: '100%' }}
                config={{
                    responsive: true,
                    showTips: false,
                }}
                onRelayout={handleRelayout}
            />
        </div>
    );
};

export default Heatmap;
