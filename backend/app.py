#!flask/bin/python
from flask import Flask
from flask import request
from flask_cors import CORS
from pymongo import MongoClient
import json
app = Flask(__name__)

CORS(app)

@app.route('/', methods=['GET', 'POST'])
def index():
    client = MongoClient('localhost', 27017)

    params = json.loads(request.data)

    db = client.mydb.buildingfootprints



    print request.data
    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug=True)

