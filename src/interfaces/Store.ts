interface IState {
    batteryList: IBatteryData[];
    dateRange: IDateRange;
    selectedBatteryId: string;
    selectedBatteryList: IBatteryData[];
    batteriesSearchClicked: boolean;
    selectedTags: IReactSelect[];
    selectedCategories: IReactSelect[];
}
