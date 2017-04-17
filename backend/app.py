#!flask/bin/python
from flask import Flask
from flask import request
from flask_cors import CORS
from pymongo import MongoClient
import json
from bson.json_util import dumps
app = Flask(__name__)

CORS(app)



@app.route('/<lat>/<long>/<type>/', methods=['GET'])
def get_nearest(lat, long, type):


    if int(type) == 0:
        db = client.toronto.police
    elif int(type) == 1:
        db = client.toronto.fire
    elif int(type) == 2:
        db = client.toronto.ambulance

    response = dumps(db.find({"geometry":
                                  {"$near":
                                       {"$geometry":
                                            {"type": "Point",
                                             "coordinates": [float(long), float(lat)]}
                                        }
                                   }
                              }).limit(5))

    return response


if __name__ == '__main__':
    #app.debug = True
    app.run()




# @app.route('/', methods=['GET'])
# def index():
#     return "OK"