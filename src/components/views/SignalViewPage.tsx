import React from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import SignalViewPageGraph from '../common/SignalViewPageGraph';
import bImg from '../../assets/img/battery-icon.png';
import Header from '../../layouts/Header';
import Avatar from '../common/Avatar';
import SignalEventDataGraph from '../Graphs/SignalEventDataGraph';
import Dropdown from 'react-bootstrap/Dropdown';

const SignalViewPage = (props: ISignalViewProps) => {
    const {
        signalId,
        signalData,
        batteryMetadata,
        showSignalsTree,
        setShowSignalsTree,
        batterySignals,
        getCategoryPlotData,
    } = props;
    return (
        <React.Fragment>
            <Header />
            <div className='main main-app p-3 p-lg-3 ms-1'>
                <div className='d-md-flex align-items-center justify-content-between'>
                    <div>
                        <ol className='breadcrumb fs-sm mb-0'>
                            <li className='breadcrumb-item active' aria-current='page'>
                                DSG
                            </li>
                        </ol>
                        <h2 className='main-title py-1 mb-0'>{signalData?.event_details.title}</h2>
                        <p className='text-secondary mb-0'>Description: {signalData?.event_details.description}</p>
                        <p className='text-secondary'>Signal Date: {signalData?.signal_date}</p>
                    </div>
                </div>

                <Row className='g-3'>
                    <Col xl='12' md='12' sm='12'>
                        <Card className='card-one'>
                            <Card.Body className='meta-info p-0 m-2'>
                                <div
                                    className='d-flex m-2 p-1 px-2 justify-content-between'
                                    style={{ backgroundColor: '#F8F9FC' }}
                                >
                                    <div className='d-flex'>
                                        <Avatar img={bImg} />
                                        <div>
                                            <p className='fs-sm text-secondary mb-0'>Model</p>
                                            <h6 className='fw-semibold text-dark mb-1'>{batteryMetadata?.model}</h6>
                                        </div>
                                    </div>
                                    <div className='ps-5'>
                                        <p className=' text-secondary mb-0'>Battery Name</p>
                                        <p className='fw-semibold text-dark fs-sm  mb-0'>
                                            {batteryMetadata?.asset_name}
                                        </p>
                                    </div>
                                    <div className='ps-5'>
                                        <p className=' text-secondary mb-0'>Chemistry</p>
                                        <p className='fw-semibold text-dark fs-sm  mb-0'>
                                            {batteryMetadata?.chemistry}
                                        </p>
                                    </div>
                                    <div className='ps-5'>
                                        <p className=' text-secondary mb-0'>Nominal Energy</p>
                                        <p className='fw-semibold text-dark fs-sm  mb-0'>
                                            {batteryMetadata?.nominal_energy_kwh}
                                        </p>
                                    </div>
                                    <div className='ps-5'>
                                        <p className=' text-secondary mb-0'>Commissioned on</p>
                                        <p className='fw-semibold text-dark fs-sm  mb-0'>
                                            {batteryMetadata?.comissioned_on}
                                        </p>
                                    </div>
                                    <div className='ps-5'>
                                        <p className=' text-secondary mb-0'>Battery Application</p>
                                        <p className='fw-semibold text-dark fs-sm  mb-0'>
                                            {batteryMetadata?.battery_type}
                                        </p>
                                    </div>
                                    <div className='ps-5'>
                                        <p className=' text-secondary mb-0'>Location</p>
                                        <p className='fw-semibold text-dark fs-sm  mb-0'>{batteryMetadata?.location}</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl='12' sm='12' md='12'>
                        <Card className='card-one'>
                            <Card.Body className=' px-1 pt-0' style={{ overflow: 'hidden' }}>
                                <div className='graph-info p-3 p-xl-3 pt-4 pt-xl-'>
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            className='btn btn-light'
                                            variant='btn-light'
                                            id='dropdown-basic'
                                        >
                                            {showSignalsTree ? 'Signal Tree Plot' : 'Signal Category Plot'}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => setShowSignalsTree(true)}>
                                                Signal Tree Plot
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                onClick={() => {
                                                    getCategoryPlotData(), setShowSignalsTree(false);
                                                }}
                                            >
                                                Signal Category Plot
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <SignalViewPageGraph
                                    bat_uid={batteryMetadata?.bat_uid}
                                    signalId={signalId}
                                    showSignalsTree={showSignalsTree}
                                    batterySignals={batterySignals}
                                />
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xl='12' md='12' sm='12'>
                        <Card className='card-one'>
                            <Card.Header>
                                <Card.Title as='h6'>Investigation Details</Card.Title>
                            </Card.Header>
                            <Card.Body className='p-0'>
                                <SignalEventDataGraph signalEventData={signalData?.event_data} />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl='6' md='12' sm='12'>
                        <Card className='card-one'>
                            <Card.Header>
                                <Card.Title as='h6'>Diagnostic Report</Card.Title>
                            </Card.Header>
                            <Card.Body className='p-3 p-xl-3'>
                                <Table className='m-0 p-0'>
                                    <thead>
                                        <tr>

                                            <th scope='col' className='fw-semibold text-dark mb-0 mt-0'>
                                                Temperature Range
                                            </th>
                                            <th scope='col' className='fw-semibold text-dark mb-0 mt-0'>
                                                Max Voltage
                                            </th>
                                            <th scope='col' className='fw-semibold text-dark mb-0 mt-0'>
                                                Battery Status
                                            </th>
                                            <th scope='col' className='fw-semibold text-dark mb-0 mt-0'>
                                                Max Current
                                            </th>
                                            <th scope='col' className='fw-semibold text-dark mb-0 mt-0'>
                                                Min Current
                                            </th>
                                            {/* <th scope='col' className='fw-semibold text-dark mb-0 mt-0'>
                                                Avg C Rate
                                            </th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className='fs-sm text-secondary mb-0'>{signalData?.temperature_range}</td>
                                            <td className='fs-sm text-secondary mb-0'>{signalData?.max_voltage}</td>
                                            <td className='fs-sm text-secondary mb-0'>{signalData?.battery_status}</td>
                                            <td className='fs-sm text-secondary mb-0'>{signalData?.max_current}</td>
                                            <td className='fs-sm text-secondary mb-0'>{signalData?.min_current}</td>
                                            {/* <td className='fs-sm text-secondary mb-0'>{signalData?.avg_C_rate}</td> */}
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xl='6' md='6' sm='12'>
                        <Card className='card-one'>
                            <Card.Header>
                                <Card.Title as='h6'>Diagnostic Summary</Card.Title>
                            </Card.Header>
                            <Card.Body className='p-3'>
                                <Row className='g-3'>
                                    <Col>
                                        {signalData?.event_details.description}
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

export default SignalViewPage;
