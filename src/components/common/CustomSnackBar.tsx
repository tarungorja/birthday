import React, { useState, useEffect } from 'react';
import '../../scss/components/_snackbar.scss'; // Import your CSS module

const CustomSnackbar = (props: { message: string, open: boolean }) => {
    const { open, message } = props;
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (open) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
            }, 2000);

            return () => clearTimeout(timer);
        } else {
            setShow(false);
        }
    }, [open]);

    return (
        <div className={`custom-snackbar ${show ? 'show' : 'hide'}`}>
            <span>{message}</span>
        </div>
    );

};

export default CustomSnackbar;
