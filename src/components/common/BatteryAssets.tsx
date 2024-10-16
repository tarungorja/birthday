import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Button, Card } from 'react-bootstrap';
import Avatar from './Avatar';
import Spinner from 'react-bootstrap/Spinner';
import 'react-perfect-scrollbar/dist/css/styles.css';
import bImg from '../../assets/img/battery-icon.png';
import { useDispatch, useSelector } from 'react-redux';
import SpinnerLoader from './SpinnerComponent';
import { toggleBatterySelection } from '../../utilities/selectedBatteriesUtil';

function BatteryAssets(props: IBatteryAssetsProps) {
    const dispatch = useDispatch();
    const {
        isListOpen,
        toggleList,
        isLoading,
        batteriesList,
        isEndOfBatteries,
        isLoadingNextBatteries,
        handleScrollEnd,
        selectedBatteries,
        openViewPage,
        handleBatteriesSearch,
        searchAssetName,
        setSearchAssetName,
        clearBatteriesSearch,
    } = props;
    const recentlyViewedBatteries: IBatteryData[] = JSON.parse(localStorage.getItem('recentlyViewedBatteries') || '[]');
    const selectedBatteryList = useSelector((state: IState) => {
        return state.selectedBatteryList;
    });
    return (
        <React.Fragment>
            <Card className='card-one asset-list mb-1'>
                <Card.Header>
                    <Card.Title as='h6'>Battery Assets</Card.Title>
                </Card.Header>
                <label className=' d-flex batteries-list my-1 px-0 ps-1'>
                    <div className='input-group input-group-default me-1'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Search Battery'
                            value={searchAssetName}
                            onChange={(e) => setSearchAssetName(e.target.value)}
                        ></input>
                        {searchAssetName && (
                            <Button
                                variant='outline-secondary p-2px'
                                style={{
                                    border: 'var(--bs-border-width) solid var(--bs-border-color)',
                                }}
                                onClick={clearBatteriesSearch}
                            >
                                <i className='ri-close-line p-1'></i>
                            </Button>
                        )}
                        <Button
                            variant='secondary p-2px'
                            style={{
                                border: 'var(--bs-border-width) solid var(--bs-border-color)',
                            }}
                            onClick={() => handleBatteriesSearch(searchAssetName)}
                        >
                            <i className='ri-search-2-line p-1'></i>
                        </Button>
                    </div>
                </label>
                {isLoading ? (
                    <SpinnerLoader />
                ) : (
                    <PerfectScrollbar id='BatteriesListScrollbar' onYReachEnd={handleScrollEnd}>
                        <Card.Body className='px-1' style={{ minHeight: '99vh' }}>
                            <div className='battery-asset'>
                                {batteriesList.map((battery) => (
                                    <div
                                        key={battery.bat_uid}
                                        className={`battery-item unread ${
                                            (
                                                selectedBatteries.find(
                                                    (sBattery) => sBattery.bat_uid == battery.bat_uid
                                                )
                                                    ? true
                                                    : false
                                            )
                                                ? 'selected'
                                                : ''
                                        }`}
                                        onClick={() => openViewPage(battery)}
                                    >
                                        <Avatar img={bImg} />
                                        <div className='battery-item-body'>
                                            <div className='d-flex align-items-center mb-1'>
                                                <h6 className='battery-assets mb-0'>{battery.asset_name}</h6>
                                            </div>
                                            <span>{battery.model ? battery.model : battery.bat_uid}</span>
                                        </div>
                                        <input
                                            type='checkbox'
                                            checked={
                                                selectedBatteries.find(
                                                    (sBattery) => sBattery.bat_uid == battery.bat_uid
                                                )
                                                    ? true
                                                    : false
                                            }
                                            onChange={() => {
                                                toggleBatterySelection(battery, selectedBatteryList, dispatch);
                                            }}
                                            onClick={(event) => {
                                                event.stopPropagation();
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                        {batteriesList.length > 0 && isLoadingNextBatteries && (
                            <div className='text-center fs-sm text-secondary mb-5'>
                                <Spinner animation='border' role='status'>
                                    <span className='visually-hidden'>Loading...</span>
                                </Spinner>
                            </div>
                        )}
                        {batteriesList.length > 0 && isEndOfBatteries && (
                            <div className='text-center fs-sm text-secondary mb-5'>
                                <hr className='my-3 border-0' />- End of the Batteries -
                            </div>
                        )}
                        {batteriesList.length == 0 && (
                            <div className='text-center fs-sm text-secondary mb-5'>
                                <hr className='my-3 border-0' />- No Batteries generated -
                            </div>
                        )}
                    </PerfectScrollbar>
                )}
                <div className='asset-list-footer' id='recently-viewed-list'>
                    <div className='asset-list-footer-top pe-2'>
                        <label className='ps-1'> Recently Viewed</label>
                        <div onClick={toggleList} className='dropdown-link'>
                            <i className='ri-arrow-down-s-line'></i>
                        </div>
                    </div>
                    {isListOpen && recentlyViewedBatteries && (
                        <div className='battery-asset'>
                            {recentlyViewedBatteries.map((battery) => (
                                <div
                                    key={battery.bat_uid}
                                    className={`battery-item unread ${
                                        selectedBatteries.find((sBattery) => sBattery.bat_uid === battery.bat_uid)
                                            ? 'selected'
                                            : ''
                                    }`}
                                    onClick={() => openViewPage(battery)}
                                >
                                    <Avatar img={bImg} />
                                    <div className='battery-item-body'>
                                        <div className='d-flex align-items-center mb-1'>
                                            <h6 className='mb-0 '>{battery.asset_name}</h6>
                                        </div>
                                        <span>{battery.model}</span>
                                    </div>
                                    <input
                                        type='checkbox'
                                        checked={
                                            selectedBatteries.find((sBattery) => sBattery.bat_uid == battery.bat_uid)
                                                ? true
                                                : false
                                        }
                                        onChange={(event) => {
                                            event.stopPropagation();
                                            // console.log(event);
                                            toggleBatterySelection(battery, selectedBatteryList, dispatch);
                                        }}
                                        onClick={(event) => event.stopPropagation()}
                                    />
                                </div>
                            ))}
                            <div className='text-center fs-sm text-secondary'>
                                <hr className='my-3 border-0' />- End of the List -
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        </React.Fragment>
    );
}

export default BatteryAssets;
