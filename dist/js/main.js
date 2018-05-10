var IntentMedia = IntentMedia || {};

IntentMedia.Airports = (function () {
  var pub = {};

  pub.airport_exists = function (airport_code) {
    return pub.airport_distances().hasOwnProperty(airport_code);
  };

  pub.airport_distances = function () {
    return {
      JFK: {LAX: 2475, LAS: 2248, PDX: 2454},
      LAX: {JFK: 2475, LAS: 236, PDX: 834},
      LAS: {JFK: 2248, LAX: 236, PDX: 763},
      PDX: {JFK: 2454, LAS: 763, LAX: 834}
    };
  };

  return pub;
}(IntentMedia || {}));

IntentMedia.Distances = (function () {
  var pub = {};
  var airport_distances = airport_distances || IntentMedia.Airports.airport_distances();

  pub.distance_between_airports = function (from_airport, to_airport) {
    if (IntentMedia.Airports.airport_exists(from_airport) && IntentMedia.Airports.airport_exists(to_airport)) {
      if (from_airport === to_airport) {
        return 0;
      }

      return airport_distances[from_airport][to_airport];
    }

    return -1;
  };

  return pub;
}(IntentMedia || {}));


$('#submit').bind( 'click', function(event) {
  event.preventDefault();
  event.stopPropagation();
  var from = $('#from').val();
  var to = $('#to').val();
  var fromValid = IntentMedia.Airports.airport_exists(from);
  var toValid = IntentMedia.Airports.airport_exists(to);
  if(fromValid && toValid) {
    var resultsText = 'It is ' + IntentMedia.Distances.distance_between_airports(from, to) + ' miles from ' + from + ' to ' + to;
    $('#results').text(resultsText);
    $('#results').removeClass('invisible');
    $('#fromErrors').addClass('invisible');
    $('#toErrors').addClass('invisible');
  } else {
    $('#results').addClass('invisible');
    if(!fromValid) {
      var fromError = from + ' is not a valid airport code.';
      if(!from) {
        fromError = 'Work with me here. You\'ve got to put something.';
      }
      $('#fromErrors').removeClass('invisible');
      $('#fromErrors').text(fromError);
    } else {
      $('#fromErrors').addClass('invisible');
    }

    if(!toValid) {
      var toError = to + ' is not a valid airport code.';
      if(!to) {
        toError = 'Work with me here. You\'ve got to put something.';
      }
      $('#toErrors').text(toError);
      $('#toErrors').removeClass('invisible');
    } else {
      $('#toErrors').addClass('invisible');
    }
  }
});
