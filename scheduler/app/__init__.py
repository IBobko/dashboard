from flask import Flask

_app = None


def get_app():
    global _app
    if _app is None:
        _app = Flask(__name__)

    return _app
