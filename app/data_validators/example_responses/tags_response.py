

tags_data = [
    {
        "name": "Weekly",
        "code": "001",
        "created_at": "2023-09-22T10:30:48.021000",
        "updated_at": "2023-09-22T10:30:48.021000"
    },
    {
        "name": "StateOfCharge",
        "code": "002",
        "created_at": "2023-09-22T10:30:48.021000",
        "updated_at": "2023-09-22T10:30:48.021000"
    },
    {
        "name": "CellVoltageDifference",
        "code": "003",
        "created_at": "2023-09-22T10:30:48.021000",
        "updated_at": "2023-09-22T10:30:48.021000"
    },
    {
        "name": "DropSpikes",
        "code": "004",
        "created_at": "2023-09-22T10:30:48.021000",
        "updated_at": "2023-09-22T10:30:48.021000"
    },
    {
        "name": "Monthly",
        "code": "005",
        "created_at": "2023-09-22T10:30:48.021000",
        "updated_at": "2023-09-22T10:30:48.021000"
    },
    {
        "name": "Daily",
        "code": "006",
        "created_at": "2023-09-22T10:30:48.021000",
        "updated_at": "2023-09-22T10:30:48.021000"
    },
]

tags_data_response = {
    200: {
        "description": "Item requested ",
        "content": {
            "application/json": {
                "example": tags_data
            }
        },
    },
}
