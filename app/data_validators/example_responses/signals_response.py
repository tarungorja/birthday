

signals_data = [{
    "bat_uid": "PZ4eI6JvRR2upzA_1",
    "bat_name": "Site 0089_1",
    "category": "Voltage",
    "category_id": "001",
    "module": [
        "health"
    ],
    "signal_date": "20-09-2022",
    "severity": "high",
    "created_at": "2022-09-20T04:57:21.240000",
    "updated_at": "2022-09-20T04:57:21.240000",
    "event_details": {
        "current_value": 10,
        "threshold_value": 20,
        "title": "Low Voltage Detected for Battery",
        "description": "The voltage of battery has dropped below the critical threshold 48v"
    },
    "event_data": {},
    "eid": "bms"
},]
signal_event_data = {
    "bat_uid": "PANzW2MEeq0RCuC4_3",
    "bat_name": "BAT 0059_3",
    "category": "Anomaly",
    "category_id": "001",
    "signal_date": "30-09-2023",
    "severity": "high",
    "event_details": {
        "title": "Unexpected spike in pack voltage",
        "description": "The pack voltage experienced a sudden spike from 51.75 to 54.12 volts while charging."
    },
    "module": [
        "health"
    ],
    "eid": "bms",
    "event_data": [
        {
            "current": 0.0,
            "pack_voltage": 51.96,
            "soC": 100,
            "maximum_cell_temperature": 26.0,
            "battery_status": 0,
            "event_time": "2023-09-30 19:12:00"
        },
        {
            "current": 0.0,
            "pack_voltage": 51.96,
            "soC": 100,
            "maximum_cell_temperature": 26.0,
            "battery_status": 1,
            "event_time": "2023-09-30 19:13:00"
        },
    ]
}
signal_tree_data = {
    "name": 'Deep Discharge',
    "attributes": {
        "Date": '12/12/2022 09:30:00',
        "Description": 'The pack voltage experienced a sudden spike from 51.19 to 53.97 volts while charging.'
    },
    "children": [
        {
            "name": 'Over voltage',
            "attributes": {
                "Date": '12/12/2022 09:30:00',
                "Description": 'The pack voltage experienced a sudden spike from 51.19 to 53.97 volts while charging.'
            }
        },
        {
            "name": 'High Temperature',
            "attributes": {
                "Date": '12/12/2022 09:30:00',
                "Description": 'The pack voltage experienced a sudden spike from 51.19 to 53.97 volts while charging.'
            },
            "children": [
                {
                    "name": 'Deep Discharge',
                    "attributes": {
                        "Date": '12/12/2022 09:30:00',
                        "Description": 'The pack voltage experienced a sudden spike from 51.19 to 53.97 volts while charging.'
                    },
                    "children": [
                        {
                            "name": 'Over voltage',
                            "attributes": {
                                "Date": '12/12/2022 09:30:00',
                                "Description": 'The pack voltage experienced a sudden spike from 51.19 to 53.97 volts while charging.'
                            },
                            "children": [
                                {
                                    "name": 'High voltage Signal',
                                    "attributes": {
                                        "Date": '12/12/2022 09:30:00',
                                        "Description": 'The pack voltage experienced a sudden spike from 51.19 to 53.97 volts while charging.'
                                    },
                                }
                            ]
                        },
                        {
                            "name": 'High Temperature',
                            "attributes": {
                                "Date": '12/12/2022 09:30:00',
                                "Description": 'The pack voltage experienced a sudden spike from 51.19 to 53.97 volts while charging.'
                            },
                        },
                    ],
                },
            ],
        }
    ]
}

signals_data_response = {
    200: {
        "description": "Item requested by Module",
        "content": {
            "application/json": {
                "example": signals_data
            }
        },
    },
}

signal_tree_data_response = {
    200: {

        "description": "Tree plot requested by Signal_ID",
        "content": {
            "application/json": {
                "example": signal_tree_data
            }
        }
    },
}
signal_event_data_response = {
    200: {

        "description": "Item requested by Signal_ID",
        "content": {
            "application/json": {
                "example": signal_event_data
            }
        }
    },

}

