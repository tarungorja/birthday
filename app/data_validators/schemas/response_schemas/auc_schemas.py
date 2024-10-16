from pydantic import BaseModel

class BatteryAUC(BaseModel):
    battery_uid: str
    certificate_id: str
    file_name: str
    current_phase: str
    document_hash: str
    document_data_hash: str
    generated_on: str
    completed_on: str
    expiry:str
    transaction_id: str


