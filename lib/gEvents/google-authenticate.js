var googleapis = require('googleapis');
var authData = require('./authData');
var calendar = googleapis.calendar('v3');
var path = require('path');
var fs = require('fs');

var async = require('async');

console.log('Auth data is: ', authData);
// create JWT object
var jwt = new googleapis.auth.JWT(
  authData.email,
  authData.keyFile,
  authData.key,
  authData.scopes,
  authData.subject
);

var listEvents = function listEvents(jwt, callback) {
  var options = {
    calendarId: '53.royalrangers@gmail.com',
    orderBy: 'startTime',
    singleEvents: true,
  };
  options.auth = jwt;
  calendar.events.list(options, function (err, response) {
    if (err) {
      throw new Error(err);
    }

    // parse response and send back filtered Objects to the route
    var items = JSON.parse(response).items;
    console.log('item list ' + items);
    async.map(items, function (item, callback) {
      var filteredItem = {
        status: item.status,
        summary: item.summary,
        description: item.description,
        location: item.location,
        start: Date.parse(item.start.dateTime),
        end: Date.parse(item.end.dateTime)
      };

      callback(null, filteredItem);
    }, callback);
  });
};

var apiCall = function apiCall(jwt, call, callback) {
  jwt.authorize(function (err, tockens) {
    console.log(JSON.stringify(err));
    if (err){
      throw new Error(err);
    }

    call(jwt, options, callback);
  });
};

exports.listEvents = function (callback) {
  apiCall(jwt, listEvents, callback);
};
