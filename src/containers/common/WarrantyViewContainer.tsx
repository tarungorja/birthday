import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBatteryMeta } from '../../api/batteryApi';
import { useError } from '../../Contexts/ErrorContext';
import { generateAUC, getAUCListByBatteryId } from '../../api/aucApi';
import WarrantyViewPage from '../../components/views/WarrantyViewPage';
import { SoHBMSChartConfig, equivalentCyclesChartConfig } from '../../data/WarrantyViewChart';
import { dateFormatConverter } from '../../utilities/dateFormatConverter';
import { getWarrantyAggregations, getWarrantyAvgAggregations } from '../../api/warrantyViewApi';
import { warrantyAggregationsNoData } from '../../data/WarrantyViewData';
import { getWarrantyBMSSoHGraphData, getWarrantyEquivalentCyclesData } from '../../api/warrantyViewApi';
import { changeWarrantyDate } from '../../data/WarrantyViewChart';
import { AxiosError } from 'axios';

const WarrantyViewContainer = () => {
    const { batteryUId } = useParams();
    const { showError } = useError();
    const navigate = useNavigate();
    const [batteryMeta, setBatteryMeta] = useState<IBatteryData | undefined>();
    const [generatingAUC, setGeneratingAUC] = useState<boolean>(false);
    const [AUCMetaData, setAUCMetaData] = useState<IAucList>();
    const [warrantyAvgAggregations, setWarrantyAvgAggregations] = useState<IWarrantyAvgAggregations>();
    const [showDefaultKPIs, setShowDefaultKPIs] = useState<boolean>(true);
    const [warrantyChartOptions, setWarrantyChartOptions] = useState<ApexCharts.ApexOptions>(SoHBMSChartConfig);
    // const [warrantyBmsSoHSeries, setWarrantyBmsSoHSeries] = useState<IWarrantyGraphSeries[]>([]);
    /* *********************** */
    // to be changed
    /* *********************** */
    const [warrantyGraphState, setWarrantyGraphState] = useState<IWarrantyGraphState>({
        category: 'SOH',
        model: 'Classical ML Modal'
    });
    const setGraphState = (GraphState: IWarrantyGraphState) => {
        setWarrantyGraphState((prevState) => ({
            ...prevState,
            ...GraphState,
        }));
    };
    const [warrantyAggregations, setWarrantyAggregations] = useState<IWarrantyAggregations>(warrantyAggregationsNoData);
    const [chartSeries, setChartSeries] = useState<IWarrantyGraphSeries[]>([]);
    if (warrantyChartOptions.chart && warrantyChartOptions.chart.events) {
        warrantyChartOptions.chart.events.zoomed = handleSelection;
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

    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() - 1);
    const yesterdayDate = dateFormatConverter(defaultDate);
    const [dateRange, setDateRange] = useState<[string, string]>([yesterdayDate, yesterdayDate]);

    useEffect(() => {
        const fetchWarrantyViewData = async () => {
            try {
                const warrantydata = await getWarrantyAggregations(batteryUId);
                const graphValues: IWarrantyChartSoHData = await getWarrantyBMSSoHGraphData(batteryUId);
                warrantydata && setWarrantyAggregations(warrantydata);
                setChartSeries(graphValues.warranty_bms_soh_graph_series);
                // if (warrantyChartOptions.xaxis) {
                //     warrantyChartOptions.xaxis.min = graphValues.warranty_start_date;
                //     warrantyChartOptions.xaxis.max = graphValues.warranty_end_date;
                // }
                setWarrantyChartOptions(changeWarrantyDate(warrantyChartOptions, graphValues.warranty_start_date, graphValues.warranty_end_date));

            } catch (ex) {
                showError(ex as AxiosError<IErrorResponse>);
            }
        };
        fetchWarrantyViewData();
    }, []);
    useEffect(() => {
        const fetchWarrantyChartData = async () => {
            try {
                switch (warrantyGraphState.category) {
                    case 'SOH': {
                        const bmsSoHData: IWarrantyChartSoHData = await getWarrantyBMSSoHGraphData(batteryUId);
                        bmsSoHData && setChartSeries(bmsSoHData.warranty_bms_soh_graph_series);
                        setWarrantyChartOptions(changeWarrantyDate(SoHBMSChartConfig, bmsSoHData.warranty_start_date, bmsSoHData.warranty_end_date));
                        // if (warrantyChartOptions.xaxis) {
                        //     warrantyChartOptions.xaxis.min = bmsSoHData.warranty_start_date;
                        //     warrantyChartOptions.xaxis.max = bmsSoHData.warranty_end_date;
                        // }
                        break;
                    }
                    case 'Equivalent Cycles': {
                        const equivalentCyclesData: IWarrantyChartEquivalentCyclesData = await getWarrantyEquivalentCyclesData(batteryUId);
                        equivalentCyclesData && setChartSeries(equivalentCyclesData.warranty_equivalent_cycles_count_series);
                        setWarrantyChartOptions(changeWarrantyDate(equivalentCyclesChartConfig, equivalentCyclesData.warranty_start_date, equivalentCyclesData.warranty_end_date));
                        // if (warrantyChartOptions.xaxis) {
                        //     warrantyChartOptions.xaxis.min = equivalentCyclesData.warranty_start_date;
                        //     warrantyChartOptions.xaxis.max = equivalentCyclesData.warranty_end_date;
                        // }
                        break;
                    }
                }
            }
            catch (ex) {
                showError(ex as AxiosError<IErrorResponse>);
            }
        };
        fetchWarrantyChartData();
    }, [warrantyGraphState]);
    /* *********************** */
    // to be changed
    /* *********************** */

    useEffect(() => {
        const fetchWarrantyViewData = async () => {
            try {
                setBatteryMeta(await getBatteryMeta(batteryUId ?? ''));
                const AUCMetadata = await getAUCListByBatteryId(batteryUId);
                setAUCMetaData(AUCMetadata?.[0]);
            } catch (ex) {
                showError(ex as AxiosError<IErrorResponse>);
            }
        };
        fetchWarrantyViewData();
    }, []);
    useEffect(() => {
        const fetchWarrantyAvgAggregations = async () => {
            try {
                const dailySummaries = await getWarrantyAvgAggregations(batteryUId, dateRange[0], dateRange[1]);
                setWarrantyAvgAggregations(dailySummaries);
            } catch (ex) {
                showError(ex as AxiosError<IErrorResponse>);
            }
        };
        fetchWarrantyAvgAggregations();
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
        <WarrantyViewPage
            batteryMeta={batteryMeta}
            generatingAUC={generatingAUC}
            AUCMetaData={AUCMetaData}
            generateNewAUC={generateNewAUC}
            openAUCPage={openAUCPage}
            warrantyAggregations={warrantyAggregations}
            warrantyAvgAggregations={warrantyAvgAggregations}
            dateRange={dateRange}
            chartSeries={chartSeries}
            warrantyChartOptions={warrantyChartOptions}
            warrantyGraphState={warrantyGraphState}
            setGraphState={setGraphState}
            showDefaultKPIs={showDefaultKPIs}
        />
    );
};

export default WarrantyViewContainer;
