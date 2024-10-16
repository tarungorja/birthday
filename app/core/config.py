from decouple import config

# Collections Names
BATTERY_METADATA: str = "battery_metadata"
BATTERY_MODELS: str = "battery_models"
CUMULATIVE_AGGREGATED_METRICS: str = "cummulative_aggregated_metrics"
DAILY_SUMMARIES: str = "daily_summaries"
FEEDS: str = "feeds"
CATEGORIES: str = "categories"
TAGS: str = 'tags'
SIGNALS: str = 'signals'
USERS: str = 'users'
AUC: str = 'auc'
BATTERY_ALERTS = 'battery_alerts'
USAGE_RECOMMENDATIONS = 'usuage_recommendations'
DAILY_SUMMARIES_V3 = 'daily_summaries_v3'
RELEASE_NOTES = 'release_notes'
# Database Name
DATABASE_NAME: str = config("DATABASE_NAME")
