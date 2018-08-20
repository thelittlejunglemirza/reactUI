'''
    @File: Tos_db.py
    @Author: Kai Sackville-Hii
    @Email: kai.sackville-hii@sap.com
    @Version: v3.0.0
    @Company: SAP - R&I in GTLC

    @Description
        This class handles all the queries to and from db.Tos collection.
        It inherits functions from its parent class Database
'''

from server.Database.Database import Database
import time


class Tos_db(Database):

    #   @Des: Constructs Tos_db class
    #   @Pre: kwargs should contain variable collection which is the tunnel to the db.Tos collection
    #         example creation: obj = Tos_db(collection=some_collection_tunnel)
    #   @Post: Tunnel to collection secured, class constructed
    def __init__(self, **kwargs):
        self.tos_collection = kwargs['tos_collection']
        self.tosVersion_collection = kwargs['tosVersion_collection']

        self.collection = self.tos_collection

    #   @Des: Gets all versions collection
    #   @Pre: start must be a int
    #   @Post: will all tos versions entries (20 limit)
    def get_versions(self, start):
        self.collection = self.tosVersion_collection
        resp = self.get_collection(start)
        self.collection = self.tos_collection
        return resp

    #   @Des: Gets one version object
    #   @Pre: Id is a string
    #   @Post: will return single tos versions entry
    def get_single_version(self,id):
        self.collection = self.tosVersion_collection
        resp = self.get_entry(id)
        self.collection = self.tos_collection
        return resp

    #   @Des: Converts url to its subsequent id
    #   @Pre: url is a string, and exists in the db, must specify collection (Tos/TosVersions) in string form
    #   @Post: If url exists, resp contains the subsequent id and ok is True, else resp is an empty
    #          string and ok is False. resp and ok are returned as a list.
    def url_to_id(self, url, collection):
        try:
            if collection == "Tos":
                self.collection=self.tos_collection
            elif collection == "TosVersions":
                self.collection=self.tosVersion_collection

            data = self.collection.find_one({"url": url})
            resp = str(data["_id"])
            ok = True
        except:
            resp = ''
            ok = False
            self.collection = self.tos_collection

        self.collection = self.tos_collection
        return [resp, ok]

    #   @Des: Handles creation of entrys for Tos and TosVersions collections
    #   @Pre: data must be a valid json object
    #   @Post: Entry is created in Tos collection then either a new entry is made in TosVersions
    #           or versions key is appended
    def create_entry(self, data):

        # format entry
        entryData = {
            "date_created": time.strftime("%Y-%m-%d"),
            "date_reviewed": "",
            "url": data["url"],
            "statements": data["statements"],
            "risk_assessment": data["risk_assessment"],
            "dom": data["dom"]
        }

        # add data to Tos
        tos_entry_id = super().create_entry(entryData)

        # switch collection to TosVersions
        self.collection = self.tosVersion_collection

        # check if url exists in TosVersions
        TosVersion_entry = self.collection.find_one({"url": data["url"]})

        if TosVersion_entry == None:
            verionEntry = {
                            "date_created": time.strftime("%Y-%m-%d"),
                            "url": data['url'],
                            "versions": [
                                {
                                    "_id": tos_entry_id,
                                    "date_created": time.strftime("%Y-%m-%d")
                                }
                            ]
                          }
            super().create_entry(verionEntry)
        else:
            super().append_to_key("_id", TosVersion_entry['_id'], "versions", {"_id":tos_entry_id, "date_created": time.strftime("%Y-%m-%d")})


        # switch back collection to Tos
        self.collection = self.tos_collection

    def delete_entry(self, tos_id):
        data = super().get_entry(tos_id)
        url = data['url']

        if not super().delete_entry(tos_id):
            return False

        self.collection = self.tosVersion_collection

        if not super().pull_from_key("url", url,'versions', {"_id": tos_id}):
            return False

        self.collection = self.tos_collection

        return True

    def check_tosVersion_object_exists(self, key, value):
        self.collection = self.tosVersion_collection
        resp = super().check_object_exists(key, value)
        self.collection = self.tos_collection
        return resp

    def get_matches(self, key, value):
        if key == 'version-url':
            self.collection = self.tosVersion_collection
            resp = super().get_matches('url', value)
            self.collection = self.tos_collection
            return resp
        else:
            return super().get_matches('url', value)


