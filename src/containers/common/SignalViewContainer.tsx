import React, { useEffect, useState } from 'react';
import SignalViewPage from '../../components/views/SignalViewPage';
import { useParams } from 'react-router-dom';
import { getBatterySignalsData, getSignalEventData } from '../../api/signalApi';
import { useError } from '../../Contexts/ErrorContext';
import { getBatteryMeta } from '../../api/batteryApi';
import { AxiosError } from 'axios';

const SignalViewContainer = () => {
    const { signal_id } = useParams();
    const signalId = signal_id || '';
    const { showError } = useError();
    const [signalData, setSignalData] = useState<ISignalData>();
    const [batteryMetadata, setBatteryMetaData] = useState<IBatteryData>();
    const [batterySignals, setBatterySignals] = useState<ISignalData[]>();
    const [showSignalsTree, setShowSignalsTree] = useState<boolean>(true);
    const getSignalData = async () => {
        try {
            await getSignalEventData(signal_id).then((signalDataDoc) => {
                setSignalData(signalDataDoc);
            });

        } catch (ex) {
            showError(ex as AxiosError<IErrorResponse>);
        }
    };
    const getSignalMetaData = async () => {
        try {
            await getBatteryMeta(signalData?.bat_uid).then((batteryMetaInfo) => {
                setBatteryMetaData(batteryMetaInfo);
            });
        } catch (ex) {
            showError(ex as AxiosError<IErrorResponse>);
        }
    };
    const getCategoryPlotData = async () => {
        try {
            await getBatterySignalsData(signalData?.bat_uid).then((batterySignalsData) => {
                setBatterySignals(batterySignalsData);
            });

        } catch (ex) {
            showError(ex as AxiosError<IErrorResponse>);
        }
    };

    useEffect(() => {
        getSignalData();
    }, [signalId]);
    useEffect(() => {
        signalData && getSignalMetaData();
    }, [signalData]);

    return (
        <SignalViewPage
            signalId={signalId}
            signalData={signalData}
            batteryMetadata={batteryMetadata}
            showSignalsTree={showSignalsTree}
            setShowSignalsTree={setShowSignalsTree}
            batterySignals={batterySignals}
            getCategoryPlotData={getCategoryPlotData}
        />
    );
};

export default SignalViewContainer;
