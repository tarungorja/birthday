import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Avatar from './Avatar';
import bImg from '../../assets/img/battery-icon.png';
import { setCategory } from '../../actions/selectCategoryAction';
import { setTags } from '../../actions/selectTagAction';
import { dateFormatter } from '../../utilities/dateFormatConverter';
import { useDispatch } from 'react-redux';
import { getFeedPlots } from '../../api/healthFeedsApi';
import { useError } from '../../Contexts/ErrorContext';
import { AxiosError } from 'axios';

const LazyFeedGraphs = React.lazy(() => import('./FeedGraphs'));

const HealthFeedsPost = (props: IHealthFeedsPostProps) => {
    const { showError } = useError();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const healthFeed = props.healthFeed;
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState<IFeedModalContent>();
    const tags = healthFeed.tags;
    const closeModal = () => {
        setShowModal(false);
    };
    const redirectToShowWithCategory = () => {
        dispatch(setCategory([{ label: healthFeed.category, value: healthFeed.category_code }]));
        navigate('/dashboard/show');
    };
    const redirectToShowWithTag = (value: string) => {
        dispatch(setTags([{ label: tags[value], value: value }]));
        navigate('/dashboard/show');
    };
    const openModal = (content: IFeedModalContent) => {
        setModalContent(content);
        setShowModal(true);
    };
    const openHealthFeedPlots = async (index: number, healthFeed: IHealthFeeds) => {
        try {
            await getFeedPlots(healthFeed?.id).then((healthFeedPlots) => {
                openModal({
                    graph: <iframe srcDoc={healthFeedPlots?.plots[index]} width='100%' loading="lazy" scrolling='no' height='100%' />,
                    description: healthFeed.analysis,
                    title: healthFeed.title,
                });
            });
        } catch (ex) {
            showError(ex as AxiosError<IErrorResponse>);
        }
    };
    return (
        <React.Fragment>
            <div className='card card-post mt-4'>
                <div className='card-body'>
                    <div className='post-header my-3'>
                        <Link to=''>
                            <Avatar img={bImg} />
                        </Link>
                        <div className='post-content'>
                            <h6>{healthFeed.bat_name}</h6>
                            <h6 className='fw-normal'>{healthFeed.title}</h6>
                            <span onClick={redirectToShowWithCategory}>
                                <Link to=''> {healthFeed.category}</Link>
                            </span>
                        </div>
                        <span className='post-date'>{dateFormatter(new Date(healthFeed.feed_date))}</span>
                    </div>
                    <p className='post-text'>{healthFeed.analysis}</p>
                    <p>
                        {Object.keys(tags).map((tagCode) => {
                            return (
                                <span key={tagCode} onClick={() => redirectToShowWithTag(tagCode)}>
                                    <Link to=''> #{tags[tagCode]} </Link>
                                </span>
                            );
                        })}
                    </p>
                    <LazyFeedGraphs
                        openHealthFeedPlots={openHealthFeedPlots}
                        setModalContent={setModalContent}
                        setShowModal={setShowModal}
                        healthFeeds={healthFeed}
                    />
                </div>
            </div>
            <Modal show={showModal} onHide={closeModal} dialogClassName='feedModal' centered>
                <Modal.Header closeButton>
                    <div className='post-content'>
                        <h6>{modalContent?.title}</h6>
                    </div>
                </Modal.Header>
                <Modal.Body style={{ height: '100%' }}>
                    <div className='post-content' style={{ height: '100%', overflow: 'hidden' }}>
                        <div>{modalContent?.description}</div>
                        {modalContent?.graph}
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
};

export default HealthFeedsPost;
