from typing import List
from app.data_validators.schemas.response_schemas.feeds_schema import FeedsOutputModel, InteractivePlotDataModel
from app.utils.view_utils import set_default_no_data


def transform_feeds(feeds_documents) -> List[FeedsOutputModel]:
    feeds_response = []
    for feed_doc in feeds_documents:
        feed = FeedsOutputModel(
            id=set_default_no_data(feed_doc['_id']),
            analysis=set_default_no_data(feed_doc['analysis']),
            bat_name=set_default_no_data(feed_doc['bat_name']),
            bat_uid=set_default_no_data(feed_doc['bat_uid']),
            category=set_default_no_data(feed_doc['category']),
            category_code=set_default_no_data(feed_doc['category_code']),
            feed_date=set_default_no_data(feed_doc['feed_date']),
            images=feed_doc['images'],
            module=feed_doc['module'],
            tags=feed_doc['tags'],
            tags_codes=feed_doc['tags_codes'],
            title=set_default_no_data(feed_doc['title']),
            eid=set_default_no_data(feed_doc['eid'])
        )
        feeds_response.append(feed)
    return feeds_response


def transform_feeds_plot(feeds_plot) -> InteractivePlotDataModel:
    return InteractivePlotDataModel(
        plots=feeds_plot['plots']
    )
