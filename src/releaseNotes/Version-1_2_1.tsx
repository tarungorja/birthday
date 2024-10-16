import React from 'react';
import { Accordion, Card, Col, Row } from 'react-bootstrap';
import ReleaseNotesHeader from '../layouts/ReleaseNotesHeader';
export const Version_1_2_1 = () => {
    return (
        <React.Fragment>
            <ReleaseNotesHeader />
            <div className='main main-app p-3 p-lg-3 ms-1'>
                <Row className='g-3'>
                    <Col>
                        <h2 className='main-title mb-3' style={{ fontSize: '30px' }}>
                            Release Notes For Version-1.2.1
                        </h2>

                        <Accordion defaultActiveKey='0' className='accordion-faq'>
                            <Accordion.Item eventKey='0'>
                                <Accordion.Header>Enhancements</Accordion.Header>
                                <Accordion.Body>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Enhanced Battery Usage Recommendations Display</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            we have enhanced the Safety, Operational, and Warranty View pages by displaying the latest distinct battery usage recommendations in the usage recommendations card.
                                            This improvement ensures that users have access to the most recent and relevant recommendations for battery safety, operational efficiency, and warranty compliance,
                                            providing a more informative and user-friendly experience.
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

