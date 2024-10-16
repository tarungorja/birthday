import React from 'react';
import { Card, Col } from 'react-bootstrap';
import Plot from 'react-plotly.js';

const SafetyViewPageGraph = (props: ISafetyViewPageGraphProps) => {
    const {
        safetyViewGraphState,
        setGraphState,
        safetyViewGraphData,
        safetyViewGraphLayout,
        handleRelayout,
        handleNavigation
    } = props;

    return (
        <Col xl='9' sm='12' md='12'>
            <Card className='card-one'>
                <Card.Body className='overflow-hidden px-1 pt-0 mt-3'>
                    <div className='d-flex-row p-2 nav-healthview-one'>
                        <h6 className='d-inline-flex align-items-center me-3'>View : </h6>
                        <button type="button" className={`btn me-3 ${safetyViewGraphState.category === 'Overall Incidents' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setGraphState({ category: 'Overall Incidents', model: 'Classical Model' })}
                        >Overall Incidents
                        </button>
                        <button type="button" className={`btn me-3 ${safetyViewGraphState.category === 'Temperature' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setGraphState({ category: 'Temperature', model: 'Classical Model' })}
                        >
                            Temperature
                        </button>
                    </div>
                    <div>
                        <Plot
                            key={JSON.stringify(safetyViewGraphData)}
                            data={[
                                safetyViewGraphData
                            ]}
                            layout={safetyViewGraphLayout}
                            style={{ width: '100%' }}
                            config={{
                                responsive: true,
                                showTips: false,
                                displaylogo: false,
                                modeBarButtonsToRemove: ['autoScale2d', 'lasso2d', 'select2d'],
                            }}
                            onRelayout={handleRelayout}
                            onClick={(event) => { safetyViewGraphState.category == 'Overall Incidents' && handleNavigation(event); }}
                        />
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default SafetyViewPageGraph;