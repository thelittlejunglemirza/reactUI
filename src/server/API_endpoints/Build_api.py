'''
    @File: Build_api.py
    @Author: Kai Sackville-Hii
    @Email: kai.sackville-hii@sap.com
    @Version: v3.0.0
    @Company: SAP - R&I in GTLC

    @Description
        These class' handle the RESTful request from the Api endpoints.

    @Index
        1.  < !~- MAIN ENDPOINT ~-! >
        2.  < !~- SUB ENDPOINTS ~-! >
'''

from flask import request
from flask_restful import Resource

# 1. < !~-~-~~-~-~ MAIN ENDPOINT ~-~-~~-~-~!> #

class Build_api(Resource):

    def __init__(self,**kwargs):
        print('init Build_api')
        self.db_list = kwargs['collection']
        self.db = None

    def options(self):
        return({
            "allowed_methods": ['POST'],
            "number_of_objects": self.db.number_of_objects()
        })

    def post(self):
        try:
            args = request.get_json()
            api_list = args["api_list"]

            # switch to project collection
            self.db = self.db_list["project"]

            # format project entry
            temp_api_list = []
            for api in api_list:
                temp_api_list.append(api["api_name"])

            project_data = {
                "project_name": args["project_name"],
                "api_list": temp_api_list
            }

            # Create entry in Project collection
            self.db.create_entry(project_data)

            # ~!~!~ API LEVEL ~!~!~ #
            for api in api_list:
                self.db = self.db_list["api"]
                tos_list = api["tos_list"]

                print("checking if api exists")
                if self.db.check_object_exists("api_name", api["api_name"]) == False:
                    print("building apis")
                    temp_tos_list = []
                    for tos in tos_list:
                        temp_tos_list.append(tos["tos"])

                    api_data = {
                        "api_name": api['api_name'],
                        "provider": api["provider"],
                        "tos_list": temp_tos_list
                    }

                    self.db.create_entry(api_data)

                # ~!~!~ TOSVERSIONS LEVEL ~!~!~ #
                for tosV in tos_list:
                    self.db = self.db_list["tos"]

                    print("checking if Tos exists")
                    tosV_id = self.db.url_to_id(tosV["tos"], "TosVersions")
                    print(tosV_id)

                    if tosV_id[1] == False:
                        print("building tos")
                        temp_tos_data_list = []

                        # GET REQUEST TO BD
                        # for version in tosV['versions']
                        #   append(requests.get(@@@+tosV["versions]))


                        self.db.create_entry()

                    elif len(tosV["versions"]) != len(self.db.get_single_version(tosV_id[0])["versions"]):
                            print('building missing tos')


        except:
            return 400
        return(200)
