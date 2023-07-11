from flask import Flask, jsonify
from flask_cors import CORS
from services.TelegramService import TelegramService
from dotenv import load_dotenv

import os

load_dotenv('.env')

app = Flask(__name__, template_folder='app/templates')
app.app_context().push()
CORS(app)


@app.route('/api/data', methods=['GET'])
def get_data():
    data = {
        'message': 'Привет от сервера!'
    }
    return jsonify(data)


@app.route('/chats', methods=['GET'])
async def get_chats():
    telegram_service = TelegramService()
    await telegram_service.connect()
    dialog_names = telegram_service.get_dialog_names()
    telegram_service.disconnect()

    return jsonify(dialog_names)


if __name__ == '__main__':
    app.run()
