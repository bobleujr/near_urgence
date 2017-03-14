#!flask/bin/python
from flask import Flask
from flask import request
from flask_cors import CORS
import pymongo

app = Flask(__name__)

CORS(app)

@app.route('/', methods=['GET', 'POST'])
def index():
    print request.data
    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug=True)

