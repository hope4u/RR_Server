'use strict';

var googleapis = require('googleapis');
var authData = require('./authData');
var calendar = googleapis.calendar('v3');

var async = require('async');

// create JWT object

var jwt = new googleapis.auth.JWT(
  authData.email,
  authData.keyFile,
  authData.key,
  authData.scopes,
  authData.subject
);

jwt.authorize(function (err, tockens) {
  if (err){
    throw new Error(err);
  }
  
  // get event list
  calendar.events.list({
    calendarId: '53.royalrangers@gmail.com',
    orderBy: 'startTime',
    singleEbents: true,
    auth: jwt
  }, function (err, response) {
    if (err) {
      throw new Error(err);
    } 
    
    // parse response and send back filtered Objects to the route
    var items = JSON.parse(response).items;
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
    }, function (err, filteredItems) {
      if (err) {
        throw new Error(err);
      }
      
       // send to route
    });
  });
});
