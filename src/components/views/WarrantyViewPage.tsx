import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import bImg from '../../assets/img/battery-icon.png';
import Header from '../../layouts/Header';
import Avatar from '../common/Avatar';
import SpinnerLoader from '../common/SpinnerComponent';
import qrImg from '../../assets/svg/qr-code.svg';
import WarrantyViewPageGraph from '../common/WarrantyViewPageGraph';

const WarrantyViewPage = (props: IWarrantyViewProps) => {
    const {
        batteryMeta,
        generatingAUC,
        AUCMetaData,
        generateNewAUC,
        openAUCPage,
        warrantyAggregations,
        warrantyAvgAggregations,
        dateRange,
        chartSeries,
        warrantyChartOptions,
        warrantyGraphState,
        setGraphState,
        showDefaultKPIs,
    } = props;
    return (
        <React.Fragment>
            <Header />
            <div className='main main-app p-3 p-lg-3 ms-1'>
                <div className='d-md-flex align-items-center justify-content-between'>
                    <div>
                        <ol className='breadcrumb fs-sm mb-0'>
                            <li className='breadcrumb-item active' aria-current='page'>
                                Warranty View
                            </li>
                        </ol>
                        <h4 className='main-title pt-1 '>{batteryMeta?.asset_name}</h4>
                    </div>
                </div>

                <Row className='g-3'>
                    <Col xl='8' md='12' sm='12'>
                        <Card className='card-one'>
                            <Card.Body className='meta-info p-0 m-2'>
                                <div className='d-flex m-0 p-1 px-2 justify-content-between meta-info'>
                                    <div className='d-flex'>
                                        <Avatar img={bImg} />
                                        <div className='ps-2'>
                                            <p className='fs-sm text-secondary mb-0'>Model</p>
                                            <h6 className='fw-semibold text-dark mb-1'>{batteryMeta?.model}</h6>
                                        </div>
                                    </div>
                                    <div className='ps-5'>
                                        <p className=' text-secondary mb-0'>Chemistry</p>
                                        <p className='fw-semibold text-dark fs-sm  mb-0'>{batteryMeta?.chemistry}</p>
                                    </div>
                                    <div className='ps-5'>
                                        <p className=' text-secondary mb-0'>Nominal Energy</p>
                                        <p className='fw-semibold text-dark fs-sm  mb-0'>
                                            {batteryMeta?.nominal_energy_kwh}
                                        </p>
                                    </div>
                                    <div className='ps-5'>
                                        <p className=' text-secondary mb-0'>Commissioned on</p>
                                        <p className='fw-semibold text-dark fs-sm  mb-0'>
                                            {batteryMeta?.comissioned_on}
                                        </p>
                                    </div>
                                    <div className='ps-5'>
                                        <p className=' text-secondary mb-0'>Battery Application</p>
                                        <p className='fw-semibold text-dark fs-sm  mb-0'>{batteryMeta?.battery_type}</p>
                                    </div>
                                    <div className='ps-5'>
                                        <p className=' text-secondary mb-0'>Location</p>
                                        <p className='fw-semibold text-dark fs-sm  mb-0'>{batteryMeta?.location}</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl='4' md='12' sm='12'>
                        <Card className='card-one'>
                            <Card.Body className='meta-info p-0 m-2 d-flex align-items-center justify-content-center'>
                                {generatingAUC ? (
                                    <SpinnerLoader />
                                ) : AUCMetaData ? (
                                    <div className='d-flex m-0 p-1 px-2 justify-content-between '>
                                        <div className='d-flex'>
                                            <img src={qrImg} alt='' style={{ height: '40px', width: '30px' }} />
                                            <div className='ps-3'>
                                                <p className='text-secondary mb-1'>Blockchain AUC</p>
                                                <h6
                                                    className='fs-semibold text-primary mouse-hover  mb-0'
                                                    onClick={() => openAUCPage(batteryMeta)}
                                                >
                                                    {AUCMetaData?.certificate_id}
                                                </h6>
                                            </div>
                                        </div>
                                        <div className='ps-3'>
                                            <p className=' text-secondary mb-0'>Generated Date</p>
                                            <p className='fw-semibold text-dark fs-sm  mb-0'>
                                                {AUCMetaData?.generated_on}
                                            </p>
                                        </div>
                                        <div className='ps-3'>
                                            <p className=' text-secondary mb-0'>Current Phase</p>
                                            <p className='fw-semibold text-dark fs-sm  mb-0'>
                                                {AUCMetaData?.current_phase}
                                            </p>
                                        </div>
                                        <div className='ps-3'>
                                            <p className=' text-secondary mb-0'>Valid Till</p>
                                            <p className='fw-semibold text-dark fs-sm  mb-0'>{AUCMetaData?.expiry}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <Button variant='primary' className='border text-center' onClick={generateNewAUC}>
                                        Generate AUC
                                    </Button>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl='3'>
                        <Card className='card-one'>
                            <Card.Body className='p-3'>
                                <p className='fw-semibold text-dark mb-3'>Warranty Profile</p>
                                <Row className='d-flex justify-content-around pb-xl-2'>
                                    <Col sm='4' className=' text-center p-0'>
                                        Warranty Start Date
                                    </Col>
                                    <Col sm='4' md='7' className='text-center p-0 fw-semibold'>
                                        <p>{warrantyAggregations?.warranty_start_date}</p>
                                    </Col>
                                </Row>
                                <Row className='d-flex justify-content-around pb-xl-3'>
                                    <Col sm='4' className=' text-center p-0'>
                                        Warranty End Date
                                    </Col>
                                    <Col sm='4' md='7' className='text-center p-0 fw-semibold'>
                                        <p>{warrantyAggregations?.warranty_end_date}</p>
                                    </Col>
                                </Row>
                                <Row className='d-flex justify-content-around'>
                                    <Col sm='4' className=' text-center p-0'>
                                        Status
                                    </Col>
                                    <Col sm='4' md='7' className='text-center p-0 fw-semibold'>
                                        <p>{warrantyAggregations?.status}</p>
                                    </Col>
                                </Row>
                                <Row className='d-flex justify-content-around'>
                                    <Col sm='4' className=' text-center p-0'>
                                        Calendar Life
                                    </Col>
                                    <Col sm='4' md='7' className='text-center p-0 fw-semibold'>
                                        <p>{warrantyAggregations?.calender_life}</p>
                                    </Col>
                                </Row>
                                <Row className='d-flex justify-content-around pb-xl-3'>
                                    <Col sm='4' className=' text-center p-0'>
                                        Total Warranty Lifespan
                                    </Col>
                                    <Col sm='4' md='7' className='text-center p-0 fw-semibold'>
                                        <p>{warrantyAggregations?.total_warranty_life_span}</p>
                                    </Col>
                                </Row>
                                <Row className='d-flex justify-content-around pb-xl-3'>
                                    <Col sm='4' className=' text-center p-0'>
                                        Total Warranty alerts
                                    </Col>
                                    <Col sm='4' md='7' className='text-center p-0 fw-semibold'>
                                        <p>{warrantyAggregations?.total_warranty_alerts}</p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <WarrantyViewPageGraph
                        warrantyGraphState={warrantyGraphState}
                        setGraphState={setGraphState}
                        chartSeries={chartSeries}
                        warrantyChartOptions={warrantyChartOptions}
                    />

                    <Col xl='12'>
                        <Row className='g-3'>
                            <Col xl='2' md='3' sm='3' className='pe-1'>
                                <Card className='card-one'>
                                    <Card.Body className='p-2 text-center'>
                                        <Row className='g-0 g-xl-0'>
                                            <Col>
                                                <label className='fs-sm text-secondary mb-1'>Date Selected</label>
                                            </Col>
                                        </Row>
                                        <Row className='g-0 g-xl-0'>
                                            <Col>
                                                <p className='fw-semibold text-dark mb-2'>{dateRange[0]}</p>
                                                <p className='fw-semibold text-dark mb-2'>to</p>
                                                <p className='fw-semibold text-dark mb-2'>{dateRange[1]}</p>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl='5' md='9' sm='9'>
                                <Card className='card-one'>
                                    <Card.Body className='p-2 text-center overflow-hidden'>
                                        <Row className='g-0 g-xl-0 '>
                                            <Col>
                                                <Row>
                                                    <p className='fw-semibold text-dark mb-3'>Charging</p>
                                                    <Col>
                                                        <label className='fs-sm text-secondary mb-1'>
                                                            Operated Temp Range
                                                        </label>
                                                    </Col>
                                                    <Col className='p-0'>
                                                        <label className='fs-sm text-secondary mb-1'>C-Rate</label>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <div className='vr me-1'></div>
                                            <Col>
                                                <Row>
                                                    <p className='fw-semibold text-dark mb-3'>Discharging</p>
                                                    <Col>
                                                        <label className='fs-sm text-secondary mb-1'>
                                                            Operated Temp Range
                                                        </label>
                                                    </Col>
                                                    <Col className='p-0'>
                                                        <label className='fs-sm text-secondary mb-1'>C-Rate</label>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row className='g-0 g-xl-0'>
                                            <Col>
                                                <p className='fw-semibold text-dark mb-2'>
                                                    {showDefaultKPIs
                                                        ? warrantyAggregations?.charging_temp_range
                                                        : warrantyAvgAggregations?.charging_temp_range}
                                                </p>
                                            </Col>
                                            <Col>
                                                <p className='fw-semibold text-dark mb-2'>
                                                    {showDefaultKPIs
                                                        ? warrantyAggregations?.charging_crate_min === warrantyAggregations?.charging_crate_max
                                                            ? `${warrantyAggregations?.charging_crate_min}`
                                                            : `${warrantyAggregations?.charging_crate_min}-${warrantyAggregations?.charging_crate_max}`
                                                        : warrantyAvgAggregations?.avg_min_C_rate_charging === warrantyAvgAggregations?.avg_max_C_rate_charging
                                                            ? `${warrantyAvgAggregations?.avg_min_C_rate_charging}`
                                                            : `${warrantyAvgAggregations?.avg_min_C_rate_charging}-${warrantyAvgAggregations?.avg_max_C_rate_charging}`}

                                                </p>
                                            </Col>
                                            <div className='vr me-1'></div>
                                            <Col>
                                                <p className='fw-semibold text-dark mb-2'>
                                                    {showDefaultKPIs
                                                        ? warrantyAggregations?.discharging_temp_range
                                                        : warrantyAvgAggregations?.discharging_temp_range}
                                                </p>
                                            </Col>
                                            <Col>
                                                <p className='fw-semibold text-dark mb-2'>
                                                    {showDefaultKPIs
                                                        ? warrantyAggregations?.discharging_crate_min === warrantyAggregations?.discharging_crate_max
                                                            ? `${warrantyAggregations?.discharging_crate_min}`
                                                            : `${warrantyAggregations?.discharging_crate_min}-${warrantyAggregations?.discharging_crate_max}`
                                                        : warrantyAvgAggregations?.avg_min_C_rate_discharging === warrantyAvgAggregations?.avg_max_C_rate_discharging
                                                            ? `${warrantyAvgAggregations?.avg_min_C_rate_discharging}`
                                                            : `${warrantyAvgAggregations?.avg_min_C_rate_discharging}-${warrantyAvgAggregations?.avg_max_C_rate_discharging}`}
                                                </p>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl='5' md='12' sm='12' className='pe-1'>
                                <Card className='card-one'>
                                    <Card.Body className='p-2 text-center'>
                                        <Row className='g-0 g-xl-0'>
                                            <Col>
                                                <label className='fs-sm text-secondary mb-1'>State of Health</label>
                                            </Col>
                                            <Col>
                                                <label className='fs-sm text-secondary mb-1'>SoC Range</label>
                                            </Col>
                                            <Col>
                                                <label className='fs-sm text-secondary mb-1 pe-2'>
                                                    Equivalent Cycles
                                                </label>
                                            </Col>
                                            <Col>
                                                <label className='fs-sm text-secondary mb-1'>
                                                    Avg Cell Voltage Diff
                                                </label>
                                            </Col>
                                        </Row>
                                        <Row className='g-0 g-xl-0'>
                                            <Col>
                                                <p className='fw-semibold text-dark mb-2'>
                                                    {showDefaultKPIs
                                                        ? warrantyAggregations?.bms_soh
                                                        : warrantyAvgAggregations?.avg_SoH}
                                                </p>
                                            </Col>
                                            <Col>
                                                <p className='fw-semibold text-dark mb-2'>
                                                    {showDefaultKPIs
                                                        ? warrantyAggregations?.soc_min_per ==
                                                            warrantyAggregations?.soc_max_per
                                                            ? `${warrantyAggregations?.soc_min_per}`
                                                            : `${warrantyAggregations?.soc_min_per}-${warrantyAggregations?.soc_max_per}`
                                                        : warrantyAvgAggregations?.avg_min_soc == warrantyAvgAggregations?.avg_max_soc
                                                            ? `${warrantyAvgAggregations?.avg_max_soc}`
                                                            : `${warrantyAvgAggregations?.avg_min_soc}-${warrantyAvgAggregations?.avg_max_soc}`}
                                                </p>
                                            </Col>
                                            <Col>
                                                <p className='fw-semibold text-dark mb-2'>
                                                    {showDefaultKPIs
                                                        ? warrantyAggregations?.equivalent_cycles_count
                                                        : warrantyAvgAggregations?.avg_equivalent_cycles}
                                                </p>
                                            </Col>
                                            <Col>
                                                <p className='fw-semibold text-dark mb-2'>
                                                    {showDefaultKPIs
                                                        ? warrantyAggregations?.cell_voltage_diff
                                                        : warrantyAvgAggregations?.avg_cell_voltage_diff}
                                                </p>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>

                            {/* <Col xl='12' md='12' sm='12' className='px-1'>
                                <Card className='card-one text-center px-1'>
                                    <Card.Body className='p-2'>
                                        <p className='fw-semibold text-dark mb-3'>GRAPH</p>
                                        <p className='fw-semibold text-dark mb-3'>GRAPH</p>
                                        <p className='fw-semibold text-dark mb-3'>GRAPH</p>
                                    </Card.Body>
                                </Card>
                            </Col> */}
                        </Row>
                    </Col>

                    <Col xl='12' md='12' sm='12' className='px-1'>
                        <Card className='card-one text-center px-1'>
                            <Card.Body className='overflow-hidden p-2'>
                                <p className='fw-semibold text-dark mb-xl-4'>Battery Usage Recommendations</p>
                                <Row md='12' className='row align-items-start'>
                                    {warrantyAggregations?.battery_usage_recommendations.map(
                                        (usageRecommendations, index) => (
                                            <Col md='6' className='mb-4' key={index}>
                                                <Row>
                                                    <label className='fs-sm text-secondary mb-1'>
                                                        {usageRecommendations?.title}
                                                    </label>
                                                </Row>
                                                <Row className='px-2'>
                                                    <label className='fw-semibold text-dark'>
                                                        {usageRecommendations?.recommendation}
                                                    </label>
                                                </Row>
                                            </Col>
                                        )
                                    )}
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
};

export default WarrantyViewPage;
