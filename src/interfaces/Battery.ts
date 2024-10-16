interface IBatteryContext {
    selectedBatteryIndx: number | null;
    handleSelectBatteryIndx: (batteryIndx: number | null) => void;
}
interface IDummyBatteryAssets {
    isListOpen: boolean;
    toggleList: () => void;
    toggleBatterySelection: (batteryId: IBatteryData) => void;
    selectedBatteries: IBatteryData[];
    batteryData: Array<IBatteryData>;
}
interface IBatteryAssetsProps {
    isLoading: boolean;
    handleScrollEnd: () => void;
    isEndOfBatteries: boolean;
    isLoadingNextBatteries: boolean;
    isListOpen: boolean;
    toggleList: () => void;
    selectedBatteries: IBatteryData[];
    batteriesList: Array<IBatteryData>;
    openViewPage: (battery: IBatteryData) => void;
    searchAssetName: string;
    setSearchAssetName: (value: string) => void;
    handleBatteriesSearch: (value: string) => void;
    clearBatteriesSearch: () => void;
}
interface IBatteryData {
    bat_uid: string;
    asset_name: string;
    model: string | null;
    chemistry: string | null;
    manufacturer: string | null;
    battery_type: string | null;
    comissioned_on: string | null;
    location: string | null;
    nominal_energy_kwh: string | null;
    eid: string | null;
    warranty_end_date: string | null;
    warranty_start_date: string | null;
}
