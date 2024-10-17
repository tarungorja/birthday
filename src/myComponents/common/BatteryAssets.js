import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Row, Col, Card, Nav } from 'react-bootstrap';
import Avatar from '../common/Avatar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Link } from 'react-router-dom';

import img10 from '../../assets/img/img10.jpg';
function BatteryAssets() {
    const [chatActive, setChatActive] = useState(1);
    const [msgShow, setMsgShow] = useState(false);
    console.log(msgShow);
    const chatGroup = [
        {
            unread: true,
            avatar: {
                status: 'offline',
                img: img10,
            },
            sender: 'Batt123asd1',
            time: '10:35am',
            text: 'Model : Vision48V100Ah ',
        },
        {
            selected: true,
            avatar: {
                status: 'online',
                img: img10,
            },
            sender: 'Batt123asd2',
            time: '1d',
            text: 'Model : Vision48V100Ah ',
        },
        {
            unread: true,
            avatar: {
                status: 'online',
                img: img10,
            },
            sender: 'Batt123asd3',
            time: '2d',
            text: 'Model : Vision48V100Ah ',
        },
        {
            avatar: {
                status: 'online',
                img: img10,
            },
            sender: 'Batt123asd4',
            time: '2d',
            text: 'Model : Vision48V100Ah ',
        },
        {
            avatar: {
                status: 'offline',
                img: img10,
            },
            sender: 'Batt123asd5',
            time: '5d',
            text: 'Model : Vision48V100Ah ',
        },
        {
            avatar: {
                status: 'offline',
                img: img10,
            },
            sender: 'Batt123asd6',
            time: '1w',
            text: 'Model : Vision48V100Ah ',
        },
        {
            unread: true,
            avatar: {
                status: 'offline',
                img: img10,
            },
            sender: 'Batt123asd6',
            time: '1w',
            text: 'Model : Vision48V100Ah ',
        },
        {
            avatar: {
                status: 'online',
                img: img10,
            },
            sender: 'Batt123asd7',
            time: '2w',
            text: 'Model : Vision48V100Ah ',
        },
        {
            avatar: {
                status: 'online',
                img: img10,
            },
            sender: 'Batt123asd8',
            time: '3w',
            text: 'Model : Vision48V100Ah ',
        },
        {
            unread: true,
            avatar: {
                status: 'offline',
                img: img10,
            },
            sender: 'Batt123asd9',
            time: '6w',
            text: 'Model : Vision48V100Ah ',
        },
        {
            unread: true,
            avatar: {
                status: 'offline',
                img: img10,
            },
            sender: 'Batt123asd10',
            time: '10:35am',
            text: 'Model : Vision48V100Ah ',
        },
        {
            selected: true,
            avatar: {
                status: 'online',
                img: img10,
            },
            sender: 'Batt123asd11',
            time: '1d',
            text: 'Model : Vision48V100Ah ',
        },
        {
            unread: true,
            avatar: {
                status: 'online',
                img: img10,
            },
            sender: 'Batt123asd12',
            time: '2d',
            text: 'Model : Vision48V100Ah ',
        },
        {
            avatar: {
                status: 'online',
                img: img10,
            },
            sender: 'Batt123asd13',
            time: '2d',
            text: 'Model : Vision48V100Ah ',
        },
        {
            avatar: {
                status: 'offline',
                img: img10,
            },
            sender: 'Batt123asd14',
            time: '5d',
            text: 'Model : Vision48V100Ah ',
        },
        {
            avatar: {
                status: 'offline',
                img: img10,
            },
            sender: 'Batt123asd15',
            time: '1w',
            text: 'Model : Vision48V100Ah ',
        },
        {
            unread: true,
            avatar: {
                status: 'offline',
                img: img10,
            },
            sender: 'Batt123asd16',
            time: '1w',
            text: 'Model : Vision48V100Ah ',
        },
        {
            avatar: {
                status: 'online',
                img: img10,
            },
            sender: 'Batt123asd17',
            time: '2w',
            text: 'Model : Vision48V100Ah ',
        },
        {
            avatar: {
                status: 'online',
                img: img10,
            },
            sender: 'Batt123asd18',
            time: '3w',
            text: 'Model : Vision48V100Ah ',
        },
        {
            unread: true,
            avatar: {
                status: 'offline',
                img: img10,
            },
            sender: 'Batt123asd19',
            time: '6w',
            text: 'Model : Vision48V100Ah ',
        },
        {
            unread: true,
            avatar: {
                status: 'offline',
                img: img10,
            },
            sender: 'Batt123asd1920',
            time: '10:35am',
            text: 'Model : Vision48V100Ah ',
        },
        {
            selected: true,
            avatar: {
                status: 'online',
                img: img10,
            },
            sender: 'Batt123asd21',
            time: '1d',
            text: 'Model : Vision48V100Ah ',
        },
        {
            unread: true,
            avatar: {
                status: 'online',
                img: img10,
            },
            sender: 'Batt123asd22',
            time: '2d',
            text: 'Model : Vision48V100Ah ',
        },
        {
            avatar: {
                status: 'online',
                img: img10,
            },
            sender: 'Batt123asd23',
            time: '2d',
            text: 'Model : Vision48V100Ah ',
        },
        {
            avatar: {
                status: 'offline',
                img: img10,
            },
            sender: 'Batt123asd24',
            time: '5d',
            text: 'Model : Vision48V100Ah ',
        },
        {
            avatar: {
                status: 'offline',
                img: img10,
            },
            sender: 'Batt123asd25',
            time: '1w',
            text: 'Model : Vision48V100Ah ',
        },
        {
            unread: true,
            avatar: {
                status: 'offline',
                img: img10,
            },
            sender: 'Batt123asd26',
            time: '1w',
            text: 'Model : Vision48V100Ah ',
        },
        {
            avatar: {
                status: 'online',
                img: img10,
            },
            sender: 'Batt123asd27',
            time: '2w',
            text: 'Model : Vision48V100Ah ',
        },
        {
            avatar: {
                status: 'online',
                img: img10,
            },
            sender: 'Batt123asd28',
            time: '3w',
            text: 'Model : Vision48V100Ah ',
        },
        {
            unread: true,
            avatar: {
                status: 'offline',
                img: img10,
            },
            sender: 'Batt123asd29',
            time: '6w',
            text: 'Model : Vision48V100Ah ',
        },
    ];
    return (
        <React.Fragment>
            <Card className="asset-list mb-1">
                <Card.Header className="">
                    <Card.Title as="h6" className="fw-bold">
                        Battery Assets
                    </Card.Title>
                    <Nav className="nav-icon nav-icon-sm ms-auto"></Nav>
                </Card.Header>

                <PerfectScrollbar>
                    <Card.Body className="px-1 ">
                        <label className="sidebar-label mb-3 px-0">
                            Recently Viewed
                        </label>

                        <div className="chat-contacts mb-4 px-0">
                            <Row className="g-1 justify-content">
                                <Col>
                                    <span>Bat1</span>
                                    <Avatar img={img10} status="offline" />
                                </Col>
                                <Col>
                                    <span>Bat2</span>
                                    <Avatar img={img10} status="online" />
                                </Col>
                                <Col>
                                    <span>Bat3</span>
                                    <Avatar img={img10} status="online" />
                                </Col>
                                <Col>
                                    <span>Bat4</span>
                                    <Avatar img={img10} status="online" />
                                </Col>
                            </Row>
                        </div>
                        <label className="sidebar-label mb-2 px-0">
                            All Batteries
                        </label>
                        <div className="chat-group">
                            {chatGroup.map((chats, index) => (
                                <div
                                    key={index}
                                    className={
                                        'chat-item' +
                                        (chats.unread ? ' unread' : '') +
                                        (chatActive === index
                                            ? ' selected'
                                            : '')
                                    }
                                    onClick={() => {
                                        setChatActive(index);
                                        setMsgShow(true);
                                    }}
                                >
                                    <Avatar
                                        status={chats.avatar.status}
                                        img={chats.avatar.img}
                                    />
                                    <div className="chat-item-body">
                                        <div className="d-flex align-items-center mb-1">
                                            <Link
                                                to={`/health-feed/health-view-page/${chats.sender}`}
                                            >
                                                <h6 className="mb-0">
                                                    {chats.sender}
                                                </h6>
                                            </Link>
                                        </div>
                                        <span>{chats.text}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card.Body>
                </PerfectScrollbar>
            </Card>
        </React.Fragment>
    );
}

export default BatteryAssets;
