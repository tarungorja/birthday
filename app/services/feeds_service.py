from typing import List
from app.core.database import feeds_instance
import base64
from app.data_validators.mappers.feed_mappers import transform_feeds, transform_feeds_plot
from app.data_validators.schemas.response_schemas.feeds_schema import FeedsOutputModel, InteractivePlotDataModel


def get_feeds_module(module, eid, from_date, to_date, page, page_size):
    feeds_documents = feeds_instance.get_feeds_modules(module, eid, from_date, to_date, skip=(page - 1) * page_size, limit=page_size)
    for doc in feeds_documents:
        doc['images'] = [base64.b64encode(data).decode("utf-8") for data in doc['images']]

    return feeds_documents


def get_feeds_by_batteries(module, batteries, eid, from_date, to_date, page, page_size):
    feeds_documents = feeds_instance.get_feeds_batteries(module, batteries, eid, from_date, to_date, skip=(page - 1) * page_size, limit=page_size)
    for doc in feeds_documents:
        doc['images'] = [base64.b64encode(data).decode("utf-8") for data in doc['images']]

    return feeds_documents


def get_feeds_by_filters(eid, module, batteries, from_date, to_date, tags, categories, page, page_size) -> List[FeedsOutputModel]:
    feeds_documents = feeds_instance.get_feeds_filters(eid, module, batteries, from_date, to_date, tags, categories, skip=(page - 1) * page_size, limit=page_size)
    for doc in feeds_documents:
        doc['images'] = [base64.b64encode(data).decode("utf-8") for data in doc['images']]
    return transform_feeds(feeds_documents)


def get_feed_plots(feed_id) -> InteractivePlotDataModel:
    feed_plots = feeds_instance.get_feed_plots_ID(feed_id)
    return transform_feeds_plot(feed_plots)
