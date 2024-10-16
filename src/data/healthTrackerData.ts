const batteries = [
    { name: 'BAT 0089_1', model: 'Vision48V100Ah' },
    { name: 'BAT 0089_2', model: 'Vision48V100Ah' },
    { name: 'BAT 0089_3', model: 'Vision48V100Ah' },
    { name: 'BAT 4228_1', model: 'Vision48V100Ah' },
    { name: 'BAT 4228_2', model: 'Vision48V100Ah' },
    { name: 'BAT 4228_3', model: 'Vision48V100Ah' },
    { name: 'BAT 4228_4', model: 'Vision48V100Ah' },
    { name: 'BAT 4228_5', model: 'Vision48V100Ah' },
    { name: 'BAT 0059_1', model: 'Vision48V100Ah' },
    { name: 'BAT 0059_2', model: 'Vision48V100Ah' },
    { name: 'BAT 0059_3', model: 'Vision48V100Ah' },
    { name: 'BAT 0059_4', model: 'Vision48V100Ah' },
    { name: 'BAT 0059_5', model: 'Vision48V100Ah' },
    { name: 'BAT 1516_1', model: 'Vision48V100Ah' },
    { name: 'BAT 1516_2', model: 'Vision48V100Ah' },
    { name: 'BAT 1516_3', model: 'Vision48V100Ah' },
    { name: 'BAT 1516_4', model: 'Vision48V100Ah' },
    { name: 'BAT 2260_1', model: 'Vision48V100Ah' },
    { name: 'BAT 2260_2', model: 'Vision48V100Ah' },
    { name: 'BAT 2260_3', model: 'Vision48V100Ah' },
    { name: 'BAT 2260_4', model: 'Vision48V100Ah' },
    { name: 'BAT 2260_5', model: 'Vision48V100Ah' },
    { name: 'BAT 2271_1', model: 'Vision48V100Ah' },
    { name: 'BAT 2271_2', model: 'Vision48V100Ah' },
    { name: 'BAT 2271_3', model: 'Vision48V100Ah' },
    { name: 'BAT 2271_4', model: 'Vision48V100Ah' },
    { name: 'BAT 9056_1', model: 'Vision48V100Ah' },
    { name: 'BAT 9056_2', model: 'Vision48V100Ah' },
    { name: 'BAT 9056_3', model: 'Vision48V100Ah' },
];
const recentlyViewedBatteries = [
    { name: 'BAT 2271_4', model: 'Vision48V100Ah' },
    { name: 'BAT 9056_1', model: 'Vision48V100Ah' },
    { name: 'BAT 9056_2', model: 'Vision48V100Ah' },
];
// const health : [
//     {
//         title: 'SoH Degradation Warning',
//         description:
//             'The State of Health (SoH) of the battery has degraded beyond an acceptable threshold (80%)',
//         date: new Date('Sept 05, 2023 01:15:00'),
//     },
//     {
//         title: 'Capacity Degradation Warning',
//         description:
//             'The batterys capacity has fallen below a specified threshold (80Ah)',
//         date: new Date('Aug 28, 2023 01:15:00'),
//     },
//     {
//         title: 'Cell Voltage Imbalance',
//         description:
//             'Significant voltage differences have been detected among individual cells in the battery',
//         date: new Date('Aug 28, 2023 01:15:00'),
//     },
//     {
//         title: 'High Self-Discharge Rate',
//         description:
//             'The battery is exhibiting a higher-than-normal self-discharge rate, which can indicate internal issues.',
//         date: new Date('Aug 30, 2023 01:15:00'),
//     },
//     {
//         title: 'Cycle Life Exceeded',
//         description:
//             'The battery has undergone more charge-discharge cycles than its rated cycle life.',
//         date: new Date('Aug 31, 2023 01:15:00'),
//     },
//     {
//         title: 'Unexpected State of Charge (SoC) Decline',
//         description:
//             'Battery level experienced an abrupt decrease from 60% to 55%. Observed the Cell voltages are imbalanced.'
//     },
//     {
//         title: 'Unexpected pack voltage decline',
//         description:
//             'The pack voltage experienced an abrupt drop from 49.5 to 49 volts. Such abrupt voltage changes might imply internal resistance, cell degradation, or a possible imbalance within the battery pack.'
//     },
//     {
//         title: 'Unexpected State of Charge (SoC) Surge',
//         description:
//             'Battery level experienced an abrupt increase from 60% to 55%. Battery was in idle/charging state'
//     },
//     {
//         title: 'Unexpected Pack Voltage ',
//         description:
//             'The pack voltage experienced a sudden spike from 53 to 54 volts. Battery was not detected in charging state.'
//     }
// ];
// const operational = [
//     {
//         title: "Rapid fluctuations in the battery's state",
//         description:
//             'There are rapid fluctuations in the battery\'s state, switching frequently between charging and discharging phases.',
//     },
// ];
// const safety = [
//     {
//         title: 'Pack voltage crossed 54V during charging.',
//         description:
//             'Pack Voltage reached 54.89V. Battery was in charging. Recommended pack voltage range is 48V-54V'
//     },
//     {
//         title: 'Switching frequently between charging and discharging phases',
//         description:
//             'There are rapid fluctuations in the battery\'s state since 2hrs, might lead to elevated heat generation within the battery.'
//     }

// ];
// const warrenty = [
//     {
//         title: 'Battery is low !',
//         description: '20% battery remaining. Recommended SoC range is 20-100%.'
//     },
//     {
//         title: 'Battery is low !',
//         description: '20% battery remaining. Recommended SoC range is 20-100%.'
//     },
//     {
//         title: 'Battery is low !',
//         description: '20% battery remaining. Recommended SoC range is 20-100%.'
//     }
// ];

const signals = {
    health: [
        {
            title: 'SoH Degradation Warning',
            description:
                'The State of Health (SoH) of the battery has degraded beyond an acceptable threshold (80%)',
            date: new Date('Sept 05, 2023 01:15:00'),
        },
        {
            title: 'Capacity Degradation Warning',
            description:
                'The batterys capacity has fallen below a specified threshold (80Ah)',
            date: new Date('Aug 30, 2023 01:15:00'),
        },
        {
            title: 'Cell Voltage Imbalance',
            description:
                'Significant voltage differences have been detected among individual cells in the battery',
            date: new Date('Aug 28, 2023 01:15:00'),
        },
        {
            title: 'High Self-Discharge Rate',
            description:
                'The battery is exhibiting a higher-than-normal self-discharge rate, which can indicate internal issues.',
            date: new Date('Aug 28, 2023 01:15:00'),
        },
        {
            title: 'Cycle Life Exceeded',
            description:
                'The battery has undergone more charge-discharge cycles than its rated cycle life.',
            date: new Date('Aug 27, 2023 01:15:00'),
        },
        {
            title: 'Unexpected State of Charge (SoC) Decline',
            description:
                'Battery level experienced an abrupt decrease from 60% to 55% while discharging.',
            date: new Date('Aug 26, 2023 01:15:00'),
        },
        {
            title: 'Unexpected pack voltage decline',
            description:
                'While discharging  pack voltage experienced an abrupt drop from 49.5 to 49 volts.',
            date: new Date('Aug 26, 2023 01:15:00'),
        },
        {
            title: 'Unexpected State of Charge (SoC) Surge',
            description:
                'Battery level experienced an abrupt increase from 60% to 70% while charging.',
            date: new Date('Aug 25, 2023 01:15:00'),
        },
        {
            title: 'Unexpected Spike in Pack Voltage ',
            description:
                'The pack voltage experienced a sudden spike from 53 to 54 volts while charging.',
            date: new Date('Aug 24, 2023 01:15:00'),
        }
    ],
    warranty: [
        {
            title: 'Battery is low !',
            description: '20% battery remaining. Recommended SoC range is 20-100%.',
            date: new Date('Sept 05, 2023 01:15:00'),
        },
        {
            title: 'Battery is low !',
            description: '20% battery remaining. Recommended SoC range is 20-100%.',
            date: new Date('Sept 04, 2023 01:15:00'),
        },
        {
            title: 'Battery is low !',
            description: '20% battery remaining. Recommended SoC range is 20-100%.',
            date: new Date('Sept 03, 2023 01:15:00'),
        }
    ],
    safety: [
        {
            title: 'Pack voltage crossed 54V during charging.',
            description:
                'While battery was charging pack voltage reached 54.89V. Recommended pack voltage range is 48V-54V.',
            date: new Date('Sept 05, 2023 01:15:00'),
        },
        {
            title: 'Switching frequently between charging and discharging phases',
            description:
                'There are rapid fluctuations in the battery\'s state since 2hrs, might lead to elevated heat generation within the battery.',
            date: new Date('Sept 04, 2023 01:15:00'),
        }

    ],
    operational: [
        {
            title: 'Rapid fluctuations in the battery\'s state',
            description:
                'There are rapid fluctuations in the battery\'s state, switching frequently between charging and discharging phases.',
            date: new Date('Sept 05, 2023 01:15:00'),
        },
    ]
};

export { batteries, recentlyViewedBatteries, signals };
