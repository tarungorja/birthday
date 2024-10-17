import React, { useState } from 'react';
import { Card, Row, Col, Nav, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import img11 from '../../assets/img/img11.jpg';
import Avatar from './Avatar';
import PerfectScrollbar from 'react-perfect-scrollbar';

import img1 from '../../assets/img/img5.jpg';
import FeedGraphs from './FeedGraphs';

export default function Feeds() {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const closeModal = () => {
        setShowModal(false);
    };
    const plotsSrc1 = ['../plot.html', '../plot.html', '../plot.html'];
    const plotsSrc = ['../plot.html'];

    return (
        <React.Fragment>
            <Card className="feed-list my-1">
                <PerfectScrollbar>
                    <Card.Body className="">
                        <div className="overflow-x-hidden">
                            <Col>
                                <div className="media-profile mb-3">
                                    <div className="media-img mb-3 mb-sm-0">
                                        <Avatar img={img1} />
                                    </div>
                                    <div className="media-body">
                                        <Link
                                            to={
                                                '/health-feed/health-view-page/BAT100023ASD233'
                                            }
                                        >
                                            <h5 className="battery-id">
                                                BAT100023ASD233
                                            </h5>
                                        </Link>

                                        <p className="d-flex gap-2 mb-2">
                                            Vision48V100Ah
                                        </p>
                                        <p className="mb-0">
                                            Redhead, Innovator, Saviour of
                                            Mankind,
                                            <Link to="">Read more</Link>
                                        </p>
                                    </div>
                                </div>
                            </Col>
                            <Row className=" g-4 g-md-5 g-xl-4 g-xxl-5">
                                {[
                                    {
                                        icon: 'ri-medal-2-line',
                                        text: '5 Certificates',
                                        label: 'Achievements',
                                    },
                                    {
                                        icon: 'ri-suitcase-line',
                                        text: '10+ Years',
                                        label: 'Experience',
                                    },
                                    {
                                        icon: 'ri-team-line',
                                        text: '356',
                                        label: 'Following',
                                    },
                                    {
                                        icon: 'ri-team-line',
                                        text: '1,056',
                                        label: 'Followers',
                                    },
                                ].map((profileItem, index) => (
                                    <Col key={index}>
                                        <div className="profile-item">
                                            <i className={profileItem.icon}></i>
                                            <div className="profile-item-body">
                                                <p>{profileItem.text}</p>
                                                <span>{profileItem.label}</span>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>

                        <div className="sticky-nav">
                            <Nav className="nav-line my-2">
                                <Nav.Link href="" className="active">
                                    Recent Health Feed
                                </Nav.Link>
                                <Nav.Link href="">Save Feed</Nav.Link>
                            </Nav>
                        </div>
                        <div className="post-header my-3">
                            <Link to="">
                                <Avatar initial="s" status="online" />
                            </Link>
                            <div className="post-content">
                                <h6>Bethany Hartsfield</h6>
                                <span>Cigarette Butt Collector</span>
                            </div>
                            <span className="post-date">3 days ago</span>
                        </div>
                        <p className="post-text">
                            Our team is expanding again. We are looking for a
                            Product Manager and Software Engineer to drive our
                            new aspects of our capital projects. If you&apos;re
                            interested, please drop a comment here or simply
                            message me. <Link to="">#softwareengineer</Link>{' '}
                            <Link to="">#engineering</Link>
                        </p>
                        <FeedGraphs
                            setModalContent={setModalContent}
                            setShowModal={setShowModal}
                            plotsSrc={plotsSrc1}
                        />

                        <div className="post-header my-3">
                            <Link to="">
                                <Avatar initial="s" status="online" />
                            </Link>
                            <div className="post-content">
                                <h6>Bethany Hartsfield</h6>
                                <span>Cigarette Butt Collector</span>
                            </div>
                            <span className="post-date">3 days ago</span>
                        </div>
                        <p className="post-text">
                            Our team is expanding again. We are looking for a
                            Product Manager and Software Engineer to drive our
                            new aspects of our capital projects. If you&apos;re
                            interested, please drop a comment here or simply
                            message me. <Link to="">#softwareengineer</Link>{' '}
                            <Link to="">#engineering</Link>
                        </p>
                        <FeedGraphs
                            setModalContent={setModalContent}
                            setShowModal={setShowModal}
                            plotsSrc={plotsSrc}
                        />

                        <div className="post-header my-3">
                            <Link to="">
                                <Avatar initial="s" status="online" />
                            </Link>
                            <div className="post-content">
                                <h6>Bethany Hartsfield</h6>
                                <span>Cigarette Butt Collector</span>
                            </div>
                            <span className="post-date">3 days ago</span>
                        </div>
                        <p className="post-text">
                            Our team is expanding again. We are looking for a
                            Product Manager and Software Engineer to drive our
                            new aspects of our capital projects. If you&apos;re
                            interested, please drop a comment here or simply
                            message me. <Link to="">#softwareengineer</Link>{' '}
                            <Link to="">#engineering</Link>
                        </p>
                        <FeedGraphs
                            setModalContent={setModalContent}
                            setShowModal={setShowModal}
                            plotsSrc={plotsSrc}
                        />
                        <div className="post-header my-3">
                            <Link to="">
                                <Avatar initial="s" status="online" />
                            </Link>
                            <div className="post-content">
                                <h6>Bethany Hartsfield</h6>
                                <span>Cigarette Butt Collector</span>
                            </div>
                            <span className="post-date">3 days ago</span>
                        </div>
                        <p className="post-text">
                            Our team is expanding again. We are looking for a
                            Product Manager and Software Engineer to drive our
                            new aspects of our capital projects. If you&apos;re
                            interested, please drop a comment here or simply
                            message me. <Link to="">#softwareengineer</Link>{' '}
                            <Link to="">#engineering</Link>
                        </p>
                        <FeedGraphs
                            setModalContent={setModalContent}
                            setShowModal={setShowModal}
                            plotsSrc={plotsSrc}
                        />
                    </Card.Body>
                </PerfectScrollbar>
            </Card>

            <Modal
                show={showModal}
                onHide={closeModal}
                dialogClassName="feedModal"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal Title</Modal.Title>
                </Modal.Header>
                <div style={{ height: '100%' }}>
                    <Modal.Body style={{ height: '100%' }}>
                        {modalContent}
                    </Modal.Body>
                </div>
            </Modal>
        </React.Fragment>
    );
}
