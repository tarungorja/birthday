import React from 'react';
import { Card } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import HealthFeedsPost from './FeedPost';
import Tag from 'rsuite/esm/Tag';
import TagGroup from 'rsuite/esm/TagGroup';
import Spinner from 'react-bootstrap/Spinner';
import SpinnerLoader from '../../components/common/SpinnerComponent';
import { toggleBatterySelection } from '../../utilities/selectedBatteriesUtil';
import { useDispatch } from 'react-redux';

export default function Feeds(props: IFeedProps) {
    const dispatch = useDispatch();
    const healthFeeds = props.healthFeeds;
    const selectedBatteries = props.selectedBatteryList;
    const handleScroll = props.handleScroll;
    const isLoadingNextFeeds = props.isLoadingNextFeeds;
    const isEndOfFeeds = props.isEndOfFeeds;
    const moduleName = props.moduleName;
    const isLoading = props.isLoading;
    const displayModuleName = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
    return (
        <React.Fragment>
            <Card className='card-one feed-list mb-1'>
                <Card.Header className='d-block'>
                    <Card.Title as='h6'>{displayModuleName} Analytics Feeds</Card.Title>
                    {selectedBatteries.length > 0 && (
                        <div className='d-flex mt-2'>
                            <TagGroup>
                                {selectedBatteries.map((selectedBattery, index) => {
                                    return (
                                        <Tag color='blue' key={index}>
                                            {selectedBattery.asset_name}
                                            <i
                                                className='align-bottom ri-close-fill ps-1 toggleBatterySelection'
                                                onClick={() => {
                                                    toggleBatterySelection(
                                                        selectedBattery,
                                                        selectedBatteries,
                                                        dispatch
                                                    );
                                                }}
                                            />
                                        </Tag>
                                    );
                                })}
                            </TagGroup>
                            {/* <Button
                                variant="primary"
                                className="btn-sm ms-auto"
                                onClick={() => {
                                    handleSearch();
                                }}
                            >
                                Search
                            </Button> */}
                        </div>
                    )}
                </Card.Header>

                {isLoading ? (
                    <SpinnerLoader />
                ) : (
                    <PerfectScrollbar id='FeedsScrollbar' onScrollY={handleScroll}>
                        <Card.Body>
                            {healthFeeds.map((healthFeed, index) => {
                                return <HealthFeedsPost key={index} healthFeed={healthFeed}></HealthFeedsPost>;
                            })}
                        </Card.Body>
                        {healthFeeds.length > 0 && isLoadingNextFeeds && (
                            <div className='text-center fs-sm text-secondary mb-5'>
                                <Spinner animation='border' role='status'>
                                    <span className='visually-hidden'>Loading...</span>
                                </Spinner>
                            </div>
                        )}
                        {healthFeeds.length > 0 && isEndOfFeeds && (
                            <div className='text-center fs-sm text-secondary mb-5'>
                                <hr className='my-3 border-0' />- End of the feeds -
                            </div>
                        )}
                        {healthFeeds.length == 0 && (
                            <div className='text-center fs-sm text-secondary mb-5'>
                                <hr className='my-3 border-0' />- No feeds generated -
                            </div>
                        )}
                    </PerfectScrollbar>
                )}
            </Card>
        </React.Fragment>
    );
}
