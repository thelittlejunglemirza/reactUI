'''
    @File: Database.py
    @Author: Kai Sackville-Hii
    @Email: kai.sackville-hii@sap.com
    @Version: v3.0.0
    @Company: SAP - R&I in GTLC

    @Description
        This class is the parent class for all classes in src.Database.Collections.
        It contains query functions that are useable across all Collections. The class functions are
        organized by its scope (what part of the mongo collection does it edit). Recall that mongodb has collections
        which are nothing more than an array of json objects (entries), each object has keys and subsequent
        values.

    @Index
        1.  < !~- COLLECTION LEVEL ~-! >
        2.  < !~- OBJECT (ENTRY) LEVEL ~-! >
        3.  < !~- KEY LEVEL -~! >
'''

from bson.objectid import ObjectId
import json
import time

class Database:

    # 1. < !~-~-~~-~-~ COLLECTION LEVEL ~-~-~~-~-~!> #

    #   @Des: Gets a all entries in db.collection matching id
    #   @Pre: collection must be existing
    #   @Post: Returns arrays of objects containing all of the collections data
    def get_collection(self, start):
        resp = []
        num_objects = self.collection.count()

        if start > num_objects:
            return {
                "code":400,
                "message": "'start' must be less than the number of objects in the collection ("+str(num_objects)+")"
            }
        elif start == -1:
            entries = self.collection.find({}).sort([('$natural',-1)]).limit(20)
        else:
            entries = self.collection.find({}).skip(start).limit(20)

        for entry in entries:
            temp_dict = {}
            for key, value in entry.items():
                # must convert type objID to string
                if key == '_id':
                    temp_dict[key] = str(value)
                else:
                    temp_dict[key] = value


            resp.append(temp_dict)

        return resp

    #   @Des: Gets all entries matching the given key value
    #   @Pre: collection must be existing
    #   @Post: Returns list of matching objects
    def get_matches(self, key, value):
        resp = []
        entries = self.collection.find({key: {'$regex': value, '$options': 'i'}})

        for entry in entries:
            temp_dict = {}
            for key, value in entry.items():
                # must convert type objID to string
                if key == '_id':
                    temp_dict[key] = str(value)
                else:
                    temp_dict[key] = value

            resp.append(temp_dict)

        return resp


    #   @Des: checks if entry in db.collection which has key: value exists
    #   @Pre: collection must be existing
    #   @Post: Returns True if exists, else returns False
    def check_object_exists(self, key, value):
        if key == "_id":
            obj = self.collection.find_one({key: ObjectId(value)})
        else:
            obj = self.collection.find_one({key: value})

        return bool(obj)

    #   @Des: Returns the number of objects in a collection.
    #   @Pre: collection must be existing
    #   @Post: integer containing the number of objects returned
    def number_of_objects(self):
        return(self.collection.count())

    # 2. < !~-~-~~-~-~ OBJECT (ENTRY) LEVEL ~-~-~~-~-~!> #

    #   @Des: Creates a new entry in db.collection with data
    #   @Pre: Data must be a json object, no formating required
    #   @Post: Data entry created
    def create_entry(self, data):
        resp = self.collection.insert(data)

        try:
            return (str(resp[0]))
        except:
            return (str(resp))

    #   @Des: Deletes an entry in db.collection matching id
    #   @Pre: id must be a string
    #   @Post: returns True if entry matching id is removed, else False
    def delete_entry(self, id):
        resp = self.collection.remove({"_id": ObjectId(id)})

        if (resp['n'] == 0):
            return False
        else:
            return True

    #   @Des: Gets a single entry in db.collection matching id
    #   @Pre: id must be a string
    #   @Post: Returns array of object containing entries data
    def get_entry(self, id):
        temp_dict = {}
        entry = self.collection.find_one({"_id": ObjectId(id)})

        for key, value in entry.items():
            # must convert type objID to string
            if key == '_id':
                temp_dict[key] = str(value)
            else:
                temp_dict[key] = value

        return temp_dict

    # 3. < !~-~-~~-~-~ KEY LEVEL ~-~-~~-~-~!> #

    #   @Des: Gets a single key in db.collection from id
    #   @Pre: id must be a string
    #   @Post: Returns the value of requested key
    def get_key(self, id, key):
        data = self.collection.find_one({"_id": ObjectId(id)})
        key_value = data[key]

        return key_value

    #   @Des: Appends value to a key in db.collection
    #   @Pre: id must be a string, target key must be an array
    #   @Post: Value will be appended to key array
    def append_to_key(self, idKey, idValue, targetKey, targetValue):
        if idKey == "_id":
            self.collection.update({idKey: ObjectId(idValue)}, {'$push':{ targetKey: targetValue}})
        else:
            print(2)
            self.collection.update({idKey: idValue}, {'$push':{ targetKey: targetValue}})

    def pull_from_key(self, idKey, idValue, targetKey, targetValue):
        resp = self.collection.update({idKey: idValue}, {'$pull': {targetKey: targetValue}})

        if (resp['nModified'] > 0):
            return True
        else:
            return False

    #   @Des: If key exists, its value will be replaced by value. Else it will make
    #           a new key: value in object with id
    #   @Pre: id must be a string, preferably target key exist to preserve db
    #   @Post: key will be set with value
    def set_key(self, id, key, value):

        if key == "risk_assessment" or key == "risk_level":
            self.collection.update({"_id": ObjectId(id)}, {'$set': {"date_reviewed": time.strftime("%Y-%m-%d")}})

        self.collection.update({"_id": ObjectId(id)}, {'$set': {key: value}})




#   def delete_key(self, key_value):

#   def add_or_change_key key(key, key_value):

