import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, Col } from 'react-bootstrap';

const WarrantyViewPageGraph = (props: IWarrantyViewPageGraphProps) => {
    const { warrantyGraphState, setGraphState, chartSeries, warrantyChartOptions } = props;
    return (
        <Col xl='9' sm='12' md='12'>
            <Card className='card-one'>
                <Card.Body className='overflow-hidden px-1 pt-0 mt-3'>
                    <div className='d-flex-row p-2 nav-healthview-one'>
                        <h6 className='d-inline-flex align-items-center me-3'>View : </h6>
                        <button type="button" className={`btn me-3 ${warrantyGraphState.category === 'SOH' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setGraphState({ category: 'SOH', model: 'Classical Model' })}
                        >SOH
                        </button>
                        <button type="button" className={`btn me-3 ${warrantyGraphState.category === 'Equivalent Cycles' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setGraphState({ category: 'Equivalent Cycles', model: 'Classical Model' })}
                        >
                            Equivalent Cycles
                        </button>
                        <br></br>
                    </div>
                    <br></br>
                    <ReactApexChart
                        key={JSON.stringify(warrantyChartOptions)}
                        options={warrantyChartOptions}
                        series={chartSeries}
                        type='area'
                        height={300}
                        className='apex-chart-one'
                    />
                </Card.Body>
            </Card>
        </Col>
    );
};

export default WarrantyViewPageGraph;
