import React from 'react';
import ReleaseNotes from '../pages/ReleaseNotes';
import DeploymentInfo from '../pages/DeploymentInfo';
import VersionReleaseNotes from '../pages/VersionReleaseNotes';

// Lazy load the components using dynamic imports
const SafetyModule = React.lazy(() => import('../components/Modules/Safety'));
const HealthModule = React.lazy(() => import('../components/Modules/Health'));
const OperationalModule = React.lazy(() => import('../components/Modules/Operational'));
const WarrantyModule = React.lazy(() => import('../components/Modules/Warranty'));
const SHOWModule = React.lazy(() => import('../components/Modules/SHOW'));

const HealthViewContainer = React.lazy(() => import('../containers/common/HealthViewContainer'));
const OperationalViewContainer = React.lazy(() => import('../containers/common/OperationalViewContainer'));
const WarrantyViewContainer = React.lazy(() => import('../containers/common/WarrantyViewContainer'));
const SafetyViewContainer = React.lazy(() => import('../containers/common/SafetyViewContainer'));
const SignalViewContainer = React.lazy(() => import('../containers/common/SignalViewContainer'));
const Testing = React.lazy(() => import('../components/AUC/AUC_PDF'));
const AUCPageContainer = React.lazy(() => import('../containers/common/AUCPageContainer'));
// import WorkInProgress from '../pages/WorkinProgress';

const protectedRoutes = [
    { path: '/dashboard/safety', element: <SafetyModule /> },
    { path: '/dashboard/health', element: <HealthModule /> },
    { path: '/dashboard/operation', element: <OperationalModule /> },
    { path: '/dashboard/warranty', element: <WarrantyModule /> },
    { path: '/dashboard/show', element: <SHOWModule /> },
    { path: '/health-feed/health-view-page/:batteryUId', element: <HealthViewContainer /> },
    { path: '/dashboard/signals-view-page/:signal_id', element: <SignalViewContainer /> },
    { path: '/operational-feed/operational-view-page/:batteryUId', element: <OperationalViewContainer /> },
    { path: '/warranty-feed/warranty-view-page/:batteryUId', element: <WarrantyViewContainer /> },
    { path: '/safety-feed/safety-view-page/:batteryUId', element: <SafetyViewContainer /> },
    { path: '/auc', element: <Testing /> },
    { path: '/auc-page/:batteryId', element: <AUCPageContainer /> },
    { path: '/release-notes', element: <ReleaseNotes /> },
    { path: '/release-notes/:version', element: <VersionReleaseNotes /> },
    { path: '/deployment-info', element: <DeploymentInfo /> },
];

export default protectedRoutes;
