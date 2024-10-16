import config from '../configuration/AppConfig';
const homePage = config.HOMEPAGE ? config.HOMEPAGE: '/';
const dashboardMenu = [
    {
        label: 'Safety Module',
        link: `${homePage}dashboard/safety`,
        icon: `${homePage}moduleIcons/Safety.svg`,
        activeIcon: `${homePage}moduleIcons/ActiveSafety.svg`

    },
    {
        label: 'Health Module',
        link: `${homePage}dashboard/health`,
        icon: `${homePage}moduleIcons/Health.svg`,
        activeIcon: `${homePage}moduleIcons/ActiveHealth.svg`
    },
    {
        label: 'Operational Module',
        link: `${homePage}dashboard/operation`,
        icon: `${homePage}moduleIcons/Operational.svg`,
        activeIcon: `${homePage}moduleIcons/ActiveOperational.svg`
    },
    {
        label: 'Warranty Module',
        link: `${homePage}dashboard/warranty`,
        icon: `${homePage}moduleIcons/Warranty.svg`,
        activeIcon: `${homePage}moduleIcons/ActiveWarranty.svg`

    },
];

export { dashboardMenu };
