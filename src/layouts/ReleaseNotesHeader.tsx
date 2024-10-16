import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import config from '../configuration/AppConfig';
const homePage = config.HOMEPAGE ? config.HOMEPAGE : '/';

const ReleaseNotesHeader = () => {
    const CustomToggle = React.forwardRef<HTMLAnchorElement, ICustomToggleProps>(({ children, onClick }, ref) => (
        <Link
            to=''
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className='dropdown-link'
        >
            {children}
        </Link>
    ));
    CustomToggle.displayName = 'CustomToggle';

    return (
        <div className='header-main px-3 px-lg-4'>
            <div className='me-auto'>
                <Link to='/release-notes' className='sidebar-logo' style={{ textDecoration: 'none', color: '#0b2972' }}>
                    <img src={`${homePage}energenie_logo.svg`} style={{ height: '40px' }} alt='Logo' /> JioEnerGenie
                </Link>
            </div>

            <Dropdown className='dropdown-profile ms-3 ms-xl-4' align='end'>
                <Dropdown.Toggle as={CustomToggle}>
                    <div className='avatar'>
                        <span className={'avatar-initial fs-20'}>
                            <i className='ri-user-3-fill'></i>
                        </span>
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className='mt-10-f'>
                    <div className='dropdown-menu-body'>
                        <p className='fs-sm text-secondary'>Version-1.6.0</p>
                        <Link to='/release-notes' className='fs-sm release-notes' target='_blank'>
                            Release Notes
                        </Link>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default ReleaseNotesHeader;
