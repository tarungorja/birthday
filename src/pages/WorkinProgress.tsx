import React from 'react';
import Header from '../layouts/Header';
import seImg from '../assets/svg/software_engineer.svg';
import ppImg from '../assets/svg/pair_programming.svg';

const WorkInProgress = (props: { moduleName: string }) => {
    const moduleName = props.moduleName;

    const isView = moduleName == 'safetyView' || moduleName == 'warrantyView' ? true : false;
    const viewMsg = isView && moduleName == 'safetyView' ? 'Safety View is Work In Progress' : 'Warranty View is Work In Progress';
    const feedMsg = moduleName == 'safety' ? 'Safety Analytics Feeds are Work In Progress' : 'Warranty Analytics Feeds are Work In Progress';
    return (
        <React.Fragment>
            {isView && (
                <Header />
            )}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}>

                {isView && (
                    <React.Fragment>
                        
                        <img
                            src={ppImg}
                            alt=""
                            style={{ height: '300px', width: '500px' }}>
                        </img>
                        <h5 className='mt-3'>{viewMsg}</h5>
                    </React.Fragment>
                )}
                {!isView && (
                    <React.Fragment>
                        <img
                            src={seImg}
                            alt=""
                            style={{ height: '300px', width: '500px' }}>
                        </img>
                        <h5 className='mt-3'>{feedMsg}</h5>
                    </React.Fragment>
                )}
            </div>
        </React.Fragment>
    );
};

export default WorkInProgress;