import React from 'react';
import { Row, Col, Carousel } from 'react-bootstrap';

const FeedGraphs = (props: IFeedGraphProps) => {
    const { healthFeeds, openHealthFeedPlots } = props;
    // const openModal = (content: IFeedModalContent) => {
    //     props.setModalContent(content);
    //     props.setShowModal(true);
    // };

    return (
        <Carousel className='feed-carousel' controls={healthFeeds.images.length > 1 ? true : false} interval={null}>
            {healthFeeds?.images.map((image, index) => {
                return (
                    <Carousel.Item key={index}>
                        <Row className='g-3'>
                            <Col
                                onClick={() => {
                                    openHealthFeedPlots(index, healthFeeds);
                                }}
                                style={{
                                    cursor: 'pointer',
                                }}
                                className='d-flex justify-content-center align-items-center'
                            >
                                <img className='img-fluid' src={`data:image/png;base64,${image}`} />
                            </Col>
                        </Row>
                    </Carousel.Item>
                );
            })}
        </Carousel>
    );
};

export default FeedGraphs;
