import React from 'react';
import { Accordion, Card, Col, Row } from 'react-bootstrap';
import ReleaseNotesHeader from '../layouts/ReleaseNotesHeader';
const Version_1_4_0 = () => {
    return (
        <React.Fragment>
            <ReleaseNotesHeader />
            <div className='main main-app p-3 p-lg-3 ms-1'>
                <Row className='g-3'>
                    <Col>
                        <h2 className='main-title mb-3' style={{ fontSize: '30px' }}>
                            Release Notes For Version-1.4.0 (UI)
                        </h2>

                        <Accordion defaultActiveKey='0' className='accordion-faq'>
                            <Accordion.Item eventKey='0'>
                                <Accordion.Header>New Features</Accordion.Header>
                                <Accordion.Body>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Battery Capacity Chart in Health View Page</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            The Battery Capacity Chart provides a visual representation of the
                                            battery&lsquo;s capacity over time, allowing users to monitor and analyze
                                            the battery&lsquo;s health and performance. This chart helps in
                                            understanding how the battery capacity degrades with usage, providing
                                            critical insights for maintaining optimal battery health and planning
                                            replacements.
                                        </Card.Body>
                                    </Card>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Equivalent Cycles Chart in Health View Page</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            The Equivalent Cycles Chart offers a detailed view of the battery&lsquo;s
                                            lifecycle, representing the cumulative number of equivalent full cycles the
                                            battery has undergone. This chart is essential for assessing battery wear
                                            and predicting future performance, enabling users to take preemptive
                                            measures to extend battery life.
                                        </Card.Body>
                                    </Card>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Safety Incidents Graph in Safety View Page</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            The Safety Incidents Graph displays the number of safety-related incidents
                                            over time, categorized by severity. This Chart allows the frontend to
                                            present a focused view of daily safety incidents, highlighting the most
                                            critical events and aiding in effective safety monitoring.
                                        </Card.Body>
                                    </Card>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey='1'>
                                <Accordion.Header>Enhancements</Accordion.Header>
                                <Accordion.Body>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Error Handling Enhancements</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            On the UI side, users will now see the status code associated with any
                                            errors, providing more transparency and aiding in troubleshooting.
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
                            Release Notes For Version-1.4.0 (Backend Service)
                        </h2>

                        <Accordion defaultActiveKey='0' className='accordion-faq'>
                            <Accordion.Item eventKey='0'>
                                <Accordion.Header>New Features</Accordion.Header>
                                <Accordion.Body>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>API for Health View Equivalent Cycles Chart</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            A dedicated API endpoint has been created to fetch the data necessary for
                                            rendering the Equivalent Cycles Chart. This API provides real-time and
                                            historical data, allowing the frontend to display accurate and up-to-date
                                            information on the number of Equivalent Cycles the battery has completed
                                            over time.
                                        </Card.Body>
                                    </Card>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>API for Safety View Safety Incidents Graph</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            The Safety Incidents Graph API returns data on the number of safety-related
                                            signals that occurred each day. This API allows the frontend to present a
                                            focused view of daily safety incidents, highlighting the most critical
                                            events and aiding in effective safety monitoring.
                                        </Card.Body>
                                    </Card>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey='1'>
                                <Accordion.Header>Enhancements</Accordion.Header>
                                <Accordion.Body>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Error Handling Enhancements</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            We have significantly improved error handling across both the UI and Backend
                                            services. All errors are now consistently captured and handled with clear,
                                            descriptive error messages and appropriate HTTP status codes.
                                        </Card.Body>
                                    </Card>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Bearer Authentication Implementation</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            Implemented Bearer authentication to enhance the security of our
                                            application. This authentication mechanism ensures that only authorized
                                            users can access protected resources, providing an additional layer of
                                            security to the system.
                                        </Card.Body>
                                    </Card>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Enhanced Swagger Authentication</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            In Swagger, use the &lsquo;Authorize&lsquo; button to enter the access
                                            token, which you can obtain from the `v1/user/login` API. This will allow
                                            you to access the APIs in Swagger.
                                        </Card.Body>
                                    </Card>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Refactored API for Health View Battery Capacity Chart</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            Refactored the API endpoint from &lsquo;/v1/views/health/battery_degradation&lsquo; to &lsquo;/v1/views/health/battery_degradation_capacity&lsquo; to optimize data retrieval for the Battery Capacity Chart in the Health View. This update enhances the accuracy and efficiency of data presentation in the UI.
                                        </Card.Body>
                                    </Card>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Deprecated some APIs</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            The following APIs are not used anywhere so we deprecated them.
                                            <ol>
                                                <li>/v1/batteries/models</li>
                                                <li>/v1/batteries/alerts</li>
                                                <li>/v1/batteries/update-alerts</li>
                                                <li>/v1/batteries/push-alerts</li>
                                                <li>/v1/feeds</li>
                                                <li>/v1/feeds/batteries</li>
                                            </ol>
                                        </Card.Body>
                                    </Card>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey='2'>
                                <Accordion.Header> Bug Fixes</Accordion.Header>
                                <Accordion.Body>
                                    <Card className='card-one feed-list mb-1'>
                                        <Card.Header className='d-block'>
                                            <Card.Title as='h6'>Backend Refactoring and Validation</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            The Backend service has been refactored to improve code quality and
                                            maintainability. We have introduced comprehensive request and response
                                            validations for all APIs to ensure data integrity. Additionally, middleware
                                            has been added to validate incoming request parameters. If any parameters
                                            are invalid, the system now returns precise error messages with the correct
                                            status codes, ensuring consistent and predictable behavior. Refer to the
                                            below table for updated APIs.(Bold parameters are the required)
                                            <table className='table table-hover table-bordered mt-3'>
                                                <thead>
                                                    <tr>
                                                        <th>S.No</th>
                                                        <th>API</th>
                                                        <th>Parameters</th>
                                                        <th>Datatype</th>
                                                        <th>Conditions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td rowSpan={6}>1</td>
                                                        <td rowSpan={6}>v1/signals</td>
                                                        <td>module</td>
                                                        <td>string</td>
                                                        <td>safety, health, operational, warranty</td>
                                                    </tr>
                                                    <tr>
                                                        <td>battery_uid</td>
                                                        <td>string</td>
                                                        <td>-</td>
                                                    </tr>
                                                    <tr>
                                                        <td>from_date</td>
                                                        <td>string</td>
                                                        <td>yyyy-mm-dd</td>
                                                    </tr>
                                                    <tr>
                                                        <td>to_date</td>
                                                        <td>string</td>
                                                        <td>yyyy-mm-dd</td>
                                                    </tr>
                                                    <tr>
                                                        <td>page</td>
                                                        <td>int</td>
                                                        <td>&gt;0</td>
                                                    </tr>
                                                    <tr>
                                                        <td>page_size</td>
                                                        <td>int</td>
                                                        <td>&gt;0</td>
                                                    </tr>
                                                    <tr>
                                                        <td rowSpan={5}>2</td>
                                                        <td rowSpan={5}>v1/signals/tree-plot/data</td>
                                                        <td className='fw-bold'>battery_uid</td>
                                                        <td>string</td>
                                                        <td>-</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='fw-bold'>signal_id</td>
                                                        <td>string</td>
                                                        <td>-</td>
                                                    </tr>
                                                    <tr>
                                                        <td>sort</td>
                                                        <td>string</td>
                                                        <td>asc, desc</td>
                                                    </tr>
                                                    <tr>
                                                        <td>from_date</td>
                                                        <td>string</td>
                                                        <td>yyyy-mm-dd</td>
                                                    </tr>
                                                    <tr>
                                                        <td>to_date</td>
                                                        <td>string</td>
                                                        <td>yyyy-mm-dd</td>
                                                    </tr>
                                                </tbody>
                                            </table>
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

export default Version_1_4_0;
