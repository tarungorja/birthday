import React, { useState, useEffect, useRef } from 'react';
import Signals from '../../components/common/Signals';
import { useDispatch, useSelector } from 'react-redux';
import { setDateRange } from '../../actions/dateRangeAction';
import { Module } from '../../enums/moduleTypes';
// import { signals } from '../../data/healthTrackerData';
import { getSignalsData } from '../../api/signalApi';
import { useError } from '../../Contexts/ErrorContext';
import { dateFormatConverter } from '../../utilities/dateFormatConverter';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
type DateRange = [Date, Date] | null;

const SignalsContainer = (props: { moduleName: Module; }) => {
    const moduleName = props.moduleName;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dateRange = useSelector((state: IState) => state.dateRange);
    const fromDate = dateRange.fromDate ? new Date(dateRange.fromDate) : null;
    const toDate = dateRange.toDate ? new Date(dateRange.toDate) : null;
    const selectedDateRange: DateRange = fromDate && toDate ? [fromDate, toDate] : null;
    const [showRecentlyViewedSignals, setShowRecentlyViewedSignals] = useState<boolean>(false);
    const [signalsData, setDataSignals] = useState<ISignalData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isEndOfSignals, setIsEndOfSignals] = useState<boolean>(false);
    const isLoadingNextSignals = useRef<boolean>(false);
    const { showError } = useError();
    const pageNo = useRef(1);
    // useEffect(() => {
    //     pageNo.current = 1;
    //     setIsLoading(true);
    //     getDataSignalByModule();
    //     setIsLoading(false);
    // }, []);
    useEffect(() => {
        pageNo.current = 1;
        setIsLoading(true);
        setDataSignals([]);
        getDataSignalByModule();
        setIsLoading(false);
    }, [dateRange]);
    const getDataSignalByModule = async () => {
        try {
            isLoadingNextSignals.current = true;
            await getSignalsData(moduleName, pageNo.current, dateRange.fromDate, dateRange.toDate).then(
                (Datasignals) => {
                    console.log('Datasignals', Datasignals, Datasignals.length);
                    setDataSignals((prevData) => [...prevData, ...Datasignals]);
                    setIsEndOfSignals(Datasignals.length == 0);
                }
            );
            pageNo.current = pageNo.current + 1;
        } catch (ex) {
            setIsEndOfSignals(true);
            showError(ex as AxiosError<IErrorResponse>);
        }
    };
    const handleScrollEnd = async () => {
        console.log('handleScrollEnd:', isEndOfSignals);
        if (!isEndOfSignals && !isLoadingNextSignals.current) {
            isLoadingNextSignals.current = true;
            await getDataSignalByModule();
        }
        isLoadingNextSignals.current = false;
    };
    const getDay = (signal: ISignalData) => {
        signal.signal_date = signal.signal_date.split('T')[0];
        const [year, month, date] = signal.signal_date.split('-');
        const newDate = new Date(`${year}-${month}-${date}`);
        return newDate.getDay();
    };
    const handleDateRangeChange = (value: DateRange | null) => {
        if (value) {
            dispatch(
                setDateRange({
                    fromDate: dateFormatConverter(value[0]),
                    toDate: dateFormatConverter(value[1]),
                })
            );
        } else {
            dispatch(
                setDateRange({
                    fromDate: '',
                    toDate: '',
                })
            );
        }
    };
    const toggleRecentlyViewedSignals = () => {
        setShowRecentlyViewedSignals(!showRecentlyViewedSignals);
    };

    const openSignalViewPage = (signal: ISignalData) => {
        const recentlyViewedSignals: ISignalData[] = JSON.parse(localStorage.getItem('recentlyViewedSignals') || '[]');

        const updatedViewedSignals = recentlyViewedSignals.filter((item) => item.id !== signal.id);
        updatedViewedSignals.unshift(signal);
        if (updatedViewedSignals.length > 3) {
            updatedViewedSignals.pop();
        }
        localStorage.setItem('recentlyViewedSignals', JSON.stringify(updatedViewedSignals));

        navigate(`/dashboard/signals-view-page/${signal.id}`);
    };
    return (
        <Signals
            signalsData={signalsData}
            selectedDateRange={selectedDateRange}
            handleDateRangeChange={handleDateRangeChange}
            showRecentlyViewedSignals={showRecentlyViewedSignals}
            toggleRecentlyViewedSignals={toggleRecentlyViewedSignals}
            getDay={getDay}
            isEndOfSignals={isEndOfSignals}
            isLoading={isLoading}
            isLoadingNextSignals={isLoadingNextSignals.current}
            handleScrollEnd={handleScrollEnd}
            openSignalViewPage={openSignalViewPage}
        />
    );
};

export default SignalsContainer;
