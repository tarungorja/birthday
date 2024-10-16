import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card } from 'react-bootstrap';
import Avatar from './Avatar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import bImg from '../../assets/img/battery-icon.png';

function DummyBatteryAssets(props: IDummyBatteryAssets) {
    const { isListOpen, toggleList, batteryData, toggleBatterySelection, selectedBatteries } = props;
    const recentlyViewedBatteries = batteryData.slice(0, 3);
    return (
        <React.Fragment>
            <Card className="card-one asset-list mb-1">
                <Card.Header>
                    <Card.Title as="h6">Battery Assets</Card.Title>
                </Card.Header>
                <PerfectScrollbar>
                    <Card.Body className="px-1">
                        <label className="batteries-list mb-2 px-0 ps-1">
                            All Batteries
                        </label>
                        <div className="battery-asset">
                            {batteryData.map((battery) => (
                                <div
                                    key={battery.bat_uid}
                                    className={`battery-item unread ${(selectedBatteries.find(sBattery => sBattery.bat_uid == battery.bat_uid) ? true : false) ? 'selected' : ''}`}
                                >
                                    <Avatar img={bImg} />
                                    <div className="battery-item-body">
                                        <div className="d-flex align-items-center mb-1">
                                            <h6 className="battery-assets mb-0">
                                                {battery.asset_name}
                                            </h6>
                                        </div>
                                        <span>{battery.model}</span>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={selectedBatteries.find(sBattery => sBattery.bat_uid == battery.bat_uid) ? true : false}
                                        onChange={() => {
                                            toggleBatterySelection(battery);
                                        }}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                        }}
                                    />
                                </div>
                            ))}

                            <div className="text-center fs-sm text-secondary">
                                <hr className='my-3 border-0' />
                                - End of the List -
                            </div>
                        </div>
                    </Card.Body>
                </PerfectScrollbar>
                <div className="asset-list-footer" id='recently-viewed-list'>
                    <div className="asset-list-footer-top pe-2">
                        <label className="ps-1"> Recently Viewed</label>
                        <div onClick={toggleList} className="dropdown-link">
                            <i className="ri-arrow-down-s-line"></i>
                        </div>
                    </div>
                    {isListOpen && (
                        <div className="battery-asset">
                            {recentlyViewedBatteries.map((battery) => (
                                <div
                                    key={battery.bat_uid}
                                    className={`battery-item unread ${selectedBatteries.find(sBattery => sBattery.bat_uid === battery.bat_uid) ? 'selected' : ''}`}
                                >
                                    <Avatar img={bImg} />
                                    <div className="battery-item-body">
                                        <div className="d-flex align-items-center mb-1">
                                            <h6 className="mb-0 ">
                                                {battery.asset_name}
                                            </h6>
                                        </div>
                                        <span>{battery.model}</span>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={selectedBatteries.find(sBattery => sBattery.bat_uid == battery.bat_uid) ? true : false}
                                        onChange={(event) => {
                                            event.stopPropagation();
                                            // console.log(event);
                                            toggleBatterySelection(battery);
                                        }}
                                        onClick={(event) => event.stopPropagation()}
                                    />
                                </div>
                            ))}  <div className="text-center fs-sm text-secondary">
                                <hr className='my-3 border-0' />
                                - End of the List -
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        </React.Fragment >
    );
}

export default DummyBatteryAssets;
