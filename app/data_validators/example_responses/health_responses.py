

health_view_aggregated_data = {
    "health_aggregated_metrics": {
        "bat_uid": "PZ4eI6JvRR2upzA_2",
        "bms_soh": "80%",
        "cumulative_energy_discharged_kwh": "60.3 kWh",
        "equivalent_cycles_count": "9",
        "pack_voltage_min_volts": "46.7V",
        "pack_voltage_max_volts": "54.4V",
        "temperature_min_celsius": "18°C",
        "temperature_max_celsius": "57°C",
        "temperature_avg_celsius": "29.4°C",
        "soc_min_per": "0%",
        "soc_max_per": "100%",
        "cell_voltage_min_mv": "2501 mv",
        "cell_voltage_max_mv": "3727 mv",
        "discharging_min_crate": "0.4",
        "discharging_max_crate": "0.0",
        "discharging_avg_crate": "0.2",
        "charging_min_crate": "0",
        "charging_max_crate": "0.4",
        "charging_avg_crate": "0.2",
        "variation_of": "+/-2%",
        "avg_consumption": "2.03kW",
        "milage": "2.4",
        "range": "162.6",
        "remaining_energy": "384kWh",
        "season": "Monsoon",
        "ambient_temp": "32-35 °C",
        "cell_status": "Normal",
        "criticality": "Low",
        "efficiency": "Low",
        "safety_condition": "Safe"
    },
    "operated_limits": {
        "pack_voltage_range": "Beyond Limits",
        "temperature_range": "With in Limits",
        "soc_range": "Beyond Limits",
        "cell_voltage_range": "Beyond Limits"
    },
    "target_performance_metrics": {
        "min_temp": "0°C",
        "max_temp": "55°C",
        "avg_temp": "25°C",
        "min_soc": "20",
        "max_soc": "80",
        "charging_min_crate": "0.3",
        "charging_max_crate": "1",
        "charging_avg_crate": "0",
        "discharging_min_crate": "0",
        "discharging_max_crate": "1",
        "discharging_avg_crate": "0.3"
    }
}

health_soh_graph_data = {
  "health_soh_graph_data": [
    {
      "name": "Actual",
      "data": [
        {
          "x": "2023-04-15",
          "y": 100
        },
        {
          "x": "2023-05-15",
          "y": 100
        },
        {
          "x": "2023-05-16",
          "y": 100
        },
        {
          "x": "2023-05-17",
          "y": 100
        },
        {
          "x": "2023-05-18",
          "y": 100
        },
      ]
    },
    {
      "name": "Predicted",
      "data": [
        {
          "x": "2023-06-13",
          "y": 100
        },
        {
          "x": "2023-06-14",
          "y": 100
        },
        {
          "x": "2023-06-15",
          "y": 100
        },
        {
          "x": "2023-06-16",
          "y": 100
        },
      ]
    }
  ],
  "soh_vs_last_month": 0
}

health_view_avg_aggregated_data = {
    "battery_uid": "PAJRdGT0GMkZNj1U_1",
    "SoH_drop": "0%",
    "avg_discharging_hrs": "-",
    "avg_charging_hrs": "-",
    "avg_standby_hrs": "23.6 hrs",
    "avg_min_soc": "98",
    "avg_max_soc": "100",
    "avg_min_temp": "23°C",
    "avg_max_temp": "28°C",
    "avg_avg_temp": "25.6°C",
    "avg_min_C_rate_charging": "-",
    "avg_max_C_rate_charging": "-",
    "avg_avg_C_rate_charging": "-",
    "avg_min_C_rate_discharging": "-",
    "avg_max_C_rate_discharging": "-",
    "avg_avg_C_rate_discharging": "-",
    "SoC_start_charging": "0",
    "SoC_end_charging": "0",
    "SoH_drop_last_10Kwh": "0",
    "SoH_drop_last_100Kwh": " 0"
}

health_capacity_graph_data = {
    "health_capacity_graph_data":[
    {
      "name": "Actual",
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
    },
    {
      "name": "Predicted",
      "data": [
        {
          "x": "2023-05-06",
          "y": 100
        },
        {
          "x": "2023-05-07",
          "y": 100
        },
        {
          "x": "2023-05-08",
          "y": 100
        },
      ]
    }
    ],
  "latest_capacity_ah": "100Ah",
  "capacity_vs_last_month": 0
}

health_cycles_graph_data = {
    "health_cycles_graph_data": [
    {
      "name": "Battery Degradation Cycles",
      "data": [
        {
          "x": "2023-04-06",
          "y": 0
        },
        {
          "x": "2023-04-07",
          "y": 0
        },
        {
          "x": "2023-04-08",
          "y": 0
        },
      ]
    }
    ],
    "cycles_vs_last_month": 0
}

health_view_aggregated_data_response = {
    200: {
        "description": "Item requested by Battery_uid",
        "content": {
            "application/json": {
                "example": health_view_aggregated_data
            }
        }
    },
    404: {"description": "NOT_FOUND"}
}

health_soh_graph_data_response = {
    200: {
        "description": "Item requested by Battery_uid",
        "content": {
            "application/json": {
                "example": health_soh_graph_data
            }
        }
    },
    404: {"description": "NOT_FOUND"}
}

health_view_avg_aggregated_data_response = {
    200: {
        "description": "Item requested by Battery_uid, From_date, To_date",
        "content": {
            "application/json": {
                "example": health_view_avg_aggregated_data
            }
        }
    },
    404: {"description": "NOT_FOUND"}
}

health_capacity_graph_data_response = {
    200: {
        "description": "Item requested by Battery_uid",
        "content": {
            "application/json": {
                "example": health_capacity_graph_data
            }
        }
    },
    404: {"description": "NOT_FOUND"}
}

helath_cycles_graph_data_response = {
    200: {
        "description": "Item requested by Battery_uid",
        "content": {
            "application/json": {
                "example": health_cycles_graph_data
            }
        }
    },
    404: {"description": "NOT_FOUND"}
}

