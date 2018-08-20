# PriorityMarkerServerAPI

PriorityMarkerServerAPI is a Flask API used for the PriorityMarker Chrome extension. The API handles communication between the user of the Chrome extension and the R&I PriorityMarker database.

## File Structure

![alt text](https://github.wdf.sap.corp/GTLC-Research-And-Innovation/PriorityMarkerServerAPI/blob/master/static/img/tree.JPG)
 
## Getting Started

Follow the following instructions to get a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

Make sure MongoDB is installed and running. Typing the following command in the command line should bring up the mongoDB shell:

```
$ mongo
```
[To install MongoDB](https://docs.mongodb.com/manual/installation/#tutorials)

[MongoDB Tutorial](https://docs.mongodb.com/manual/installation/)

### Installing

#### 1) Clone this repo onto your local machine

```
$ cd /path/to/folder
```
```
$ git clone https://github.wdf.sap.corp/GTLC-Research-And-Innovation/PriorityMarkerServer
```
Alternitivly you can use the Github dsktop app*.

#### 2) Verify that all Python requirements are installed. A list of requirements are locate in requirements.txt

You can globally pip install the requirements by executing the following command in the project directory 
```
$ pip install requirements.txt
```
#### 3) Start your local MongoDB server 
```
$ mongod
```
You should now be able to run the MongoDB shell. 
#### 4) Run the PriorityMarkerServer
In your project folder execute:
```
$ python app.py
```

## Running the tests

//Explain how to run the automated tests for this system

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

//Add additional notes about how to deploy this on a live system

## Built With

* [Flask](http://flask.pocoo.org/docs/0.12/) - The web framework used
* [MongoDB](https://maven.apache.org/) - Database Management

## Contributing

//Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the //process for submitting pull requests to us.

## Versioning

We use [Semantic Versioning](http://semver.org/) for versioning.

## Authors

* **Kai Sackville-Hii** <kai.sackville-hii@sap.com>
* **Nader Samadyan** <nader.samadyan@sap.com>
* **Wongelawit Zewde** <wongelawit.zewde@sap.com>

## License

For internal use only.

