import React, { useEffect } from 'react';
import Header from '../../layouts/Header';
import BatteryAssetsContainer from '../../containers/common/BatteryAssetsContainer';
import { Module } from '../../enums/moduleTypes';
import FeedsContainer from '../../containers/common/FeedsContainer';
import SignalsContainer from '../../containers/common/SignalsContainer';

export default function SafetyModule() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'scroll';
        };
    }, []);

    return (
        <React.Fragment>
            <Header />
            <div className="main main-app ">
                <div className="row g-1 mx-1">
                    <div className="battery-asset-container col-2">
                        <div className="card asset-section">
                            <BatteryAssetsContainer module={Module.Safety} />
                        </div>
                    </div>

                    <div className="feeds-container col-7">
                        <div className="feed-section">
                            <FeedsContainer moduleName={Module.Safety} />
                        </div>
                    </div>
                    <div className="signals-container col-3">
                        <div className="card signal-section">
                            <SignalsContainer moduleName={Module.Safety} />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
