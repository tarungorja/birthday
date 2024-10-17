import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Table, Nav } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import Header from '../../layouts/Header';
import ReactFlow1 from './ReactFlow';
const HealthViewPage = () => {
    const [data, setData] = useState([]);
    const { batteryId } = useParams();

    const dp3 = [
        [0, 40],
        [1, 39],
        [2, 35],
        [3, 33],
        [4, 28],
        [5, 28],
        [6, 24],
        [7, 20],
        [8, 17],
        [9, 16],
        [10, 19],
        [11, 16],
        [12, 13],
        [13, 18],
        [14, 17],
        [15, 18],
        [16, 18],
        [17, 19],
        [18, 18],
        [19, 17],
        [20, 20],
        [21, 18],
        [22, 17],
        [23, 17],
        [24, 15],
        [25, 15],
        [26, 14],
        [27, 15],
        [28, 18],
        [29, 19],
        [30, 23],
        [31, 27],
        [32, 30],
        [33, 28],
        [34, 29],
        [35, 29],
        [36, 27],
        [37, 24],
        [38, 22],
        [39, 26],
        [40, 28],
        [41, 27],
        [42, 30],
        [43, 26],
        [44, 22],
        [45, 19],
        [46, 16],
        [47, 17],
        [48, 20],
        [49, 16],
        [50, 12],
        [51, 10],
        [52, 7],
        [53, 11],
        [54, 15],
        [55, 20],
        [56, 22],
        [57, 19],
        [58, 18],
        [59, 20],
        [60, 17],
        [61, 19],
        [62, 18],
        [63, 14],
        [64, 9],
        [65, 10],
        [66, 6],
        [67, 10],
        [68, 12],
        [69, 13],
        [70, 18],
        [71, 22],
        [72, 22],
        [73, 26],
        [74, 22],
        [75, 18],
        [76, 19],
        [77, 19],
        [78, 18],
        [79, 23],
        [80, 20],
        [81, 25],
        [82, 28],
        [83, 29],
        [84, 27],
        [85, 25],
        [86, 25],
        [87, 24],
        [88, 20],
        [89, 18],
        [90, 18],
        [91, 18],
        [92, 22],
        [93, 21],
        [94, 26],
        [95, 29],
        [96, 26],
        [97, 28],
        [98, 30],
        [99, 28],
        [100, 30],
        [101, 27],
        [102, 30],
        [103, 26],
    ];

    const id = 1;
    const apiURL = 'https://jsonplaceholder.typicode.com/posts';
    useEffect(() => {
        fetch(`${apiURL}/${id}`)
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);
    const [batteryToggle, setBatteryToggle] = useState(0);
    const [viewToggle, setViewToggle] = useState(0);
    const [model, setModel] = useState(0);

    const seriesOne = [
        {
            name: 'series1',
            data: dp3,
        },
        {
            name: 'series2',
            data: dp3,
        },
    ];
    const optionOne = {
        chart: {
            parentHeightOffset: 0,
            type: 'area',
            toolbar: { show: true, offsetY: 40, offsetX: -10 },
            stacked: true,
        },
        colors: ['#4f6fd9', '#506fd9'],
        grid: {
            borderColor: 'rgba(72,94,144, 0.08)',
            padding: { top: -20 },
            yaxis: {
                lines: { show: false },
            },
        },
        stroke: {
            curve: 'straight',
            width: [2, 0],
        },
        xaxis: {
            type: 'numeric',
            tickAmount: 13,
            axisBorder: { show: false },
            labels: {
                style: {
                    colors: '#6e7985',
                    fontSize: '11px',
                },
            },
        },
        yaxis: {
            min: 0,
            max: 100,
            show: false,
        },
        fill: {
            type: 'gradient',
            gradient: {
                opacityFrom: 0.5,
                opacityTo: 0,
            },
        },
        dataLabels: { enabled: false },
        legend: { show: false },
        tooltip: { enabled: false },
    };

    return (
        <React.Fragment>
            <Header />

            <div className="main main-app p-3 p-lg-3 ">
                <div className="d-md-flex align-items-center justify-content-between mb-2">
                    <div>
                        <ol className="breadcrumb fs-sm mb-1">
                            <li className="breadcrumb-item">
                                <Link to="/tracker/health">Health-Feed</Link>
                            </li>
                            <li
                                className="breadcrumb-item active"
                                aria-current="page"
                            >
                                Health View Page
                            </li>
                        </ol>
                        <h2 className="main-title mb-0 ">
                            Health View Page-{batteryId}
                        </h2>
                    </div>
                </div>

                <Row className="g-3">
                    <Col xl="12" md="12" sm="12">
                        <Card className="card-one">
                            <div
                                className="d-flex m-2 p-1 px-2 justify-content-between "
                                style={{ backgroundColor: '#F8F9FC' }}
                            >
                                <div className="d-flex">
                                    <i className="ri-wallet-2-line fs-32 lh-1 me-3"></i>
                                    <div>
                                        <h6 className="fw-semibold text-dark mb-1">
                                            JBMS8V3OAH
                                        </h6>
                                        <p className="fs-sm text-secondary mb-0">
                                            Model
                                        </p>
                                    </div>
                                </div>
                                <div className="ps-5">
                                    <p className=" text-secondary mb-0">
                                        Chemistry
                                    </p>
                                    <p className="fw-semibold text-dark fs-sm  mb-0">
                                        LFP
                                    </p>
                                </div>
                                <div className="ps-5">
                                    <p className=" text-secondary mb-0">
                                        Nominal Energy
                                    </p>
                                    <p className="fw-semibold text-dark fs-sm  mb-0">
                                        4.8kWh
                                    </p>
                                </div>
                                <div className="ps-5">
                                    <p className=" text-secondary mb-0">
                                        Commissioned on
                                    </p>
                                    <p className="fw-semibold text-dark fs-sm  mb-0">
                                        12/12/2020
                                    </p>
                                </div>
                                <div className="ps-5">
                                    <p className=" text-secondary mb-0">
                                        Battery Application
                                    </p>
                                    <p className="fw-semibold text-dark fs-sm  mb-0">
                                        Stationary
                                    </p>
                                </div>
                                <div className="ps-5">
                                    <p className=" text-secondary mb-0">
                                        Used in
                                    </p>
                                    <p className="fw-semibold text-dark fs-sm  mb-0">
                                        Telecom Site
                                    </p>
                                </div>
                                <div className="ps-5">
                                    <p className=" text-secondary mb-0">
                                        Location
                                    </p>
                                    <p className="fw-semibold text-dark fs-sm  mb-0">
                                        Bangalore
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </Col>

                    <Col xl="8" sm="12" md="12">
                        <Card className="card-one">
                            <Card.Body className="overflow-hidden px-2 pt-0">
                                <div className="graph-info p-3 p-xl-3 pt-4 pt-xl-4">
                                    <Nav
                                        as="nav"
                                        className="nav-finance-one p-2 p-xl-2 "
                                    >
                                        <Link
                                            href=""
                                            className={
                                                !batteryToggle && 'active'
                                            }
                                            onClick={() => setBatteryToggle(0)}
                                        >
                                            Health Status
                                        </Link>
                                        <Link
                                            href=""
                                            className={
                                                batteryToggle && 'active'
                                            }
                                            onClick={() => setBatteryToggle(1)}
                                        >
                                            Battery Degradation
                                        </Link>
                                        <p className="px-2">|</p>

                                        <Link
                                            href=""
                                            className={!viewToggle && 'active'}
                                            onClick={() => setViewToggle(0)}
                                        >
                                            {batteryToggle
                                                ? 'Capacity'
                                                : 'SoH-BMS'}
                                        </Link>
                                        <Link
                                            href=""
                                            className={viewToggle && 'active'}
                                            onClick={() => setViewToggle(1)}
                                        >
                                            {batteryToggle
                                                ? 'Cycles'
                                                : 'SoH-Cloud'}
                                        </Link>
                                        <p className="px-2">|</p>

                                        <Link
                                            href=""
                                            className={!model && 'active'}
                                            onClick={() => setModel(0)}
                                        >
                                            {batteryToggle
                                                ? 'Model-1'
                                                : 'Classical'}
                                        </Link>
                                        <Link
                                            href=""
                                            className={model && 'active'}
                                            onClick={() => setModel(1)}
                                        >
                                            {batteryToggle
                                                ? 'Model-2'
                                                : 'DL Model'}
                                        </Link>
                                    </Nav>
                                    <h4 className="finance-subvalue mb-3 mb-md-2">
                                        <h1 className="finance-value mb-0 pe-1">
                                            98.8%
                                        </h1>
                                        <small>State of Health</small>
                                    </h4>

                                    <h4 className="finance-subvalue mb-3 mb-md-2">
                                        <i className="ri-arrow-up-line text-primary"></i>
                                        <span className="text-primary">
                                            38.63%
                                        </span>
                                        <small>vs last year</small>
                                    </h4>
                                    <p className="w-50 fs-sm mb-2 mb-xl-4 d-none d-sm-block">
                                        {data.title}..{batteryToggle},
                                        {viewToggle},{model}
                                    </p>
                                    <Row className="row-cols-auto g-3 g-xl-4 pt-2">
                                        {[
                                            {
                                                amount: '30,342.15',
                                                quarter: 'First',
                                                percent: '2.3',
                                                status: 'success',
                                            },
                                            {
                                                amount: '48,036.90',
                                                quarter: 'Second',
                                                percent: '6.8',
                                                status: 'success',
                                            },
                                            {
                                                amount: '68,156.00',
                                                quarter: 'Third',
                                                percent: '10.5',
                                                status: 'success',
                                            },
                                            {
                                                amount: '64,896.65',
                                                quarter: 'Fourth',
                                                percent: '0.8',
                                                status: 'danger',
                                            },
                                        ].map((item, index) => (
                                            <Col key={index}>
                                                <h6 className="card-value fs-15 mb-1">
                                                    ${item.amount} USD
                                                </h6>
                                                <span className="fs-sm fw-medium text-secondary d-block mb-1">
                                                    {item.quarter} Quarter
                                                </span>
                                                <span
                                                    className={
                                                        'fs-xs d-flex align-items-center ff-numerals text-' +
                                                        item.status
                                                    }
                                                >
                                                    {item.percent}%{' '}
                                                    <i
                                                        className={
                                                            (item.status ===
                                                            'success'
                                                                ? 'ri-arrow-up-line'
                                                                : 'ri-arrow-down-line') +
                                                            ' fs-15 lh-3'
                                                        }
                                                    ></i>
                                                </span>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>

                                <ReactApexChart
                                    series={seriesOne}
                                    options={optionOne}
                                    type="area"
                                    height={430}
                                    className="apex-chart-two"
                                />
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md="6" xl="4">
                        <Card className="card-one">
                            <Card.Header>
                                <Card.Title as="h6">Operated Limits</Card.Title>
                                <Nav className="nav-icon nav-icon-sm ms-auto">
                                    <Nav.Link href="">
                                        <i className="ri-refresh-line"></i>
                                    </Nav.Link>
                                    <Nav.Link href="">
                                        <i className="ri-more-2-fill"></i>
                                    </Nav.Link>
                                </Nav>
                            </Card.Header>
                            <Card.Body className="p-0">
                                <ul className="people-group">
                                    {[
                                        {
                                            bg: 'teal',
                                            icon: 'ri-shopping-cart-line',
                                            label: 'SoC Range',
                                            date: 'Oct 21, 2023, 3:30pm',
                                            value: '0 – 100%',
                                            status: 'With in Limits',
                                            color: 'success',
                                        },
                                        {
                                            bg: 'info',
                                            icon: 'ri-coins-line',
                                            label: 'Cell Voltage Range',
                                            date: 'Oct 19, 2023, 3:30pm',
                                            value: '3.3V -4.15V',
                                            status: 'Low CV met',
                                            color: 'warning',
                                        },
                                        {
                                            bg: 'primary',
                                            icon: 'ri-truck-line',
                                            label: 'Temperature Range',
                                            date: 'Oct 18, 2023, 6:18pm',
                                            value: '32c – 46c',
                                            status: 'With in Limits',
                                            color: 'info',
                                        },
                                        {
                                            bg: 'pink',
                                            icon: 'ri-truck-line',
                                            label: 'Pack Voltage Range',
                                            date: 'Oct 18, 2023, 12:40pm',
                                            value: '54V to 48.3V',
                                            status: 'High CV met',
                                            color: 'success',
                                        },
                                        {
                                            bg: 'secondary',
                                            icon: 'ri-secure-payment-line',
                                            label: 'Equivalent Cycles',
                                            date: 'Oct 15, 2023, 08:09am',
                                            value: '530.9',
                                            status: 'Crossed',
                                            color: 'danger',
                                        },
                                        {
                                            bg: 'secondary',
                                            icon: 'ri-secure-payment-line',
                                            label: 'Energy Throughput',
                                            date: 'Oct 15, 2023, 08:09am',
                                            value: '2.5Y',
                                            status: 'Crossed',
                                            color: 'danger',
                                        },
                                    ].map((item, index) => (
                                        <li className="people-item" key={index}>
                                            <div className="avatar">
                                                <span
                                                    className={
                                                        'avatar-initial fs-20 bg-' +
                                                        item.bg
                                                    }
                                                >
                                                    <i
                                                        className={item.icon}
                                                    ></i>
                                                </span>
                                            </div>
                                            <div className="people-body">
                                                <h6>
                                                    <Link to="">
                                                        {item.label}
                                                    </Link>
                                                </h6>
                                                <span>{item.date}</span>
                                            </div>
                                            <div className="text-end">
                                                <div className="fs-sm">
                                                    {item.value}
                                                </div>
                                                <span
                                                    className={
                                                        'd-block fs-xs text-' +
                                                        item.color
                                                    }
                                                >
                                                    {item.status}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-center">
                                <Link to="" className="fs-sm">
                                    View More
                                </Link>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col md="6" xl="1">
                        <Card className="card-one">
                            <Card.Body className="p-2">
                                <Row className="g-0 g-xl-0">
                                    <Col>
                                        <label className="fs-sm text-secondary mb-1">
                                            Date Selected
                                        </label>
                                    </Col>
                                </Row>
                                <Row className="g-0 g-xl-0">
                                    <Col>
                                        <p className="fw-semibold text-dark mb-2">
                                            Today
                                        </p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="6" xl="1">
                        <Card className="card-one">
                            <Card.Body className="p-2">
                                <Row className="g-0 g-xl-0">
                                    <Col>
                                        <label className="fs-sm text-secondary mb-1">
                                            SoH
                                        </label>
                                    </Col>
                                </Row>
                                <Row className="g-0 g-xl-0">
                                    <Col>
                                        <p className="fw-semibold text-dark mb-2">
                                            84%
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="g-0 g-xl-0">
                                    <Col>
                                        <label className="fs-sm text-secondary mb-1">
                                            Variation
                                        </label>
                                    </Col>
                                </Row>
                                <Row className="g-0 g-xl-0">
                                    <Col>
                                        <p className="fw-semibold text-dark mb-2">
                                            +/- 2%
                                        </p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="6" xl="3">
                        <Card className="card-one">
                            <Card.Body className="p-2">
                                <Row className="g-0 g-xl-0">
                                    <Col>
                                        <label className="fs-sm text-secondary mb-1">
                                            Equivalent Cycles
                                        </label>
                                    </Col>
                                    <Col>
                                        <label className="fs-sm text-secondary mb-1">
                                            Avg Consumption
                                        </label>
                                    </Col>
                                </Row>
                                <Row className="g-0 g-xl-0">
                                    <Col>
                                        <p className="fw-semibold text-dark mb-0">
                                            830
                                        </p>
                                    </Col>
                                    <Col>
                                        <p className="fw-semibold text-dark mb-0">
                                            1.8 KWh/km
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="pt-2 g-3 g-xl-3">
                                    <Col>
                                        <label className="fs-sm text-secondary mb-1">
                                            Mileage
                                        </label>
                                    </Col>
                                </Row>
                                <Row className="g-0 g-xl-0">
                                    <Col>
                                        <p className="fw-semibold text-dark mb-0">
                                            123Km
                                        </p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="6" xl="3">
                        <Card className="card-one">
                            <Card.Body className="p-2">
                                <p className="fw-semibold text-dark mb-0">
                                    Current Range on full charge
                                </p>
                                <Row className="g-0 g-xl-0">
                                    <Col>
                                        <label className="fs-sm text-secondary mb-1">
                                            Range
                                        </label>
                                    </Col>
                                    <Col>
                                        <label className="fs-sm text-secondary mb-1">
                                            Remaining Energy
                                        </label>
                                    </Col>
                                    <Col>
                                        <label className="fs-sm text-secondary mb-1">
                                            Max DoD
                                        </label>
                                    </Col>
                                </Row>
                                <Row className="g-0 g-xl-0">
                                    <Col>
                                        <p className="fw-semibold text-dark mb-0">
                                            61
                                        </p>
                                    </Col>
                                    <Col>
                                        <p className="fw-semibold text-dark mb-0">
                                            22kWh
                                        </p>
                                    </Col>
                                    <Col>
                                        <p className="fw-semibold text-dark mb-0">
                                            70%
                                        </p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md="6" xl="4">
                        <Card className="card-one">
                            <Card.Body className="p-2">
                                <Row className="g-0 g-xl-0">
                                    <Col>
                                        <label className="fs-sm text-secondary mb-1">
                                            Season
                                        </label>
                                    </Col>
                                    <Col>
                                        <label className="fs-sm text-secondary mb-1">
                                            Ambient Temp
                                        </label>
                                    </Col>
                                    <Col>
                                        <label className="fs-sm text-secondary mb-1">
                                            Cells Status
                                        </label>
                                    </Col>
                                </Row>
                                <Row className="g-0 g-xl-0">
                                    <Col>
                                        <p className="fw-semibold text-dark mb-4">
                                            Winter
                                        </p>
                                    </Col>
                                    <Col>
                                        <p className="fw-semibold text-dark mb-4">
                                            32-35c
                                        </p>
                                    </Col>
                                    <Col>
                                        <p className="fw-semibold text-dark mb-4">
                                            Normal
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="g-0 g-xl-0">
                                    <Col>
                                        <label className="fs-sm text-secondary mb-1">
                                            Criticality
                                        </label>
                                    </Col>
                                    <Col>
                                        <label className="fs-sm text-secondary mb-1">
                                            Efficiency
                                        </label>
                                    </Col>
                                    <Col>
                                        <label className="fs-sm text-secondary mb-1">
                                            Safety Condition
                                        </label>
                                    </Col>
                                </Row>
                                <Row className="g-0 g-xl-0">
                                    <Col>
                                        <p className="fw-semibold text-dark mb-0">
                                            Low
                                        </p>
                                    </Col>
                                    <Col>
                                        <p className="fw-semibold text-dark mb-0">
                                            Low
                                        </p>
                                    </Col>
                                    <Col>
                                        <p className="fw-semibold text-dark mb-0">
                                            Safe
                                        </p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xl="12" md="12" sm="12">
                        <Card className="card-one">
                            <Card.Header>
                                <Card.Title as="h6">
                                    Battery Aging Inspection
                                </Card.Title>
                            </Card.Header>
                            <Card.Body className="p-3 p-xl-3">
                                <Table className="m-0 p-0">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th
                                                scope="col"
                                                className="fw-semibold text-dark mb-0 mt-0"
                                            >
                                                Max Temp
                                            </th>
                                            <th
                                                scope="col"
                                                className="fw-semibold text-dark mb-0 mt-0"
                                            >
                                                Min SoC
                                            </th>
                                            <th
                                                scope="col"
                                                className="fw-semibold text-dark mb-0 mt-0"
                                            >
                                                Avg SoC
                                            </th>
                                            <th
                                                scope="col"
                                                className="fw-semibold text-dark mb-0 mt-0"
                                            >
                                                Max SoC
                                            </th>
                                            <th
                                                scope="col"
                                                className="fw-semibold text-dark mb-0 mt-0"
                                            >
                                                Min C-rate
                                            </th>
                                            <th
                                                scope="col"
                                                className="fw-semibold text-dark mb-0"
                                            >
                                                Avg C-Rate
                                            </th>
                                            <th
                                                scope="col"
                                                className="fw-semibold text-dark mb-0"
                                            >
                                                Max C-Rate
                                            </th>
                                            <th
                                                scope="col"
                                                className="fw-semibold text-dark mb-0"
                                            >
                                                Min DoD
                                            </th>
                                            <th
                                                scope="col"
                                                className="fw-semibold text-dark mb-0"
                                            >
                                                Max DoD
                                            </th>
                                            <th
                                                scope="col"
                                                className="fw-semibold text-dark mb-0"
                                            >
                                                Avg DoD
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th
                                                scope="row"
                                                className="fw-semibold text-dark mb-0"
                                            >
                                                Target Performance
                                            </th>
                                            <td className="fs-sm text-secondary mb-0">
                                                20%
                                            </td>
                                            <td className="fs-sm text-secondary mb-0">
                                                50
                                            </td>
                                            <td className="fs-sm text-secondary mb-0">
                                                80
                                            </td>
                                            <td className="fs-sm text-secondary mb-0">
                                                0.1
                                            </td>
                                            <td className="fs-sm text-secondary mb-0">
                                                40c
                                            </td>
                                            <td className="fs-sm text-secondary mb-0">
                                                0.15
                                            </td>
                                            <td className="fs-sm text-secondary mb-0">
                                                0.1
                                            </td>
                                            <td className="fs-sm text-secondary mb-0">
                                                20%
                                            </td>
                                            <td className="fs-sm text-secondary mb-0">
                                                50
                                            </td>
                                            <td className="fs-sm text-secondary mb-0">
                                                80
                                            </td>
                                        </tr>
                                        <tr>
                                            <th
                                                className="fw-semibold text-dark mb-0 b-none"
                                                scope="row"
                                            >
                                                Battery ID
                                            </th>
                                            <td className="fs-sm text-secondary mb-0 b-none">
                                                18%
                                            </td>
                                            <td className="fs-sm text-secondary mb-0 b-none">
                                                35
                                            </td>
                                            <td className="fs-sm text-secondary mb-0 b-none">
                                                50c
                                            </td>
                                            <td className="fs-sm text-secondary mb-0 b-none">
                                                100
                                            </td>
                                            <td className="fs-sm text-secondary mb-0 b-none">
                                                0.2
                                            </td>
                                            <td className="fs-sm text-secondary mb-0 b-none">
                                                0.2
                                            </td>
                                            <td className="fs-sm text-secondary mb-0 b-none">
                                                0.2
                                            </td>
                                            <td className="fs-sm text-secondary mb-0 b-none">
                                                18%
                                            </td>
                                            <td className="fs-sm text-secondary mb-0 b-none">
                                                35
                                            </td>
                                            <td className="fs-sm text-secondary mb-0 b-none">
                                                100
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xl="12" md="12" sm="12">
                        <Card className="card-one">
                            <Card.Header>
                                <Card.Title as="h6">Flow</Card.Title>
                            </Card.Header>

                            <Card.Body className="p-3 p-xl-3">
                                <ReactFlow1 />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
};

export default HealthViewPage;
