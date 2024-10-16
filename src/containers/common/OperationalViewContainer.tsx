import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBatteryMeta } from '../../api/batteryApi';
import { useError } from '../../Contexts/ErrorContext';
import { generateAUC, getAUCListByBatteryId } from '../../api/aucApi';
import OperationalViewPage from '../../components/views/OperationalViewPage';
import { getOperationalViewData, getOperationalAvgAggregations, getOperationalChargingCyclesData, getOperationalSOCRangeGraphData, getOperationalValuedSOCGraphData, getOperationalDischargingCyclesData } from '../../api/operationalViewDataApi';
import { dateFormatConverter } from '../../utilities/dateFormatConverter';
import { operationalSOCRangeGraphOption, operationalValuedSOCGraphOption } from '../../data/OperationalViewChart';
import { operationalViewNoData, operationalAggregatedNoData } from '../../data/OperationalViewData';
import { AxiosError } from 'axios';

const OperationalViewContainer = () => {
    const { batteryUId } = useParams();
    const { showError } = useError();
    const navigate = useNavigate();
    const [batteryMeta, setBatteryMeta] = useState<IBatteryData | undefined>();
    const [generatingAUC, setGeneratingAUC] = useState<boolean>(false);
    const [AUCMetaData, setAUCMetaData] = useState<IAucList>();
    const [batteryOperationalData, setBatteryOperationalData] = useState<IOperationalViewData>(operationalViewNoData);
    const [avgAggregationsData, setAvgAggregationsData] = useState<IOperationalAvgAggregations>(operationalAggregatedNoData);
    const [showAvgAggregations, setShowAvgAggregations] = useState<boolean>(false);
    const [socRangePlotData, setSOCRangePlotData] = useState<ISOCRangeGraphData[]>([]);
    const [valuedSOCGraphData, setValuedSOCGraphData] = useState<IValuedSOCGraphData[]>([]);
    const [chargingCyclesGraphData, setChargingCyclesGraphData] = useState<IChargingCyclesGraphSeries[]>([]);
    const [dischargingCyclesGraphData, setDischargingCyclesGraphData] = useState<IChargingCyclesGraphSeries[]>([]);
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() - 1);
    const yesterdayDate = dateFormatConverter(defaultDate);
    const [dateRange, setDateRange] = useState<[string, string]>([yesterdayDate, yesterdayDate]);
    const [operationalViewGraphState, setOperationalViewGraphState] = useState<IOperationalViewGraphState>({
        category: 'Operated SOC Range',
        model: 'Model-1'
    });
    const [operationalGraphOptions, setOperationalGraphOptions] = useState<ApexCharts.ApexOptions>(operationalSOCRangeGraphOption);
    const setGraphState = (GraphState: IOperationalViewGraphState) => {
        setOperationalViewGraphState((prevState) => ({
            ...prevState,
            ...GraphState,
        }));
    };
    useEffect(() => {
        const updateAvgAggregatedData = async () => {
            try {
                setAvgAggregationsData(
                    await getOperationalAvgAggregations(batteryUId, dateRange[0], dateRange[1])
                );
            } catch (ex) {
                showError(ex as AxiosError<IErrorResponse>);
            }
        };
        showAvgAggregations && updateAvgAggregatedData();
    }, [dateRange]);

    useEffect(() => {
        const fetchOperationalViewData = async () => {
            try {
                const operationalData: IOperationalViewData = await getOperationalViewData(batteryUId);
                operationalData && setBatteryOperationalData(operationalData);
                operationalData && setAvgAggregationsData(operationalData.operational_values);
                setBatteryMeta(await getBatteryMeta(batteryUId ?? ''));
                const chargingCyclesData: IChargingCyclesGraphSeries[] = await getOperationalChargingCyclesData(batteryUId);
                chargingCyclesData && setChargingCyclesGraphData(chargingCyclesData);
                const dischargingCyclesData: IChargingCyclesGraphSeries[] = await getOperationalDischargingCyclesData(batteryUId);
                dischargingCyclesData && setDischargingCyclesGraphData(dischargingCyclesData);
                const AUCMetadata = await getAUCListByBatteryId(batteryUId);
                setAUCMetaData(AUCMetadata?.[0]);
            } catch (ex) {
                showError(ex as AxiosError<IErrorResponse>);
            }
        };
        fetchOperationalViewData();
    }, []);

    useEffect(() => {
        const fetchOperatinalSOCGraphsData = async () => {
            try {
                switch (operationalViewGraphState.category) {
                    case 'Operated SOC Range': {
                        const socRangeData: ISOCRangeGraphData[] = await getOperationalSOCRangeGraphData(batteryUId);
                        socRangeData && setSOCRangePlotData(socRangeData);
                        setOperationalGraphOptions(operationalSOCRangeGraphOption);
                        break;
                    }
                    case 'Valued to 0 to 100% SOC': {
                        const valuedSOCData: ISOCRangeGraphData[] = await getOperationalValuedSOCGraphData(batteryUId);
                        valuedSOCData && setValuedSOCGraphData(valuedSOCData);
                        setOperationalGraphOptions(operationalValuedSOCGraphOption);
                        break;
                    }
                }

            }
            catch (ex) {
                showError(ex as AxiosError<IErrorResponse>);
            }
        };
        fetchOperatinalSOCGraphsData();
    }, [operationalViewGraphState]);

    const generateNewAUC = async () => {
        try {
            setGeneratingAUC(true);
            await generateAUC(batteryUId);
            setGeneratingAUC(false);
            const AUCMetadata = await getAUCListByBatteryId(batteryUId);
            setAUCMetaData(AUCMetadata?.[0]);
        } catch (ex) {
            showError(ex as AxiosError<IErrorResponse>);
            setGeneratingAUC(false);
        }
    };
    const openAUCPage = (battery: IBatteryData | undefined) => {
        navigate(`/auc-page/${battery?.bat_uid}`);
    };
    function handleSelection(event: React.MouseEvent, chartContext: IChartContext) {
        const minDate = new Date(chartContext.xaxis.min);
        const maxDate = new Date(chartContext.xaxis.max);
        setShowAvgAggregations(true);
        if (!isNaN(minDate.getTime()) && !isNaN(maxDate.getTime())) {
            const fromDate = minDate.toISOString().slice(0, 10);
            const toDate = maxDate.toISOString().slice(0, 10);
            setDateRange([fromDate, toDate]);
        }
    }
    if (operationalGraphOptions.chart && operationalGraphOptions.chart.events) {
        operationalGraphOptions.chart.events.zoomed = handleSelection;
    }
    return (
        <OperationalViewPage
            batteryMeta={batteryMeta}
            generatingAUC={generatingAUC}
            AUCMetaData={AUCMetaData}
            generateNewAUC={generateNewAUC}
            batteryOperationalData={batteryOperationalData}
            avgAggregationsData={avgAggregationsData}
            dateRange={dateRange}
            openAUCPage={openAUCPage}
            socRangeGraphSeries={socRangePlotData}
            valuedSOCGraphSeries={valuedSOCGraphData}
            operationalViewGraphState={operationalViewGraphState}
            setGraphState={setGraphState}
            options={operationalGraphOptions}
            chargingCyclesGraphData={chargingCyclesGraphData}
            dischargingCyclesGraphData={dischargingCyclesGraphData}
        />
    );
};

export default OperationalViewContainer;
