

category_data = [
    {
        "code": "001",
        "created_at": "2023-09-22T10:30:48.021000",
        "name": "Anomaly",
        "updated_at": "2023-09-22T10:30:48.021000"
    },
    {
        "code": "002",
        "created_at": "2023-09-22T10:30:48.021000",
        "name": "Capacity",
        "updated_at": "2023-09-22T10:30:48.021000"
    },
    {
        "code": "003",
        "created_at": "2023-09-22T10:30:48.021000",
        "name": "Voltage",
        "updated_at": "2023-09-22T10:30:48.021000"
    },
    {
        "code": "004",
        "created_at": "2023-09-22T10:30:48.021000",
        "name": "Battery State of Health",
        "updated_at": "2023-09-22T10:30:48.021000"
    },
    {
        "code": "005",
        "created_at": "2023-09-22T10:30:48.021000",
        "name": "Battery Utilization",
        "updated_at": "2023-09-22T10:30:48.021000"
    },
]

category_data_response = {
    200: {
        "description": "Item requested",
        "content": {
            "application/json": {
                "example": category_data
            }
        },
    },
}
