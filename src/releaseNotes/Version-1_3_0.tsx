import React from 'react';
import { Accordion, Card, Col, Row } from 'react-bootstrap';
import ReleaseNotesHeader from '../layouts/ReleaseNotesHeader';
export const Version_1_3_0 = () => {
    return (
        <React.Fragment>
            <ReleaseNotesHeader />
            <div className='main main-app p-3 p-lg-3 ms-1'>
                <Row className='g-3'>
                    <Col>
                        <h2 className='main-title mb-3' style={{ fontSize: '30px' }}>
                            Release Notes For Version-1.3.0
                        </h2>

                        <Accordion defaultActiveKey='0' className='accordion-faq'>
                            <Accordion.Item eventKey='0'>
                                <Accordion.Header>Bug Fixes</Accordion.Header>
                                <Accordion.Body>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Fixed connected signals bug. </Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            Fixed connected signals bug to provide a more accurate information and user-friendly experience.
                                        </Card.Body>
                                    </Card>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'> Zooming Bug Fix
                                            </Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            We have resolved a zooming bug in Warranty-View-Page that previously hindered the user experience, ensuring smoother and more responsive interactions with the charts.

                                        </Card.Body>
                                    </Card>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey='1'>
                                <Accordion.Header>Enhancements</Accordion.Header>
                                <Accordion.Body>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Updated Diagnostic Report </Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            Updated Diagnostic Report in Signal View page
                                        </Card.Body>
                                    </Card>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Row>
            </div>
        </React.Fragment >
    );
};

