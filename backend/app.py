#!flask/bin/python
from flask import Flask
from flask import request
from flask_cors import CORS
from pymongo import MongoClient
import json
from bson.json_util import dumps
app = Flask(__name__)

CORS(app)

@app.route('/', methods=['POST'])
def index():

    params = json.loads(request.data)


    if int(params['type']) == 0:
        db = client.toronto.police
    elif int(params['type']) == 1:
        db = client.toronto.fire
    elif int(params['type']) == 2:
        db = client.toronto.ambulance

    # response = list(db.find({"geometry": {"$near": [float(params['lat']), float(params['long'])]}}).limit(5))
    response = dumps(db.find({"geometry":
                             {"$near":
                             {"$geometry":
                             {"type" : "Point" ,"coordinates":[ float(params['long']), float(params['lat']) ]}
                             }
                             }
                             }).limit(5))

    # response = json.dumps(response)
    # db.places.find({point: { $near: [151.1955562233925, -33.87107475181752], $maxDistance: 0.1 / 111}} )

    # elif params.type == 3:
    #     db = client.test.desfibrilator
    # elif params.type == 4:



    return response

if __name__ == '__main__':
    app.run(debug=True)

