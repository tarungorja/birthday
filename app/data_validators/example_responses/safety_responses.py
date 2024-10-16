

safety_view_aggregated_data = {
    "temperature_celsius_min": "18°C",
    "temperature_celsius_max": "18°C",
    "cell_voltage_diff": "880 mV",
    "avg_temp_deviation_charging": "Up by 3°C",
    "avg_temp_deviation_discharging": "Up by 1°C",
    "overcharging_incidents": "25",
    "safety_aggregated_values": {
        "operated_temp_range": "30°C - 40°C",
        "avg_cell_voltage_diff": "4800 mV",
        "over_temp_incidents": "15",
        "over_charging_incidents": "20",
        "bms_safety_alerts": "25"
    },
    "battery_usage_recommendations": [],
    "season": "Monsoon",
    "ambient_temp": "32°C - 35°C",
    "cell_status": "Normal",
    "criticality": "Low",
    "efficiency": "Low",
    "safety_condition": "Safe"
}

safety_view_avg_aggregated_data = {
    "operated_temp_range": "24.5°C - 33.6°C",
    "avg_cell_voltage_diff": "368.5 mV",
    "over_temp_incidents": "0",
    "over_charging_incidents": "20",
    "bms_safety_alerts": "25"
}

safety_view_incidents_chart_data = {
  "x": [
    "2023-05-20",
    "2023-10-05",
    "2023-06-13",
  ],
  "y": [
    1,
    1,
    2,
  ],
  "z": [
    1,
    1,
    2,
  ],
  "customdata": [
    [
      "66a7389f2681b095c5e66cc2",
      "Minimum Pack Voltage Dropped Below 48V During Discharging",
      "Major"
    ],
    [
      "66a74a9b2681b095c5e69ff8",
      "Minimum Pack Voltage Dropped Below 48V During Discharging",
      "Major"
    ],
    [
      "66a73bc62681b095c5e67773",
      "Maximum Temperature Exceeded 45°C During Charging/Discharging",
      "Major"
    ],
  ]
}
safety_view_aggregated_data_response = {
    200: {
        "description": "Item requested by Battery_uid",
        "content": {
            "application/json": {
                "example": safety_view_aggregated_data
            }
        },
    },
}

safety_view_avg_aggregated_data_response = {
    200: {
        "description": "Item requested by Battery_uid, From_date, To_date",
        "content": {
            "application/json": {
                "example": safety_view_avg_aggregated_data
            }
        },
    },
}

safety_view_incidents_chart_data_response = {
    200: {
        "description": "Item requested by Battery_uid",
        "content": {
            "application/json": {
                "example": safety_view_incidents_chart_data
            }
        },
    },
}