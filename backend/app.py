#!flask/bin/python
from flask import Flask
from flask import request
from flask_cors import CORS
from pymongo import MongoClient
import json
from bson.json_util import dumps
app = Flask(__name__)

CORS(app)

@app.route('/coordinates', methods=['POST'])
def get_nearest():
    params = json.loads(request.data)

    
    if int(params['type']) == 0:
        db = client.toronto.police
    elif int(params['type']) == 1:
        db = client.toronto.fire
    elif int(params['type']) == 2:
        db = client.toronto.ambulance

    response = dumps(db.find({"geometry":
                                {"$near":
                                    {"$geometry":
                                        {"type" : "Point" ,"coordinates":[ float(params['long']), float(params['lat']) ]}
                                    }
                                }
                             }).limit(5))


    return response

@app.route('/', methods=['GET'])
def index():
    return "OK"

if __name__ == '__main__':
    app.debug = True
    app.run()

