import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import bImg from '../../assets/img/battery-icon.png';
import Header from '../../layouts/Header';
import Avatar from '../common/Avatar';
import SpinnerLoader from '../common/SpinnerComponent';
import qrImg from '../../assets/svg/qr-code.svg';
import SafetyViewPageGraph from '../common/SafetyViewPageGraph';

const SafetyViewPage = (props: ISafetyViewProps) => {
    const {
        showDefaultKPIs,
        batteryMeta,
        generatingAUC,
        AUCMetaData,
        generateNewAUC,
        dateRange,
        openAUCPage,
        handleRelayout,
        safetyAggregations,
        safetyAvgAggregations,
        handleNavigation,
        safetyViewGraphState,
        setGraphState,
        safetyViewGraphData,
        safetyViewGraphLayout
    } = props;
    return (
        <React.Fragment>
            <Header />
            <div className='main main-app p-3 p-lg-3 ms-1'>
                <div className='d-md-flex align-items-center justify-content-between'>
                    <div>
                        <ol className='breadcrumb fs-sm mb-0'>
                            <li className='breadcrumb-item active' aria-current='page'>
                                Safety View
                            </li>
                        </ol>
                        <h4
                            className='main-title pt-1 '
                        // style={{ fontSize: '15px' }}
                        >
                            {batteryMeta?.asset_name}
                        </h4>
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
                            <Card.Header className='main-title fw-semibold text-dark m-0 pb-0 border-0'>
                                Battery is 4 year old
                            </Card.Header>
                            <Card.Body className='p-3'>
                                <h5 className='fw-semibold text-dark mb-3 '>Temperature Profile</h5>
                                <Row className='d-flex justify-content-around pb-3'>
                                    <Col sm='4' className=' text-center p-0'>
                                        Temperature Range
                                    </Col>
                                    <Col sm='4' md='7' className='text-center p-0 fw-semibold text-dark '>
                                        <p>
                                            {safetyAggregations?.temperature_celsius_min ===
                                                safetyAggregations?.temperature_celsius_max
                                                ? safetyAggregations?.temperature_celsius_min
                                                : `${safetyAggregations?.temperature_celsius_min} - ${safetyAggregations?.temperature_celsius_max}`}
                                        </p>
                                    </Col>
                                </Row>
                                <Row className='d-flex justify-content-around pb-3'>
                                    <Col sm='4' className=' text-center p-0'>
                                        Avg Temp Deviation during Charging
                                    </Col>
                                    <Col sm='4' md='7' className='text-center p-0 fw-semibold text-dark'>
                                        <p>{safetyAggregations?.avg_temp_deviation_charging}</p>
                                    </Col>
                                </Row>
                                <Row className='d-flex justify-content-around pb-3'>
                                    <Col sm='4' className=' text-center p-0 '>
                                        Avg Temp Deviation during Discharging
                                    </Col>
                                    <Col sm='4' md='7' className='text-center p-0 fw-semibold text-dark'>
                                        <p>{safetyAggregations?.avg_temp_deviation_discharging}</p>
                                    </Col>
                                </Row>
                                <Row className='d-flex justify-content-around'>
                                    <Col sm='4' className=' text-center p-0 pb-3'>
                                        Over Charging Incidents
                                    </Col>
                                    <Col sm='4' md='7' className='text-center p-0 fw-semibold text-dark'>
                                        <p>{safetyAggregations?.safety_aggregated_values?.over_charging_incidents}</p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <SafetyViewPageGraph
                        safetyViewGraphState={safetyViewGraphState}
                        setGraphState={setGraphState}
                        safetyViewGraphData={safetyViewGraphData}
                        safetyViewGraphLayout={safetyViewGraphLayout}
                        handleRelayout={handleRelayout}
                        handleNavigation={handleNavigation}
                    />

                    <Col xs='3' sm='3' md='3' xl='1'>
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
                    <Col xs='9' sm='9' md='9' xl='4' className='px-1'>
                        <Card className='card-one text-center'>
                            <Card.Body className='p-2'>
                                <Row className='g-0 g-xl-0 pb-xl-4'>
                                    <Col>
                                        <label className='fs-sm text-secondary mb-1'>Operated Temp Range</label>
                                    </Col>
                                    <Col>
                                        <label className='fs-sm text-secondary mb-1'>Over Temp Incidents</label>
                                    </Col>
                                    <Col>
                                        <label className='fs-sm text-secondary mb-1'>Over Charging Incidents</label>
                                    </Col>
                                    <Col>
                                        <label className='fs-sm text-secondary mb-1'>BMS Safety Alerts</label>
                                    </Col>
                                    <Col>
                                        <label className='fs-sm text-secondary mb-1'>Avg Cell Voltage Diff</label>
                                    </Col>
                                </Row>
                                <Row className='g-0 g-xl-0'>
                                    <Col>
                                        <p className='fw-semibold text-dark mb-2'>
                                            {showDefaultKPIs
                                                ? safetyAggregations?.temperature_celsius_min ==
                                                    safetyAggregations?.temperature_celsius_max
                                                    ? `${safetyAggregations?.temperature_celsius_min}`
                                                    : `${safetyAggregations?.temperature_celsius_min} - ${safetyAggregations?.temperature_celsius_max}`
                                                : safetyAvgAggregations?.operated_temp_range}
                                        </p>
                                    </Col>
                                    <Col>
                                        <p className='fw-semibold text-dark mb-2'>
                                            {showDefaultKPIs
                                                ? safetyAggregations?.safety_aggregated_values?.over_temp_incidents
                                                : safetyAvgAggregations?.over_temp_incidents}
                                        </p>
                                    </Col>
                                    <Col>
                                        <p className='fw-semibold text-dark mb-2'>
                                            {showDefaultKPIs
                                                ? safetyAggregations?.safety_aggregated_values?.over_charging_incidents
                                                : safetyAvgAggregations?.over_charging_incidents}
                                        </p>
                                    </Col>
                                    <Col>
                                        <p className='fw-semibold text-dark mb-2'>
                                            {showDefaultKPIs
                                                ? safetyAggregations?.safety_aggregated_values.bms_safety_alerts
                                                : safetyAvgAggregations?.bms_safety_alerts}
                                        </p>
                                    </Col>
                                    <Col>
                                        <p className='fw-semibold text-dark mb-2'>
                                            {showDefaultKPIs
                                                ? safetyAggregations?.cell_voltage_diff
                                                : safetyAvgAggregations?.avg_cell_voltage_diff}
                                        </p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md='6' xl='4' className='px-1'>
                        <Card className='card-one text-center px-1'>
                            <Card.Body className='overflow-hidden p-2'>
                                <p className='fw-semibold text-dark'>Battery Usage Recommendations</p>
                                <Row md='12' className='row align-items-start g-2 g-xl-2'>
                                    {safetyAggregations?.battery_usage_recommendations.map(
                                        (usageRecommendations, index) => (
                                            <Col md='3' className='mb-2' key={index}>
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
                    <Col md='6' xl='3' className='px-1'>
                        <Card className='card-one text-center px-1'>
                            <Card.Body className='p-2'>
                                <Row className='g-0 g-xl-0'>
                                    <Col>
                                        <label className='fs-sm text-secondary mb-1'>Season</label>
                                    </Col>
                                    <Col>
                                        <label className='fs-sm text-secondary mb-1'>Temperature Range</label>
                                    </Col>
                                    <Col>
                                        <label className='fs-sm text-secondary mb-1'>Cells Status</label>
                                    </Col>
                                </Row>
                                <Row className='g-0 g-xl-0'>
                                    <Col>
                                        <p className='fw-semibold text-dark mb-4'>{safetyAggregations?.season}</p>
                                    </Col>
                                    <Col>
                                        <p className='fw-semibold text-dark mb-4'>{safetyAggregations?.temperature_range}</p>
                                    </Col>
                                    <Col>
                                        <p className='fw-semibold text-dark mb-4'>{safetyAggregations?.cell_status}</p>
                                    </Col>
                                </Row>
                                <Row className='g-0 g-xl-0'>
                                    <Col>
                                        <label className='fs-sm text-secondary mb-1'>Criticality</label>
                                    </Col>
                                    <Col>
                                        <label className='fs-sm text-secondary mb-1'>Efficiency</label>
                                    </Col>
                                    <Col>
                                        <label className='fs-sm text-secondary mb-1'>Safety Condition</label>
                                    </Col>
                                </Row>
                                <Row className='g-0 g-xl-0'>
                                    <Col>
                                        <p className='fw-semibold text-dark mb-0'>{safetyAggregations?.criticality}</p>
                                    </Col>
                                    <Col>
                                        <p className='fw-semibold text-dark mb-0'>{safetyAggregations?.efficiency}</p>
                                    </Col>
                                    <Col>
                                        <p className='fw-semibold text-dark mb-0'>
                                            {safetyAggregations?.safety_condition}
                                        </p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Row className='g-2'>
                            {/* <Col xl='3' sm='6' className='px-1'>
                                <Card className='card-one'>
                                    <Card.Body className='p-2 text-center'>
                                        <p className='fw-semibold text-dark'>My Temp Vs Battery State</p>
                                        <span className='placeholder col-7'></span>
                                        <span className='placeholder col-7'></span>
                                        <div>Graph of Temp Vs Battery State</div>
                                        <span className='placeholder col-7'></span>
                                        <span className='placeholder col-7'></span>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl='3' sm='6' className='px-1'>
                                <Card className='card-one'>
                                    <Card.Body className='p-2 text-center'>
                                        <p className='fw-semibold text-dark'>All the Temperature Values</p>
                                        <span className='placeholder col-7'></span>
                                        <span className='placeholder col-7'></span>
                                        <div>Graph of temp from all sensors</div>
                                        <span className='placeholder col-7'></span>
                                        <span className='placeholder col-7'></span>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl='3' sm='6' className='px-1'>
                                <Card className='card-one'>
                                    <Card.Body className='p-2 text-center'>
                                        <p className='fw-semibold text-dark'>Cell Voltage + CV Difference Graph</p>
                                        <span className='placeholder col-7'></span>
                                        <span className='placeholder col-7'></span>
                                        <div>Graph of Cell Voltage diff</div>
                                        <span className='placeholder col-7'></span>
                                        <span className='placeholder col-7'></span>
                                    </Card.Body>
                                </Card>
                            </Col> */}
                            {/* <Col xl='3' sm='6' className='px-1'>
                                <Card className='card-one'>
                                    <Card.Body className='p-2 text-center overflow-hidden'>
                                        <p className='fw-semibold text-dark'>Yearly Temp Deviation trend</p>
                                        During Charging
                                        <Row className='g-0'>
                                            <Col>33 to 36{'\u00B0'}C</Col>
                                            <Col>
                                                <i
                                                    className='ri-arrow-up-line'
                                                    style={{
                                                        color: 'red',
                                                        fontSize: '1.5rem',
                                                        fontWeight: 'lighter',
                                                    }}
                                                />
                                            </Col>
                                            <Col>Avg 3% Increase Every Year</Col>
                                        </Row>
                                        During Discharging
                                        <Row>
                                            <Col>33 to 38{'\u00B0'}C</Col>
                                            <Col>
                                                <i
                                                    className='ri-arrow-up-line'
                                                    style={{
                                                        color: 'red',
                                                        fontSize: '1.5rem',
                                                        fontWeight: 'lighter',
                                                    }}
                                                />
                                            </Col>
                                            <Col>Avg 5% Increase Every Year</Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col> */}
                            {/* <Col xl='3' sm='6' className='px-1'>
                                <Card className='card-one'>
                                    <Card.Body className='p-2 text-center'>
                                        <p className='fw-semibold text-dark'>How am i being used?</p>
                                        <span className='placeholder col-7'></span>
                                        <span className='placeholder col-7'></span>
                                        <div>Graph </div>
                                        <span className='placeholder col-7'></span>
                                        <span className='placeholder col-7'></span>
                                    </Card.Body>
                                </Card>
                            </Col> */}
                        </Row>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
};

export default SafetyViewPage;
