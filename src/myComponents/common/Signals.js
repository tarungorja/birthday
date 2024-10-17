import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ReactDatePicker from 'react-datepicker';
import { Card, Nav } from 'react-bootstrap';
import '../../assets/css/react-datepicker.min.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

export default function Signals() {
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        document.body.classList.add('signal');
        return () => {
            document.body.classList.remove('signal');
        };
    }, []);
    return (
        <React.Fragment>
            <Card className="signal-list">
                <div className="mb-2">
                    <ReactDatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        inline
                    />
                </div>
                <Card.Header className="">
                    <Card.Title as="h6" className="fw-bold">
                        Signals
                    </Card.Title>
                    <Nav className="nav-icon nav-icon-sm ms-auto"></Nav>
                </Card.Header>
                <PerfectScrollbar>
                    <Card.Body className="px-1 ">
                        <ul className="events-list">
                            {[
                                {
                                    active: true,
                                    date: {
                                        day: 'Sat',
                                        num: '03',
                                    },
                                    events: [
                                        {
                                            time: '08:00am - 10:30am',
                                            title: 'Web Design Workshop',
                                            text: 'Duis aute irure dolor in repre hen derit in volup tate velit esse cillum.',
                                        },
                                    ],
                                },
                                {
                                    date: {
                                        day: 'Wed',
                                        num: '07',
                                    },
                                    events: [
                                        {
                                            time: '08:00am - 11:30am',
                                            title: '5th Religious Conference',
                                            text: 'Excep teur sint occae cat cupi datat non proident sunt in culpa qui.',
                                        },
                                        {
                                            time: '1:30pm - 5:30pm',
                                            title: 'Church Workshop Events',
                                            text: 'Datat non proident sunt in culpa qui.',
                                        },
                                    ],
                                },
                                {
                                    date: {
                                        day: 'Thu',
                                        num: '08',
                                    },
                                    events: [
                                        {
                                            time: '08:30am - 03:30pm',
                                            title: 'Front-End Devs Meetup',
                                            text: 'Sed ut perspi ciatis unde omnis iste natus error sit volup tatem.',
                                        },
                                    ],
                                },
                                {
                                    date: {
                                        day: 'Mon',
                                        num: '23',
                                    },
                                    events: [
                                        {
                                            time: '09:00am - 05:30pm',
                                            title: 'Golden Autumn Festival',
                                        },
                                    ],
                                },
                            ].map((item, index) => (
                                <li
                                    key={index}
                                    className={item.active ? 'active' : ''}
                                >
                                    <div className="event-date">
                                        <small>{item.date.day}</small>
                                        <h5>{item.date.num}</h5>
                                    </div>
                                    <div className="events-body">
                                        {item.events.map((event, ind) => (
                                            <div key={ind} className="ev-item">
                                                <small>{event.time}</small>
                                                <h6>{event.title}</h6>
                                                {event.text && (
                                                    <p>{event.text}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Card.Body>
                </PerfectScrollbar>
            </Card>
            {/* </div> */}
        </React.Fragment>
    );
}
