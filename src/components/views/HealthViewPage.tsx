import React from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
// import HealthViewPageGraph from '../common/HealthViewPageGraph';
import bImg from '../../assets/img/battery-icon.png';
import Header from '../../layouts/Header';
import Avatar from '../common/Avatar';
import qrImg from '../../assets/svg/qr-code.svg';
import SpinnerLoader from '../common/SpinnerComponent';
import HealthViewPageGraph from '../common/HealthViewPageGraph';
const HealthViewPage = (props: IHealthViewPageProps) => {
    const {
        healthGraphState,
        setGraphState,
        healthAggregations,
        operatedLimits,
        targetPerformanceMetrics,
        batteryMeta,
        dateRange,
        chartSeries,
        chartOption,
        openAUCPage,
        AUCMetaData,
        generateNewAUC,
        generatingAUC,
        healthAvgAggregations,
        showDefaultKPIs,
        capacityAh,
        soHVsLastMonth,
        cyclesVsLastMonth
    } = props;
    return (
        <React.Fragment>
            <Header />
            <div className='main main-app p-3 p-lg-3 ms-1'>
                <div className='d-md-flex align-items-center justify-content-between'>
                    <div>
                        <ol className='breadcrumb fs-sm mb-0'>
                            <li className='breadcrumb-item active' aria-current='page'>
                                Health View
                            </li>
                        </ol>
                        <h4 className='main-title pt-1 '>{batteryMeta?.asset_name}</h4>
                    </div>
                </div>

                <Row className='g-3'>
                    <Col xl='8' md='12' sm='12'>
                        <Card className='card-one'>
                            <Card.Body className='meta-info p-0 m-2'>
                                <div className='d-flex m-0 p-1 px-2 justify-content-between'>
                                    <div className='d-flex'>
                                        <Avatar img={bImg} />
                                        <div className='ps-2'>
                                            <p className='fs-sm text-secondary mb-0'>Model</p>
                                            <h6 className='fw-semibold text-dark mb-1'>{batteryMeta?.model}</h6>
                                        </div>
                                    </div>
                                    <div className='ps-3'>
                                        <p className=' text-secondary mb-0'>Chemistry</p>
                                        <p className='fw-semibold text-dark fs-sm  mb-0'>{batteryMeta?.chemistry}</p>
                                    </div>
                                    <div className='ps-3'>
                                        <p className=' text-secondary mb-0'>Nominal Energy</p>
                                        <p className='fw-semibold text-dark fs-sm  mb-0'>
                                            {batteryMeta?.nominal_energy_kwh}
                                        </p>
                                    </div>
                                    <div className='ps-3'>
                                        <p className=' text-secondary mb-0'>Commissioned on</p>
                                        <p className='fw-semibold text-dark fs-sm  mb-0'>
                                            {batteryMeta?.comissioned_on}
                                        </p>
                                    </div>
                                    <div className='ps-3'>
                                        <p className=' text-secondary mb-0'>Battery Application</p>
                                        <p className='fw-semibold text-dark fs-sm  mb-0'>{batteryMeta?.battery_type}</p>
                                    </div>
                                    <div className='ps-3'>
                                        <p className=' text-secondary mb-0'>Location</p>
                                        <p className='fw-semibold text-dark fs-sm  mb-0'>{batteryMeta?.location}</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl='4' md='12' sm='12'>
                        <Card className='card-one'>
                            <Card.Body className='meta-info p-0 m-2 d-flex align-items-center justify-content-center'>
                                {generatingAUC ? (
                                    <SpinnerLoader />
                                ) : AUCMetaData ? (
                                    <div className='d-flex m-0 p-1 px-2 justify-content-between '>
                                        <div className='d-flex'>
                                            <img
                                                src={qrImg}
                                                alt=''
                                                style={{
                                                    height: '40px',
                                                    width: '30px',
                                                }}
                                            />
                                            <div className='ps-3'>
                                                <p className='text-secondary mb-1'>Blockchain AUC</p>
                                                <h6
                                                    className='fs-semibold text-primary mouse-hover  mb-0'
                                                    onClick={() => openAUCPage(batteryMeta)}
                                                >
                                                    {AUCMetaData?.certificate_id}
                                                </h6>
                                            </div>
                                        </div>
                                        <div className='ps-3'>
                                            <p className=' text-secondary mb-0'>Generated Date</p>
                                            <p className='fw-semibold text-dark fs-sm  mb-0'>
                                                {AUCMetaData?.generated_on}
                                            </p>
                                        </div>
                                        <div className='ps-3'>
                                            <p className=' text-secondary mb-0'>Current Phase</p>
                                            <p className='fw-semibold text-dark fs-sm  mb-0'>
                                                {AUCMetaData?.current_phase}
                                            </p>
                                        </div>
                                        <div className='ps-3'>
                                            <p className=' text-secondary mb-0'>Valid Till</p>
                                            <p className='fw-semibold text-dark fs-sm  mb-0'>{AUCMetaData?.expiry}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <Button variant='primary' className='border text-center' onClick={generateNewAUC}>
                                        Generate AUC
                                    </Button>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                    <HealthViewPageGraph
                        bmsSOH={healthAggregations?.bms_soh}
                        equivalentCycles={healthAggregations?.equivalent_cycles_count}
                        capacityAh={capacityAh}
                        healthGraphState={healthGraphState}
                        setGraphState={setGraphState}
                        seriesOne={chartSeries}
                        chartOption={chartOption}
                        soHVsLastMonth={soHVsLastMonth}
                        cyclesVsLastMonth={cyclesVsLastMonth}
                    />
                    <Col md='6' xl='3'>
                        <Card className='card-one'>
                            <Card.Header>
                                <Card.Title as='h6'>Operated Limits</Card.Title>
                            </Card.Header>
                            <Card.Body className='p-0'>
                                <ul className='people-group'>
                                    {[
                                        {
                                            bg: 'teal',
                                            icon: 'ri-battery-charge-line',
                                            label: 'SoC Range',
                                            date: 'Oct 21, 2023, 3:30pm',
                                            value:
                                                healthAggregations?.soc_min_per === healthAggregations?.soc_max_per
                                                    ? `${healthAggregations?.soc_min_per}`
                                                    : `${healthAggregations?.soc_min_per}-${healthAggregations?.soc_max_per}`,
                                            status: operatedLimits?.soc_range,
                                            color: operatedLimits?.soc_range == 'Beyond Limits' ? 'warning' : 'success',
                                        },
                                        {
                                            bg: 'info',
                                            icon: 'ri-battery-low-line',
                                            label: 'Cell Voltage Range',
                                            date: 'Oct 19, 2023, 3:30pm',
                                            value:
                                                healthAggregations?.cell_voltage_min_mv ==
                                                    healthAggregations?.cell_voltage_max_mv
                                                    ? `${healthAggregations?.cell_voltage_min_mv}`
                                                    : `${healthAggregations?.cell_voltage_min_mv}-${healthAggregations?.cell_voltage_max_mv}`,
                                            status: operatedLimits?.cell_voltage_range,
                                            color:
                                                operatedLimits?.cell_voltage_range == 'Beyond Limits'
                                                    ? 'warning'
                                                    : 'success',
                                        },
                                        {
                                            bg: 'primary',
                                            icon: 'ri-battery-fill',
                                            label: 'Temperature Range',
                                            date: 'Oct 18, 2023, 6:18pm',
                                            value:
                                                healthAggregations?.temperature_min_celsius ==
                                                    healthAggregations?.temperature_max_celsius
                                                    ? `${healthAggregations?.temperature_min_celsius}`
                                                    : `${healthAggregations?.temperature_min_celsius}-${healthAggregations?.temperature_max_celsius}`,
                                            status: operatedLimits?.temperature_range,
                                            color:
                                                operatedLimits?.temperature_range == 'Beyond Limits'
                                                    ? 'warning'
                                                    : 'success',
                                        },
                                        {
                                            bg: 'pink',
                                            icon: 'ri-battery-saver-fill',
                                            label: 'Pack Voltage Range',
                                            date: 'Oct 18, 2023, 12:40pm',
                                            value:
                                                healthAggregations?.pack_voltage_min_volts ==
                                                    healthAggregations?.pack_voltage_max_volts
                                                    ? `${healthAggregations?.pack_voltage_min_volts}`
                                                    : `${healthAggregations?.pack_voltage_min_volts}-${healthAggregations?.pack_voltage_max_volts}`,
                                            status: operatedLimits?.pack_voltage_range,
                                            color:
                                                operatedLimits?.pack_voltage_range == 'Beyond Limits'
                                                    ? 'warning'
                                                    : 'success',
                                        },
                                        {
                                            bg: 'secondary',
                                            icon: 'ri-battery-2-charge-fill',
                                            label: 'Equivalent Cycles',
                                            date: 'Oct 15, 2023, 08:09am',
                                            value: `${healthAggregations?.equivalent_cycles_count}`,
                                            color: 'success',
                                        },
                                        {
                                            bg: 'secondary',
                                            icon: 'ri-battery-2-charge-fill',
                                            label: 'Energy Throughput',
                                            date: 'Oct 15, 2023, 08:09am',
                                            value: `${healthAggregations?.cumulative_energy_discharged_kwh}`,
                                            color: 'success',
                                        },
                                    ].map((item, index) => (
                                        <li className='people-item' key={index}>
                                            <div className='avatar'>
                                                <span className={'avatar-initial fs-20 bg-' + item.bg}>
                                                    <i className={item.icon}></i>
                                                </span>
                                            </div>
                                            <div className='people-body'>
                                                <h6>{item.label}</h6>
                                            </div>
                                            <div className='text-end'>
                                                <div className='fs-sm'>{item.value}</div>
                                                <span className={'d-block fs-xs text-' + item.color}>
                                                    {item.status && item.status}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs='6' sm='6' md='6' xl='1' className='pe-1'>
                        <Card className='card-one'>
                            <Card.Body className='p-2 text-center'>
                                <Row className='g-0 g-xl-0'>
                                    <Col>
                                        <label className='fs-sm text-secondary mb-1'>Date Selected</label>
                                    </Col>
                                </Row>
                                <Row className='g-0 g-xl-0'>
                                    <Col>
                                        <p className='fw-semibold text-dark mb-2'>{dateRange[0]}</p>
                                        <p className='fw-semibold text-dark mb-2'>to</p>
                                        <p className='fw-semibold text-dark mb-2'>{dateRange[1]}</p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    {showDefaultKPIs ? (
                        <>
                            <Col sm='6' md='6' xl='4' className='px-1'>
                                <Card className='card-one text-center px-1'>
                                    <Card.Body className='p-2'>
                                        <Row className='g-0 g-xl-0'>
                                            <Col>
                                                <label className='fs-sm text-secondary mb-1'>
                                                    Battery State of Health
                                                </label>
                                            </Col>
                                            <Col>
                                                <label className='fs-sm text-secondary mb-1'>Variation of</label>
                                            </Col>
                                            <Col>
                                                <label className='fs-sm text-secondary mb-1'>Equivalent Cycles</label>
                                            </Col>
                                            <Col>
                                                <label className='fs-sm text-secondary mb-1'>Avg Consumption</label>
                                            </Col>
                                            <Col>
                                                <label className='fs-sm text-secondary mb-1'>
                                                    {batteryMeta?.eid == 'bms' ? 'Run Hours' : 'Milage'}
                                                </label>
                                            </Col>
                                        </Row>
                                        <Row className='g-0 g-xl-0'>
                                            <Col>
                                                <p className='fw-semibold text-dark mb-0'>
                                                    {healthAggregations?.bms_soh}
                                                </p>
                                            </Col>
                                            <Col>
                                                <p className='fw-semibold text-dark mb-0'>
                                                    {healthAggregations?.variation_of}
                                                </p>
                                            </Col>
                                            <Col>
                                                <p className='fw-semibold text-dark mb-0'>
                                                    {healthAggregations?.equivalent_cycles_count}
                                                </p>
                                            </Col>
                                            <Col>
                                                <p className='fw-semibold text-dark mb-0'>
                                                    {healthAggregations?.avg_consumption}
                                                </p>
                                            </Col>
                                            <Col>
                                                <p className='fw-semibold text-dark mb-0'>
                                                    {healthAggregations?.milage}
                                                </p>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm='6' md='6' xl='4' className='px-1'>
                                <Card className='card-one text-center px-1'>
                                    <Card.Body className='p-2'>
                                        <p className='fw-semibold text-dark mb-3'>Current Range on full charge</p>
                                        <Row className='g-0 g-xl-0'>
                                            <Col>
                                                <label className='fs-sm text-secondary mb-1'>Range</label>
                                            </Col>
                                            <Col>
                                                <label className='fs-sm text-secondary mb-1'>Remaining Energy</label>
                                            </Col>
                                            <Col>
                                                <label className='fs-sm text-secondary mb-1'>Max Dod</label>
                                            </Col>
                                        </Row>
                                        <Row className='g-0 g-xl-0'>
                                            <Col>
                                                <p className='fw-semibold text-dark mb-0'>
                                                    {healthAggregations?.range}{' '}
                                                    {batteryMeta?.battery_type == 'Stationary' ? 'hrs' : 'km'}
                                                </p>
                                            </Col>
                                            <Col>
                                                <p className='fw-semibold text-dark mb-0'>
                                                    {healthAggregations?.remaining_energy}
                                                </p>
                                            </Col>
                                            <Col>
                                                <p className='fw-semibold text-dark mb-0'>
                                                    {healthAggregations?.bms_soh}
                                                </p>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm='6' md='12' xl='3' className='px-1'>
                                <Card className='card-one text-center px-1'>
                                    <Card.Body className='p-2'>
                                        <Row className='g-0 g-xl-0'>
                                            <Col>
                                                <label className='fs-sm text-secondary mb-1'>Season</label>
                                            </Col>
                                            <Col>
                                                <label className='fs-sm text-secondary mb-1'>Operated Temp Range</label>
                                            </Col>
                                            <Col>
                                                <label className='fs-sm text-secondary mb-1'>Cells Status</label>
                                            </Col>
                                        </Row>
                                        <Row className='g-0 g-xl-0'>
                                            <Col>
                                                <p className='fw-semibold text-dark mb-4'>
                                                    {healthAggregations?.season}
                                                </p>
                                            </Col>
                                            <Col>
                                                <p className='fw-semibold text-dark mb-4'>
                                                    {healthAggregations?.temperature_range}
                                                </p>
                                            </Col>
                                            <Col>
                                                <p className='fw-semibold text-dark mb-4'>
                                                    {healthAggregations?.cell_status}
                                                </p>
                                            </Col>
                                        </Row>
                                        <Row className='g-0 g-xl-0'>
                                            <Col>
                                                <label className='fs-sm text-secondary mb-1'>Criticality</label>
                                            </Col>
                                            <Col>
                                                <label className='fs-sm text-secondary mb-1'>Efficiency</label>
                                            </Col>
                                            <Col>
                                                <label className='fs-sm text-secondary mb-1'>Safety Condition</label>
                                            </Col>
                                        </Row>
                                        <Row className='g-0 g-xl-0'>
                                            <Col>
                                                <p className='fw-semibold text-dark mb-0'>
                                                    {healthAggregations?.criticality}
                                                </p>
                                            </Col>
                                            <Col>
                                                <p className='fw-semibold text-dark mb-0'>
                                                    {healthAggregations?.efficiency}
                                                </p>
                                            </Col>
                                            <Col>
                                                <p className='fw-semibold text-dark mb-0'>
                                                    {healthAggregations?.safety_condition}
                                                </p>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </>
                    ) : (
                        <>
                            <Col sm='6' md='4' xl='4' className='px-1'>
                                <Card className='card-one text-center px-1'>
                                    <Card.Body className='p-2'>
                                        <Row className='g-0 g-xl-0'>
                                            <p className='fw-semibold text-dark mb-3'>Avg. SoH Drop</p>
                                            <Col>
                                                <label className='fs-sm text-secondary mb-1'>Selected Period</label>
                                            </Col>
                                            <Col>
                                                <label className='fs-sm text-secondary mb-1'>Last 10kwh</label>
                                            </Col>
                                            <Col>
                                                <label className='fs-sm text-secondary mb-1'>Last 100kwh</label>
                                            </Col>
                                        </Row>
                                        <Row className='g-0 g-xl-0'>
                                            <Col>
                                                <p className='fw-semibold text-dark mb-0'>
                                                    {healthAvgAggregations?.SoH_drop}
                                                </p>
                                            </Col>
                                            <Col>
                                                <p className='fw-semibold text-dark mb-0'>
                                                    {healthAvgAggregations?.SoH_drop_last_10Kwh}
                                                </p>
                                            </Col>
                                            <Col>
                                                <p className='fw-semibold text-dark mb-0'>
                                                    {healthAvgAggregations?.SoH_drop_last_100Kwh}
                                                </p>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm='6' md='4' xl='4' className='px-1'>
                                <Card className='card-one text-center px-1'>
                                    <Card.Body className='p-2'>
                                        <p className='fw-semibold text-dark mb-3'>Battery Operated Stats</p>
                                        <Row className='g-0 g-xl-0'>
                                            <Col>
                                                <label className='fs-sm text-secondary mb-1'>Charging</label>
                                            </Col>
                                            <Col>
                                                <label className='fs-sm text-secondary mb-1'>Discharging</label>
                                            </Col>
                                            <Col>
                                                <label className='fs-sm text-secondary mb-1'>Resting</label>
                                            </Col>
                                        </Row>
                                        <Row className='g-0 g-xl-0'>
                                            <Col>
                                                <p className='fw-semibold text-dark mb-0'>
                                                    {healthAvgAggregations?.avg_charging_hrs}
                                                </p>
                                            </Col>
                                            <Col>
                                                <p className='fw-semibold text-dark mb-0'>
                                                    {healthAvgAggregations?.avg_discharging_hrs}
                                                </p>
                                            </Col>
                                            <Col>
                                                <p className='fw-semibold text-dark mb-0'>
                                                    {healthAvgAggregations?.avg_standby_hrs}
                                                </p>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm='6' md='4' xl='3' className='px-1'>
                                <Card className='card-one text-center px-1'>
                                    <Card.Body className='p-2'>
                                        <p className='fw-semibold text-dark mb-3'>
                                            Charging share (Considering 900 Charging sessions)
                                        </p>
                                        <Row className='g-0 g-xl-0'>
                                            <Col>
                                                <label className='fs-sm text-secondary mb-1'>
                                                    SoC at start of Charging
                                                </label>
                                            </Col>
                                            <Col>
                                                <label className='fs-sm text-secondary mb-1'>
                                                    SoC at end of Charging
                                                </label>
                                            </Col>
                                        </Row>
                                        <Row className='g-0 g-xl-0'>
                                            <Col>
                                                <p className='fw-semibold text-dark mb-0'>
                                                    {healthAvgAggregations?.SoC_start_charging}
                                                </p>
                                            </Col>
                                            <Col>
                                                <p className='fw-semibold text-dark mb-0'>
                                                    {healthAvgAggregations?.SoC_end_charging}
                                                </p>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </>
                    )}
                    <Col xl='12' md='12' sm='12'>
                        <Card className='card-one'>
                            <Card.Header>
                                <Card.Title as='h6'>Battery Aging Inspection</Card.Title>
                            </Card.Header>
                            <Card.Body className='p-3 p-xl-3 battery-aging-table'>
                                <Table className='m-0 p-0'>
                                    <thead>
                                        <tr>
                                            <th rowSpan={2} scope='col'></th>
                                            <th
                                                rowSpan={2}
                                                style={{
                                                    verticalAlign: 'middle',
                                                }}
                                                scope='col'
                                                className='fw-semibold text-dark mb-0 mt-0'
                                            >
                                                Min Temp
                                            </th>
                                            <th
                                                rowSpan={2}
                                                style={{
                                                    verticalAlign: 'middle',
                                                }}
                                                scope='col'
                                                className='fw-semibold text-dark mb-0 mt-0'
                                            >
                                                Max Temp
                                            </th>
                                            <th
                                                rowSpan={2}
                                                style={{
                                                    verticalAlign: 'middle',
                                                }}
                                                scope='col'
                                                className='fw-semibold text-dark mb-0 mt-0'
                                            >
                                                Avg Temp
                                            </th>
                                            <th
                                                rowSpan={2}
                                                style={{
                                                    verticalAlign: 'middle',
                                                }}
                                                scope='col'
                                                className='fw-semibold text-dark mb-0 mt-0'
                                            >
                                                Min SoC
                                            </th>
                                            <th
                                                rowSpan={2}
                                                style={{
                                                    verticalAlign: 'middle',
                                                }}
                                                scope='col'
                                                className='fw-semibold text-dark mb-0 mt-0'
                                            >
                                                Max SoC
                                            </th>
                                            <th
                                                colSpan={3}
                                                style={{ textAlign: 'center' }}
                                                scope='col'
                                                className='fw-semibold text-dark mb-0 mt-0'
                                            >
                                                Charging
                                            </th>
                                            <th
                                                colSpan={3}
                                                style={{ textAlign: 'center' }}
                                                scope='col'
                                                className='fw-semibold text-dark mb-0 mt-0'
                                            >
                                                Discharging
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope='col' className='fw-semibold text-dark mb-0 mt-0'>
                                                Min C-rate
                                            </th>
                                            <th scope='col' className='fw-semibold text-dark mb-0'>
                                                Avg C-Rate
                                            </th>
                                            <th scope='col' className='fw-semibold text-dark mb-0'>
                                                Max C-Rate
                                            </th>
                                            <th scope='col' className='fw-semibold text-dark mb-0 mt-0'>
                                                Min C-rate
                                            </th>
                                            <th scope='col' className='fw-semibold text-dark mb-0'>
                                                Avg C-Rate
                                            </th>
                                            <th scope='col' className='fw-semibold text-dark mb-0'>
                                                Max C-Rate
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope='row' className='fw-semibold text-dark mb-0'>
                                                Target Performance
                                            </th>
                                            <td className='fs-sm text-secondary mb-0'>
                                                {targetPerformanceMetrics?.min_temp}
                                            </td>
                                            <td className='fs-sm text-secondary mb-0'>
                                                {targetPerformanceMetrics?.max_temp}
                                            </td>
                                            <td className='fs-sm text-secondary mb-0'>
                                                {targetPerformanceMetrics?.avg_temp}
                                            </td>
                                            <td className='fs-sm text-secondary mb-0'>
                                                {targetPerformanceMetrics?.min_soc}
                                            </td>
                                            <td className='fs-sm text-secondary mb-0'>
                                                {targetPerformanceMetrics?.max_soc}
                                            </td>
                                            <td className='fs-sm text-secondary mb-0'>
                                                {targetPerformanceMetrics?.charging_min_crate}
                                            </td>
                                            <td className='fs-sm text-secondary mb-0'>
                                                {targetPerformanceMetrics?.charging_avg_crate}
                                            </td>
                                            <td className='fs-sm text-secondary mb-0'>
                                                {targetPerformanceMetrics?.charging_max_crate}
                                            </td>
                                            <td className='fs-sm text-secondary mb-0'>
                                                {targetPerformanceMetrics?.discharging_min_crate}
                                            </td>
                                            <td className='fs-sm text-secondary mb-0'>
                                                {targetPerformanceMetrics?.discharging_avg_crate}
                                            </td>
                                            <td className='fs-sm text-secondary mb-0'>
                                                {targetPerformanceMetrics?.discharging_max_crate}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className='fw-semibold text-dark mb-0 b-none' scope='row'>
                                                Battery Performance
                                            </th>
                                            <td className='fs-sm text-secondary mb-0 b-none'>
                                                {showDefaultKPIs
                                                    ? healthAggregations?.temperature_min_celsius
                                                    : healthAvgAggregations?.avg_min_temp}
                                            </td>
                                            <td className='fs-sm text-secondary mb-0 b-none'>
                                                {showDefaultKPIs
                                                    ? healthAggregations?.temperature_max_celsius
                                                    : healthAvgAggregations?.avg_max_temp}
                                            </td>
                                            <td className='fs-sm text-secondary mb-0 b-none'>
                                                {showDefaultKPIs
                                                    ? healthAggregations?.temperature_avg_celsius
                                                    : healthAvgAggregations?.avg_avg_temp}
                                            </td>
                                            <td className='fs-sm text-secondary mb-0 b-none'>
                                                {showDefaultKPIs
                                                    ? healthAggregations?.soc_min_per
                                                    : healthAvgAggregations?.avg_min_soc}
                                            </td>
                                            <td className='fs-sm text-secondary mb-0 b-none'>
                                                {showDefaultKPIs
                                                    ? healthAggregations?.soc_max_per
                                                    : healthAvgAggregations?.avg_max_soc}
                                            </td>
                                            <td className='fs-sm text-secondary mb-0 b-none'>
                                                {showDefaultKPIs
                                                    ? healthAggregations?.charging_min_crate
                                                    : healthAvgAggregations?.avg_min_C_rate_charging}
                                            </td>
                                            <td className='fs-sm text-secondary mb-0 b-none'>
                                                {showDefaultKPIs
                                                    ? healthAggregations?.charging_avg_crate
                                                    : healthAvgAggregations?.avg_avg_C_rate_charging}
                                            </td>
                                            <td className='fs-sm text-secondary mb-0 b-none'>
                                                {showDefaultKPIs
                                                    ? healthAggregations?.charging_max_crate
                                                    : healthAvgAggregations?.avg_max_C_rate_charging}
                                            </td>
                                            <td className='fs-sm text-secondary mb-0 b-none'>
                                                {showDefaultKPIs
                                                    ? healthAggregations?.discharging_min_crate
                                                    : healthAvgAggregations?.avg_min_C_rate_discharging}
                                            </td>
                                            <td className='fs-sm text-secondary mb-0 b-none'>
                                                {showDefaultKPIs
                                                    ? healthAggregations?.discharging_avg_crate
                                                    : healthAvgAggregations?.avg_avg_C_rate_discharging}
                                            </td>
                                            <td className='fs-sm text-secondary mb-0 b-none'>
                                                {showDefaultKPIs
                                                    ? healthAggregations?.discharging_max_crate
                                                    : healthAvgAggregations?.avg_max_C_rate_discharging}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
};

export default HealthViewPage;
