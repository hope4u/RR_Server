var googleapis = require('googleapis');
var calendar = googleapis.calendar('v3');
var async = require('async');

var listEvents = function listEvents(callback) {
  
  var options = {
      calendarId: '53.royalrangers@gmail.com',
      orderBy: 'startTime',
      singleEvents: true,
      auth: 'AIzaSyBVTdqDAVd4k96-Ue3Mh1NcHp5LYMbgnEA'
  };
  var dateOptions = {
    weekday: 'short',
    year: '2-digit',
    month: 'short',
    day: 'numeric'
  };
  var timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  };
  
  calendar.events.list(options, function(err, response) {
      if (err) {
        throw new Error(err);
      }

      // parse response and send back filtered Objects to the route
      async.map(response.items, function (item, callback) {
        var start = new Date(item.start.dateTime);
        var end = new Date(item.end.dateTime);
        var filteredItem = {
          status: item.status,
          summary: item.summary,
          description: item.description,
          location: item.location,
          start: {
            obj: start,
            date: start.toLocaleDateString('de-CH', dateOptions),
            time: start.toLocaleTimeString('de-CH', timeOptions)
          },
          end: {
            obj: end,
            date: end.toLocaleDateString('de-CH', dateOptions),
            time: end.toLocaleTimeString('de-CH', timeOptions)
          }
        };

        callback(null, filteredItem);
      }, callback);
    });
  };

exports.list = listEvents;