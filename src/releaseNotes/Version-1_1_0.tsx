import React from 'react';
import { Accordion, Card, Col, Row } from 'react-bootstrap';
import ReleaseNotesHeader from '../layouts/ReleaseNotesHeader';
const Version_1_1_0 = () => {
    return (
        <React.Fragment>
            <ReleaseNotesHeader />
            <div className='main main-app p-3 p-lg-3 ms-1'>
                <Row className='g-3'>
                    <Col>
                        <h2 className='main-title mb-3' style={{ fontSize: '30px' }}>
                            Release Notes For Version-1.1.0
                        </h2>

                        <Accordion defaultActiveKey='0' className='accordion-faq'>
                            <Accordion.Item eventKey='0'>
                                <Accordion.Header>New Features</Accordion.Header>
                                <Accordion.Body>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Interactive Signal Tree Graph</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            We have integrated an interactive Signal Tree graph into the
                                            Signal-View-Page. This new feature provides a more engaging and intuitive
                                            way to visualize signals for a battery, making it easier for users to
                                            explore and understand the relationships and hierarchy within the signals
                                            for the battery.
                                        </Card.Body>
                                    </Card>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Recently Viewed Section</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            We have enhanced the user experience by adding a &quot;Recently Viewed&quot;
                                            section for signals and batteries at the bottom of their section. This
                                            feature displays the last three recently viewed batteries and signals,
                                            providing quick access to frequently checked items. When the user logs in,
                                            the &quot;Recently Viewed&quot; section will be empty, ensuring a clean
                                            slate at the start of each session.
                                        </Card.Body>
                                    </Card>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Date Filter for Signals</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            We have introduced a date filter for signals, allowing users to filter
                                            signals based on selected dates. This enhancement makes it easier to analyze
                                            signal data within specific time frames, providing more targeted and
                                            relevant insights.
                                        </Card.Body>
                                    </Card>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>New Plots in Operational View Page </Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            We have designed and integrated new &quot;Operated SOC Range&quot;,
                                            &quot;How Am I Charging?&quot; and &quot;How Am I Discharging?&quot; graphs
                                            on the Operational-View-Page. These graphs provide users with a visual
                                            representation of their charging and discharging performance. These new
                                            graphs on the Operational-View-Page offer comprehensive insights into
                                            operational metrics, enabling users to monitor and analyze various aspects
                                            of their battery operations more effectively
                                        </Card.Body>
                                    </Card>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Heat Map Feature</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            We have introduced a new heat map feature on the Safety-View-Page to enhance
                                            data visualization and user experience. The heat map provides a more
                                            intuitive way to understand and analyze safety-related data, allowing users
                                            to quickly identify patterns and areas of concern.
                                        </Card.Body>
                                    </Card>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey='1'>
                                <Accordion.Header>Enhancements</Accordion.Header>
                                <Accordion.Body>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>ApexCharts Integration</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            We have enhanced the Health-View-Page by updating the plots to ApexCharts
                                            from React-Plotly in Health-View-Page, which offers more advanced and
                                            visually appealing charting capabilities.
                                        </Card.Body>
                                    </Card>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Health View Page Graphs</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            The Health-View-Page now includes the integration of BMS-SoH and SoH
                                            degradation plots, providing deeper insights into battery health and
                                            performance over time. Additionally, Target Performance values which were
                                            previously hard-coded, are now dynamically fetched using the
                                            /v1/batteries/models?model_no=&lt;battery_model&gt; API. This update ensures
                                            that the Target Performance values displayed on the Health-View-Page are
                                            accurate and up-to-date, improving the reliability of the information
                                            presented.
                                        </Card.Body>
                                    </Card>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Visual and Branding Enhancements</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            We have updated the logo on both the home page and login page for a
                                            refreshed and modern look. This change is part of our ongoing efforts to
                                            enhance the visual appeal and branding of our platform. The blockchain image
                                            has also been replaced. This improvement ensures clearer and more
                                            professional imagery, contributing to an overall better visual experience
                                            for our users.
                                        </Card.Body>
                                    </Card>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey='2'>
                                <Accordion.Header> Bug Fixes</Accordion.Header>
                                <Accordion.Body>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Zooming Bug Fix</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            We have resolved a zooming bug in Health-View-Page that previously hindered
                                            the user experience, ensuring smoother and more responsive interactions with
                                            the charts.
                                        </Card.Body>
                                    </Card>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>
                                                Navigation from AUC Page to Respective View Page
                                            </Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            Navigation has been improved to enhance user flow. Previously, there was no
                                            way to navigate back from the AUC page. Now, users can return to the
                                            respective battery view pages by clicking on the battery name in the top
                                            left corner. This change ensures a more intuitive and efficient navigation
                                            experience.
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

export default Version_1_1_0;
