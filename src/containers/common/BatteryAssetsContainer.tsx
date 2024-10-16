import React, { useEffect, useRef, useState } from 'react';
import BatteryAssets from '../../components/common/BatteryAssets';
import { getBatteryList, getSearchedBatteries } from '../../api/batteryApi';
import { useDispatch, useSelector } from 'react-redux';
import { setBatteries } from '../../actions/batteryListAction';
import { Module } from '../../enums/moduleTypes';
import { useNavigate } from 'react-router-dom';
import { useError } from '../../Contexts/ErrorContext';
import { AxiosError } from 'axios';

function BatteryAssetsContainer(props: { module: Module; }) {
    const { showError } = useError();
    const moduleName = props.module.toLowerCase();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isListOpen, setIsListOpen] = useState(false);
    const [batteriesList, setBatteriesList] = useState<IBatteryData[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [isLoadingNextBatteries, setIsLoadingNextBatteries] = useState<boolean>(false);
    const [isEndOfBatteries, setIsEndOfBatteries] = useState<boolean>(false);
    const isFetchingNextBatteries = useRef<boolean>(false);
    const [searchAssetName, setSearchAssetName] = useState<string>('');
    const searchBatteriesScroll = useRef(false);
    const pageNo = useRef(1);
    const toggleList = () => {
        setIsListOpen(!isListOpen);
    };
    const setBatteryList = (batteriesList: IBatteryData[]) => {
        setIsEndOfBatteries(batteriesList.length == 0);
        if (isFetchingNextBatteries.current) {
            setBatteriesList((prev) => [...prev, ...batteriesList]);
        } else {
            setBatteriesList(batteriesList);
        }
    };

    const fetchBatteries = async () => {
        try {
            const batteriesData = await getBatteryList(pageNo.current);
            setBatteryList(batteriesData);
            setLoading(false);
            pageNo.current = pageNo.current + 1;
            dispatch(setBatteries(batteriesList));
        } catch (ex) {
            showError(ex as AxiosError<IErrorResponse>);
        }
    };
    useEffect(() => {
        pageNo.current = 1;
        setLoading(true);
        fetchBatteries();
    }, []);
    const handleScrollEnd = async () => {
        if (!isEndOfBatteries && !searchBatteriesScroll.current) {
            if (isFetchingNextBatteries.current || isEndOfBatteries) {
                return;
            }
            isFetchingNextBatteries.current = true;
            setIsLoadingNextBatteries(true);
            await fetchBatteries();
            isFetchingNextBatteries.current = false;
            setIsLoadingNextBatteries(false);
        }
    };

    const selectedBatteryList = useSelector((state: IState) => {
        return state.selectedBatteryList;
    });

    const openViewPage = (battery: IBatteryData) => {
        const ViewedBatteries: IBatteryData[] = JSON.parse(localStorage.getItem('recentlyViewedBatteries') || '[]');
        const updatedViewedBatteries = ViewedBatteries.filter((item) => item.bat_uid !== battery.bat_uid);
        updatedViewedBatteries.unshift(battery);
        if (updatedViewedBatteries.length > 3) {
            updatedViewedBatteries.pop();
        }
        localStorage.setItem('recentlyViewedBatteries', JSON.stringify(updatedViewedBatteries));
        navigate(`/${moduleName}-feed/${moduleName}-view-page/${battery.bat_uid}`);
    };

    const batteriesSearch = async (assetName: string) => {
        try {
            const searchedBatteries = await getSearchedBatteries(assetName);
            setBatteryList(searchedBatteries);
            setLoading(false);
            dispatch(setBatteries(batteriesList));
            setIsEndOfBatteries(true);
        } catch (ex) {
            showError(ex as AxiosError<IErrorResponse>);
        }
    };
    const handleBatteriesSearch = async (assetName: string) => {
        searchBatteriesScroll.current = true;
        setSearchAssetName(assetName);
        setLoading(true);
        if (!assetName) {
            searchBatteriesScroll.current = false;
            pageNo.current = 1;
            fetchBatteries();
        } else {
            batteriesSearch(assetName);
        }
    };
    const clearBatteriesSearch = () => {
        setSearchAssetName('');
        searchBatteriesScroll.current = false;
        pageNo.current = 1;
        fetchBatteries();
    };

    return (
        <BatteryAssets
            handleScrollEnd={handleScrollEnd}
            batteriesList={batteriesList}
            isEndOfBatteries={isEndOfBatteries}
            isListOpen={isListOpen}
            selectedBatteries={selectedBatteryList}
            isLoading={isLoading}
            isLoadingNextBatteries={isLoadingNextBatteries}
            toggleList={toggleList}
            openViewPage={openViewPage}
            searchAssetName={searchAssetName}
            setSearchAssetName={setSearchAssetName}
            handleBatteriesSearch={handleBatteriesSearch}
            clearBatteriesSearch={clearBatteriesSearch}
        />
    );
}

export default BatteryAssetsContainer;
