import React from 'react';
import { Accordion, Card, Col, Row } from 'react-bootstrap';
import ReleaseNotesHeader from '../layouts/ReleaseNotesHeader';
const Version_1_7_0 = () => {
    return (
        <React.Fragment>
            <ReleaseNotesHeader />
            <div className='main main-app p-3 p-lg-3 ms-1'>
                <Row className='g-3'>
                    <Col>
                        <h2 className='main-title mb-3' style={{ fontSize: '30px' }}>
                            Release Notes For Version-1.7.0 (UI)
                        </h2>

                        <Accordion defaultActiveKey='0' className='accordion-faq'>
                            <Accordion.Item eventKey='0'>
                                <Accordion.Header>Enhancements</Accordion.Header>
                                <Accordion.Body>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'> Warranty View Page Update</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            In the Warranty View Page,The Total Expected LifeSpan parameter has been removed from the Warranty Profile
                                        </Card.Body>
                                    </Card>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'> Parameter Name Update</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            The Ambient Temperature parameter in the Safety View Page and Health View Page season card has been renamed to Temperature Range.
                                        </Card.Body>
                                    </Card>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <Accordion defaultActiveKey='0' className='accordion-faq'>
                            <Accordion.Item eventKey='0'>
                                <Accordion.Header>Bugs Fixes</Accordion.Header>
                                <Accordion.Body>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Incorrect Y-axis label in Safety Temperature Heatmap</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            In the Safety View page, the y-axis label for the Hourly Temperature HeatMap has been updated to &lsquo;Time&lsquo; to accurately reflect the hourly data being displayed.
                                        </Card.Body>
                                    </Card>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Missing Units in Temperature Limit Bar on Safety Temperature Heatmap</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            In the Safety View page, the Hourly Temperature HeatMap now includes temperature units in the limit bar, ensuring that users are aware of the temperature scale being used.
                                        </Card.Body>
                                    </Card>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Incomplete Time Labels in Safety Temperature Heatmap</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            In the Safety View page, the Hourly Temperature HeatMap now includes temperature units in the limit bar, ensuring that users are aware of the temperature scale being used.

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
                            Release Notes For Version-1.7.0 (Backend Service)
                        </h2>

                        <Accordion defaultActiveKey='0' className='accordion-faq'>
                            <Accordion.Item eventKey='0'>
                                <Accordion.Header>Enhancements</Accordion.Header>
                                <Accordion.Body>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>
                                                Implemented Multiple Error messages for same status code.
                                            </Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            When there are multiple exceptions with the same status code, they are sent
                                            as the response in an array. If the status codes are different then the high
                                            priority error will be sent in the response.
                                        </Card.Body>
                                    </Card>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>
                                                New Parameter Added to &lsquo;/v1/views/safety/safety-incidents&lsquo; API response
                                            </Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            The API response for the Safety Incidents Chart Data has been updated to include two new parameters: latest_date and initial_date. These parameters indicate the range of dates for which the safety incidents have been verified.
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

export default Version_1_7_0;
