import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HealthViewPage from '../../components/views/HealthViewPage';
import { useError } from '../../Contexts/ErrorContext';
import { dateFormatConverter } from '../../utilities/dateFormatConverter';
import { getHealthAvgAggregations, getHealthAggregations, getHealthSOHData, getBatteryDegradationCapacityData, getBatteryDegradationCyclesData } from '../../api/healthViewApis';
import { getBatteryMeta } from '../../api/batteryApi';
import { generateAUC, getAUCListByBatteryId } from '../../api/aucApi';
import { healthAvgAggregationsNoData, healthViewNodata } from '../../data/HealthViewData';
import { HealthChartConfig } from '../../data/HealthViewChart';
import { HealthViewGraphSubCategory } from '../../enums/healthViewTypes';
import { AxiosError } from 'axios';
// import { chartData3 } from '../../data/ChartsData';

const HealthViewContainer = () => {

    const { showError } = useError();
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() - 1);
    const yesterdayDate = dateFormatConverter(defaultDate);
    const [dateRange, setDateRange] = useState<[string, string]>([yesterdayDate, yesterdayDate]);
    const navigate = useNavigate();
    const { batteryUId } = useParams();
    const [healthAggregations, setHealthAggregations] = useState<IHealthAggregations>(healthViewNodata.health_aggregated_metrics);
    const [operatedLimits, setOperatedLimits] = useState<IOperatedLimits>(healthViewNodata.operated_limits);
    const [targetPerformanceMetrics, setTargetPerformanceMetrics] = useState<ITargetPerformanceMetrics>(healthViewNodata.target_performance_metrics);
    const [batteryMeta, setBatteryMeta] = useState<IBatteryData>();
    const [healthAvgAggregations, setHealthAvgAggregations] = useState<IHealthAvgAggregations>(healthAvgAggregationsNoData);
    const [AUCMetaData, setAUCMetaData] = useState<IAucList>();
    const [generatingAUC, setGeneratingAUC] = useState<boolean>(false);
    const [showDefaultKPIs, setShowDefaultKPIs] = useState<boolean>(true);
    const [capacityAh, setCapacityAh] = useState<ICapacityChartData>({ capacityLatest: '-', capacityVsLastMonth: 0.0 });
    const [soHVsLastMonth, setSoHVsLastMonth] = useState<number>(0);
    const [cyclesVsLastMonth, setCyclesVsLastMonth] = useState<number>(0);
    /*graph */
    const [healthGraphState, setHealthGraphState] = useState<IHealthViewGraphState>({
        category: 'Health Status',
        subCategory: 'SoH-BMS',
        model: 'Classical',
    });
    const setGraphState = (GraphState: IHealthViewGraphState) => {
        setHealthGraphState((prevState) => ({
            ...prevState,
            ...GraphState,
        }));
    };
    const [chartSeries, setChartSeries] = useState<IChartSeries[]>();
    const ChartConfig: ApexCharts.ApexOptions = HealthChartConfig(healthGraphState);
    if (ChartConfig.chart && ChartConfig.chart.events) {
        ChartConfig.chart.events.zoomed = handleSelection;
    }

    function handleSelection(event: React.MouseEvent, chartContext: IChartContext) {
        setShowDefaultKPIs(false);
        const minDate = new Date(chartContext.xaxis.min);
        const maxDate = new Date(chartContext.xaxis.max);
        if (!isNaN(minDate.getTime()) && !isNaN(maxDate.getTime())) {
            const fromDate = minDate.toISOString().slice(0, 10);
            const toDate = maxDate.toISOString().slice(0, 10);
            setDateRange([fromDate, toDate]);
        }
        else {
            setShowDefaultKPIs(true);
            setDateRange([yesterdayDate, yesterdayDate]);
        }
    }

    useEffect(() => {
        const fetchHealthViewData = async () => {
            try {
                switch (healthGraphState.subCategory) {
                    case HealthViewGraphSubCategory.SoHBMS:
                        await getHealthSOHData(batteryUId).then((graphValues: IHealthViewSohData) => {
                            setChartSeries(graphValues.health_soh_graph_data);
                            setSoHVsLastMonth(graphValues.soh_vs_last_month);
                        });
                        break;
                    case HealthViewGraphSubCategory.SoHCloud:
                        await getHealthSOHData(batteryUId).then((graphValues: IHealthViewSohData) => {
                            setChartSeries(graphValues.health_soh_graph_data);
                            setSoHVsLastMonth(graphValues.soh_vs_last_month);
                        });
                        break;
                    case HealthViewGraphSubCategory.Capacity:
                        await getBatteryDegradationCapacityData(batteryUId).then((graphValues: IHealthViewCapacityData) => {
                            setChartSeries(graphValues.health_capacity_graph_data);
                            setCapacityAh({ capacityLatest: graphValues.latest_capacity_ah, capacityVsLastMonth: graphValues.capacity_vs_last_month });
                        });
                        break;
                    case HealthViewGraphSubCategory.Cycle:
                        await getBatteryDegradationCyclesData(batteryUId).then((graphValues: IHealthViewCyclesData) => {
                            setChartSeries(graphValues.health_cycles_graph_data);
                            setCyclesVsLastMonth(graphValues.cycles_vs_last_month);
                        });
                        break;
                }
            } catch (ex) {
                showError(ex as AxiosError<IErrorResponse>);
            }
        };
        fetchHealthViewData();
    }, [healthGraphState]);
    /*graph */

    useEffect(() => {
        const fetchHealthViewData = async () => {
            try {
                const AUCMetadata = await getAUCListByBatteryId(batteryUId);
                setAUCMetaData(AUCMetadata?.[0]);
                const healthViewData: IHealthViewData = await getHealthAggregations(batteryUId);
                healthViewData && setHealthAggregations(healthViewData.health_aggregated_metrics);
                healthViewData && setOperatedLimits(healthViewData.operated_limits);
                healthViewData && setTargetPerformanceMetrics(healthViewData.target_performance_metrics);
                setBatteryMeta(await getBatteryMeta(batteryUId ?? ''));
                const graphValues: IHealthViewSohData = await getHealthSOHData(batteryUId);
                setChartSeries(graphValues.health_soh_graph_data);
            } catch (ex) {
                showError(ex as AxiosError<IErrorResponse>);
            }
        };
        fetchHealthViewData();

    }, []);

    useEffect(() => {
        const updateDailySummaries = async () => {
            try {
                setHealthAvgAggregations(await getHealthAvgAggregations(batteryUId, dateRange[0], dateRange[1]));
            } catch (ex) {
                showError(ex as AxiosError<IErrorResponse>);
            }
        };
        updateDailySummaries();
    }, [dateRange]);

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

    return (
        <HealthViewPage
            chartSeries={chartSeries || []}
            chartOption={ChartConfig || []}
            healthGraphState={healthGraphState}
            setGraphState={setGraphState}
            healthAggregations={healthAggregations}
            operatedLimits={operatedLimits}
            targetPerformanceMetrics={targetPerformanceMetrics}
            dateRange={dateRange}
            batteryMeta={batteryMeta}
            openAUCPage={openAUCPage}
            generateNewAUC={generateNewAUC}
            AUCMetaData={AUCMetaData}
            generatingAUC={generatingAUC}
            healthAvgAggregations={healthAvgAggregations}
            showDefaultKPIs={showDefaultKPIs}
            capacityAh={capacityAh}
            soHVsLastMonth={soHVsLastMonth}
            cyclesVsLastMonth={cyclesVsLastMonth}
        />
    );
};
export default HealthViewContainer;
