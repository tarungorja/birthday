import React, { Component, MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { dashboardMenu } from '../data/Menu';

interface IProps { }

interface IState {
    isFooterMenuShow: boolean;
    selectedBattery: number | null;
}

export default class Sidebar extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isFooterMenuShow: false,
            selectedBattery: null,
        };
    }

    toggleFooterMenu = (e: MouseEvent) => {
        e.preventDefault();
        this.setState((prevState) => ({
            isFooterMenuShow: !prevState.isFooterMenuShow,
        }));
    };

    render() {
        return (
            <div className="sidebar">
                <div className="sidebar-header">
                    <img
                        src="/Jio-Logo-Navi-256.png"
                        style={{ height: '70px' }}
                        alt="Logo"
                    />
                </div>
                <PerfectScrollbar
                    className="sidebar-body"
                >
                    <SidebarMenu
                        onUpdateSize={() => {
                        }}
                    />
                </PerfectScrollbar>
            </div>
        );
    }
}

class SidebarMenu extends Component<{
    onUpdateSize: () => void;
}> {
    removeSidebarShowClass = () => {
        document.querySelector('body')?.classList.remove('sidebar-show');
    };

    populateMenu = (m: IMenu[]) => {
        const menu = m.map((m, key) => {
            return (
                <li key={key} className="nav-item">
                    <NavLink
                        to={m.link}
                        className="nav-link"
                        onClick={this.removeSidebarShowClass}
                    >
                        <i className={m.icon}></i> <span>{m.label}</span>
                    </NavLink>
                </li>
            );
        });

        return <ul className="nav nav-sidebar">{menu}</ul>;
    };

    // Toggle menu group
    toggleMenu = (e: MouseEvent) => {
        e.preventDefault();

        const parent = (e.target as HTMLElement).closest('.nav-group');
        parent?.classList.toggle('show');

        this.props.onUpdateSize();
    };

    // Toggle submenu while closing siblings' submenu
    toggleSubMenu = (e: MouseEvent) => {
        e.preventDefault();

        const parent = (e.target as HTMLElement).closest('.nav-item');
        let node = parent?.parentNode?.firstChild;

        while (node) {
            if (node !== parent && node.nodeType === Node.ELEMENT_NODE) {
                const elementNode = node as HTMLElement;
                elementNode.classList.remove('show');
            }
            node = node.nextSibling;
        }
        parent?.classList.toggle('show');

        this.props.onUpdateSize();
    };

    render() {
        return (
            <React.Fragment>
                <div className="nav-group show">
                    <div className="nav-label" onClick={this.toggleMenu}>
                        Dashboard
                    </div>
                    {this.populateMenu(dashboardMenu)}
                </div>
            </React.Fragment>
        );
    }
}

window.addEventListener('click', function (e) {
    // Close sidebar footer menu when clicked outside of it
    const tar = e.target as HTMLElement;
    const sidebar = document.querySelector('.sidebar');
    if (!tar.closest('.sidebar-footer') && sidebar) {
        sidebar.classList.remove('footer-menu-show');
    }

    // Hide sidebar offset when clicked outside of sidebar
    if (!tar.closest('.sidebar') && !tar.closest('.menu-link')) {
        document.querySelector('body')?.classList.remove('sidebar-show');
    }
});

window.addEventListener('load', function () {
    const skinMode = localStorage.getItem('sidebar-skin');
    const HTMLTag = document.querySelector('html');

    if (skinMode) {
        HTMLTag?.setAttribute('data-sidebar', skinMode);
    }
});
