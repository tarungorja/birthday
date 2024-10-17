import React, { useEffect, useState, useRef } from 'react';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { Link } from 'react-router-dom';
import { Dropdown, Row, Col, Nav, Form, Card } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Avatar from '../components/Avatar';
import DOMPurify from 'dompurify';

import img6 from '../assets/img/img6.jpg';
import img7 from '../assets/img/img7.jpg';
import img8 from '../assets/img/img8.jpg';
import img10 from '../assets/img/img10.jpg';
import img11 from '../assets/img/img11.jpg';
import img12 from '../assets/img/img12.jpg';
import img14 from '../assets/img/img14.jpg';
import img15 from '../assets/img/img15.jpg';
import img16 from '../assets/img/img16.jpg';
import img17 from '../assets/img/img17.jpg';
import img19 from '../assets/img/img19.jpg';

export default function InfiniteScroll() {
    useEffect(() => {
        document.body.classList.add('page-app');
        return () => {
            document.body.classList.remove('page-app');
        };
    }, []);
    const [products, setProducts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const elementRef = useRef(null);

    function onIntersection(entries) {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasMore) {
            fetch(
                `https://dummyjson.com/products?limit=10&skip=${
                    (page + 1) * 10
                }`
            )
                .then((res) => res.json())
                .then((data) => {
                    if (data.products.length === 0) {
                        setHasMore(false);
                    } else {
                        setProducts((prevProducts) => [
                            ...prevProducts,
                            ...data.products,
                        ]);
                        setPage((prevPage) => prevPage + 1);
                    }
                });
        }
    }
    useEffect(() => {
        fetch('https://dummyjson.com/products?limit=10')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setProducts(data.products);
            });
    }, []);
    const options = {
        root: null,
        rootMargin: '10%',
        threshold: 0,
    };
    useEffect(() => {
        const observer = new IntersectionObserver(onIntersection, options);
        if (observer && elementRef.current) {
            observer.observe(elementRef.current);
        }
        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
        // eslint-disable-next-line
    }, [products]);

    const chatGroup = [
        {
            unread: true,
            avatar: {
                status: 'offline',
                img: img11,
            },
            sender: 'Dyanne Aceron',
            time: '10:35am',
            text: 'Hi Hello! My name is Dyanne Aceron. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
        },
        {
            selected: true,
            avatar: {
                status: 'online',
                img: img14,
            },
            sender: 'Leo Mendez',
            time: '1d',
            text: 'There are many variations of pass. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia',
        },
        {
            unread: true,
            avatar: {
                status: 'online',
                img: img15,
            },
            sender: 'Meriam Salomon',
            time: '2d',
            text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
            avatar: {
                status: 'online',
                img: img17,
            },
            sender: 'Rolando Paloso',
            time: '2d',
            text: 'There are many variations of paserror sit voluptatem accusantium doloremque laudantium, totam rem aperiam',
        },
        {
            avatar: {
                status: 'offline',
                img: img19,
            },
            sender: 'Marianne Audrey',
            time: '5d',
            text: 'Hi Hello! There are many variations ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit',
        },
        {
            avatar: {
                status: 'offline',
                img: img6,
            },
            sender: 'Adrian Moniño',
            time: '1w',
            text: 'Lorem ipsum is simply dummy text sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt',
        },
        {
            unread: true,
            avatar: {
                status: 'offline',
                img: img7,
            },
            sender: 'Andrew Ylaya',
            time: '1w',
            text: 'It is a long established fact that aquis autem vel eum iure reprehenderit qui in ea voluptate velit esse',
        },
        {
            avatar: {
                status: 'online',
                img: img8,
            },
            sender: 'Maricel Villalon',
            time: '2w',
            text: 'Hello!, I will be distracted by the requam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur',
        },
        {
            avatar: {
                status: 'online',
                img: img10,
            },
            sender: 'Warren Vito',
            time: '3w',
            text: 'There are many variations of passc up iditate non provident, similique sunt in culpa',
        },
        {
            unread: true,
            avatar: {
                status: 'offline',
                img: img11,
            },
            sender: 'Lovely Ceballos',
            time: '6w',
            text: 'Hello!, I will be distracted by the replaceat facere possimus, omnis voluptas assumenda',
        },
    ];

    const messageGroup = [
        {
            date: 'August 20, 2023',
            items: [
                {
                    avatar: {
                        status: 'online',
                        img: img16,
                    },
                    messages: [
                        {
                            text: 'Excepteur sint occaecat cupidatat non proident',
                            time: '8:45pm',
                        },
                        {
                            text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.',
                            time: '9:15pm',
                        },
                    ],
                },
                {
                    reverse: true,
                    messages: [
                        {
                            text: 'Neque porro quisquam est, qui dolorem ipsum',
                            time: '9:20pm',
                        },
                        {
                            text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accus',
                            time: '9:21pm',
                        },
                    ],
                },
            ],
        },
        {
            date: 'Today',
            items: [
                {
                    avatar: {
                        status: 'online',
                        img: img16,
                    },
                    messages: [
                        {
                            text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                            time: '10:30am',
                        },
                    ],
                },
                {
                    reverse: true,
                    messages: [
                        {
                            text: 'Accusantium doloremque laudantium',
                            time: '10:40am',
                        },
                        {
                            text: 'Accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo...',
                            time: '10:41am',
                        },
                    ],
                },
                {
                    avatar: {
                        status: 'online',
                        img: img16,
                    },
                    messages: [
                        {
                            text: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit...',
                            time: '10:45am',
                        },
                        {
                            text: 'Nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
                            time: '10:47am',
                        },
                    ],
                },
            ],
        },
    ];

    const [chatActive, setChatActive] = useState(1);
    const [msgShow, setMsgShow] = useState(false);

    // Toggle chat option in each item
    const navToggle = (e) => {
        e.target.closest('.row').classList.toggle('nav-show');
    };

    return (
        <React.Fragment>
            <Header />

            <div className="main main-app p-3 p-lg-4">
                <div className={'chat-panel' + (msgShow ? ' msg-show' : '')}>
                    <div className="chat-sidebar">
                        <PerfectScrollbar className="sidebar-body">
                            <label className="sidebar-label mb-3">
                                Recently Contacted
                            </label>
                            <div className="chat-contacts mb-4">
                                <Row className="g-2 row-cols-auto">
                                    <Col>
                                        <Avatar img={img10} status="offline" />
                                    </Col>
                                    <Col>
                                        <Avatar img={img11} status="online" />
                                    </Col>
                                    <Col>
                                        <Avatar img={img12} status="online" />
                                    </Col>
                                    <Col>
                                        <Avatar img={img14} status="online" />
                                    </Col>
                                    <Col>
                                        <Avatar img={img15} status="offline" />
                                    </Col>
                                    <Col>
                                        <Avatar img={img6} status="online" />
                                    </Col>
                                </Row>
                            </div>

                            <label className="sidebar-label mb-2">
                                Channels
                            </label>

                            <div className="chat-group mb-4">
                                {[
                                    {
                                        name: 'General',
                                        desc: 'Includes <strong>You</strong>, <strong>Dyanne</strong> and <strong>5 others</strong>',
                                    },
                                    {
                                        name: 'Technology',
                                        desc: 'Includes <strong>You</strong>, <strong>Nathan</strong> and <strong>1 other</strong>',
                                    },
                                    {
                                        name: 'Production',
                                        desc: 'Includes all <strong>Engineering</strong> teams',
                                    },
                                ].map((channel, index) => (
                                    <div className="chat-item" key={index}>
                                        <div className="avatar">
                                            <span className="avatar-initial">
                                                #
                                            </span>
                                        </div>
                                        <div className="chat-item-body">
                                            <h6>{channel.name}</h6>
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: DOMPurify.sanitize(
                                                        channel.desc
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <label className="sidebar-label mb-2">
                                Direct Messages
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
                                        onClick={(e) => {
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
                                                <h6 className="mb-0">
                                                    {chats.sender}
                                                </h6>
                                                <small className="ms-auto">
                                                    {chats.time}
                                                </small>
                                            </div>
                                            <span>{chats.text}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </PerfectScrollbar>
                    </div>
                    <div className="chat-body">
                        <div className="chat-body-header">
                            <div className="chat-item">
                                <Avatar img={img14} status="online" />
                                <div className="chat-item-body">
                                    <h6 className="mb-1">Leo Mendez</h6>
                                    <span>Active now</span>
                                </div>
                            </div>
                            <Nav className="nav-icon ms-auto">
                                <Nav.Link href="" title="Invite People">
                                    <i className="ri-user-add-line"></i>
                                </Nav.Link>
                                <Nav.Link href="" title="Member List">
                                    <i className="ri-group-line"></i>
                                </Nav.Link>
                                <Nav.Link href="" title="Call">
                                    <i className="ri-phone-line"></i>
                                </Nav.Link>
                                <Nav.Link href="" title="Video Call">
                                    <i className="ri-vidicon-line"></i>
                                </Nav.Link>
                                <Nav.Link href="" title="More Info">
                                    <i className="ri-information-line"></i>
                                </Nav.Link>
                                <Nav.Link
                                    href=""
                                    className="d-md-none"
                                    onClick={() => setMsgShow(false)}
                                >
                                    <i className="ri-close-fill"></i>
                                </Nav.Link>
                            </Nav>
                        </div>
                        <PerfectScrollbar className="chat-body-content">
                            <div>
                                {products.map((item, idx) => {
                                    return (
                                        <Card
                                            key={idx}
                                            style={{
                                                width: '600px',
                                                margin: '0 auto',
                                            }}
                                            className={'mb-2'}
                                        >
                                            <Row>
                                                <Col md={4}>
                                                    <img
                                                        src={item.thumbnail}
                                                        alt="Img"
                                                        style={{
                                                            width: '20rem',
                                                            height: '15rem',
                                                            margin: '10px',
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
                                        </Card>
                                    );
                                })}
                                {hasMore && products.length !== 0 && (
                                    <div
                                        ref={elementRef}
                                        style={{
                                            textAlign: 'center',
                                            border: 'dashed',
                                        }}
                                    >
                                        Load More Items...
                                    </div>
                                )}
                            </div>
                        </PerfectScrollbar>
                    </div>
                </div>

                <Footer />
            </div>
        </React.Fragment>
    );
}
