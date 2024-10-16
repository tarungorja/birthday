interface ISignalsProps {
    signalsData: ISignalData[];
    selectedDateRange: [Date, Date] | null;
    handleDateRangeChange: (value: [Date, Date] | null) => void;
    showRecentlyViewedSignals: boolean;
    toggleRecentlyViewedSignals: () => void;
    getDay: (signal: ISignalData) => number;
    isEndOfSignals: boolean;
    isLoadingNextSignals: boolean;
    isLoading: boolean;
    handleScrollEnd: () => void;
    openSignalViewPage: (signal: ISignalData) => void;
}

interface IDummySignalsProps {
    moduleName: string;
    selectedDateRange: [Date, Date] | null;
    handleDateRangeChange: (value: [Date, Date] | null) => void;
    isSignalListOpen: boolean;
    toggleSignalList: () => void;
}

interface ISignalData {
    id?: string;
    bat_uid: string;
    bat_name: string;
    category: string;
    category_id: string;
    module: [string];
    signal_date: string;
    severity: string;
    created_at: string;
    updated_at: string;
    event_details: {
        current_value: number;
        threshold_value: number;
        title: string;
        description: string;
    };
    eid: string;
    event_data: [ISignalEventData];
    temperature_range: string;
    max_voltage: number;
    battery_status: string;
    max_current: number;
    min_current: number;
    // avg_C_rate: number;
}

interface ISignalEventData {
    current: number;
    pack_voltage: number;
    soC: number;
    max_cell_temperature: number;
    battery_status: number;
    event_time: string;
}

interface SignalTreeChartData {
    id: number;
    name: string;
    attributes?: {
        [key: string]: string;
    };
    children?: SignalTreeChartData[];
}
