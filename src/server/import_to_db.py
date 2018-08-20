'''
    @File: import_to_db.py
    @Author: Kai Sackville-Hii
    @Email: kai.sackville-hii@sap.com
    @Version: v3.0.0
    @Company: SAP - R&I in GTLC

    @Description
        This file populates localhost mongodb with sample data located in ./res/data_samples
        It is intended to be used in development when populating db.
        Pre:
            Mongodb must be installed and working, no data matching the data samples can be in
            db otherwise duplicate error will occur.
        Post:
            4 collections of sample data will be imported to your mongodb

'''

from pymongo import MongoClient
import os
import json
from bson import ObjectId

JSON_DATAFILE_PATH = './res/data_samples'


# Create MongoDB client to WASP db
print("connecting to mongodb")
client = MongoClient('localhost', connect=False)
db = client.WASP


# iterate child files
for root, dirs, files in os.walk(JSON_DATAFILE_PATH):
    print("reading sub folders in "+root)
    for name in files:
        print("reading "+ name)

        # get filename and connect to that collection
        first_name = name.split('.')[0]
        print('connecting to ' + first_name)
        collection = db[first_name]

        # Read from json File
        with open(JSON_DATAFILE_PATH+'/'+name, 'r', encoding='utf-8') as f:
            data = json.load(f, strict=False)

            # import each object, convert id to objectId
            for obj in data:
                id = ObjectId(obj['_id'])
                obj['_id'] = id
                collection.insert_one(obj)


print('import successful')