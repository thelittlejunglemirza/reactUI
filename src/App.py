'''
    @File: App.py
    @Author: Kai Sackville-Hii
    @Email: kai.sackville-hii@sap.com
    @Version: v3.0.0
    @Company: SAP - R&I in GTLC

    @Description
        This file is the main entry point for this server. Its main job is to initialize the server and all its
        connections which include:
            * Run Server for React App
            * Create Flask App
            * Connect to Mongodb WASP client
            * Establish tunnel to collections in WASP
            * Initialize db collection objects
            * Map API endpoints to defined class

    @Index
        1.  < !~- FLASK ~-! >
        2.  < !~- MONGODB ~-! >
        3.  < !~- DB COLLECTION CLASS OBJECTS -~! >
        4.  < !~- API ENDPOINTS -~! >
'''

from flask import Flask, render_template
from flask_restful import Api
from server.API_endpoints.Tos_api import *
from server.API_endpoints.Api_api import *
from server.API_endpoints.Project_api import *
from pymongo import MongoClient
from server.Database.Collections.Tos_db import Tos_db
from server.Database.Collections.Api_db import Api_db
from server.Database.Collections.Project_db import Project_db
from flask_cors import CORS

# LOCAL CONSTANTS, path to React app build and react app static folder
PATH_TO_REACT_BUILD = 'build/'
PATH_TO_REACT_STATIC = 'build/static'

# 1. < !~-~-~~-~-~ FLASK ~-~-~~-~-~!> #

# Initialize Flask Framework with links to react builds
app = Flask(__name__, static_folder=PATH_TO_REACT_STATIC, template_folder=PATH_TO_REACT_BUILD)
CORS(app)
api = Api(app)

# serve the react app
@app.route('/')
def index():
    return render_template('index.html')

# 2. < !~-~-~~-~-~ MONGODB ~-~-~~-~-~!> #

# Create MongoDB client to WASP db
client = MongoClient('localhost', connect=False)
db = client.WASP

# Create tunnels to WASP.db.collections
tos_collection = db.Tos
tosVersion_collection = db.TosVersions
api_collection = db.Api
project_collection = db.Project

# 3. < !~-~-~~-~-~ DB COLLECTION CLASS OBJECTS ~-~-~~-~-~!> #

# Initialize db collection objects
tos_db_obj = Tos_db(tos_collection=tos_collection, tosVersion_collection=tosVersion_collection)
api_db_obj = Api_db(api_collection=api_collection)
project_db_obj = Project_db(project_collection=project_collection)


# 4. < !~-~-~~-~-~ API ENDPOINTS ~-~-~~-~-~!> #

# Map endpoints
api.add_resource(Tos_api, '/api/tos', resource_class_kwargs={'collection': tos_db_obj})
api.add_resource(TosVersions_api, '/api/tos/versions', resource_class_kwargs={'collection': tos_db_obj})
api.add_resource(TosVersions_object_api, '/api/tos/versions/single', resource_class_kwargs={'collection': tos_db_obj})
api.add_resource(Tos_object_api, '/api/tos/<string:id>', resource_class_kwargs={'collection': tos_db_obj})
api.add_resource(Api_api, '/api/api', resource_class_kwargs={'collection': api_db_obj})
api.add_resource(Api_object_api, '/api/api/<string:id>', resource_class_kwargs={'collection': api_db_obj})
api.add_resource(Project_api, '/api/project', resource_class_kwargs={'collection':project_db_obj})
api.add_resource(Project_object_api, '/api/project/<string:id>', resource_class_kwargs={'collection': project_db_obj})


if __name__ == '__main__':
    app.run(debug=True)