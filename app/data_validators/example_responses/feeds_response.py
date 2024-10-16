

feed_data = [
    {
        "analysis": "Overcharging: The battery temperature was in no data during overcharging.\nCharging: The battery temperature was in no data during charging.\nDischarging: The battery temperature was in no data during discharging.",
        "bat_name": "BAT 0089_3",
        "bat_uid": "PZ4eI6JvRR2upzA_3",
        "category": "Battery Temperature",
        "category_code": "008",
        "feed_date": "2024-07-28 18:30:00",
        "images": ["image code"],
        "module": [
            "health"
        ],
        "tags": {
            "001": "Weekly"
        },
        "tags_codes": [
            "001"
        ],
        "title": "Operating Battery Temperature by status 22nd Jul 2024-28th Jul 2024",
        "eid": "bms"
    }
]

feed_plot_data = {
    "plots": ["plots code"]
}
feeds_by_module_data_response = {
    200: {
        "description": "Item requested by module, from_date(Optional), to_date(Optional), page_number, page_size",
        "content": {
            "application/json": {
                "example": feed_data
            }
        }
    },
    404: {"description": "NOT_FOUND"}
}

feed_by_batteries_data_response = {
    200: {
        "description": "Item requested by Module, Array of Battery_uid(Optional), From_date(Optional), To_date(Optional), Page_number, Page_size",
        "content": {
            "application/json": {
                "example": feed_data
            }
        }
    },
    404: {"description": "NOT_FOUND"}

}

feeds_by_filters_data_response = {
    200: {
        "description": "Item requested by Module, From_date(Optional), To_date(Optional), Battery_uid(Optional), Categories(Optional), Tags(Optional),Page_number,Page_size ",
        "content": {
            "application/json": {
                "example": feed_data
            }
        }
    },
    404: {"description": "NOT_FOUND"}

}

feed_plot_data_response = {
    200: {
        "description": "Item requested by Feed ID",
        "content": {
            "application/json": {
                "example": feed_plot_data
            }
        }
    },
    404: {"description": "NOT_FOUND"}
}
