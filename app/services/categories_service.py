from typing import List
from app.core.database import categories_instance
from app.data_validators.schemas.response_schemas.common_schemas import CategoryModel


def get_all_categories_db() -> List[CategoryModel]:
    categories = categories_instance.get_all_categories()
    categories_output = []
    for category in categories:
        categories_output.append(CategoryModel(code=category['code'],
                                               created_at=category['created_at'],
                                               name=category['name'],
                                               updated_at=category['updated_at']))
    return categories_output
