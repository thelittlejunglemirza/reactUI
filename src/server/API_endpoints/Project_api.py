'''
    @File: Project_api.py
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

class Project_api(Resource):

    def __init__(self,**kwargs):
        print('init Project_api')
        self.db = kwargs['collection']

    def options(self):
        return({
            "allowed_methods": ['GET', 'POST'],
            "number_of_objects": self.db.number_of_objects()
        })

    def get(self):
        match = str(request.headers.get('match'))

        if match == None or match == "":
            start = int(request.headers.get('start'))
            if start == None or type(start) != int:
                print('err')
                return {
                    "code": 400,
                    "message": "request must have the header 'start' with a valid integer value."
                }

            return self.db.get_collection(start)
        else:
            return (self.db.get_matches('project_name', match))

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

class Project_object_api(Resource):

    def __init__(self, **kwargs):
        print('init Project_object_api')
        self.db = kwargs['collection']

    def delete(self, id):
        try:
            self.db.delete_entry(id)
        except Exception as e:
            return {
                "code": 400,
                "message": str(e)
            }
        return 200

    def get(self, id):
        return self.db.get_entry(id)

    def patch(self, id):
        try:
            args = request.get_json()

            # checks to ensure that data is correctly formatted
            if args['key'] == "risk_assessment" and type(args['key']) != str:
                return {
                        "code": 400,
                         "message": "risk_assessment must be type string"
                    }
            elif args['key'] == "risk_level" and type(args['value']) != str:
                return {
                        "code": 400,
                        "message": "risk_level must be type string"
                    }

            self.db.set_key(id, args['key'], args['value'])

        except Exception as e:
            return {
                "code": 400,
                "message": str(e)
            }
        return 200