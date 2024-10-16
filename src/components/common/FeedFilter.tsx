import React from 'react';
import { Card } from 'react-bootstrap';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import Select, { MultiValue } from 'react-select';
export default function FeedFilter(props: IFeedFilterProps) {
    const {
        tags,
        categories,
        handleTagSelection,
        handleCategorySelection,
        selectedDateRange,
        handleDateRangeChange,
        selectedCategories,
        selectedTags,
    } = props;

    return (
        <React.Fragment>
            <DateRangePicker
                className='mb-2'
                showOneCalendar
                placeholder={['Select Date Range']}
                value={selectedDateRange}
                onChange={handleDateRangeChange}
            />
            <Card className='card-one asset-list mb-1'>
                <Card.Header>
                    <Card.Title as='h6'>Filters</Card.Title>
                </Card.Header>
                <Card.Body className='px-2 d-flex flex-column'>
                    <label className='batteries-list mb-3 px-0'>Categories</label>

                    <Select
                        isMulti
                        value={selectedCategories}
                        name='category'
                        options={categories}
                        onChange={(newValue) => handleCategorySelection(newValue as IReactSelect[])}
                    />
                    <br></br>
                    <label className='batteries-list mb-3 px-0'>Tags</label>
                    <Select
                        classNamePrefix='Select Tags'
                        isMulti
                        value={selectedTags}
                        options={tags}
                        onChange={(e: MultiValue<IReactSelect>) =>
                            handleTagSelection(e as IReactSelect[])
                        }
                    />
                </Card.Body>
            </Card>
        </React.Fragment>
    );
}

