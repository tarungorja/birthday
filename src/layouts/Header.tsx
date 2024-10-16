import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { Nav } from 'react-bootstrap';
import { dashboardMenu } from '../data/Menu';
import { logOut } from '../utilities/logOutUtil';
import config from '../configuration/AppConfig';
const homePage = config.HOMEPAGE ? config.HOMEPAGE : '/';
export default function Header() {
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
    const [navbarOpen] = useState(false);

    return (
        <div className='header-main px-3 px-lg-4'>
            <div className='me-auto'>
                <Link
                    to='/dashboard/health'
                    className='sidebar-logo'
                    style={{ textDecoration: 'none', color: '#0b2972' }}
                >
                    <img src={`${homePage}energenie_logo.svg`} style={{ height: '40px' }} alt='Logo' /> JioEnerGenie
                </Link>
            </div>
            <Nav className={navbarOpen ? 'nav-skin expanded' : 'nav-skin'} activeKey={location.pathname}>
                {dashboardMenu.map((module, index) => {
                    return (
                        <Nav.Item key={index}>
                            <Nav.Link as={Link} to={module.link} style={{ textDecoration: 'none' }}>
                                <img
                                    src={location.pathname === module.link ? module.activeIcon : module.icon}
                                    alt=''
                                    style={{ height: '23px', width: '30px' }}
                                />
                                {module.label}
                            </Nav.Link>
                        </Nav.Item>
                    );
                })}
            </Nav>
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
                        <nav className='nav'>
                            <div onClick={logOut} className='mb-3' style={{ cursor: 'pointer' }}>
                                <i className='ri-logout-box-r-line'></i> Log Out
                            </div>
                        </nav>
                        <hr />
                        <p className='fs-sm text-secondary'>Version-1.7.0</p>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}
