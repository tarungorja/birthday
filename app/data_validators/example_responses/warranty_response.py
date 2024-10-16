

warranty_view_aggregated_data = {
    "warranty_start_date": "20/03/2023",
    "warranty_end_date": "20/03/2028",
    "status": "Activate",
    "calender_life": "2 years",
    "total_warranty_life_span": " 4 years",
    "total_expected_life_span": "4.5 years",
    "total_warranty_alerts": "10",
    "soc_min_per": "0%",
    "soc_max_per": "100%",
    "bms_soh": "100%",
    "equivalent_cycles_count": "8.8",
    "charging_crate_min": "-0.0",
    "charging_crate_max": "0.4",
    "charging_crate_avg": "0.1",
    "discharging_crate_min": "0.4",
    "discharging_crate_max": "0.0",
    "discharging_crate_avg": "0.1",
    "charging_temp_range": "42 °C - 45°C",
    "discharging_temp_range": "35 °C - 40 °C",
    "charging_crate": "40C",
    "discharging_crate": "40C",
    "cell_voltage_diff": "30C",
    "battery_usage_recommendations": [
        {
            "title": "Increase Charge Rate",
            "recommendation": "Increase charge rate by 0.21C."
        }
    ]
}

warranty_view_avg_aggregated_data = {
    "avg_SoH": "100%",
    "avg_min_soc": "100%",
    "avg_max_soc": "100%",
    "avg_min_C_rate_charging": "-",
    "avg_max_C_rate_charging": "-",
    "avg_min_C_rate_discharging": "-",
    "avg_max_C_rate_discharging": "-",
    "avg_equivalent_cycles": "-",
    "charging_temp_range": "40°C - 45°C",
    "discharging_temp_range": "35°C - 40°C",
    "avg_cell_voltage_diff": "30 mV"
}
warranty_view_bms_soh = {
    "warranty_bms_soh_graph_series": [
        {
            "name": "bms_soh",
            "data": [
                {
                    "x": "2023-04-06",
                    "y": 100
                },
                {
                    "x": "2023-04-07",
                    "y": 100
                },
                {
                    "x": "2023-04-08",
                    "y": 100
                }
            ]
        }
    ],
    "warranty_start_date": 1676313000000.0,
    "warranty_end_date": 1834079400000.0
}
warranty_view_equivalent_cycles = {
    "warranty_equivalent_cycles_count_series": [
        {
            "name": "Equivalent Cycles",
            "data": [
                {
                    "x": "2023-04-06",
                    "y": 100
                },
                {
                    "x": "2023-04-07",
                    "y": 100
                },
                {
                    "x": "2023-04-08",
                    "y": 100
                }
            ]
        }
    ],
    "warranty_start_date": 1676313000000.0,
    "warranty_end_date": 1834079400000.0
}
warranty_view_aggregated_data_response = {
    200: {
        "description": "Item requested by Battery_uid",
        "content": {
            "application/json": {
                "example": warranty_view_aggregated_data
            }
        },
    },
}

warranty_view_avg_aggregated_data_response = {
    200: {
        "description": "Item requested by Battery_uid, From_date, To_date",
        "content": {
            "application/json": {
                "example": warranty_view_avg_aggregated_data
            }
        },
    },
}
warranty_bms_soh_response = {
    200: {
        "description": "Item requested by Battery_uid, From_date, To_date",
        "content": {
            "application/json": {
                "example": warranty_view_bms_soh
            }
        },
    },
}

warranty_equivalent_cycles_response = {
    200: {
        "description": "Item requested by Battery_uid, From_date, To_date",
        "content": {
            "application/json": {
                "example": warranty_view_equivalent_cycles
            }
        },
    },
}
