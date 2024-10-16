interface IFeedPostProps {
    setModalContent: Function;
    setShowModal: Function;
    plotsSrc: Array<string>;
}

interface IFeedGraphProps {
    openHealthFeedPlots: (index: number, healthFeeds: IHealthFeeds) => void;
    setModalContent: (feedModalConent: IFeedModalContent) => void;
    setShowModal: Function;
    healthFeeds: IHealthFeeds;

    // plotsSrc: Array<string>;
    // imgSrc: Array<string>;
}

// interface IFeed {
//     tags: Array<string>;
//     category: string;
//     title: string;
//     desc: string;
//     plotsSrc: Array<string>;
//     imgSrc: Array<string>;
// }
interface IFeedsContainerProps {
    moduleName: string;
}
interface IFeedProps {
    moduleName: string;
    healthFeeds: IHealthFeeds[];
    selectedBatteryList: IBatteryData[];
    handleScroll: () => void;
    isLoadingNextFeeds: boolean;
    isEndOfFeeds: boolean;
    handleSearch: () => void;
    selectedTag: { current: string; };
    isLoading: boolean;
}
interface IHealthFeedsPostProps {
    healthFeed: IHealthFeeds;
    // handleTagClick: (tagCode: string) => void;
}
interface IHealthFeeds {
    id: string;
    analysis: string;
    bat_name: string;
    bat_uid: string;
    category: string;
    category_code: string;
    feed_date: string;
    images: string[];
    module: string;
    tags: {
        [key: string]: string;
    };
    tags_codes: string[];
    title: string;
}
interface IHealthFeedPLots {
    plots: [string];
}
interface IDateRange {
    fromDate: string;
    toDate: string;
}

interface IFeedModalContent {
    graph: React.ReactNode;
    description: string;
    title: string;
}
