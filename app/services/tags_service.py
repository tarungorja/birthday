from typing import List
from app.core.database import tags_instance
from app.data_validators.schemas.response_schemas.common_schemas import TagsModel


def get_all_tags_db() -> List[TagsModel]:
    tags = tags_instance.get_all_tags()
    tags_output = []
    for tag in tags:
        tags_output.append(TagsModel(name=tag['name'],
                                     code=tag['code'],
                                     created_at=tag['created_at'],
                                     updated_at=tag['updated_at']
                                     ))
    return tags_output
