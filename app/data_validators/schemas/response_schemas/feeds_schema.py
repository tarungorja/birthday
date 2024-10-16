from pydantic import BaseModel
from typing import List, Dict


class FeedsOutputModel(BaseModel):
    id: str
    analysis: str
    bat_name: str
    bat_uid: str
    category: str
    category_code: str
    feed_date: str
    images: List[str]
    module: List[str]
    tags: Dict[str, str]
    tags_codes: List[str]
    title: str
    eid: str


class InteractivePlotDataModel(BaseModel):
    plots: List[str]
