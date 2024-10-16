

auc_meta_data = [
    {
        "battery_uid": "PZ4eI6JvRR2upzA_1",
        "certificate_id": "NO50G38K",
        "file_name": "AUC_BAT 0089_1_230524102825.pdf",
        "current_phase": "First Life Usage",
        "document_hash": "f20640bd8b327bb88975e7dcb6faf5877d78d6ed8b26b2d444a24ea10a887593",
        "document_data_hash": "179dcec2708d52318772e3f845963064f83a27b353a12d3f7cf995873bdd9d29",
        "generated_on": "23/05/2024",
        "completed_on": "May 23rd, 2024 10:28:28AM",
        "expiry": "30-05-2024",
        "transaction_id": "d69dac7edb6f93ad703b9429a86b83a42377107be8605007ae38ceacb8fac9cb"
    },
    {
        "battery_uid": "PZ4eI6JvRR2upzA_1",
        "certificate_id": "DKMOPEZS",
        "file_name": "AUC_BAT 0089_1_300424120538.pdf",
        "current_phase": "First Life Usage",
        "document_hash": "dcb338c10b41de838fd656ce814308867d13bcb3140013b3c4b300490eb8a91b",
        "document_data_hash": "179dcec2708d52318772e3f845963064f83a27b353a12d3f7cf995873bdd9d29",
        "generated_on": "30/04/2024",
        "completed_on": "April 30th, 2024 12:05:38PM",
        "expiry": "07-05-2024",
        "transaction_id": "617e97671d8a6df5cdf28ece1c96ecf65debdea12551cc82f014057df63dc1ad"
    },
    {
        "battery_uid": "PZ4eI6JvRR2upzA_1",
        "certificate_id": "NWJ9R2RE",
        "file_name": "AUC_BAT 0089_1_020424154956.pdf",
        "current_phase": "First Life Usage",
        "document_hash": "e6e2fe280dec2ad95e9467bf8f4d0bafc9f3cb462d5b7aeef4293de191022fed",
        "document_data_hash": "179dcec2708d52318772e3f845963064f83a27b353a12d3f7cf995873bdd9d29",
        "generated_on": "02/04/2024",
        "completed_on": "April 2nd, 2024 03:49:56PM",
        "expiry": "09-04-2024",
        "transaction_id": "41ebf0f6685195cb67f6347a64e5f8df141afdf6c191d028106397e32f3ceea4"
    },

]

auc_meta_data_response = {
    200: {
        "description": "Item requested by battery_uid",
        "content": {
            "application/json": {
                "example": auc_meta_data
            }
        },
    },
}
