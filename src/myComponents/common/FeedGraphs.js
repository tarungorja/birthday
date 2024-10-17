import React from 'react';
import { Card, Row, Col, Carousel } from 'react-bootstrap';
import PropTypes from 'prop-types';

const FeedGraphs = ({ setModalContent, setShowModal, plotsSrc }) => {
    const openModal = (content) => {
        setModalContent(content);
        setShowModal(true);
    };

    return (
        <div className="post-preview">
            <Card className="gd-carousel-wrapper">
                <Card.Body>
                    <Carousel
                        interval={null}
                        className={plotsSrc.length <= 1 && 'hide-arrows'}
                    >
                        {plotsSrc.map((plot, index) => {
                            return (
                                <Carousel.Item key={index}>
                                    <Row className="g-3">
                                        <Col
                                            onClick={() =>
                                                openModal(
                                                    <iframe
                                                        src={plot}
                                                        title="Example"
                                                        width="100%"
                                                        height="100%"
                                                        loading="lazy"
                                                    />
                                                )
                                            }
                                            style={{
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <iframe
                                                src={plot}
                                                title="Example"
                                                width="100%"
                                                height="300px"
                                                loading="lazy"
                                                style={{
                                                    pointerEvents: 'none',
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                </Carousel.Item>
                            );
                        })}
                    </Carousel>
                </Card.Body>
            </Card>
        </div>
    );
};

FeedGraphs.propTypes = {
    setModalContent: PropTypes.func.isRequired,
    setShowModal: PropTypes.func.isRequired,
    plotsSrc: PropTypes.array.isRequired,
};

export default FeedGraphs;
