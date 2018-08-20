'''
    @File: Tos_api.py
    @Author: Kai Sackville-Hii
    @Email: kai.sackville-hii@sap.com
    @Version: v3.0.0
    @Company: SAP - R&I in GTLC

    @Description
        These class' handle the RESTful request from the tos endpoints.

    @Index
        1.  < !~- MAIN ENDPOINT ~-! >
        2.  < !~- SUB ENDPOINTS ~-! >
'''

from flask import request
from flask_restful import Resource

# 1. < !~-~-~~-~-~ MAIN ENDPOINT ~-~-~~-~-~!> #

class Tos_api(Resource):

    def __init__(self,**kwargs):
        print('init Tos_api')
        self.db = kwargs['collection']

    def options(self):
        return({
            "allowed_methods": ['GET', 'POST'],
            "number_of_objects": self.db.number_of_objects()
        })

    def get(self):
        match = str(request.headers.get('match'))
        print(match+'ere')
        if match == None or match == "":
            start = int(request.headers.get('start'))
            if start == None or type(start) != int:
                return {
                    "code": 400,
                    "message": "request must have the header 'start' with a valid integer value."
                }

            return self.db.get_collection(start)

        else:
            return(self.db.get_matches('url', match))



    def post(self):
        try:
            args = request.get_json()
            self.db.create_entry(args)
        except Exception as e:
            return {
                "code": 400,
                "message": str(e)
            }
        return(200)

class TosVersions_api(Resource):

    def __init__(self, **kwargs):
        print('init TosVersions_api')
        self.db = kwargs['collection']

    def options(self):
        return({
            "allowed_methods": ['GET'],
            "number_of_objects": self.db.number_of_objects()
        })

    def get(self):
        match = str(request.headers.get('match'))

        if match == None or match == "":
            start = int(request.headers.get('start'))
            if start == None or type(start) != int:
                return {
                    "code": 400,
                    "message": "request must have the header 'start' with a valid integer value."
                }

            return self.db.get_versions(start)

        else:
            return (self.db.get_matches('version-url', match))

# 2. < !~-~-~~-~-~ SUB ENDPOINTS ~-~-~~-~-~!> #

class Tos_object_api(Resource):

    def __init__(self,**kwargs):
        print('init Tos_api')
        self.db = kwargs['collection']

    def get(self, id):
        return self.db.get_entry(id)

    def delete(self, id):
        try:
            if(self.db.delete_entry(id) == True):
                resp = 200
            else:
                resp = 400
        except:
            print('err@ Tos_api.py -> def delete()')
            resp = 400

        return(resp)

    def patch(self, id):
        try:
            args = request.get_json()

            # checks to ensure that data is correctly formatted
            if args['key'] == "statements" and type(args['value']) != dict:
                return 400

            self.db.append_to_key("_id", id, args['key'], args['value'])
        except:
            return 400
        return 200

    def put(self, id):
        try:
            args = request.get_json()

            # check that only the statements will be changed, and that the value is
            #   properly formatted
            if args['key'] == "statements" and type(args['value']) != list:
                return {
                        "code": 400,
                        "message": "statements must be type list/array"
                    }
            elif args['key'] == "risk_assessment" and type(args['value']) != str:
                return {
                        "code": 400,
                        "message": "risk_assessment must be type string"
                    }

            self.db.set_key(id, args['key'], args['value'])
        except:
            return 400
        return 200

class TosVersions_object_api(Resource):

    def __init__(self, **kwargs):
        print('init TosVersions_object_api')
        self.db = kwargs['collection']

    def get(self):
        try:
            url = request.headers.get('url')

            id = self.db.url_to_id(url, "TosVersions")

            resp = self.db.get_single_version(id[0])
        except:
            return 400

        return resp

# # 1. < !~-~-~~-~-~ SUB ENDPOINTS ~-~-~~-~-~!> #
#
# class Tos_entry_api(Resource):
#
#     def __init__(self,**kwargs):
#         self.db = kwargs['collection']
#
#
#     def get(self, id):
#         return self.db.get_entry(id)
#
#     # def put(self, id):
#     #     args = request.get_json()
#     #
