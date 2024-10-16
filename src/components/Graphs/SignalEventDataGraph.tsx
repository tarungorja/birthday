import React from 'react';
import Plot from 'react-plotly.js';

const SignalEventDataGraph = (props: ISignalEventDataGraph) => {
    const { signalEventData } = props;
    const eventTimes = signalEventData?.map((item) => item.event_time);
    const currents = signalEventData?.map((item) => item.current);
    const packVoltages = signalEventData?.map((item) => item.pack_voltage);
    const socs = signalEventData?.map((item) => item.soC);
    const maxCellTemps = signalEventData?.map((item) => item.max_cell_temperature);
    const batteryStatuses = signalEventData?.map((item) => item.battery_status);

    const getBatteryStatusDescription = (status: number) => {
        switch (status) {
            case 2:
                return 'Over-Charging';
            case 1:
                return 'Charging';
            case 0:
                return 'Stand By';
            case -1:
                return 'Discharging';
            default:
                return 'Unknown';
        }
    };

    return (
        <Plot
            style={{ width: '100%', height: '450px' }}
            data={[
                {
                    x: eventTimes,
                    y: currents,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Current',
                    line: { shape: 'linear' },
                    hovertemplate: 'Current: %{y:.2f}<br>Event Time: %{x}<extra></extra>',
                },
                {
                    x: eventTimes,
                    y: batteryStatuses,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Battery Status',
                    line: { shape: 'linear' },
                    hovertemplate: batteryStatuses?.map(
                        (y) => `Battery Status: ${getBatteryStatusDescription(y)}<br>Event Time: %{x}<extra></extra>`
                    ),
                },
                {
                    x: eventTimes,
                    y: packVoltages,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Pack Voltage',
                    line: { shape: 'linear' },
                    hovertemplate: 'Pack Voltage: %{y:.2f}<br>Event Time: %{x}<extra></extra>',
                },
                {
                    x: eventTimes,
                    y: socs,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'State of Charge (SoC)',
                    line: { shape: 'linear' },
                    hovertemplate: 'State of Charge (SoC): %{y:.2f}<br>Event Time: %{x}<extra></extra>',
                },
                {
                    x: eventTimes,
                    y: maxCellTemps,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Max Cell Temperature',
                    line: { shape: 'linear' },
                    hovertemplate: 'Max Cell Temperature: %{y:.2f}<br>Event Time: %{x}<extra></extra>',
                },
            ]}
            layout={{ xaxis: { title: 'Event Time' }, yaxis: { title: 'Values' } }}
        />
    );
};

export default SignalEventDataGraph;
