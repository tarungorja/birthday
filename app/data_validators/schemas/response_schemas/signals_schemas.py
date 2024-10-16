import datetime
from typing import List, Optional
from pydantic import BaseModel


class EventDetails(BaseModel):
    title: str
    description: str


class SignalsSchema(BaseModel):
    id: str
    bat_uid: str
    bat_name: str
    category: str
    category_id: str
    signal_date:  datetime.datetime
    severity: str
    event_details: EventDetails
    module: List[str]
    eid: str
    level: str


class EventDataEntry(BaseModel):
    current: Optional[float]  
    pack_voltage: Optional[float]  
    soC: Optional[float] 
    max_cell_temperature: Optional[float]  
    battery_status: Optional[int]
    event_time: Optional[datetime.datetime]


class SignalsEventDataSchema(BaseModel):
    bat_uid: str
    bat_name: str
    category: str
    category_id: str
    signal_date: str
    severity: str
    event_details: EventDetails
    module: List[str]
    eid: str
    event_data: List[EventDataEntry]
    level: str
    temperature_range: str
    max_voltage: float
    battery_status: str
    max_current: float
    min_current: float


class Attributes(BaseModel):
    Date: datetime.datetime
    Description: str


class SignalTreeNode(BaseModel):
    id: str
    name: str
    attributes: Attributes
    children: List['SignalTreeNode']


SignalTreeNode.model_rebuild()
