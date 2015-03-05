$.getJSON( "/api/gEvents/List", {numberOfElements: 4, description: false})
  .done(function (response) {
    var template = $('#next-events-template').remove().html();
    var dateOptions = {
      weekday: 'short',
      year: '2-digit',
      month: 'short',
      day: 'numeric'
    };
    response.forEach(function (event) {
      var element = $(template);
      element.children('time')
        .attr('datetime', data.time.obj.toISOString())
        .text(data.time.obj.toLocaleDateString('de-CH', dateOptions));
      element.children('a')
        .attr('href', data.summary)
        .text(data.summary);
      $('#next-events').after(element);
    });
  })