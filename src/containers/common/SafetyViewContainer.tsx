import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBatteryMeta } from '../../api/batteryApi';
import { useError } from '../../Contexts/ErrorContext';
import { generateAUC, getAUCListByBatteryId } from '../../api/aucApi';
import SafetyViewPage from '../../components/views/SafetyViewPage';
import { safetyAggregationsNoData, safetyAvgAggregationsNoData } from '../../data/SafetyViewData';
import { getSafetyAggregations, getSafetyAvgAggregations, getSafetyIncidentsMetrics, getHourlyTempMetrics } from '../../api/safetyViewApis';
import { dateFormatConverter } from '../../utilities/dateFormatConverter';
import { AxiosError } from 'axios';
import {
    safetyIncidentsChartLayout, safetyTemperatureChartLayout, getSafetyIncidentChartData, getHourlyTempChartData, intialSafetyChartData, setLayout
} from '../../data/SafetyViewChart';
const SafetyViewContainer = () => {
    const { batteryUId } = useParams();
    const { showError } = useError();
    const navigate = useNavigate();
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() - 1);
    const yesterdayDate = dateFormatConverter(defaultDate);
    const [dateRange, setDateRange] = useState<[string, string]>([yesterdayDate, yesterdayDate]);
    const [batteryMeta, setBatteryMeta] = useState<IBatteryData | undefined>();
    const [generatingAUC, setGeneratingAUC] = useState<boolean>(false);
    const [AUCMetaData, setAUCMetaData] = useState<IAucList>();
    const [safetyAggregations, setSafetyAggregations] = useState<ISafetyAggregations>(safetyAggregationsNoData);
    const [safetyAvgAggregations, setSafetyAvgAggregations] =
        useState<ISafetyAvgAggregations>(safetyAvgAggregationsNoData);
    const [safetyViewGraphData, setSafetyViewGraphData] = useState<ISafetyIncidentsChartData | IHeatMapData>(intialSafetyChartData);
    const [showDefaultKPIs, setShowDefaultKPIs] = useState<boolean>(true);
    const [safetyViewGraphState, setSafetyViewGraphState] = useState<ISafetyViewGraphState>({
        category: 'Overall Incidents',
        model: 'Model-1'
    });
    const setGraphState = (GraphState: ISafetyViewGraphState) => {
        setSafetyViewGraphState((prevState) => ({
            ...prevState,
            ...GraphState,
        }));
    };
    const [safetyViewGraphLayout, setSafetyGraphLayout] = useState<Partial<Plotly.Layout>>(safetyIncidentsChartLayout);
    useEffect(() => {
        const fetchSafetyViewData = async () => {
            try {
                setBatteryMeta(await getBatteryMeta(batteryUId ?? ''));
                const AUCMetadata = await getAUCListByBatteryId(batteryUId);
                setSafetyAggregations(await getSafetyAggregations(batteryUId));
                setAUCMetaData(AUCMetadata?.[0]);
            } catch (ex) {
                showError(ex as AxiosError<IErrorResponse>);
            }
        };
        fetchSafetyViewData();
    }, []);
    useEffect(() => {
        const fetchSafetyChartData = async () => {
            try {
                switch (safetyViewGraphState.category) {
                    case 'Overall Incidents': {
                        const safetyIncidentsData: ISafetyIncidents = await getSafetyIncidentsMetrics(batteryUId);
                        safetyIncidentsData && setSafetyViewGraphData(getSafetyIncidentChartData(safetyIncidentsData?.safety_incidents_chart_data));
                        setSafetyGraphLayout(setLayout(safetyIncidentsChartLayout, safetyIncidentsData.initial_date, safetyIncidentsData.latest_date));
                        break;
                    }
                    case 'Temperature': {
                        const hourlyTempData = await getHourlyTempMetrics(batteryUId);
                        hourlyTempData && setSafetyViewGraphData(getHourlyTempChartData(hourlyTempData));
                        setSafetyGraphLayout(safetyTemperatureChartLayout);
                        break;
                    }
                }
            }
            catch (ex) {
                showError(ex as AxiosError<IErrorResponse>);
            }
        };
        fetchSafetyChartData();
    }, [safetyViewGraphState]);
    useEffect(() => {
        const fetchSafetyAvgAggregations = async () => {
            const safetyAvgAggregationsData = await getSafetyAvgAggregations(batteryUId, dateRange[0], dateRange[1]);
            setSafetyAvgAggregations(safetyAvgAggregationsData ? safetyAvgAggregationsData : safetyAggregationsNoData);
        };
        if (dateRange[0] && dateRange[1]) {
            fetchSafetyAvgAggregations();
        }
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
    const handleRelayout = (event: Plotly.PlotRelayoutEvent) => {
        setShowDefaultKPIs(false);
        const from = event['xaxis.range[0]']?.toString().split(' ') || '';
        const to = event['xaxis.range[1]']?.toString().split(' ') || '';
        setDateRange([from[0], to[0]]);
    };

    const handleDataPointClick = (eventData: Readonly<Plotly.PlotMouseEvent>) => {
        if (eventData.points.length > 0) {
            const customdata = eventData.points[0].customdata;

            if (Array.isArray(customdata) && customdata.length > 0) {
                const [signalID] = customdata;
                navigate(`/dashboard/signals-view-page/${signalID}`);
            }
        }
    };

    return (
        <SafetyViewPage
            batteryMeta={batteryMeta}
            generatingAUC={generatingAUC}
            AUCMetaData={AUCMetaData}
            generateNewAUC={generateNewAUC}
            dateRange={dateRange}
            openAUCPage={openAUCPage}
            safetyAvgAggregations={safetyAvgAggregations}
            safetyAggregations={safetyAggregations}
            handleRelayout={handleRelayout}
            showDefaultKPIs={showDefaultKPIs}
            safetyViewGraphState={safetyViewGraphState}
            setGraphState={setGraphState}
            safetyViewGraphData={safetyViewGraphData}
            safetyViewGraphLayout={safetyViewGraphLayout}
            handleNavigation={handleDataPointClick}
        />
    );
};

export default SafetyViewContainer;
