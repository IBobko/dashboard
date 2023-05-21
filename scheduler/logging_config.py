import logging

logger = logging.getLogger('my_app')
logger.setLevel(logging.DEBUG)

file_handler = logging.FileHandler('app.log')
console_handler = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
file_handler.setFormatter(formatter)
console_handler.setFormatter(formatter)
logger.addHandler(file_handler)
logger.addHandler(console_handler)


def get_logger():
    return logger
