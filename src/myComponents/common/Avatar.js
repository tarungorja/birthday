import React from 'react';
import PropTypes from 'prop-types';
export default function Avatar(props) {
    if (props.img) {
        return (
            <div className={`avatar ${props.size ? 'avatar-' + props.size : ''} ${props.shape ? 'avatar-' + props.shape : ''} ${props.status ? props.status : ''}`}>
                <img src={props.img} alt="" />
            </div>
        );

    } else if (props.initial) {
        return (
            <div className={`avatar ${props.size ? 'avatar-' + props.size : ''} ${props.shape ? 'avatar-' + props.shape : ''} ${props.status ? props.status : ''}`}>
                <span className="avatar-initial">{props.initial}</span>
            </div>
        );
    }
}


Avatar.propTypes = {
    img: PropTypes.string, // Expected to be a string
    size: PropTypes.string, // Expected to be a string
    shape: PropTypes.string, // Expected to be a string
    status: PropTypes.string, // Expected to be a string
    initial: PropTypes.string, // Expected to be a string
};