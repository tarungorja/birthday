

battery_metadata = [
    {
        "bat_uid": "PAJRdGT0GMkZNj1U_1",
        "asset_name": "BAT 9056_1",
        "model": "Vision48V100Ah",
        "chemistry": "LFP",
        "manufacturer": "Vision",
        "battery_type": "Stationary",
        "comissioned_on": "14-02-2023",
        "used_in": "Telecom Site",
        "location": "Bangalore",
        "nominal_energy_kwh": "4.8kWh",
        "eid": "bms"
    },
    {
        "bat_uid": "PAJRdGT0GMkZNj1U_2",
        "asset_name": "BAT 9056_2",
        "model": "Vision48V100Ah",
        "chemistry": "LFP",
        "manufacturer": "Vision",
        "battery_type": "Stationary",
        "comissioned_on": "14-02-2023",
        "used_in": "Telecom Site",
        "location": "Bangalore",
        "nominal_energy_kwh": "4.8kWh",
        "eid": "bms"
    }
]
battery_search_data = [
    {
        "bat_uid": "PANzW2MEeq0RCuC4_1",
        "asset_name": "BAT 0059_1",
        "model": "Vision48V100Ah"
    },
    {
        "bat_uid": "PANzW2MEeq0RCuC4_2",
        "asset_name": "BAT 0059_2",
        "model": "Vision48V100Ah"
    }
]

new_battery_alerts_data = {
    "title": "Unexpected State of Charge(SoC) Decline",
    "description": "Battery level experienced an abrupt decrease from {battery_per_range} while discharging.",
    "revision": 0,
    "code": "s014",
    "type": "signals",
    "created_at": "2024-08-11T02:51:05.861078"
}

battery_models_data = {
    "capacity_ah": "100",
    "nominal_voltage_volts": "48",
    "manufacturer": "Vision",
    "type": "Stationary Tower",
    "model": "VISION-100AH",
    "specifications": {
        "min_charging_temp": "0",
        "max_charging_temp": "60",
        "avg_charging_temp": "25",
        "min_discharging_temp": "-20",
        "max_discharging_temp": "60",
        "avg_discharging_temp": "25",
        "min_storage_temp": "0",
        "max_storage_temp": "55",
        "avg_storage_temp": "25",
        "max_discharge_current_amp": "100",
        "max_charging_current_amp": "100",
        "ideal_charging_current_amp": "20",
        "ideal_discharging_current_amp": "20",
        "recommended_charging_current_amp": "30",
        "charge_voltage_volts": "56",
        "cycle_life_cycles": "4000",
        "dod": "80",
        "calendar_life_years": "10",
        "round_trip_efficiency_per": "98",
        "ideal_temp": "25",
        "min_soc": "20",
        "max_soc": "80",
        "min_cell_voltage": "-",
        "max_cell_voltage": "-",
        "min_pack_voltage": "48",
        "max_pack_voltage": "54",
        "min_charging_crate": "0",
        "max_charging_crate": "1",
        "avg_charging_crate": "0.3",
        "min_discharging_crate": "0",
        "max_discharging_crate": "1",
        "avg_discharging_crate": "0.3"
    }
}

battery_alerts_data = [
    {
        "title": "Maximum Pack Voltage Exceeded 54V During Charging",
        "description": "Pack voltage reached {pack_voltage} and remained above the maximum threshold of 54V for {time_period_minutes} minutes within the past hour",
        "type": "signals",
        "revision": 0,
        "code": "s001"
    }
]
battery_metadata_response = {
    200: {
        "description": "Item requested by battery_uid(Optional), page_number, page_size",
        "content": {
            "application/json": {
                "example": battery_metadata
            }
        }
    },
    404: {
        "description": "NOT_FOUND"
    }
}

battery_search_data_response = {
    200: {
        "description": "Item requested by search_string,page_number,page_size",
        "content": {
            "application/json": {
                "example": battery_search_data
            }
        }
    },
    404: {
        "description": "NOT_FOUND"
    }
}

battery_models_data_response = {
    200: {
        "description": "Item requested by revision number,code",
        "content": {
            "application/json": {
                "example": battery_models_data
            }
        }
    },
    404: {
        "description": "NOT_FOUND"
    }
}

battery_alerts_data_response = {
    200: {
        "description": "Item requested by revision number,code",
        "content": {
            "application/json": {
                "example": battery_alerts_data
            }
        }
    },
    404: {
        "description": "NOT_FOUND"
    }
}

new_battery_alerts_data_response = {
    200: {
        "description": "Item requested by revision number,code",
        "content": {
            "application/json": {
                "example": new_battery_alerts_data
            }
        }
    },
    422: {
        "description": "Unprocessable Entity"
    }

}
