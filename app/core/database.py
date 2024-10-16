from fastapi import HTTPException
from pymongo import MongoClient
from decouple import config
from app.core.config import AUC, CATEGORIES, RELEASE_NOTES, DATABASE_NAME,  BATTERY_METADATA, BATTERY_MODELS, CUMULATIVE_AGGREGATED_METRICS, DAILY_SUMMARIES, FEEDS, SIGNALS, TAGS, USERS, BATTERY_ALERTS, USAGE_RECOMMENDATIONS, DAILY_SUMMARIES_V3
from app.data_validators.schemas.request_schemas.user import UserLoginSchema
from app.utils.date_utils import set_date_filter_query, set_feed_date_filter_query, operational_summaries_date_filter_query, convert_from_date_to_GMT, convert_to_date_to_GMT
import re
from bson import ObjectId


class MongoDB:
    def __init__(self, connection_string, max_pool_size=100):
        self.connection_string = connection_string
        self.max_pool_size = max_pool_size
        self.client = None

    def connect(self):
        self.client = MongoClient(self.connection_string, maxPoolSize=self.max_pool_size)

    def disconnect(self):
        if self.client:
            self.client.close()
            self.client = None

    def get_database(self, database_name):
        if not self.client:
            self.connect()
        return self.client[database_name]  # type: ignore

    # def get_collection(self, database_name, collection_name):
    #     db = self.get_database(database_name)
    #     return db[collection_name]

    # def insert_document(self, database_name, collection_name, document):
    #     collection = self.get_collection(database_name, collection_name)
    #     return collection.insert_one(document).inserted_id

    # def find_single_document(self, database_name, collection_name, filter=None, project=None, sort=None):
    #     collection = self.get_collection(database_name, collection_name)
    #     return collection.find_one(filter, project, sort=sort)

    # def find_documents(self, database_name, collection_name, filter=None, project=None, sort=None, skip=0, limit=50):
    #     collection = self.get_collection(database_name, collection_name)
    #     return collection.find(filter, project, sort=sort).skip(skip).limit(limit)


db_instance = MongoDB(config("MONGO_DB_URL"))


class BatteryMetaData:
    def __init__(self):
        db_conn = db_instance.get_database(DATABASE_NAME)
        self.collection = db_conn[BATTERY_METADATA]

    def get_all_batteries_metadata(self, eid, skip, limit):
        filter_query = {'eid': eid, 'parent_id': {'$ne': None}}
        project = {'_id': 0, 'warranty_end_date': 0, 'warranty_start_date': 0}
        batteries_metadata = list(self.collection.find(filter_query, project, sort=[("bat_uid", 1)]).skip(skip).limit(limit))
        if batteries_metadata:
            return batteries_metadata
        raise HTTPException(status_code=204, detail=f"No more batteries found with eid: {eid}")

    def get_battery_metadata_bat_uid(self, battery_uid):
        filter_query = {"bat_uid": battery_uid}
        project = {'asset_name': 1, 'nominal_energy_kwh': 1, 'nominal_voltage_volt': 1, 'comissioned_on': 1, 'capacity_ah': 1, '_id': 0}
        battery_metadata = self.collection.find_one(filter_query, project)
        return battery_metadata

    def get_metadata_bat_uid(self, eid, battery_uid):
        filter_query = {'eid': eid, 'bat_uid': battery_uid}
        project = {'_id': 0, 'warranty_end_date': 0, 'warranty_start_date': 0}
        battery_metadata = list(self.collection.find(filter_query, project))
        if battery_metadata:
            return battery_metadata
        raise HTTPException(status_code=404, detail=f"{battery_uid} not found ")

    def check_if_battery_exists_db(self, battery_uid):
        filter_query = {'bat_uid': battery_uid}
        project = {'_id': 0, 'bat_uid': 1}
        battery_metadata = list(self.collection.find(filter_query, project))
        return bool(battery_metadata)

    def get_warranty_metadata_bat_uid(self, eid, battery_uid):
        filter_query = {'bat_uid': battery_uid, 'eid': eid}
        project = {'warranty_end_date': 1,
                   'warranty_start_date': 1}
        battery_warranty_metadata = self.collection.find_one(filter_query, project)
        if (battery_warranty_metadata):
            return battery_warranty_metadata
        raise HTTPException(status_code=404, detail=f"Warranty Details for battery_uid: {battery_uid} not found")

    def get_search_batteries_metadata(self, eid, search, skip, limit):
        regex_pattern = ''.join(f'{re.escape(char)}\\s*' for char in search)
        search_regex = re.compile(f'^{regex_pattern}', re.IGNORECASE)
        filter_query = {'eid': eid, 'asset_name': {'$regex': search_regex}}
        metadata_docs = list(self.collection.find(filter_query, {'bat_uid': 1, 'asset_name': 1, 'model': 1, '_id': 0}).skip(skip).limit(limit))
        if (metadata_docs):
            return metadata_docs
        raise HTTPException(status_code=204, headers={'detail': f"No batteries found with the searched text"})

    def get_battery_model_bat_UID(self, battery_uid):
        battery_model = self.collection.find_one({'bat_uid': battery_uid}, {'model': 1, "_id": 0})
        if battery_model:
            return battery_model
        raise HTTPException(status_code=404, detail=f"Battery Model with {{bat_uid: {battery_uid}}} not found")

    def fetch_capacity_ah(self, bat_uid):
        result = self.collection.find_one({"bat_uid": bat_uid}, {"capacity_ah": 1, "_id": 0})
        if result:
            return result['capacity_ah']
        else:
            raise HTTPException(status_code=204, headers={'detail': f'Battery Capacity data not found for battery with battery_uid:{bat_uid}'})


class BatteryModels:
    def __init__(self):
        db_conn = db_instance.get_database(DATABASE_NAME)
        self.collection = db_conn[BATTERY_MODELS]

    def find_one(self, model):
        battery_models = self.collection.find_one({'model_no': model}, {'_id': 0})
        if battery_models:
            return battery_models
        raise HTTPException(status_code=404, detail=f'Battery Models data for {{model_no: {model}}} not found')

    def get_metric_value(self, model, metrics):
        project_query = {'_id': 0}
        for metric in metrics:
            project_query[metric] = 1
        metric_values = self.collection.find_one({'model_no': model}, project_query)
        if metric_values:
            return metric_values
        raise HTTPException(status_code=404, detail=f'Battery Models Values for {{model_no: {model}}} not found')


class CumulativeAggregatedMetrics:
    def __init__(self):
        db_conn = db_instance.get_database(DATABASE_NAME)
        self.collection = db_conn[CUMULATIVE_AGGREGATED_METRICS]

    def find_one_bat_uid(self, battery_uid: str, project=None):
        filter_query = {'bat_uid': battery_uid}
        aggregated_docs = self.collection.find_one(filter_query, {'_id': 0, 'created_at': 0, 'updated_at': 0, 'inception_date': 0}, sort=[("summary_date", -1)])
        if project:
            aggregated_docs = self.collection.find_one(filter_query, project, sort=[("summary_date", -1)])
        if aggregated_docs:
            return aggregated_docs
        raise HTTPException(status_code=404, detail=f'Cumulative Aggregated Metrics data for battery_uid: {battery_uid} not found ')

    def get_operational_avg_aggregation_metrics(self, battery_uid: str, from_date: str, to_date: str):
        filter_query = {'bat_uid': battery_uid}
        filter_query = operational_summaries_date_filter_query(filter_query, from_date, to_date)
        operational_summaries = list(self.collection.find(filter_query, {'_id': 0, 'created_at': 0, 'updated_at': 0, 'inception_date': 0}))
        if len(operational_summaries) == 2:
            return operational_summaries
        raise HTTPException(status_code=204, headers={'detail': f'Operational Avg-Aggregated Metrics for battery_uid: {battery_uid} from {from_date} to {to_date} not found.'})

    def get_warranty_equivalent_cycles(self, battery_uid: str):
        filter_query = {'bat_uid': battery_uid, 'equivalent_cycles_count': {'$ne': None}}
        equivalent_cycles_data = list(self.collection.find(filter_query, {'_id': 0, 'equivalent_cycles_count': 1, 'summary_date': 1}, sort=[('summary_date', 1)]))
        if equivalent_cycles_data:
            return equivalent_cycles_data
        raise HTTPException(status_code=404, detail=f'Warranty Equivalent Cycles data for battery_uid: {battery_uid} not found ')

    def fetch_battery_degradation_cycles(self, battery_uid: str):
        filter_query = {'bat_uid': battery_uid, 'equivalent_cycles_count': {'$ne': None}}
        equivalent_cycles_data = list(self.collection.find(filter_query, {'_id': 0, 'equivalent_cycles_count': 1, 'summary_date': 1}, sort=[('summary_date', 1)]))
        if equivalent_cycles_data:
            return equivalent_cycles_data
        raise HTTPException(status_code=404, detail=f'Battery Degradation Cycles data for battery_uid: {battery_uid} not found ')

    def get_equivalent_cycles_last_month(self, battery_uid: str, from_date, to_date):
        filter_query = {'bat_uid': battery_uid, 'summary_date': {'$lte': to_date, '$gte': from_date}}
        equivalent_cycles_data = list(self.collection.find(filter_query, {'_id': 0, 'equivalent_cycles_count': 1, 'summary_date':  1}, sort=[('summary_date', -1)]))
        return equivalent_cycles_data


class DailySummaries:
    def __init__(self):
        db_conn = db_instance.get_database(DATABASE_NAME)
        self.collection = db_conn[DAILY_SUMMARIES]

    def fetch_health_avg_aggregations(self, battery_uid: str, from_date: str, to_date: str):
        pipeline = [{"$match": {'bat_uid': battery_uid, 'summary_date': {"$gte": convert_from_date_to_GMT(from_date), "$lte": convert_to_date_to_GMT(to_date)}}},
                    {'$sort': {"summary_date": 1}},
                    {"$group": {"_id": None,
                                'avg_soc_per_min': {'$avg': "$aggregated.soc_per.min"},
                                'avg_soc_per_max': {'$avg': "$aggregated.soc_per.max"},
                                'avg_temperature_min': {'$avg': "$aggregated.temperature_celsius.min"},
                                'avg_temperature_max': {'$avg': "$aggregated.temperature_celsius.max"},
                                'avg_temperature_avg': {'$avg': "$aggregated.temperature_celsius.avg"},
                                'avg_charging_hrs': {'$avg': "$aggregated.charging_hrs"},
                                'avg_discharging_hrs': {'$avg': "$aggregated.discharging_hrs"},
                                'avg_standby_hrs': {'$avg': "$aggregated.standby_hrs"},
                                'avg_C_rate_min_charging': {'$avg': "$aggregated.charging_rate_crate.min"},
                                'avg_C_rate_max_charging': {'$avg': "$aggregated.charging_rate_crate.max"},
                                'avg_C_rate_avg_charging': {'$avg': "$aggregated.charging_rate_crate.avg"},
                                'avg_C_rate_min_discharging': {'$avg': "$aggregated.discharging_rate_crate.min"},
                                'avg_C_rate_max_discharging': {'$avg': "$aggregated.discharging_rate_crate.max"},
                                'avg_C_rate_avg_discharging': {'$avg': "$aggregated.discharging_rate_crate.avg"},
                                'bms_soh_to_date': {'$last': "$aggregated.bms_soh"},
                                'bms_soh_from_date': {'$first': "$aggregated.bms_soh"},
                                }}]
        health_avg_aggregated_metrics = list(self.collection.aggregate(pipeline))
        if (health_avg_aggregated_metrics):
            return health_avg_aggregated_metrics[0]
        raise HTTPException(status_code=204, headers={'detail': f'Health Avg-Aggregated Metrics for battery_uid: {battery_uid} from {from_date} to {to_date} not found.'})

    def get_safety_avg_aggregated_metrics(self, battery_uid: str, from_date: str, to_date: str):
        pipeline = [{"$match": {'bat_uid': battery_uid, 'summary_date': {"$gte": convert_from_date_to_GMT(from_date), "$lte": convert_to_date_to_GMT(to_date)}}},
                    {"$group": {"_id": None,
                                'avg_temperature_min': {'$avg': "$aggregated.temperature_celsius.min"},
                                'avg_temperature_max': {'$avg': "$aggregated.temperature_celsius.max"},
                                'avg_cell_voltage_max': {'$avg': "$aggregated.cell_voltage_mv.max"},
                                'avg_cell_voltage_min': {'$avg': "$aggregated.cell_voltage_mv.min"},
                                }}]
        safety_avg_aggregated_metrics = list(self.collection.aggregate(pipeline))
        if safety_avg_aggregated_metrics:
            return safety_avg_aggregated_metrics
        raise HTTPException(status_code=204, headers={'detail': f'Safety Avg-Aggregated Metrics for battery_uid: {battery_uid} from {from_date} to {to_date} not found.'})

    def get_warranty_avg_aggregations(self, battery_uid: str, from_date: str, to_date: str):
        pipeline = [{"$match": {'bat_uid': battery_uid, 'summary_date': {"$gte": convert_from_date_to_GMT(from_date), "$lte": convert_to_date_to_GMT(to_date)}}},
                    {"$group": {"_id": None,
                                'avg_bms_soh': {'$avg': "$aggregated.bms_soh"},
                                'avg_min_soc': {'$avg': "$aggregated.soc_per.min"},
                                'avg_max_soc': {'$avg': "$aggregated.soc_per.max"},
                                'avg_min_C_rate_charging': {'$avg': "$aggregated.charging_rate_crate.min"},
                                'avg_max_C_rate_charging': {'$avg': "$aggregated.charging_rate_crate.max"},
                                'avg_min_C_rate_discharging': {'$avg': "$aggregated.discharging_rate_crate.min"},
                                'avg_max_C_rate_discharging': {'$avg': "$aggregated.discharging_rate_crate.max"},
                                'avg_equivalent_cycles': {'$avg': "$aggregated.equivalent_cycles"},
                                }}]
        warranty_avg_aggregations = list(self.collection.aggregate(pipeline))
        if warranty_avg_aggregations:
            return warranty_avg_aggregations
        raise HTTPException(status_code=204, headers={'detail': f'Warranty Avg-Aggregated Metrics for battery_uid: {battery_uid} from {from_date} to {to_date} not found.'})

    def get_soc_range_metrics(self, battery_uid: str):
        pipeline = [
            {"$match": {'bat_uid': battery_uid, 'discharging_cycles': {'$ne': None}}},
            {'$sort': {"summary_date": 1}},
            {'$addFields': {
                'discharging_cycles_max': {
                    '$filter': {
                        'input': '$discharging_cycles',
                        'cond': {
                            '$eq': ["$$this.duration_hrs", {'$max': "$discharging_cycles.duration_hrs"}]
                        }
                    }
                }}},
            {'$unwind': {'path': '$discharging_cycles_max'}},
            {'$addFields': {
                'duration_hrs': '$discharging_cycles_max.duration_hrs',
                'start_soc': '$discharging_cycles_max.start_soc',
                'end_soc': '$discharging_cycles_max.end_soc',
            }},
            {'$project': {
                '_id': 0,
                'summary_date': 1,
                'duration_hrs': 1,
                'start_soc': 1,
                'end_soc': 1
            }}
        ]
        operated_soc_range_plot_graph_data = list(self.collection.aggregate(pipeline))
        if (operated_soc_range_plot_graph_data):
            return operated_soc_range_plot_graph_data
        raise HTTPException(status_code=204, headers={'detail': f'Operational Soc Range Metrics for battery_uid: {battery_uid} not found'})

    def get_operational_valued_soc_metrics(self, battery_uid: str):
        pipeline = [
            {"$match": {'bat_uid': battery_uid, 'discharging_cycles': {'$ne': None}}},
            {'$sort': {"summary_date": 1}},
            {'$addFields': {
                'discharging_cycles_max': {
                    '$filter': {
                        'input': '$discharging_cycles',
                        'cond': {
                            '$eq': ["$$this.duration_hrs", {'$max': "$discharging_cycles.duration_hrs"}]
                        }
                    }
                }}},
            {'$unwind': {'path': '$discharging_cycles_max'}},
            {'$addFields': {
                'duration_hrs': '$discharging_cycles_max.duration_hrs',
                'start_soc': '$discharging_cycles_max.start_soc',
                'end_soc': '$discharging_cycles_max.end_soc',
            }},
            {'$project': {
                '_id': 0,
                'summary_date': 1,
                'duration_hrs': 1,
                'start_soc': 1,
                'end_soc': 1
            }}
        ]
        operated_soc_range_plot_graph_data = list(self.collection.aggregate(pipeline))
        if (operated_soc_range_plot_graph_data):
            return operated_soc_range_plot_graph_data
        raise HTTPException(status_code=204, headers={'detail': f'Operational Valued Soc Metrics for battery_uid: {battery_uid} not found.'})

    def get_operational_charging_cycles(self, battery_uid: str):
        pipeline = [
            {"$match": {'bat_uid': battery_uid, 'charging_cycles': {'$ne': None}}},
            {'$sort': {"summary_date": 1}},
            {'$addFields': {
                'charging_cycles_max': {
                    '$filter': {
                        'input': '$charging_cycles',
                        'cond': {
                            '$eq': ["$$this.duration_hrs", {'$max': "$charging_cycles.duration_hrs"}]
                        }
                    }
                }}},
            {'$unwind': {'path': '$charging_cycles_max'}},
            {'$addFields': {
                'end_soc': '$charging_cycles_max.end_soc',
            }},
            {'$project': {
                '_id': 0,
                'summary_date': 1,
                'end_soc': 1
            }}
        ]
        operational_charging_cycles_graph_data = list(self.collection.aggregate(pipeline))
        if (operational_charging_cycles_graph_data):
            return operational_charging_cycles_graph_data
        raise HTTPException(status_code=204, headers={'detail': f'Operational Charging Cycles Metrics for battery_uid: {battery_uid} not found.'})

    def get_operational_discharging_cycles(self, battery_uid: str):
        pipeline = [
            {"$match": {'bat_uid': battery_uid, 'discharging_cycles': {'$ne': None}}},
            {'$sort': {"summary_date": 1}},
            {'$addFields': {
                'discharging_cycles_max': {
                    '$filter': {
                        'input': '$discharging_cycles',
                        'cond': {
                            '$eq': ["$$this.duration_hrs", {'$max': "$discharging_cycles.duration_hrs"}]
                        }
                    }
                }}},
            {'$unwind': {'path': '$discharging_cycles_max'}},
            {'$addFields': {
                'end_soc': '$discharging_cycles_max.end_soc',
            }},
            {'$project': {
                '_id': 0,
                'summary_date': 1,
                'end_soc': 1
            }}
        ]
        operational_charging_cycles_graph_data = list(self.collection.aggregate(pipeline))
        if (operational_charging_cycles_graph_data):
            return operational_charging_cycles_graph_data
        raise HTTPException(status_code=204, headers={'detail': f'Operational Discharging Cycles Metrics for battery_uid: {battery_uid} not found.'})

    def get_bms_soh(self, battery_uid: str):
        filter_query = {'bat_uid': battery_uid, 'aggregated.bms_soh': {'$ne': None}}
        bms_soh_data = list(self.collection.find(filter_query, {'_id': 0, 'bms_soh': "$aggregated.bms_soh", 'summary_date': 1}, sort=[('summary_date', 1)]))
        if bms_soh_data:
            return bms_soh_data
        raise HTTPException(status_code=204, headers={'detail': f'Bms-Soh data not found for battery with battery_uid: {battery_uid}.'})

    def get_bms_soh_last_month(self, battery_uid: str, from_date, to_date):
        filter_query = {'bat_uid': battery_uid, 'summary_date': {'$lte': to_date, '$gte': from_date}}
        bms_soh_data = list(self.collection.find(filter_query, {'_id': 0, 'bms_soh': "$aggregated.bms_soh"}, sort=[('summary_date', -1)]))
        return bms_soh_data
    
    def get_battery_operated_range(self, battery_uid):
        pipeline = [
            {"$match": {'bat_uid': battery_uid}},
            {'$group': {'_id': 'null', 
                        'battery_initial_date': {'$min': '$summary_date'},
                        'battery_latest_date': {'$max': '$summary_date'},
            }},
            {'$project': {'_id': 0}}
        ]
        battery_operated_range = list(self.collection.aggregate(pipeline))
        return battery_operated_range[0]if battery_operated_range else None
    
    def get_battery_operated_temperature(self, battery_uid):
        fliter_query = {'bat_uid': battery_uid}
        recent_operated_temp_range = self.collection.find_one(fliter_query, 
                                                              {'_id': 0, 'max_temperature' : '$aggregated.temperature_celsius.max', 
                                                               'min_temperature': '$aggregated.temperature_celsius.min'
                                                               }, sort =[('summary_date', -1)])
        return recent_operated_temp_range
    
    def get_hourly_temperature_data(self, battery_uid: str):
        filter_query = {'bat_uid': battery_uid,'summary_date': {'$exists': True, '$ne': None},'max_temperature_hourly': {'$exists': True, '$ne': None}}
        hourly_temperature_data = list(self.collection.find(filter_query, {'_id': 0, 'summary_date': 1, 'max_temperature_hourly': 1}))
        if hourly_temperature_data:
            return hourly_temperature_data
        raise HTTPException(status_code=204, detail=f'Hourly Temperature Data for the battery_uid: {battery_uid} not found ')
    
class Feeds:
    def __init__(self) -> None:
        db_conn = db_instance.get_database(DATABASE_NAME)
        self.collection = db_conn[FEEDS]
        # self.collection2 = db_conn['feeds_test']

    def get_feeds_modules(self, module, eid, from_date, to_date, skip, limit):
        filter_query = {'eid': eid, 'module': {'$all': [module]}}
        filter_query = set_feed_date_filter_query(from_date, to_date, filter_query)
        feeds_documents = list(self.collection.find(filter_query, {'_id': 0}, sort=[('feed_date', -1)]).skip(skip).limit(limit))
        return list(feeds_documents)

    def get_feeds_batteries(self, module, batteries, eid, from_date, to_date, skip, limit):
        filter_query = {'eid': eid, 'module': {'$all': [module]}}
        filter_query = set_feed_date_filter_query(from_date, to_date, filter_query)
        if (batteries):
            filter_query['bat_uid'] = {'$in': batteries}
        feeds_documents = self.collection.find(filter_query, {'_id': 0}, sort=[('feed_date', -1)]).skip(skip).limit(limit)
        return list(feeds_documents)

    def get_feed_plots_ID(self, feed_id):
        filter_query = {'_id': ObjectId(feed_id)}
        feeds_plot = self.collection.find_one(filter_query, {'_id': 0, 'plots': 1}, sort=[('feed_date', -1)])
        if feeds_plot and len(feeds_plot['plots']):
            return feeds_plot
        raise HTTPException(status_code=404, detail=f"Feed plots for the feed with feed_id:{feed_id} are not found ")

    def get_feeds_filters(self, eid, module, batteries, from_date, to_date, tags, categories, skip, limit):
        filter_query = {'eid': eid}
        if module != 'all':
            filter_query['module'] = module
        if batteries:
            filter_query['bat_uid'] = {'$in': batteries.split(',')}
        if categories:
            filter_query['category_code'] = {'$in': categories.split(',')}
        if tags:
            filter_query['tags_codes'] = {'$in': tags.split(',')}
        filter_query = set_feed_date_filter_query(from_date, to_date, filter_query)
        feeds_documents = list(self.collection.find(filter_query, {'plots': 0}, sort=[('feed_date', -1)]).skip(skip).limit(limit))
        if feeds_documents:
            return feeds_documents
        raise HTTPException(status_code=204, headers={'detail': f"Feeds with the given parameters are not found."})


class Categories:
    def __init__(self):
        db_conn = db_instance.get_database(DATABASE_NAME)
        self.collection = db_conn[CATEGORIES]

    def get_all_categories(self):
        categories_documents = list(self.collection.find({}, {'_id': 0}))
        if categories_documents:
            return categories_documents
        raise HTTPException(status_code=404, detail='No Categories are found')


class Tags:
    def __init__(self):
        db_conn = db_instance.get_database(DATABASE_NAME)
        self.collection = db_conn[TAGS]

    def get_all_tags(self):
        tags_documents = list(self.collection.find({}, {'_id': 0}))
        if tags_documents:
            return tags_documents
        raise HTTPException(status_code=404, detail='No Tags are found')


class Signals:
    def __init__(self):
        db_conn = db_instance.get_database(DATABASE_NAME)
        # self.collection = db_conn['test_signals']
        self.collection = db_conn[SIGNALS]

    def get_signals_module(self, eid, module, battery_uid, from_date, to_date, skip, limit):
        filter_query = {'eid': eid}
        if battery_uid:
            filter_query['bat_uid'] = battery_uid
        if module:
            filter_query['module'] = {'$all': [module]}
        if (from_date or to_date):
            filter_query['signal_date'] = set_date_filter_query(from_date, to_date)
        signal_docs = list(self.collection.find(filter_query, {'children': 0, 'event_data': 0, 'created_at': 0, 'updated_at': 0, 'event_details': {'current_value': 0, 'threshold_value': 0}}, sort=[('signal_date', -1)]).skip(skip).limit(limit))
        if signal_docs:
            return signal_docs
        raise HTTPException(status_code=204, headers={'detail': f'Signals with given parameters {filter_query} are not found.'})

    def get_signal_event_data_objectID(self, signal_id):
        filter_query = {'_id': ObjectId(signal_id)}
        signal_doc = self.collection.find_one(filter_query, {'children': 0, 'created_at': 0, 'updated_at': 0, 'event_details': {'current_value': 0, 'threshold_value': 0}, '_id': 0})
        if (signal_doc is None):
            raise HTTPException(status_code=404, detail=f'Signal Event Data for the signal_id: {signal_id} not found ')
        return signal_doc

    def get_safety_signal_incidents_graph_data(self, bat_uid):
        pipeline = [
            {'$match': {'bat_uid': bat_uid, 'module': {'$in': ['safety']}}},
            {'$addFields': {
                'severity_value': {
                    '$switch': {
                        'branches': [
                            {'case': {'$eq': ['$severity', 'Critical']}, 'then': 5},
                            {'case': {'$eq': ['$severity', 'High']}, 'then': 4},
                            {'case': {'$eq': ['$severity', 'Major']}, 'then': 3},
                            {'case': {'$eq': ['$severity', 'Moderate']}, 'then': 2},
                            {'case': {'$eq': ['$severity', 'Minor']}, 'then': 1}
                        ],
                        'default': 0
                    }
                },
                'signal_id': {'$toString': '$_id'}
            }},
            {'$sort': {'signal_date': 1, 'severity_value': -1}},
            {'$group': {
                '_id': {
                    '$dateToString': {
                        'format': '%Y-%m-%d',
                        'date': '$signal_date'
                    }
                },
                'number_of_incidents': {'$count': {}},
                'signal_data': {
                    '$first': {
                        'signal_title': '$event_details.title',
                        'signal_id': '$signal_id',
                        'signal_date': '$signal_date',
                        'severity': '$severity'
                    }
                }
            }},
            {'$project': {
                '_id': 0,
                'number_of_incidents': 1,
                'signal_date': '$signal_data.signal_date',
                'signal_title': '$signal_data.signal_title',
                'signal_id': '$signal_data.signal_id',
                'severity': '$signal_data.severity',
            }}
        ]
        safety_signal_incidents_graph_data = list(self.collection.aggregate(pipeline))
        if (safety_signal_incidents_graph_data):
            return safety_signal_incidents_graph_data
        else:
            return []

    # def get_over_temperature_incidents_count(self, bat_uid, from_date = None, to_date= None):
    #     pipeline = []
    #     if(from_date and to_date):
    #         pipeline =  [
    #             {"$match": {'bat_uid': bat_uid,'signal_date': {'$gte' : convert_from_date_to_GMT(from_date), '$lte' : convert_to_date_to_GMT(to_date)},'event_details.title' : {'$regex' : 'Maximum Temperature Exceeded'}}},
    #             {"$count": 'over_temp_incidents'}
    #         ]
    #     else:
    #         pipeline =  [
    #             {"$match": {'bat_uid': bat_uid,'event_details.title' : {'$regex' : 'Maximum Temperature Exceeded'}}},
    #             {"$count": 'over_temp_incidents'}
    #         ]
    #     over_temp_incidents_count = list(self.collection.aggregate(pipeline))
    #     if (over_temp_incidents_count):
    #         return over_temp_incidents_count[0]['over_temp_incidents']
    #     else:
    #         return 0

    # def get_incidents_count(self, bat_uid, module, from_date=None, to_date=None):
    #     over_temp_match_filter = {'bat_uid': bat_uid,"event_details.title": {'$regex': "Maximum Temperature Exceeded"}}
    #     over_charging_match_filter = {'bat_uid': bat_uid,"event_details.title": "Battery Over-Charged"}
    #     safety_alerts_match_filter = {'bat_uid': bat_uid, 'module': {'$in': [module]}}
    #     if from_date and to_date:
    #         over_temp_match_filter['signal_date'] = {
    #             '$gte': convert_from_date_to_GMT(from_date),
    #             '$lte': convert_to_date_to_GMT(to_date)
    #         }
    #         over_charging_match_filter['signal_date'] = {
    #             '$gte': convert_from_date_to_GMT(from_date),
    #             '$lte': convert_to_date_to_GMT(to_date)
    #         }
    #         safety_alerts_match_filter['signal_date'] = {
    #             '$gte': convert_from_date_to_GMT(from_date),
    #             '$lte': convert_to_date_to_GMT(to_date)
    #         }
    #     pipeline = [
    #         {
    #             '$facet' : {
    #                 'over_temp_incidents_count': [
    #                     {'$match': over_temp_match_filter},
    #                     {'$count': "count"}
    #                     ],
    #                 'over_charging_incidents_count': [
    #                     {'$match': over_charging_match_filter},
    #                     {'$count': "count"}
    #                 ],
    #                 'safety_alerts_count': [
    #                     {'$match': safety_alerts_match_filter},
    #                     {'$count': "count"}
    #                 ]
    #             }
    #         }
    #     ]
    #     return list(self.collection.aggregate(pipeline))

    async def get_over_temperature_incidents_count(self, bat_uid, from_date=None, to_date=None):
        match_filter = {
            'bat_uid': bat_uid,
            'event_details.title': {'$regex': 'Maximum Temperature Exceeded'}
        }
        if from_date and to_date:
            match_filter['signal_date'] = {
                '$gte': convert_from_date_to_GMT(from_date),
                '$lte': convert_to_date_to_GMT(to_date)
            }
        pipeline = [
            {"$match": match_filter},
            {"$count": 'over_temp_incidents'}
        ]
        over_temp_incidents_count = list(self.collection.aggregate(pipeline))
        return over_temp_incidents_count[0]['over_temp_incidents'] if over_temp_incidents_count else 0

    async def get_over_charging_incidents_count(self, bat_uid, from_date=None, to_date=None):
        match_filter = {
            'bat_uid': bat_uid,
            'event_details.title': 'Battery Over-Charged'
        }
        if from_date and to_date:
            match_filter['signal_date'] = {
                '$gte': convert_from_date_to_GMT(from_date),
                '$lte': convert_to_date_to_GMT(to_date)
            }
        pipeline = [
            {"$match": match_filter},
            {"$count": 'over_charging_incidents'}
        ]
        over_temp_incidents_count = list(self.collection.aggregate(pipeline))
        return over_temp_incidents_count[0]['over_charging_incidents'] if over_temp_incidents_count else 0

    async def get_alerts_count_by_module(self, bat_uid, module, from_date=None, to_date=None):
        match_filter = {'bat_uid': bat_uid, 'module': {'$in': [module]}}
        if from_date and to_date:
            match_filter['signal_date'] = {
                '$gte': convert_from_date_to_GMT(from_date),
                '$lte': convert_to_date_to_GMT(to_date)
            }
        pipeline = [
            {"$match": match_filter},
            {"$count": 'over_charging_incidents'}
        ]
        over_temp_incidents_count = list(self.collection.aggregate(pipeline))
        return over_temp_incidents_count[0]['over_charging_incidents'] if over_temp_incidents_count else 0
    
    def get_signal_date_limits_by_battery(self, battery_uid):
        pipeline = [
            {"$match": {'bat_uid': battery_uid}},
            {'$group': {'_id': 'null', 
                        'oldest_signal_date': {'$min': '$signal_date'},
                        'latest_signal_date': {'$max': '$signal_date'},
            }},
            {'$project': {'_id': 0}}
        ]
        signal_date_limits = list(self.collection.aggregate(pipeline))
        return signal_date_limits[0]if signal_date_limits else None


class Test_Signals:
    def __init__(self):
        db_conn = db_instance.get_database(DATABASE_NAME)
        # self.collection = db_conn['test_signals']
        self.collection = db_conn[SIGNALS]

    def get_signals_bat_uid(self, bat_uid):
        filter_query = {'bat_uid': bat_uid, "level": {'$eq': None}}
        signals = self.collection.find(filter_query, {'event_data': 0})
        return list(signals)

    def get_node_signals_bat_uid(self, eid, bat_uid, from_date, to_date, sort_order=1):
        filter_query = {'eid': eid, 'bat_uid': bat_uid, 'level': 'node'}
        filter_query['signal_date'] = set_date_filter_query(from_date, to_date)
        signals = self.collection.find(filter_query, {'event_data': 0}).sort('signal_date', sort_order)
        return list(signals)

    def get_node_signal_of_signal(self, _id, eid, bat_uid):
        filter = {'children': ObjectId(_id), 'eid': eid, 'bat_uid': bat_uid}
        signal = self.collection.find_one(filter)
        if signal is None:
            filter = {'_id': ObjectId(_id), 'eid': eid, 'bat_uid': bat_uid}
            signal = self.collection.find_one(filter)
        return signal

    def get_signal_id(self, _id):
        filter_query = {'_id': _id, }
        signals = self.collection.find_one(filter_query, {'event_data': 0, })
        return signals


class Users:
    def __init__(self):
        db_conn = db_instance.get_database(DATABASE_NAME)
        self.collection = db_conn[USERS]

    def check_user(self, user: UserLoginSchema):
        filter_query = {"email": user.email, "password": user.password}
        user_details = list(self.collection.find(filter_query, {'_id': 0}))
        if user_details:
            return [True, user_details[0]["eid"]]
        else:
            return [False, ""]

    def check_user_eid(self, eid, user: UserLoginSchema):
        filter_query = {"email": user.email, "password": user.password, 'eid': eid}
        user_details = list(self.collection.find(filter_query, {'_id': 0}))
        if user_details:
            return [True, user_details[0]["eid"]]
        else:
            return [False, None]


class Auc:
    def __init__(self):
        db_conn = db_instance.get_database(DATABASE_NAME)
        self.collection = db_conn[AUC]

    def get_all_certificates_bat_uid(self, battery_uid):
        filter_query = {'bat_uid': battery_uid}
        project = {'certificate_pdf': 0, '_id': 0, 'certificate_bat_data': 0}
        certificates = list(self.collection.find(filter_query, project).sort('_id', -1))
        if certificates:
            return certificates
        raise HTTPException(status_code=204, headers={'detail': f"No Certificates for the given battery_uid"})

    def insert_auc(self, document):
        _id = str(self.collection.insert_one(document).inserted_id)
        return _id

    def check_if_certificate_id_exists(self, certificate_id):
        filter_query = {'certificate_id': certificate_id}
        certificate = self.collection.find_one(filter_query)
        if certificate:
            return True
        return False

    def get_certificate(self, battery_uid, certificate_id):
        filter_query = {'bat_uid': battery_uid, 'certificate_id': certificate_id}
        certificate = self.collection.find_one(filter_query)
        if certificate:
            return certificate
        raise HTTPException(status_code=404, detail="Certificate not found")


class BatteryAlerts:
    def __init__(self):
        db_conn = db_instance.get_database(DATABASE_NAME)
        self.collection = db_conn[BATTERY_ALERTS]

    def get_battery_alerts(self, revision, code):
        battery_alerts = list(self.collection.find({'revision': revision, 'code': code}, {'created_at': 0, 'updated_at': 0, '_id': 0, }))
        if len(battery_alerts):
            return battery_alerts
        raise HTTPException(status_code=404, detail=f"Batter Alerts with  {{revision: {revision}, code: {code}}} not found")

    def get_battery_alerts_code(self,  code):
        battery_alerts = list(self.collection.find({'code': code}, {'created_at': 0, 'updated_at': 0, '_id': 0, }))
        if len(battery_alerts):
            return battery_alerts
        raise HTTPException(status_code=404, detail=f"Batter Alerts with  {{code: {code}}} not found")

    def update_battery_alerts(self, updated_battery_alert):
        _id = str(self.collection.insert_one(updated_battery_alert).inserted_id)
        updated_battery_alert['_id'] = _id

    def create_battery_alerts(self, alert_doc):
        _id = str(self.collection.insert_one(alert_doc).inserted_id)
        alert_doc['_id'] = _id

    def get_no_of_revisions_code(self, code):
        return self.collection.count_documents({'code': code})


class DailySummariesV3:
    def __init__(self):
        db_conn = db_instance.get_database(DATABASE_NAME)
        self.collection = db_conn[DAILY_SUMMARIES_V3]

    def get_hourly_temperature_data(self, battery_uid: str):
        filter_query = {'bat_uid': battery_uid}
        hourly_temperature_data = list(self.collection.find(filter_query, {'_id': 0, 'summary_date': 1, 'max_temperature_hourly': 1}))
        if hourly_temperature_data:
            return hourly_temperature_data
        raise HTTPException(status_code=404, detail=f'Hourly Temperature Data for the battery_uid: {battery_uid} not found ')


class UsageRecommendations:
    def __init__(self):
        db_conn = db_instance.get_database(DATABASE_NAME)
        self.collection = db_conn[USAGE_RECOMMENDATIONS]

    def fetch_usage_recommendations(self, module: str, battery_uid: str, limit: int):
        pipeline = [
            {"$match": {'bat_uid': battery_uid, 'module': {'$in': [module]}}},
            {'$sort': {'date': -1}},
            {'$group': {'_id': '$title', 'recommendation': {'$first': '$recommendation'}, 'date': {'$first': '$date'}}},
            {'$sort': {'date': -1}},
            {'$limit': limit},
            {'$project': {'title': '$_id', '_id': 0, 'recommendation': 1}}
        ]
        usage_recommendations = list(self.collection.aggregate(pipeline))
        if (usage_recommendations):
            return usage_recommendations
        return []


class ReleaseNotes:
    def __init__(self) -> None:
        db_conn = db_instance.get_database(DATABASE_NAME)
        self.collection = db_conn[RELEASE_NOTES]

    def get_release_notes_version(self, version):
        filter_query = {}
        if version:
            filter_query = {'version': version}
        return list(self.collection.find(filter_query, {'_id': 0}, sort=[('version', -1)]))

    def create_release_notes(self, release_note):
        insert_result = str(self.collection.insert_one(release_note).inserted_id)
        return insert_result

    def get_version(self, version):
        return bool(self.collection.find_one({'version': version}))

    def delete_release_notes_with_version(self, version):
        _id = self.collection.delete_one({'version': version})


# defining instances for all classes
meta_data_instance = BatteryMetaData()
battery_models_instance = BatteryModels()
aggregated_metrics_instance = CumulativeAggregatedMetrics()
daily_summaries_instance = DailySummaries()
feeds_instance = Feeds()
categories_instance = Categories()
tags_instance = Tags()
signals_instance = Signals()
users_instance = Users()
auc_instance = Auc()
battery_alerts_instance = BatteryAlerts()
test_signals_instance = Test_Signals()
usage_recommendation_instance = UsageRecommendations()
daily_summaries_v3_instance = DailySummariesV3()
release_notes_instance = ReleaseNotes()
