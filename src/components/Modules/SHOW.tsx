import React, { useEffect } from 'react';
import Header from '../../layouts/Header';
import BatteryAssetsContainer from '../../containers/common/BatteryAssetsContainer';
import FeedsContainer from '../../containers/common/FeedsContainer';
import FeedsFiltersContainer from '../../containers/common/FeedsFiltersContainer';
import { Module } from '../../enums/moduleTypes';

export default function SHOWModule() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'scroll';
        };
    }, []);

    return (
        <React.Fragment>
            <Header />
            <div className='main main-app '>
                <div className='row g-1 mx-1'>
                    <div className='col-2'>
                        <div className='card asset-section'>
                            <BatteryAssetsContainer module={Module.Health} />
                        </div>
                    </div>

                    <div className='col-7'>
                        <div className='feed-section'>
                            <FeedsContainer moduleName={Module.All} />
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className='card signal-section'>
                            <FeedsFiltersContainer />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
