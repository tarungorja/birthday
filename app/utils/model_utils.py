import pickle
from sklearn.utils.extmath import safe_sparse_dot
from datetime import datetime
import numpy as np
import pandas as pd

TIME_STEPS = 15

def parse_date(date_str):
    for fmt in ('%Y-%m-%d', '%d-%m-%Y'):
        try:
            return datetime.strptime(date_str, fmt)
        except ValueError:
            continue
    raise ValueError('No valid date format found for {}'.format(date_str))

def predict_soh(X, coef, intercept):
    return safe_sparse_dot(X, coef.T,
                       dense_output=True) + intercept

def predict_test_data_offline_soh(soh_df):
    # Get first 30 days value to predict lifetime
    soh_df['rolling_soh'] = soh_df['bms_soh'].rolling(5).mean()
    soh_df['rolling_soh'] = soh_df['rolling_soh'].bfill()
    first_30_days = soh_df['rolling_soh'].head(30).tolist()
    #Getting last 15 days for predicting from first 30 days
    last_15_days = first_30_days[15:]
    initial_date = soh_df.iloc[29]['summary_date']
    #Getting last date so we can calculate num of future days to predict
    last_date = soh_df.iloc[-1]['summary_date']
    initial_date = parse_date(initial_date)
    last_date = parse_date(last_date)
    delta_days = (last_date - initial_date).days
    num_future_days = delta_days + 30
    future_dates = pd.date_range(start=initial_date, periods=num_future_days+1, freq='D')[1:]
    future_dates = [dt.date() for dt in future_dates]
    future_df = pd.DataFrame({'summary_date': future_dates})
    predicted_soh_values = last_15_days
    # Importing coefficients and intercept
    with open('models/soh/soh_rolling_avg_v2_coef.pkl', 'rb') as file:
        loaded_coef = pickle.load(file)
    with open('models/soh/soh_rolling_avg_v2_intercept.pkl', 'rb') as file:
        loaded_intercept = pickle.load(file)
    for day in range(1, num_future_days+1):
            predicted_soh = predict_soh(np.array([predicted_soh_values[-15:]]), loaded_coef, loaded_intercept)
            predicted_soh_values.append(round(predicted_soh[0]))
    future_df['predicted_soh'] = predicted_soh_values[15:]
    return future_df

def predict_test_data_offline(soh_df):
    # Get first 30 days value to predict lifetime
    soh_df['rolling_soh'] = soh_df['soh'].rolling(5).mean()
    soh_df['rolling_soh'] = soh_df['rolling_soh'].bfill()
    first_30_days = soh_df['rolling_soh'].head(30).tolist()
    #Getting last 15 days for predicting from first 30 days
    last_15_days = first_30_days[15:]
    initial_date = soh_df.iloc[29]['timestamp']
    #Getting last date so we can calculate num of future days to predict
    last_date = soh_df.iloc[-1]['timestamp']
    initial_date = parse_date(initial_date)
    last_date = parse_date(last_date)
    delta_days = (last_date - initial_date).days
    num_future_days = delta_days + 30
    future_dates = pd.date_range(start=initial_date, periods=num_future_days+1, freq='D')[1:]
    future_dates = [dt.date() for dt in future_dates]
    future_df = pd.DataFrame({'timestamp': future_dates})
    predicted_soh_values = last_15_days
    # Importing coefficients and intercept
    with open('models/soh/soh_rolling_avg_v2_coef.pkl', 'rb') as file:
        loaded_coef = pickle.load(file)
    with open('models/soh/soh_rolling_avg_v2_intercept.pkl', 'rb') as file:
        loaded_intercept = pickle.load(file)
    for day in range(1, num_future_days+1):
            predicted_soh = predict_soh(np.array([predicted_soh_values[-15:]]), loaded_coef, loaded_intercept)
            predicted_soh_values.append(round(predicted_soh[0]))
    future_df['predicted_soh'] = predicted_soh_values[15:]
    return future_df

    