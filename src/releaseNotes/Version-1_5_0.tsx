import React from 'react';
import { Accordion, Card, Col, Row } from 'react-bootstrap';
import ReleaseNotesHeader from '../layouts/ReleaseNotesHeader';
const Version_1_5_0 = () => {
    return (
        <React.Fragment>
            <ReleaseNotesHeader />
            <div className='main main-app p-3 p-lg-3 ms-1'>
                <Row className='g-3'>
                    <Col>
                        <h2 className='main-title mb-3' style={{ fontSize: '30px' }}>
                            Release Notes For Version-1.5.0 (UI)
                        </h2>

                        <Accordion defaultActiveKey='0' className='accordion-faq'>
                            <Accordion.Item eventKey='0'>
                                <Accordion.Header>New Features</Accordion.Header>
                                <Accordion.Body>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Hourly Temperature HeatMap in Safety View Page</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            The Safety Hourly Temperature Heatmap provides a detailed visualization of temperature variations across each hour of the day. The heatmap uses a color gradient to represent different temperature ranges, with interactive hover elements for precise data insights. This feature enhances the Safety View Page by offering a clear and concise way to track temperature fluctuations over time
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
                            Release Notes For Version-1.5.0 (Backend Service)
                        </h2>

                        <Accordion defaultActiveKey='0' className='accordion-faq'>
                            <Accordion.Item eventKey='0'>
                                <Accordion.Header>New API&lsquo;s</Accordion.Header>
                                <Accordion.Body>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>API for Hourly Temperature HeatMap </Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            A dedicated API endpoint &lsquo;/v1/views/safety/hourly-temperature-data&lsquo; has been developed to fetch the data required for rendering the Safety Hourly Temperature Heatmap. This API delivers both real-time and historical hourly temperature data, enabling the frontend to display accurate and up-to-date insights into temperature variations across different hours of the day.
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

export default Version_1_5_0;
