 /**
 * @api {get} /api/tos/versions Get collection
 * @apiName TosVersions_api_GET
 * @apiGroup TosVersions
 * @apiVersion 1.0.0
 * @apiDescription This endpoint returns the entire TosVersions Collection as seen in the database. This endpoint will only
 *                 return a MAXIMUM of 20 objects at a time, with an offset defined by the user
 *                 (via the header key 'start'). If the offset is larger then the number of objects in the collection
 *                 the endpoint will return 400, the number of objects in this collection can be checked using the options
 *                  endpoint. If start is equal to -1 then the endpoint will return the last 20 objects in reversed order.
 *                  By providing the match key, this endpoint will filter through the database for urls matching the keys
 *                  value. Note that one of start/match must exist.
 *
 * @apiParam (Headers) {Int} start The number of objects to offset query by.
 * @apiParam (Headers) {String} match The desired search query to match url.
 *
 * @apiSuccess {ObjectId} _id Unique id generated by MongoDb.
 * @apiSuccess {String} date_created  Timestamp of when the entry was created in database.
 * @apiSuccess {String} url  Url to the Terms Of Service location.
 * @apiSuccess {Array} versions Contains ObjectId's (strings) of each of its versions which is mapped to entries in Tos collection.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *           "_id":"5b1ef5e21c74671a303ff4de",
 *           "date_created":"2018-06-12",
 *           "url":"https://help.instagram.com/478745558852511",
 *           "versions":[
 *               {
 *                  "_id": "5b1ef5e21c74671a303ff4dd",
 *                  "date_created": "2018-06-12"
 *               },
 *               {
 *                  "_id": "5b1ef5f41c74671a303ff4df"
 *                  "date_created": "2018-06-13"
 *               }
 *           ]
 *      }]
 *
 * @apiErrorExample {json} ERROR: Key out of range
 *     HTTP/1.1 400 Bad Request
 *     {
 *      "code": 400,
 *      "message": "'start' must be less than the number of objects in the collection (3)"
 *     }
 * @apiErrorExample {json} ERROR: Key DNE or not an integer
 *     HTTP/1.1 400 Bad Request
 *     {
 *      "code": 400,
 *      "message": "request must have the header 'start' with a valid integer value."
 *     }
 */

 /**
 * @api {options} /api/tos/versions Options
 * @apiName TosVersions_api_Options
 * @apiGroup TosVersions
 * @apiVersion 1.0.0
 * @apiDescription This request will add return the allowed methods, and number of objects in the collection for this
 *                 endpoint.
 *
 * @apiSuccess {Array} allowed_methods Methods allowed for this endpoint.
 * @apiSuccess {Int} number_of_objects  Number of objects in the TosVersions collection.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "allowed_methods": ["GET", "POST"],
 *         "number_of_objects": 4
 *     }
 *
 */

 /**
 * @api {get} /api/tos/versions/single Get a single Object
 * @apiName TosVersions_object_api_GET
 * @apiGroup TosVersions
 * @apiVersion 1.0.0
 * @apiDescription This endpoint returns a single TosVersions object as seen in the database.
 *
 * @apiParam (Headers) {String} url The url of the object to query.
 *
 * @apiSuccess {String} _id Unique id generated by MongoDb.
 * @apiSuccess {String} date_created  Timestamp of when the entry was created in database.
 * @apiSuccess {String} url  Url to the Terms Of Service location.
 * @apiSuccess {Array} versions Contains ObjectId's (strings) of each of its versions which is mapped to entries in Tos collection.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *           "_id":"5b1ef5e21c74671a303ff4de",
 *           "date_created":"2018-06-12",
 *           "url":"https://help.instagram.com/478745558852511",
 *           "versions":[
 *               {
 *                  "_id": "5b1ef5e21c74671a303ff4dd",
 *                  "date_created": "2018-06-12"
 *               },
 *               {
 *                  "_id": "5b1ef5f41c74671a303ff4df"
 *                  "date_created": "2018-06-13"
 *               }
 *           ]
 *      }
 *
 */