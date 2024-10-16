import React, { useState } from 'react';
import DummySignals from '../../components/common/DummySignals';

type DateRange = [Date, Date] | null;

const DummySignalsContainer = (props: { moduleName: string }) => {
    const [selectedDateRange, setSelectedDateRange] =
        useState<DateRange | null>(null);
    const handleDateRangeChange = (value: DateRange | null) => {
        setSelectedDateRange(value);
    };

    const [isSignalListOpen, setIsSignalListOpen] = useState(false);
    const toggleSignalList = () => {
        setIsSignalListOpen(!isSignalListOpen);
    };
    return (
        <DummySignals
            moduleName={props.moduleName}
            selectedDateRange={selectedDateRange}
            handleDateRangeChange={handleDateRangeChange}
            isSignalListOpen={isSignalListOpen}
            toggleSignalList={toggleSignalList}
        />
    );
};

export default DummySignalsContainer;
