import moment from 'moment';
const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export function dateFormatConverter(date: Date | null): string {
    if (!date) {
        return '';
    }
    const { year, month, day } = {
        year: date.getFullYear().toString().padStart(2, '0'),
        month: (date.getMonth() + 1).toString().padStart(2, '0'),
        day: date.getDate().toString().padStart(2, '0'),
    };
    return `${year}-${month}-${day}`;
}

export function dateFormatter(date: Date | null): string {
    if (!date) {
        return '';
    }
    const day = date.getDate().toString().padStart(2, '0');
    const month = monthNames[date.getMonth()]; // Get the month name
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}


export function getLastMonthStartAndEndDates(date: Date) {
    const currentMoment = moment(date);
    const startDate = currentMoment.clone().subtract(1, 'months').startOf('month');
    // const endDate = currentMoment.clone().subtract(1, 'days').endOf('month');

    return { startDate, endDate: currentMoment };
}

export function getNextMonthStartAndEndDates(date: Date) {
    const currentMoment = moment(date);
    // const startDate = currentMoment.clone().add(1, 'months').startOf('month');
    const endDate = currentMoment.clone().add(1, 'months').endOf('month');

    return { startDate: currentMoment, endDate };
}
