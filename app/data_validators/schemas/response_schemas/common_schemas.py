import datetime
from pydantic import BaseModel


class CategoryModel(BaseModel):
    code: str
    created_at: datetime.datetime
    name: str
    updated_at: datetime.datetime


class TagsModel(BaseModel):
    name: str
    code: str
    created_at: datetime.datetime
    updated_at: datetime.datetime


class ReleaseInfo(BaseModel):
    branch: str
    last_commit_id: str
    last_commit_time: str
