import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import bImg from '../../assets/img/battery-icon.png';
import Header from '../../layouts/Header';
import Avatar from '../common/Avatar';
import SpinnerLoader from '../common/SpinnerComponent';
import qrImg from '../../assets/svg/qr-code.svg';
import { OperationalViewPageGraph } from '../common/OperationalViewPageGraph';
import { chargingCyclesGraphOptions } from '../../data/OperationalViewChart';
// import { DummyViewPageGraph } from '../common/DummyViewPageGraph';
import {
    // seriesThree,
    seriesFour,
    // seriesFive,
    // optionThree,
    optionFour,
    // optionFive,
    // seriesSix,
    // optionSix
} from '../../data/DummyOperationalViewChartData';
import ReactApexChart from 'react-apexcharts';
const OperationalViewPage = (props: IOperationalViewProps) => {
    const {
        batteryMeta,
        generatingAUC,
        AUCMetaData,
        generateNewAUC,
        openAUCPage,
        batteryOperationalData,
        avgAggregationsData,
        socRangeGraphSeries,
        valuedSOCGraphSeries,
        operationalViewGraphState,
        setGraphState,
        options,
        dateRange,
        chargingCyclesGraphData,
        dischargingCyclesGraphData
    } = props;
    return (
        <React.Fragment>
            <Header />
            <div className='main main-app p-3 p-lg-3 ms-1'>
                <div className='d-md-flex align-items-center justify-content-between'>
                    <div>
                        <ol className='breadcrumb fs-sm mb-0'>
                            <li className='breadcrumb-item active' aria-current='page'>
                                Operational View
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
                            <Card.Body className='meta-info p-0 m-2 d-flex align-items-center justify-content-center overflow-hidden'>
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

                    <Col md='6' xl='3' sm='12'>
                        <Card className='card-one'>
                            <Card.Body className='p-3'>
                                <Row>
                                    <h6>Best C-Rate to use</h6>
                                </Row>
                                <Row className='d-flex justify-content-around align-self-start'>
                                    <Col sm='4' className=' text-center p-0'>
                                        <h5>{batteryOperationalData?.operational_thresholds?.best_Crate_to_use}</h5>
                                    </Col>
                                    <Col sm='1' className='text-center p-0'>
                                        <i
                                            className='ri-arrow-up-line text-success'
                                            style={{ fontSize: '1.3rem', verticalAlign: 'top' }}
                                        ></i>
                                    </Col>
                                    <Col sm='4' md='7' className='justify-content-center p-0'>
                                        <p>90% Charge Cycles within Limit</p>
                                    </Col>
                                </Row>

                                <Row>
                                    <h6>Best SoC Limits</h6>
                                </Row>
                                <Row
                                    className='d-flex justify-content-around align-s
                                elf-start'
                                >
                                    <Col sm='4' className=' text-center p-0'>
                                        <h5>{batteryOperationalData?.operational_thresholds?.best_SOC_limits}</h5>
                                    </Col>
                                    <Col sm='1' className='text-center p-0'>
                                        <i
                                            className='ri-arrow-up-line d-inline '
                                            style={{ color: 'red', fontSize: '1.3rem', fontWeight: 'lighter' }}
                                        ></i>
                                    </Col>
                                    <Col sm='4' md='7' className='text-start p-0'>
                                        <p>80% of duration out of limits</p>
                                    </Col>
                                </Row>

                                <Row>
                                    <h6>Temperature limits</h6>
                                </Row>
                                <Row className='d-flex justify-content-around'>
                                    <Col sm='4' className=' text-center p-0'>
                                        <h5>{batteryOperationalData?.operational_thresholds?.temperature_limits}</h5>
                                    </Col>
                                    <Col sm='1' className='text-center p-0'>
                                        <i
                                            className='ri-arrow-up-line d-center'
                                            style={{ color: 'red', fontSize: '1.3rem', textAlign: 'start' }}
                                        ></i>
                                    </Col>
                                    <Col sm='4' md='7' className='text-start p-0'>
                                        <p>10% of duration out of limits </p>
                                    </Col>
                                </Row>
                                <Row className='p-2'>
                                    <h6>Most 5 recent stress factors :</h6>
                                    <ol>
                                        {batteryOperationalData?.stress_factors?.map((stress_factors, index) => (
                                            <li key={index}>{stress_factors}</li>
                                        ))}
                                    </ol>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <OperationalViewPageGraph
                        socRangeGraphSeries={socRangeGraphSeries}
                        valuedSOCGraphSeries={valuedSOCGraphSeries}
                        operationalViewGraphState={operationalViewGraphState}
                        setGraphState={setGraphState}
                        options={options}
                    />

                    <Col xs='6' sm='6' md='3' xl='1' className='pe-1'>
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
                    <Col xl='4' md='12' sm='12' className='pe-1'>
                        <Card className='card-one'>
                            <Card.Body className='p-2 text-center'>
                                <Row className='g-0 g-xl-0'>
                                    <Col>
                                        <label className='fs-sm text-secondary mb-1'>Charging Cycles</label>
                                    </Col>
                                    <Col>
                                        <label className='fs-sm text-secondary mb-1'>Discharging Cycles</label>
                                    </Col>
                                    <Col>
                                        <label className='fs-sm text-secondary mb-1'>Charging Energy</label>
                                    </Col>
                                    <Col>
                                        <label className='fs-sm text-secondary mb-1'>Discharging Energy</label>
                                    </Col>
                                    <Col>
                                        <label className='fs-sm text-secondary mb-1'>Charge Duration</label>
                                    </Col>
                                    <Col>
                                        <label className='fs-sm text-secondary mb-1'>Discharge Duration</label>
                                    </Col>
                                </Row>
                                <Row className='g-0 g-xl-0'>
                                    <Col>
                                        <p className='fw-semibold text-dark mb-2'>
                                            {avgAggregationsData?.charge_cycle_count}
                                        </p>
                                    </Col>
                                    <Col>
                                        <p className='fw-semibold text-dark mb-2'>
                                            {avgAggregationsData?.discharge_cycle_count}
                                        </p>
                                    </Col>
                                    <Col>
                                        <p className='fw-semibold text-dark mb-2'>
                                            {avgAggregationsData?.cumulative_energy_consumed_kwh}
                                        </p>
                                    </Col>
                                    <Col>
                                        <p className='fw-semibold text-dark mb-2'>
                                            {avgAggregationsData?.cumulative_energy_discharged_kwh}
                                        </p>
                                    </Col>
                                    <Col>
                                        <p className='fw-semibold text-dark mb-2'>
                                            {avgAggregationsData?.total_charge_duration_hrs}
                                        </p>
                                    </Col>
                                    <Col>
                                        <p className='fw-semibold text-dark mb-2'>
                                            {avgAggregationsData?.total_discharge_duration_hrs}
                                        </p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl='7' md='12' sm='12' className='px-1'>
                        <Card className='card-one text-center px-1'>
                            <Card.Body className='p-2 overflow-hidden'>
                                <p className='fw-semibold text-start text-dark mb-3'>Battery Usage Recommendations</p>
                                <Row md='12' className='row align-items-start g-2 g-xl-2' >
                                    {batteryOperationalData?.battery_usage_recommendations.map((usageRecommendations, index) => (
                                        <Col md='2' className='mb-2' key={index}>
                                            <Row>
                                                <label className='fs-sm text-secondary mb-1'>{usageRecommendations?.title}</label>
                                            </Row>
                                            <Row className='px-2'>
                                                <label className='fw-semibold text-dark'>{usageRecommendations?.recommendation}</label>
                                            </Row>
                                        </Col>
                                    ))}
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm='12' md='6' lg='3'>
                        <Card className='card-one text-center px-1'>
                            <Card.Body className='p-2'>
                                <p className='fw-semibold text-dark mb-3'>How am I Charging ?</p>
                                <p>
                                    To minimize the degradation, we recoomend that you aim to keep charge between 30 to
                                    80% SoC
                                </p>
                                <br></br>
                                <ReactApexChart
                                    options={chargingCyclesGraphOptions}
                                    series={chargingCyclesGraphData}
                                    type='scatter'
                                    height={300}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm='12' md='6' lg='3'>
                        <Card className='card-one text-center px-1'>
                            <Card.Body className='p-2'>
                                <p className='fw-semibold text-dark mb-3'>How am i Discharging?</p>
                                <p>
                                    To minimize the degradation , we recommend to keep the discharge between 80 to 20 % SoC
                                </p>
                                <br></br>
                                <ReactApexChart options={chargingCyclesGraphOptions} series={dischargingCyclesGraphData} type='scatter' height={300} />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm='12' md='6' lg='3'>
                        <Card className='card-one text-center px-1'>
                            <Card.Body className='overflow-hidden p-2'>
                                <p className='fw-semibold text-dark mb-3'>Expected Battery Range/RunHr</p>
                                <br></br>
                                <br></br>
                                <Row className='d-flex justify-content-around align-self-start'>
                                    <Col sm='3' className=' text-center p-0'>
                                        <h5>5:00 Hrs</h5>
                                        <p className='text-muted'>On a Full Charge</p>
                                    </Col>
                                    <Col sm='6' className='d-flex text-center p-0'>
                                        <div className='d-flex p-3'>
                                            <i
                                                className='ri-arrow-down-line d-flex me-1 '
                                                style={{ color: 'red', fontSize: '1.3rem', fontWeight: 'lighter' }}
                                            ></i>
                                            <p className='text-center'>3% less than last week</p>
                                        </div>
                                    </Col>
                                </Row>
                                <ReactApexChart
                                    options={optionFour}
                                    series={seriesFour}
                                    type='radialBar'
                                    height={300}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm='12' md='6' lg='3'>
                        <Card className='card-one text-center px-1'>
                            <Card.Body className='overflow-hidden p-2'>
                                <p className='fw-semibold text-dark mb-3'>My range in last 3 years</p>
                                <br></br>
                                <br></br>
                                <Row className='d-flex justify-content-around align-self-start'>
                                    <Col sm='3' className=' text-center p-0'>
                                        <h5>5:00 Hrs</h5>
                                        <p className='text-muted'>On a Full Charge</p>
                                    </Col>
                                    <Col sm='6' className='d-flex text-center p-0'>
                                        <div className='d-flex p-3'>
                                            <i
                                                className='ri-arrow-down-line d-flex me-1 '
                                                style={{ color: 'red', fontSize: '1.3rem', fontWeight: 'lighter' }}
                                            ></i>
                                            <p className='text-center'>3% less than last week</p>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
};

export default OperationalViewPage;
