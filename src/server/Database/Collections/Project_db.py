'''
    @File: Project.py
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


class Project_db(Database):

    #   @Des: Constructs Api_db class
    #   @Pre: kwargs should contain variable collection which is the tunnel to the db.Api collection
    #         example creation: obj = Api_db(collection=some_collection_tunnel)
    #   @Post: Tunnel to collection secured, class constructed
    def __init__(self, **kwargs):
        self.collection = kwargs['project_collection']

    #   @Des: Handles creation of entries for API collection
    #   @Pre: data must be a valid json object
    #   @Post: Entry is created in API collection
    def create_entry(self, data):
        # check if url exists in TosVersions
        Project_entry = self.collection.find_one({"project_name": data["project_name"]})

        if Project_entry == None:
            new_entry = {
                "date_created": time.strftime("%Y-%m-%d"),
                "project_name": data["project_name"],
                "review_status": "",
                "api_list": data['api_list']
            }
            super().create_entry(new_entry)
        else:
            # for elmts in data['api_list']:
            #     super().append_to_key("_id", Project_entry['_id'], "api_list", elmts)
            raise Exception('Project already exists')