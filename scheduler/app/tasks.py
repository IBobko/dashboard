import json
import time

from app import get_app
from app.parsers.website_parser import WebsiteParser
from apscheduler.schedulers.background import BackgroundScheduler
from constants import BestChangeConstants
from logging_config import get_logger


def bestchange_parse():
    logger = get_logger()
    parser = WebsiteParser(BestChangeConstants.URL)
    exchanges_info = parser.parse()
    exchanges_data = {'exchanges': exchanges_info}
    current_timestamp = int(time.time())  # Get the current timestamp

    file_name = BestChangeConstants.FILENAME_FORMAT.format(current_timestamp)

    with get_app().app_context():
        try:
            with open(file_name, "w") as json_file:
                # Write the data to the file in JSON format
                json.dump(exchanges_data, json_file)
                logger.info(f"File {file_name} successfully saved.")
        except IOError as e:
            # Handle file I/O errors
            logger.error(f"Error writing data to file: {str(e)}")


def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(func=bestchange_parse, trigger="interval", minutes=30)  # You can configure the schedule here
    scheduler.start()
    get_app().scheduler = scheduler
