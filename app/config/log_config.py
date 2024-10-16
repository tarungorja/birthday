from datetime import datetime
import logging
from logging.handlers import TimedRotatingFileHandler
import os
from decouple import config
from pythonjsonlogger import jsonlogger

class DynamicTimedRotatingFileHandler(TimedRotatingFileHandler):
    def __init__(self, filename, **kwargs):
        filename = self.generate_filename(filename)
        super().__init__(filename, **kwargs)

    def generate_filename(self, filename):
        today_date = datetime.now().strftime('%Y-%m-%d')
        return filename.format(today_date=today_date)

def configure_logging():
    log_directory = config("LOG_DIR")
    # Create a logs directory if it doesn't exist
    if not os.path.exists(log_directory):
        os.makedirs(log_directory)

    # Configure file logger with a DynamicTimedRotatingFileHandler
    log_file_path = os.path.join(log_directory, "logs.log")
    file_handler = DynamicTimedRotatingFileHandler(log_file_path, when='midnight', interval=1, backupCount=7)  # Rotates daily, keeps 7 backup files
    
    # Create JSON formatter
    json_formatter = jsonlogger.JsonFormatter('%(asctime)s %(levelname)s %(message)s', datefmt='%Y-%m-%d %H:%M:%S')
    
    # Set formatter for file handler
    file_handler.setFormatter(json_formatter)
    file_handler.suffix = "%Y-%m-%d"
    
    # Configure console logger
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(logging.Formatter('%(asctime)s [%(levelname)s]: %(message)s', datefmt='%Y-%m-%d %H:%M:%S'))
    
    # Get the root logger
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)
    
    # Add both handlers to the logger
    logger.addHandler(file_handler)
    logger.addHandler(console_handler)

    logging.getLogger("uvicorn.access").propagate = True
    logging.getLogger("uvicorn").propagate = True

    # Add initial debug message to verify logging configuration
    logger.debug('Logging has been configured. Console and file handlers added.')
