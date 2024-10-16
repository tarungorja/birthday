import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const SpinnerLoader: React.FC = () => {
    return (
        <div className="d-flex justify-content-center align-items-center h-100">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
};

export default SpinnerLoader;
