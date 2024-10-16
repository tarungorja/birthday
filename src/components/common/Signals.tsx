import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import SpinnerLoader from './SpinnerComponent';
import Spinner from 'react-bootstrap/Spinner';

const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export default function Signals(props: ISignalsProps) {
    const {
        openSignalViewPage,
        isLoading,
        signalsData,
        selectedDateRange,
        handleDateRangeChange,
        showRecentlyViewedSignals,
        toggleRecentlyViewedSignals,
        getDay,
        isEndOfSignals,
        isLoadingNextSignals,
        handleScrollEnd,
    } = props;
    const recentlyViewedSignals: ISignalData[] = JSON.parse(localStorage.getItem('recentlyViewedSignals') || '[]');
    return (
        <React.Fragment>
            <DateRangePicker
                className='mb-2'
                showOneCalendar
                placeholder={['Select Date Range']}
                value={selectedDateRange}
                onChange={handleDateRangeChange}
            />
            <Card className='card-one asset-list mb-1'>
                <Card.Header>
                    <Card.Title as='h6'>Data Signals</Card.Title>
                </Card.Header>
                {isLoading ? (
                    <SpinnerLoader />
                ) : (
                    <PerfectScrollbar id='signalsPerfectScrollbar' onYReachEnd={handleScrollEnd}>
                        <Card.Body className='px-2'>
                            <label className='batteries-list mb-3 px-0'>All Signals</label>
                            <ul className='signals-list'>
                                {signalsData?.map((signal, index) => (
                                    <li key={index}>
                                        <div className='signal-date'>
                                            <small>{weekday[getDay(signal)]}</small>
                                            <h6 className='fw-semibold'>
                                                {signal.signal_date.split('-')[2]}/{signal.signal_date.split('-')[1]}
                                            </h6>
                                        </div>
                                        <div className='signals-body'>
                                            <div className='signal-item'>
                                                <h6>{signal.bat_name}</h6>

                                                <h6 className='signal-title' onClick={() => openSignalViewPage(signal)}>
                                                    {signal.event_details.title}
                                                </h6>

                                                <p>{signal.event_details.description}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Card.Body>
                        {signalsData.length > 0 && isLoadingNextSignals && (
                            <div className='text-center fs-sm text-secondary mb-5'>
                                <Spinner animation='border' role='status'>
                                    <span className='visually-hidden'>Loading...</span>
                                </Spinner>
                            </div>
                        )}
                        {signalsData.length > 0 && isEndOfSignals && (
                            <div className='text-center fs-sm text-secondary mb-5'>
                                <hr className='my-3 border-0' />- End of the Signals -
                            </div>
                        )}
                        {signalsData.length == 0 && (
                            <div className='text-center fs-sm text-secondary mb-5'>
                                <hr className='my-3 border-0' />- No Signals generated -
                            </div>
                        )}
                    </PerfectScrollbar>
                )}

                <div className='asset-list-footer'>
                    <div className='asset-list-footer-top pe-2'>
                        <label className='ps-1 '> Recently Viewed</label>
                        <div onClick={toggleRecentlyViewedSignals} className='dropdown-link'>
                            <i className='ri-arrow-down-s-line'></i>
                        </div>
                    </div>
                    {showRecentlyViewedSignals && (
                        <div className='battery-asset' style={{ maxHeight: '50vh' }}>
                            <ul className='signals-list'>
                                {recentlyViewedSignals?.map((signal, index) => (
                                    <li key={index}>
                                        <div className='signal-date'>
                                            <small>{weekday[getDay(signal)]}</small>
                                            <h6>
                                                {signal.signal_date.split('-')[2]}/{signal.signal_date.split('-')[1]}
                                            </h6>
                                        </div>
                                        <div className='signals-body'>
                                            <div className='signal-item'>
                                                <h6>{signal.bat_name}</h6>
                                                <Link to={`/dashboard/signals-view-page/${signal.id}`}>
                                                    <h6 className='signal-title'>{signal.event_details.title}</h6>
                                                </Link>
                                                <p>{signal.event_details.description}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                                <div className='text-center fs-sm text-secondary'>
                                    <hr className='my-3 border-0' />- End of the List -
                                </div>
                            </ul>
                        </div>
                    )}
                </div>
            </Card>
        </React.Fragment>
    );
}
