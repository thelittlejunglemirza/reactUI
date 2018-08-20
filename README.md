# Welcome to WASP ![travis status](https://travis-ci.mo.sap.corp/GTLC-Research-And-Innovation/WASP.svg?token=s5iiYvMzWkb916A9cVnR&branch=master)
Learn about WASP Project [Here](https://github.wdf.sap.corp/GTLC-Research-And-Innovation/WASP/wiki) . 

#### WASP has two parts
* **Server** - Flask/Python app running the API the database
* **UI/React App** - React/mobs app which allows the used to interact with the database 
# Installation  
* Git clone WASP to your local machine
* Please note that this version is only working on Chrome for the time being. 
## 1. Server Installation

### Flask Server

A Flask API used for WASP. The API handles communication between the user of the Chrome extension and the R&I 
PriorityMarker database.


### Prerequisites

Make sure MongoDB is installed and running. Typing the following command in the command line should bring up the mongoDB shell:

```
$ mongo
```
[To install MongoDB](https://docs.mongodb.com/manual/installation/#tutorials)

[MongoDB Tutorial](https://docs.mongodb.com/manual/installation/)


#### Verify that all Python requirements are installed. 
A list of requirements are locate in requirements.txt in the server directory.
You can globally pip install the requirements by executing the following command from
 WASP\src\server directory
```
$ pip install requirements.txt
```
#### Start your local MongoDB server 
```
$ mongod
```
You should now be able to run the MongoDB shell. 
#### Run WASP Server 
In your project WASP\src\server directory execute:
```
$ python app.py
```

## 2. React App Installation 
* Go to your WASP\src\ui directory in your local machine
* npm install
* npm start 

## 3. Adding Sample Data

### Manual import ###
1.	Using your command line navigate to where MongoDB is installed (by default it’s at C:\ProgramFiles\MangoDB\Server\3.6\bin)
2.	In your command line run the command ‘mongod’ and keep the command line instance running
3.	Make sure Mongo Compass community version is downloaded and installed. (download link: https://www.mongodb.com/download-center?jmp=hero#compass , the correct version is 1.14.6 (Community Edition Stable))
4.	Run Compass (do the following steps within Compass, all the names are case sensitive so please make sure you follow the instructions correctly)

* 	Upon launching the app you should arrive at a ‘Connect to Host’ page, press connect without changing anything in the form.
* 	Select ‘CREATE DATABASE’ and name the database WASP  and name your first collection Project. Now you can navigate to your new collection Project in new database WASP.
* 	While in the collection Project, select Collection from the toolbar on the top of the app and select import data. Choose JSON format and navigate to /WASP/documents/WASP_db_sample  and choose Project.json. This will add the corresponding data for projects.
* 	Now you will create the second collection Api by navigating to WASP from the side bar and choosing ‘CREATE COLLECTION’. Name the new collection Api.
* 	Navigate to Api collection and import API.json from WASP_db_samples. (Note that you find this folder in documents in WASP)
* 	Similarly, you should repeat the same steps for two more collections Tos and TosVersions, then you have to import their corresponding data Tos.json and TosVersions.json from WASP_db_samples.
Note, please ignore the other 2 files in WASP_db_sample folder (Auth.json, Project_tree.json) as they are not relevant for the current version
Note, all of the data provided is dummy data.
Note, if any of the names are spelled incorrectly the data will not show in the ui

### Automated import ###
1.	Using your command line navigate to where MongoDB is installed (by default it’s at C:\ProgramFiles\MangoDB\Server\3.6\bin)
2.	In your command line run the command ‘mongod’ and keep the command line instance running
3. Navigate to WASP/src/server in your command line
4. Run import_to_db.py with the following command 
```
$ python import_to_db.py
```
5. Progress reports will print in your console as this program is running, if successful you will see the following output
```
$ import successful
```

# Authors

* **Kai Sackville-Hii** <kai.sackville-hii@sap.com>
* **Nader Samadyan** <nader.samadyan@sap.com>
* **Wongelawit Zewde** <wongelawit.zewde@sap.com>
Please contact any of us if you find bugs or have any questions. 

## License

For internal use only.
"# React-UI" 
