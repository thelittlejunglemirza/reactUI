'''
    @File: Api_db.py
    @Author: Kai Sackville-Hii
    @Email: kai.sackville-hii@sap.com
    @Version: v3.0.0
    @Company: SAP - R&I in GTLC

    @Description
        This class handles all the queries to and from db.Api collection.
        It inherits functions from its parent class Database
'''

from server.Database.Database import Database
import time


class Api_db(Database):

    #   @Des: Constructs Api_db class
    #   @Pre: kwargs should contain variable collection which is the tunnel to the db.Api collection
    #         example creation: obj = Api_db(collection=some_collection_tunnel)
    #   @Post: Tunnel to collection secured, class constructed
    def __init__(self, **kwargs):
        self.collection = kwargs['api_collection']

    #   @Des: Handles creation of entries for API collection
    #   @Pre: data must be a valid json object
    #   @Post: Entry is created in API collection
    def create_entry(self, data):
        # check if url exists in TosVersions
        Api_entry = self.collection.find_one({"api_name": data["api_name"]})

        if Api_entry == None:
            new_entry = {
                "date_created": time.strftime("%Y-%m-%d"),
                "date_reviewed": "",
                "api_name": data['api_name'],
                "provider": data["provider"],
                "risk_assessment": "",
                "risk_level": "",
                "tos_list": data['tos_list']
            }
            super().create_entry(new_entry)
        else:
            for elmts in data['tos']:
                super().append_to_key("_id", Api_entry['_id'], "tos", elmts)



