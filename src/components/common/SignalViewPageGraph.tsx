import React from 'react';
import SignalTreeGraph from '../Graphs/SignalTree';
const SignalCategoryGraphs = React.lazy(() => import('../Graphs/SignalCategoryGraphs'));

const SignalViewPageGraph = (props: ISignalViewGraphProps) => {
    const { signalId, showSignalsTree, batterySignals, bat_uid } = props;
    return (
        <>
            {showSignalsTree && bat_uid ? (
                <SignalTreeGraph signalId={signalId} bat_uid={bat_uid} />
            ) : (
                <SignalCategoryGraphs batterySignals={batterySignals} />
            )}
        </>
    );
};

export default SignalViewPageGraph;
