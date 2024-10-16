import React from 'react';
import { Accordion, Card, Col, Row } from 'react-bootstrap';
import ReleaseNotesHeader from '../layouts/ReleaseNotesHeader';
const Version_1_6_0 = () => {
    return (
        <React.Fragment>
            <ReleaseNotesHeader />
            <div className='main main-app p-3 p-lg-3 ms-1'>
                <Row className='g-3'>
                    <Col>
                        <h2 className='main-title mb-3' style={{ fontSize: '30px' }}>
                            Release Notes For Version-1.6.0 (UI)
                        </h2>

                        <Accordion defaultActiveKey='0' className='accordion-faq'>
                            <Accordion.Item eventKey='0'>
                                <Accordion.Header>Enhancements</Accordion.Header>
                                <Accordion.Body>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Dynamic vs. Last Month Data Integration in Health View Graphs </Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            Made the &lsquo; vs. last month &lsquo; values dynamic BMS SOH graph and Battery Degradation Cycles graph in the Health View page. SoH and equivalent cycles are now compared with the previous month, providing a clearer view of monthly trends and helping users track battery health and performance more effectively
                                        </Card.Body>
                                    </Card>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Dynamic Values Replaced Placeholder Parameters in Safety and Warranty Pages</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            Replaced placeholder parameters for Over Temp Incidents, Over Charging Incidents, and BMS Safety Alerts with dynamic values on the Safety View page, and for Calendar Life, Total Warranty Alerts, and Total Warranty Life Span on the Warranty View page, ensuring real-time data is displayed for more accurate insights.
                                        </Card.Body>
                                    </Card>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Row>
                <Row className='g-3 mt-3'>
                    <Col>
                        <h2 className='main-title mb-3' style={{ fontSize: '30px' }}>
                            Release Notes For Version-1.6.0 (Backend Service)
                        </h2>

                        <Accordion defaultActiveKey='0' className='accordion-faq'>
                            <Accordion.Item eventKey='0'>
                                <Accordion.Header>Enhancements</Accordion.Header>
                                <Accordion.Body>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>New Parameter Added to &lsquo;/v1/views/health/bms_soh&lsquo; API </Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            A new parameter, soh_vs_last_month is added in the &lsquo;/v1/views/health/bms_soh&lsquo; API . This addition allows users to compare the current State of Health (SoH) with that of the previous month, facilitating better monitoring and analysis of battery performance trends.
                                        </Card.Body>
                                    </Card>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>New Parameter Added to &lsquo;/v1/views/health/battery_degradation_cycles&lsquo; API </Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            A new parameter, cycles_vs_last_month is added in the &lsquo;/v1/views/health/battery_degradation_cycles&lsquo; API . This addition allows users to compare the current Equivalent Cycles with that of the previous month, facilitating better monitoring and analysis of battery performance trends.
                                        </Card.Body>
                                    </Card>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Updated &lsquo;Get Searched Devices Metadata&lsquo; API
                                                <i className="ri-links-fill px-2"
                                                    onClick={() => window.open('https://dev.azure.com/EnergyIOT/Battery_Solution/_workitems/edit/26380', '_blank')}
                                                ></i>
                                            </Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            The search parameter should consists minimum three characters. And if an invalid parameter is given then an 204 error is thrown and error detail is mentioned in the response headers.
                                        </Card.Body>
                                    </Card>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Updated &lsquo;Download Battery Certificate&lsquo; API
                                                <i className="ri-links-fill px-2"
                                                    onClick={() => window.open('https://dev.azure.com/EnergyIOT/Battery_Solution/_workitems/edit/26420', '_blank')}
                                                ></i>
                                            </Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            If the Certificate_ID does not exist, the middleware returns a 404 error with an appropriate message indicating that the provided Certificate_ID is invalid.
                                        </Card.Body>
                                    </Card>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Updated detail for 204 errors</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            If the backend server throws a 204 error the error detail is added in the response headers, as we cannot throw a error message for 204 status code exceptions.
                                        </Card.Body>
                                    </Card>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
};

export default Version_1_6_0;
