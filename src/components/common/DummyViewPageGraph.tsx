import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, Col, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { chartData1, chartData2, chartData3 } from '../../data/ChartsData';


export const DummyViewPageGraph = (props: IDummyViewPageGraphProps) => {
    const { dateRange, setDateRange } = props;

    const [batteryToggle, setBatteryToggle] = useState<number>(0);
    const [viewToggle, setViewToggle] = useState<number>(0);
    const [model, setModel] = useState<number>(0);
    const formatDate = (inputDate: string): string => {
        const [year, month, day] = inputDate.split('-').map(Number);
        return `${day.toString().padStart(2, '0')}/${month
            .toString()
            .padStart(2, '0')}/${year}`;
    };
    const handleSelection = (
        event: React.MouseEvent,
        chartContext: IChartContext
    ): void => {
        const minDate = new Date(chartContext.xaxis.min);
        const maxDate = new Date(chartContext.xaxis.max);
        if (!isNaN(minDate.getTime()) && !isNaN(maxDate.getTime())) {
            const fromDate = formatDate(minDate.toISOString().slice(0, 10));
            const toDate = formatDate(maxDate.toISOString().slice(0, 10));
            setDateRange({
                ...dateRange,
                from: `${fromDate}`,
                to: `${toDate}`,
            });
        }
    };
    const seriesOne = [
        {
            name: batteryToggle ? 'series2' : 'series1',
            data: batteryToggle
                ? viewToggle
                    ? chartData2
                    : chartData2
                : chartData1,
        },
    ];

    const optionOne: ApexCharts.ApexOptions = {
        chart: {
            parentHeightOffset: 0,
            type: 'area',

            toolbar: {
                tools: {
                    download: false,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: false,
                    reset: true,
                },
                offsetY: 20,
                offsetX: -10,
            },
            stacked: true,
            events: {
                zoomed: handleSelection,
            },
        },
        colors: ['#4f6fd9', '#506fd9'],
        grid: {
            borderColor: 'rgba(72,94,144,0.08)',
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
            type: 'datetime',
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
            max: batteryToggle && viewToggle ? 3000 : 100,
            show: true,
            title: {
                text:
                    batteryToggle && viewToggle
                        ? 'Cycles'
                        : batteryToggle
                            ? 'Capacity (Ah)'
                            : viewToggle
                                ? 'SoH-Cloud (%)'
                                : 'SoH-BMS (%)',
                style: {
                    fontSize: '12px',
                    fontWeight: 'normal',
                },
            },
        },
        annotations:
            batteryToggle && !viewToggle
                ? {
                    yaxis: [
                        {
                            y: 70,
                            borderColor: 'red',
                            label: {
                                borderColor: 'red',
                                style: {
                                    color: 'white',
                                    background: 'red',
                                },
                                position: 'center',
                                offsetY: 5,
                                text: 'End of Life',
                            },
                        },
                    ],
                }
                : {
                    yaxis: [
                        {
                            y: 2200,
                            borderColor: '#FF0000',
                            label: {
                                borderColor: 'red',
                                style: {
                                    color: 'white',
                                    background: 'red',
                                },
                                offsetY: 5,
                                position: 'center',
                                textAnchor: 'end',
                                text: 'Rated Cycles',
                            },
                        },
                    ],
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
        <Col xl="9" sm="12" md="12">
            <Card className="card-one">
                <Card.Body className="overflow-hidden px-1 pt-0">
                    <div className="graph-info p-3 p-xl-3 pt-4 pt-xl-">
                        <Nav as="nav" className="nav-healthview-one">
                            <div className="d-md-none d-flex" >
                                <NavDropdown title={batteryToggle ? 'Battery Degradation' : 'Health Status'} id="basic-nav-dropdown" className="custom-dropdown">
                                    <NavDropdown.Item><Link
                                        to=""
                                        className={!batteryToggle ? 'active' : ''}
                                        onClick={() => setBatteryToggle(0)}
                                    >
                                        Health Status
                                    </Link></NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <Link
                                            to=""
                                            className={batteryToggle ? 'active' : ''}
                                            onClick={() => setBatteryToggle(1)}
                                        >
                                            Battery Degradation
                                        </Link>
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <p className="px-2">|</p>
                                <NavDropdown title={viewToggle ? batteryToggle ? 'Cycles' : 'SoH-Cloud' : batteryToggle ? 'Capacity' : 'SoH-BMS'} className='p-0' id="basic-nav-dropdown">
                                    <NavDropdown.Item>
                                        <Link
                                            to=""
                                            className={!viewToggle ? 'active' : ''}
                                            onClick={() => setViewToggle(0)}
                                        >
                                            {batteryToggle ? 'Capacity' : 'SoH-BMS'}
                                        </Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <Link
                                            to=""
                                            className={viewToggle ? 'active' : ''}
                                            onClick={() => setViewToggle(1)}
                                        >
                                            {batteryToggle ? 'Cycles' : 'SoH-Cloud'}
                                        </Link>
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <p className="px-2">|</p>
                                <NavDropdown title={model ? 'DL Model' : 'Classical'} className='p-0' id="basic-nav-dropdown">
                                    <NavDropdown.Item> <Link
                                        to=""
                                        className={!model ? 'active' : ''}
                                        onClick={() => setModel(0)}
                                    >
                                        {batteryToggle ? 'Classical' : 'Classical'}
                                    </Link></NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <Link
                                            to=""
                                            className={model ? 'active' : ''}
                                            onClick={() => setModel(1)}
                                        >
                                            {batteryToggle ? 'DL Model' : 'DL Model'}
                                        </Link>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </div>
                            <div className="d-none d-md-flex">
                                <Link
                                    to=""
                                    className={!batteryToggle ? 'active' : ''}
                                    onClick={() => setBatteryToggle(0)}
                                >
                                    Health Status
                                </Link>
                                <Link
                                    to=""
                                    className={batteryToggle ? 'active' : ''}
                                    onClick={() => setBatteryToggle(1)}
                                >
                                    Battery Degradation
                                </Link>
                                <p className="px-2">|</p>
                                <Link
                                    to=""
                                    className={!viewToggle ? 'active' : ''}
                                    onClick={() => setViewToggle(0)}
                                >
                                    {batteryToggle ? 'Capacity' : 'SoH-BMS'}
                                </Link>
                                <Link
                                    to=""
                                    className={viewToggle ? 'active' : ''}
                                    onClick={() => setViewToggle(1)}
                                >
                                    {batteryToggle ? 'Cycles' : 'SoH-Cloud'}
                                </Link>
                                <p className="px-2">|</p>

                                <Link
                                    to=""
                                    className={!model ? 'active' : ''}
                                    onClick={() => setModel(0)}
                                >
                                    {batteryToggle ? 'Classical' : 'Classical'}
                                </Link>
                                <Link
                                    to=""
                                    className={model ? 'active' : ''}
                                    onClick={() => setModel(1)}
                                >
                                    {batteryToggle ? 'DL Model' : 'DL Model'}
                                </Link>
                            </div>
                        </Nav>

                        <div className="graph-subvalue mb-3 mb-md-2 ps-12">
                            <h4 className="soh-value mb-0 pe-1">
                                {batteryToggle && viewToggle
                                    ? '1000'
                                    : batteryToggle && !viewToggle
                                        ? '90Ah'
                                        : '98%'}
                            </h4>
                            <small>
                                {batteryToggle && viewToggle
                                    ? ' cycles'
                                    : batteryToggle && !viewToggle
                                        ? ''
                                        : 'State of Health'}
                            </small>
                        </div>

                        <div className="graph-subvalue mb-3 mb-md-2 ps-12">
                            {batteryToggle && viewToggle ? (
                                <i className="ri-arrow-up-line text-primary"></i>
                            ) : (
                                <i
                                    className="ri-arrow-down-line"
                                    style={{ color: 'red' }}
                                ></i>
                            )}
                            <span className="text-primary">
                                {batteryToggle && viewToggle
                                    ? '100'
                                    : batteryToggle && !viewToggle
                                        ? '10Ah'
                                        : ' 5%'}
                            </span>
                            <small>vs last year</small>
                        </div>
                    </div>

                    <ReactApexChart
                        series={seriesOne}
                        options={optionOne}
                        type="area"
                        height={300}
                        className="apex-chart-one"
                    />
                </Card.Body>
            </Card >
        </Col >
    );
};