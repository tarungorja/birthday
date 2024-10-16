import React, { useEffect, useRef, useState } from 'react';
import Feeds from '../../components/common/Feeds';
import { getFeeds } from '../../api/healthFeedsApi';
import { useSelector } from 'react-redux';
import { Module } from '../../enums/moduleTypes';
import { useError } from '../../Contexts/ErrorContext';
import { AxiosError } from 'axios';

function FeedsContainer(props: { moduleName: Module; }) {
    const { showError } = useError();
    const moduleName = props.moduleName.toLowerCase();
    const dateRangeState = useSelector((state: IState) => {
        return state.dateRange;
    });
    const tags = useSelector((state: IState) => {
        return state.selectedTags;
    });
    const categories = useSelector((state: IState) => {
        return state.selectedCategories;
    });
    const selectedBatteryList = useSelector((state: IState) => {
        return state.selectedBatteryList;
    });
    const searchClicked = useSelector((state: IState) => {
        return state.batteriesSearchClicked;
    });
    const [healthFeeds, setHealthFeeds] = useState<IHealthFeeds[]>([]);
    const [isLoadingNextFeeds, setIsLoadingNextFeeds] = useState<boolean>(false);
    const [isEndOfFeeds, setIsEndOfFeeds] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const isFetchingNextFeeds = useRef<boolean>(false);
    const selectedTag = useRef<string>('');
    const pageNo = useRef(1);
    const setFilteredFeeds = (healthFeedsData: IHealthFeeds[]) => {
        if (isFetchingNextFeeds.current) {
            setHealthFeeds((prev) => [...prev, ...healthFeedsData]);
        } else {
            setHealthFeeds(healthFeedsData);
        }
    };
    const fetchFeeds = async () => {
        try {
            let healthFeedsData: IHealthFeeds[] = [];
            const fromDate = dateRangeState.fromDate;
            const toDate = dateRangeState.toDate;
            healthFeedsData = await getFeeds(
                moduleName,
                selectedBatteryList,
                fromDate,
                toDate,
                pageNo.current,
                categories,
                tags
            );
            setFilteredFeeds(healthFeedsData ?? []);
            setLoading(false);
            pageNo.current = pageNo.current + 1;
            setIsEndOfFeeds(healthFeedsData?.length == 0);
        } catch (ex) {
            showError(ex as AxiosError<IErrorResponse>);
        }
    };

    useEffect(() => {
        pageNo.current = 1;
        setLoading(true);
        fetchFeeds();
    }, [selectedBatteryList, dateRangeState, searchClicked, categories, tags]);

    const handleSearch = () => {
        pageNo.current = 1;
        setLoading(true);
        fetchFeeds();
    };

    const handleScrollEnd = async () => {
        if (isFetchingNextFeeds.current || isEndOfFeeds) {
            return;
        }
        isFetchingNextFeeds.current = true;
        setIsLoadingNextFeeds(true);
        await fetchFeeds();
        isFetchingNextFeeds.current = false;
        setIsLoadingNextFeeds(false);
    };
    //handleScroll is called when the scroll bar is reached to half of the height of total scroll length
    const handleScroll = () => {
        const targetDiv = document.getElementById('FeedsScrollbar');
        if (!isEndOfFeeds && targetDiv && targetDiv.scrollHeight <= 2 * targetDiv.scrollTop) {
            handleScrollEnd();
        }
    };

    return (
        <div className='feed-section'>
            <Feeds
                moduleName={moduleName}
                selectedBatteryList={selectedBatteryList}
                healthFeeds={healthFeeds}
                handleScroll={handleScroll}
                isLoadingNextFeeds={isLoadingNextFeeds}
                isEndOfFeeds={isEndOfFeeds}
                handleSearch={handleSearch}
                selectedTag={selectedTag}
                isLoading={isLoading}
            />
        </div>
    );
}
export default FeedsContainer;
