import React, { useEffect, useState } from 'react';
import { getBatteryList } from '../../api/batteryApi';
import { useDispatch, useSelector } from 'react-redux';
import { setBatteries } from '../../actions/batteryListAction';
import SpinnerLoader from '../../components/common/SpinnerComponent';
import { setSelectedBatteryIds } from '../../actions/selectBatteryListAction';
import DummyBatteryAssets from '../../components/common/DummyBatteryAssets';
import { useError } from '../../Contexts/ErrorContext';
import { AxiosError } from 'axios';

function DummyBatteryAssetsContainer() {
    const { showError } = useError();
    const dispatch = useDispatch();
    const [isListOpen, setIsListOpen] = useState(false);
    const [batteryData, setBatteryData] = useState<IBatteryData[]>([]);
    const [isLoading, setLoading] = useState(true);
    const toggleList = () => {
        setIsListOpen(!isListOpen);
    };

    // const handleWindowClick = (e: MouseEvent) => {
    //     const target = e.target as HTMLElement;
    //     if (isListOpen && target) {
    //         if (!target.closest('#recently-viewed-list')) {
    //             setIsListOpen(false);
    //         }
    //     }
    // };

    useEffect(() => {
        const fetchBattery = async () => {
            try {
                const batteryData = await getBatteryList(1);
                setBatteryData(batteryData);
                setLoading(false);
                dispatch(setBatteries(batteryData));
            } catch (ex) {
                showError(ex as AxiosError<IErrorResponse>);
            }

        };
        fetchBattery();

        // window.addEventListener('click', handleWindowClick);
        // return () => {
        //     window.removeEventListener('click', handleWindowClick);
        // };
    }, []);
    const selectedBatteryList = useSelector((state: IState) => {
        return state.selectedBatteryList;
    });

    const toggleBatterySelection = (selectedBattery: IBatteryData) => {
        if (selectedBatteryList.find(sBattery => sBattery.bat_uid == selectedBattery.bat_uid) ? true : false) {
            dispatch(
                setSelectedBatteryIds(
                    selectedBatteryList.filter(
                        (battery) => battery.bat_uid !== selectedBattery.bat_uid
                    )
                )
            );
        } else {
            dispatch(
                setSelectedBatteryIds([...selectedBatteryList, selectedBattery])
            );
        }

    };

    return (
        <>
            {isLoading ? (
                <SpinnerLoader />
            ) : (
                <DummyBatteryAssets
                    batteryData={batteryData}
                    isListOpen={isListOpen}
                    selectedBatteries={selectedBatteryList}
                    toggleBatterySelection={toggleBatterySelection}
                    toggleList={toggleList}
                />
            )}
        </>
    );
}

export default DummyBatteryAssetsContainer;
