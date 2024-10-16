import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, Col, Dropdown } from 'react-bootstrap';

const HealthViewPageGraph = (props: IHealthViewPageGraphProps) => {
    const { healthGraphState, setGraphState, bmsSOH, seriesOne, chartOption, capacityAh, soHVsLastMonth, cyclesVsLastMonth, equivalentCycles } = props;
    return (
        <Col xl='9' sm='12' md='12'>
            <Card className='card-one'>
                <Card.Body className='overflow-hidden px-1 pt-0'>
                    <div className='graph-info p-2 nav-healthview-one'>
                        <Dropdown>
                            <Dropdown.Toggle className='btn btn-light ' variant='btn-light' id='dropdown-basic'>
                                {healthGraphState?.category}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={() => setGraphState({ category: 'Health Status', subCategory: 'SoH-BMS' })}
                                >
                                    Health Status
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() =>
                                        setGraphState({ category: 'Battery Degradation', subCategory: 'Capacity' })
                                    }
                                >
                                    Battery Degradation
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle className='btn btn-light ' variant='btn-light' id='dropdown-basic'>
                                {healthGraphState?.subCategory}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={() =>
                                        setGraphState({
                                            subCategory:
                                                healthGraphState?.category == 'Battery Degradation'
                                                    ? 'Capacity'
                                                    : 'SoH-BMS',
                                        })
                                    }
                                >
                                    {healthGraphState?.category == 'Battery Degradation' ? 'Capacity' : 'SoH-BMS'}
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() =>
                                        setGraphState({
                                            subCategory:
                                                healthGraphState?.category == 'Battery Degradation'
                                                    ? 'Cycles'
                                                    : 'SoH-Cloud',
                                        })
                                    }
                                >
                                    {healthGraphState?.category == 'Battery Degradation' ? 'Cycles' : 'SoH-Cloud'}
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle className='btn btn-light' variant='btn-light' id='dropdown-basic'>
                                {healthGraphState?.model}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setGraphState({ model: 'Classical' })}>
                                    Classical
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => setGraphState({ model: ' DL Model' })}>
                                    DL Model
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className='graph-subvalue mb-3 mb-md-2 ps-12'>
                        <h4 className='soh-value mb-0 pe-1'>
                            {healthGraphState.subCategory == 'Cycles'
                                ? equivalentCycles
                                : healthGraphState.subCategory == 'Capacity'
                                    ? capacityAh.capacityLatest
                                    : bmsSOH
                                        ? bmsSOH
                                        : ''}
                        </h4>
                        <h5>
                            {healthGraphState.subCategory == 'Cycles'
                                ? ' cycles'
                                : healthGraphState.subCategory == 'Capacity'
                                    ? ''
                                    : ''}
                        </h5>
                    </div>
                    <div className='graph-subvalue mb-3 mb-md-2 ps-12'>
                        {healthGraphState.subCategory == 'Cycles' ? (
                            <i className='ri-arrow-up-line text-success'></i>
                        ) : healthGraphState.subCategory == 'Capacity' ? (
                            capacityAh.capacityVsLastMonth > 0 ? <i className='ri-arrow-up-line text-success' ></i> : <i className='ri-arrow-down-line' style={{ color: 'red' }}></i>
                        ) : soHVsLastMonth > 0 ? <i className='ri-arrow-up-line text-success' ></i> : <i className='ri-arrow-down-line' style={{ color: 'red' }}></i>}
                        <span className='text-primary'>
                            {healthGraphState.subCategory == 'Cycles'
                                ? cyclesVsLastMonth
                                : healthGraphState.subCategory == 'Capacity'
                                    ? capacityAh.capacityVsLastMonth
                                    : soHVsLastMonth}
                        </span>
                        <small>vs last month</small>
                    </div>
                    <ReactApexChart
                        key={JSON.stringify(chartOption)}
                        options={chartOption}
                        series={seriesOne}
                        type='area'
                        height={300}
                        className='apex-chart-one'
                    />
                </Card.Body>
            </Card>
        </Col>
    );
};

export default HealthViewPageGraph;
