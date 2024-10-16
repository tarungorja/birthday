import { setSelectedBatteryIds } from '../actions/selectBatteryListAction';
import { Dispatch } from 'redux';


export const toggleBatterySelection = (
    selectedBattery: IBatteryData,
    selectedBatteryList: IBatteryData[],
    dispatch: Dispatch
) => {
    if (selectedBatteryList.find(sBattery => sBattery.bat_uid == selectedBattery.bat_uid) ? true : false) {
        dispatch(
            setSelectedBatteryIds(
                selectedBatteryList.filter(
                    (battery) => battery.bat_uid !== selectedBattery.bat_uid
                )
            )
        );
    } else {
        dispatch(
            setSelectedBatteryIds([...selectedBatteryList, selectedBattery])
        );
    }
};
