import {
    applyMiddleware,
    combineReducers,
    legacy_createStore as createStore,
} from 'redux';
import thunk from 'redux-thunk';
import batteryListReducer from './reducers/batteryListReducer';
import dateRangeReducer from './reducers/dateRangeReducer';
import selectedBatteryIdReducer from './reducers/selectBatteryReducer';
import selectedBatteryListReducer from './reducers/selectBatteryListReducer';
import batteriesSearchReducer from './reducers/batteriesSearchReducer';
import selectTagReducer from './reducers/selectTagReducer';
import selectCategoryReducer from './reducers/selectCategoryReducer';

const rootReducer = combineReducers({
    batteryList: batteryListReducer,
    dateRange: dateRangeReducer,
    selectedBatteryId: selectedBatteryIdReducer,
    selectedBatteryList: selectedBatteryListReducer,
    batteriesSearchClicked: batteriesSearchReducer,
    selectedTags: selectTagReducer,
    selectedCategories: selectCategoryReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
