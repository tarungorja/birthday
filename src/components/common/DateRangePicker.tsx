import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { setDateRange } from '../../actions/dateRangeAction';
import { dateFormatConverter } from '../../utilities/dateFormatConverter';

const DateRangePicker: React.FC = () => {
    const dispatch = useDispatch();
    const dateRange = useSelector((state: IState) => state.dateRange);

    const handleStartDateChange = (date: Date | null) => {
        if (date) {
            dispatch(
                setDateRange({
                    fromDate: dateFormatConverter(date),
                    toDate: dateRange.toDate,
                })
            );
        }
    };

    const handleEndDateChange = (date: Date | null) => {
        if (date) {
            dispatch(
                setDateRange({
                    fromDate: dateRange.fromDate,
                    toDate: dateFormatConverter(date),
                })
            );
        }
    };

    // const handleChange = (dates: [Date | null, Date | null] | null) => {
    //     if (dates) {
    //         const [start, end] = dates;
    //         console.log(`date1:${start}, date2:${dateRange.fromDate}`);
    //         dispatch(
    //             setDateRange({
    //                 fromDate: dateFormat(start),
    //                 toDate: dateFormat(end),
    //             })
    //         );
    //     }
    // };

    return (
        <div className="my-2 d-flex justify-content-center fs-5 date-range">
            {/* <ReactDatePicker
                dateFormat="dd/MM/yyyy"
                selected={new Date(dateRange.fromDate)}
                onChange={handleChange}
                startDate={new Date(dateRange.fromDate)}
                endDate={new Date(dateRange.toDate)}
                selectsRange
            /> */}

            <ReactDatePicker
                dateFormat="dd/MM/yyyy"
                selected={new Date(dateRange.fromDate)}
                onChange={handleStartDateChange}
                className="text-center form-control date-range-picker"
            />
            <i className="ri-arrow-right-line my-auto px-2"></i>
            <ReactDatePicker
                dateFormat="dd/MM/yyyy"
                selected={new Date(dateRange.toDate)}
                onChange={handleEndDateChange}
                minDate={new Date(dateRange.fromDate)}
                className="text-center form-control date-range-picker"
            />
        </div>
    );
};

export default DateRangePicker;
