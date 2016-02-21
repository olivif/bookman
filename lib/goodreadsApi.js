var api = {};

var request = require('request');
var parseString = require('xml2js').parseString;

const apiBase = "https://www.goodreads.com";

// https://www.goodreads.com/shelf/list.xml   
// key:  Developer key (required).
// user_id:  Goodreads user id (required)
// page:  1-N (default 1)

api.getShelves = function (userId, callback) {

    // TOOD handle multiple pages?
    var params = { 
        key: process.env.GOODREADS_KEY, 
        user_id: userId,
        page: 1 
        };

    var url = apiBase + "/shelf/list.xml";
    
    var requestOptions = {url:url, qs:params};
     
    request(requestOptions, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            parseString(body, function (err, result) {
                
                var unpackedResult = result.GoodreadsResponse.shelves[0].user_shelf;
                callback(unpackedResult);
                console.log(unpackedResult);
            });
        }
    });
};

module.exports = api;