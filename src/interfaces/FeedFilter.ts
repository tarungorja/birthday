interface IFeedFilterProps {
    handleTagSelection: (value: IReactSelect[]) => void;
    selectedBatteryList: IBatteryData[];
    selectedDateRange: [Date, Date] | null;
    handleDateRangeChange: (value: [Date, Date] | null) => void;
    handleCategorySelection: (value: IReactSelect[]) => void;
    tags: IReactSelect[];
    categories: IReactSelect[];
    selectedCategories: IReactSelect[];
    selectedTags: IReactSelect[];
}
