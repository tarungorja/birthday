

operational_view_aggregated_data = {
    "operational_values": {
        "charge_cycle_count": "0",
        "discharge_cycle_count": "0",
        "cumulative_energy_consumed_kwh": "0.0 kWh",
        "cumulative_energy_discharged_kwh": "0.0 kWh",
        "total_charge_duration_hrs": "0.0 Hrs",
        "total_discharge_duration_hrs": "0.0 Hrs"
    },
    "operational_thresholds": {
        "best_Crate_to_use": "0.3 - 1C",
        "best_SOC_limts": "20 - 80%",
        "temperature_limits": "25°C-40°C"
    },
    "stress_factors": [
        "Longer resting hours",
        "Over Charging 5 times",
        "High temperature detected for 6 hrs",
        "Higher C-Rate detected",
        "0.9V cell voltage difference"
    ],
    "battery_usage_recommendations": [
        {
            "title": "Increase Charge Rate",
            "recommendation": "Increase charge rate by 0.21C."
        },
        {
            "title": "Optimal Charging",
            "recommendation": "Limit charge to 80%"
        }
    ]
}

operational_view_avg_aggregated_data = {
    "charge_cycle_count": "0",
    "discharge_cycle_count": "0",
    "cumulative_energy_consumed_kwh": "0.0 kWh",
    "cumulative_energy_discharged_kwh": "0.0 kWh",
    "total_charge_duration_hrs": "0.0 Hrs",
    "total_discharge_duration_hrs": "0.0 Hrs"
}

operational_soc_range_graph_data = [
  {
    "x": "2023-07-31",
    "y": 0.4,
    "start_soc": 100,
    "end_soc": 96
  },
  {
    "x": "2023-07-31",
    "y": 0.4,
    "start_soc": 100,
    "end_soc": 96
  },
  {
    "x": "2023-08-04",
    "y": 2.03,
    "start_soc": 99,
    "end_soc": 76
  },
  {
    "x": "2023-08-04",
    "y": 2.03,
    "start_soc": 99,
    "end_soc": 76
  },
  {
    "x": "2023-08-04",
    "y": 2.03,
    "start_soc": 99,
    "end_soc": 76
  },
  {
    "x": "2023-08-05",
    "y": 1.03,
    "start_soc": 99,
    "end_soc": 97
  },
  {
    "x": "2023-08-08",
    "y": 1.27,
    "start_soc": 99,
    "end_soc": 95
  },
]

operational_valued_soc_graph_data = [
  {
    "x": "2023-07-31",
    "y": 6
  },
  {
    "x": "2023-07-31",
    "y": 6
  },
  {
    "x": "2023-08-04",
    "y": 5.3
  },
  {
    "x": "2023-08-04",
    "y": 5.3
  },
  {
    "x": "2023-08-04",
    "y": 5.3
  },
  {
    "x": "2023-08-05",
    "y": 30.9
  },
  {
    "x": "2023-08-08",
    "y": 19.05
  },
  {
    "x": "2023-08-09",
    "y": 400.2
  },
  {
    "x": "2023-08-10",
    "y": 9
  },
  {
    "x": "2023-08-11",
    "y": 4.2
  },
]

operational_view_charging_cycles_data = [
    {
        "name": "End_SoC",
        "data": [
            [
                1672079400000.0,
                30
            ],
            [
                1673807400000.0,
                18
            ],
        ]
    },
    {
        "name": "End_SoC",
        "data": [
            [
                1671733800000.0,
                100
            ],
            [
                1671733800000.0,
                100
            ],
            [
                1671733800000.0,
                100
            ],
            [
                1671820200000.0,
                100
            ],
            [
                1671906600000.0,
                100
            ],
            [
                1671993000000.0,
                100
            ],
        ]
    }
]

operational_view_discharging_cycles_data = [
    {
        "name": "End_SoC",
        "data": [
            [
                1672079400000.0,
                76
            ],
            [
                1673721000000.0,
                2
            ],
            [
                1674844200000.0,
                72
            ],
            [
                1677781800000.0,
                5
            ],
        ]
    },
    {
        "name": "End_SoC",
        "data": [
            [
                1671733800000.0,
                98
            ],
            [
                1671733800000.0,
                98
            ],
            [
                1671733800000.0,
                98
            ],
            [
                1671820200000.0,
                99
            ],
            [
                1671820200000.0,
                98
            ],
            [
                1671906600000.0,
                98
            ],
            [
                1671906600000.0,
                99
            ],
        ]
    }
]

operational_view_aggregated_data_response = {
    200: {
        "description": "Item requested by Battery_uid",
        "content": {
            "application/json": {
                "example": operational_view_aggregated_data
            }
        },
    },
}

operational_view_avg_aggregated_data_response = {
    200: {
        "description": "Item requested by Battery_uid, From_date, To_date",
        "content": {
            "application/json": {
                "example": operational_view_avg_aggregated_data
            }
        },
    }
}

operational_view_soc_range_graph_data_response = {
    200: {
        "description": "Item requested by Battery_uid",
        "content": {
            "application/json": {
                "example": operational_soc_range_graph_data
            }
        },
    }
}


operational_view_valued_soc_graph_data_response = {
    200: {
        "description": "Item requested by Battery_uid",
        "content": {
            "application/json": {
                "example": operational_valued_soc_graph_data
            }
        },
    }
}

operational_view_charging_cycles_graph_data_response = {
    200: {
        "description": "Item requested by Battery_uid",
        "content": {
            "application/json": {
                "example": operational_view_charging_cycles_data
            }
        },
    }
}

operational_view_discharging_cycles_graph_data_response = {
    200: {
        "description": "Item requested by Battery_uid",
        "content": {
            "application/json": {
                "example": operational_view_discharging_cycles_data
            }
        },
    }
}


