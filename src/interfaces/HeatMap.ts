interface IHeatmapProps {
    handleRelayout: (event: Plotly.PlotRelayoutEvent) => void;
    data: IHeatMapData;
    key: string;
}
