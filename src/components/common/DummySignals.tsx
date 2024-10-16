import React from 'react';
import { Card } from 'react-bootstrap';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import mailBox from '../../assets/svg/mailbox.svg';
export default function DummySignals(props: IDummySignalsProps) {
    const {
        moduleName,
        selectedDateRange,
        handleDateRangeChange,
        isSignalListOpen,
        toggleSignalList,
    } = props;
    const msg = moduleName == 'safety' ? 'Safety Data Signals are Work In Progress' : 'Warranty Data Signals are Work In Progress';
    return (
        <React.Fragment>
            <DateRangePicker
                className="mb-2"
                showOneCalendar
                placeholder={['Select Date Range']}
                value={selectedDateRange}
                onChange={handleDateRangeChange}
            />
            <Card className="card-one asset-list mb-1">
                <Card.Header>
                    <Card.Title as="h6">Data Signals</Card.Title>
                </Card.Header>
                <Card.Body
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{ height: '50vh' }}
                >
                    <img
                        src={mailBox}
                        alt=""
                        style={{ height: '100px', width: '200px' }}>
                    </img>
                    <h5 className="text-center justify-content-center mt-1">
                        {msg}
                    </h5>
                </Card.Body>
                <div className="asset-list-footer">
                    <div className="asset-list-footer-top pe-2">
                        <label className="ps-1 "> Recently Viewed</label>
                        <div
                            onClick={toggleSignalList}
                            className="dropdown-link"
                        >
                            <i className="ri-arrow-down-s-line"></i>
                        </div>
                    </div>
                    {isSignalListOpen && (
                        <div>
                            <img
                                src="mailbox.svg"
                                alt=""
                                style={{ height: '23px', width: '30px' }}>
                            </img>
                            <h5 className="text-center justify-content-center">
                                Work in Progress...
                            </h5>
                        </div>

                    )}
                </div>
            </Card>
        </React.Fragment>
    );
}
