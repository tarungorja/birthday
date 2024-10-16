interface ISignalViewProps {
    signalId: string;
    showSignalsTree: boolean;
    setShowSignalsTree: (bool: boolean) => void;
    signalData?: ISignalData;
    batteryMetadata?: IBatteryData;
    batterySignals?: ISignalData[];
    getCategoryPlotData: () => void;
}
interface ISignalEventDataGraph {
    signalEventData?: [ISignalEventData];
}

interface ISignalViewGraphProps {
    bat_uid?: string;
    signalId: string;
    showSignalsTree: boolean;
    batterySignals?: ISignalData[];
}

interface ISignalCategoryGraphProps {
    batterySignals?: ISignalData[];
}

interface ISignalCategoryGraphData {
    x: Date[];
    y: string[];
    mode: 'markers';
    marker: {
        size: number[];
        sizeref: number;
        sizemode: 'area';
        color: string[];
    };
    hovertemplate: string;
    text: string[];
    type: 'scatter';
}
