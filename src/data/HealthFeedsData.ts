import {
    stateOfHealthImg,
    anomalyVoltImg,
    voltageImg,
    anomlySocImg,
} from './sampleImage';
export const feedsData = [
    {
        tags: ['Weekly'],
        category: 'State of Health',
        title: 'Battery State of Health is 100%',
        desc: 'Battery State of Health (SoH) at 100% signifies that your battery is in excellent condition. This optimal state ensures that your battery is performing at its peak efficiency, providing reliable and consistent energy storage',
        plotsSrc: ['../plots/StateOfHealth.html'],
        imgSrc: [stateOfHealthImg],
    },
    {
        tags: ['Weekly', 'Voltage', 'DropSpikes'],
        category: 'Anomaly',
        title: 'Sudden Fluctuation in Voltage',
        desc: 'We have observed 3 sudden spikes and 3 dips in the pack voltage level of battery, indicating irregular behaviour that requires immediate attention to maintain battery stability and performance.',
        plotsSrc: ['../plots/Anomaly_Volt.html', '../plots/StateOfHealth.html'],
        imgSrc: [anomalyVoltImg, stateOfHealthImg],
    },
    {
        tags: ['Weekly', 'CellVoltageDifference', 'CapacityByVoltage'],
        category: 'Voltage',
        title: 'Capacity Degradation by cell voltages',
        desc: 'When battery SoC is 100%, Max Cell voltage(cell 9) is 3709mv and min cell voltage(cell 13) is 3405mv. Cell voltage difference of cell 13 is 3405 mV and cell 8 is 3510 mV compared to max cell voltage.',
        plotsSrc: ['../plots/Voltage.html'],
        imgSrc: [voltageImg],
    },
    {
        tags: ['Weekly', 'StateOfCharge', 'DropSpikes'],
        category: 'Anomaly',
        title: 'Sudden Fluctuation in SoC',
        desc: 'We have observed 4 sudden spikes and 4 sudden dips in the State of Charge (SoC) level of battery, indicating irregular behaviour that requires immediate attention to maintain battery stability and performance.',
        plotsSrc: ['../plots/Anomaly_SOC.html'],
        imgSrc: [anomlySocImg],
    },
];
