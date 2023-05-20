from flask import Flask, jsonify
from flask_cors import CORS

from parsers.website_parser import WebsiteParser
from services.my_service import start_scheduler

app = Flask(__name__, template_folder='app/templates')
CORS(app)


@app.route('/api/data', methods=['GET'])
def get_data():
    data = {
        'message': 'Привет от сервера!'
    }
    return jsonify(data)


@app.route('/parse')
def parse_website():
    url = 'https://www.bestchange.ru/yoomoney-to-tether-trc20.html'

    parser = WebsiteParser(url)
    first_columns = parser.parse()

    return jsonify({'title': first_columns})


if __name__ == '__main__':
    start_scheduler()
    app.run()
