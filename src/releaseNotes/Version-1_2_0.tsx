import React from 'react';
import { Accordion, Card, Col, Row } from 'react-bootstrap';
import ReleaseNotesHeader from '../layouts/ReleaseNotesHeader';
export const Version_1_2_0 = () => {
    return (
        <React.Fragment>
            <ReleaseNotesHeader />
            <div className='main main-app p-3 p-lg-3 ms-1'>
                <Row className='g-3'>
                    <Col>
                        <h2 className='main-title mb-3' style={{ fontSize: '30px' }}>
                            Release Notes For Version-1.2.0
                        </h2>

                        <Accordion defaultActiveKey='0' className='accordion-faq'>
                            <Accordion.Item eventKey='0'>
                                <Accordion.Header>Enhancements</Accordion.Header>
                                <Accordion.Body>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Signal Plot with Interactive Tooltip</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            A new signal plot feature has been added to the Signal-View-Page, providing an interactive experience with tooltips.
                                            Hovering over different elements of the plot will now display detailed information, making it easier to analyze and understand the signals.
                                        </Card.Body>
                                    </Card>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Signal Tree Plot for Adjacent Months</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            The Signal Tree graph now includes plots for the previous and next months, offering a comprehensive view of signal trends over time.
                                            This enhancement allows for a more thorough analysis by enabling users to easily compare signal data across different time periods.
                                        </Card.Body>
                                    </Card>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Enhanced Warranty View Page Graphs </Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            We have enhanced &quot;BMS-SoH&quot; and &quot;Equivalent Cycles&quot; graphs on Warranty View Page.
                                            The &quot;BMS-SoH&quot; graph provides a visual representation of the Battery&lsquo;s State of Health over time, allowing users to easily track and analyze the health status of their batteries.
                                            The &quot;Equivalent Cycles&quot; graph offers insights into the number of equivalent cycles the battery has undergone, aiding in understanding usage patterns and battery longevity.
                                            These enhanced graphs are designed to provide comprehensive insights, aiding in better warranty management and decision-making.
                                        </Card.Body>
                                    </Card>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Metadata Update in MongoDB</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            On boarded 52145 Zabbix Batteries from Zabbix Inventory
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

