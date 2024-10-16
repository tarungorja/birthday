import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, Col, Dropdown } from 'react-bootstrap';
export const OperationalViewPageGraph = (props: IOperationalViewGraphProps) => {
    const {
        socRangeGraphSeries,
        valuedSOCGraphSeries,
        operationalViewGraphState,
        setGraphState,
        options,
    } = props;
    const seriesOne = [
        {
            name: 'Duration',
            data: operationalViewGraphState.category == 'Operated SOC Range' ? socRangeGraphSeries : valuedSOCGraphSeries,
        },
    ];
    return (
        <Col xl="9" sm="12" md="12">
            <Card className="card-one">
                <Card.Body className="overflow-hidden px-1 pt-0">
                    <div className="graph-info p-2 nav-healthview-one">
                        <Dropdown>
                            <Dropdown.Toggle className='btn btn-light ' variant='btn-light' id='dropdown-basic'>
                                {operationalViewGraphState?.category}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setGraphState({ category: 'Operated SOC Range' })}>
                                    Operated SOC Range
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => setGraphState({ category: 'Valued to 0 to 100% SOC' })}>
                                    Valued to 0 to 100% SOC
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {/* <Dropdown>
                            <Dropdown.Toggle className='btn btn-light ' variant='btn-light' id='dropdown-basic'>
                                Models
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setGraphState({ model: 'Model-1' })}>
                                    Model-1
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => setGraphState({ model: 'Model-2' })}>
                                    Model-2
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> */}
                    </div>

                    <ReactApexChart
                        series={seriesOne}
                        options={options}
                        type="area"
                        height={300}
                        className="apex-chart-one"
                    />
                </Card.Body>
            </Card >
        </Col >
    );
};