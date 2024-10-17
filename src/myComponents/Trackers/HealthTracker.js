import React, { useEffect } from 'react';
import Feeds from '../common/Feeds';
// import { Link } from 'react-router-dom';
import Signals from '../common/Signals';
import BatteryAssets from '../common/BatteryAssets';

export default function HealthTracker() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => (document.body.style.overflow = 'scroll');
    });
    return (
        <React.Fragment>
            <div className="main main-app">
                <div className="row g-1 mx-1">
                    <div className="col-2">
                        <div className="card asset-section">
                            <BatteryAssets />
                        </div>
                    </div>
                    <div className="col-7">
                        <div className="card feed-section">
                            <div className="d-md-flex align-items-center justify-content-between mb-2">
                                <div>
                                    <ol className="breadcrumb fs-sm mb-1">
                                        <li
                                            className="breadcrumb-item active"
                                            aria-current="page"
                                        >
                                            Health Feed
                                        </li>
                                    </ol>
                                </div>
                            </div>
                            <Feeds />
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card signal-section">
                            <Signals />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
