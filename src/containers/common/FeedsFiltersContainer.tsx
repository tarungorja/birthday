import React, { useEffect, useState } from 'react';
import FeedFilter from '../../components/common/FeedFilter';
import { useDispatch, useSelector } from 'react-redux';
import { setDateRange } from '../../actions/dateRangeAction';
import { dateFormatConverter } from '../../utilities/dateFormatConverter';
import { setTags } from '../../actions/selectTagAction';
import { setCategory } from '../../actions/selectCategoryAction';
import { getTagsData } from '../../api/tagsApi';
import { getCategoryData } from '../../api/categoryApi';
import { useError } from '../../Contexts/ErrorContext';
import { AxiosError } from 'axios';
type DateRange = [Date, Date] | null;

const FeedsFiltersContainer = () => {
    const { showError } = useError();
    const dispatch = useDispatch();
    const dateRange = useSelector((state: IState) => state.dateRange);
    const fromDate = dateRange.fromDate ? new Date(dateRange.fromDate) : null;
    const toDate = dateRange.toDate ? new Date(dateRange.toDate) : null;
    const selectedDateRange: DateRange = fromDate && toDate ? [fromDate, toDate] : null;
    const selectedBatteryList = useSelector((state: IState) => {
        return state.selectedBatteryList;
    });
    const selectedCategories = useSelector((state: IState) => {
        return state.selectedCategories;
    });
    const selectedTags = useSelector((state: IState) => {
        return state.selectedTags;
    });
    const [tags, setTagsList] = useState<IReactSelect[] | { name: string; value: string; }[]>([]);
    const [categories, setCategoriesList] = useState<IReactSelect[] | { name: string; value: string; }[]>([]);

    const handleDateRangeChange = (value: DateRange | null) => {
        if (value) {
            dispatch(
                setDateRange({
                    fromDate: dateFormatConverter(value[0]),
                    toDate: dateFormatConverter(value[1]),
                })
            );
        } else {
            dispatch(
                setDateRange({
                    fromDate: '',
                    toDate: '',
                })
            );
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                setTagsList(convertDataToMultiSelectFormat(await getTagsData()));
                setCategoriesList(convertDataToMultiSelectFormat(await getCategoryData()));
            } catch (ex) {
                showError(ex as AxiosError<IErrorResponse>);
            }
        };
        fetchData();
    }, []);

    const convertDataToMultiSelectFormat = (data: [{ name: string; code: string; }]) => {
        return data.map((element) => {
            return { label: element.name, value: element.code };
        });
    };
    const handleTagSelection = (value: IReactSelect[]) => {
        dispatch(setTags(value));
    };
    const handleCategorySelection = (value: IReactSelect[]) => {
        dispatch(setCategory(value));
    };
    return (
        <FeedFilter
            selectedCategories={selectedCategories}
            selectedTags={selectedTags}
            tags={tags as IReactSelect[]}
            categories={categories as IReactSelect[]}
            selectedBatteryList={selectedBatteryList}
            selectedDateRange={selectedDateRange}
            handleDateRangeChange={handleDateRangeChange}
            handleTagSelection={handleTagSelection}
            handleCategorySelection={handleCategorySelection}
        />
    );
};

export default FeedsFiltersContainer;
