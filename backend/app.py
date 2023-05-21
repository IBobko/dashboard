from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__, template_folder='app/templates')
app.app_context().push()
CORS(app)


@app.route('/api/data', methods=['GET'])
def get_data():
    data = {
        'message': 'Привет от сервера!'
    }
    return jsonify(data)


if __name__ == '__main__':
    app.run()
