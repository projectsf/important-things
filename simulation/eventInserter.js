//
// usage: 
//   $ node eventUpdateInserter.js 
//


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mean-dev');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("connected to db");

  var EventSchema = mongoose.Schema({
      created: { type: Date },
      thingId: { type: String },
      coords: { 
        longitude: { type: Number }, 
        latitude: { type: Number }
      },
      name: { type: String }
  });

  //model class
  var Event = mongoose.model('Event', EventSchema);

  var numberRecords = 100;
  var thingId = 'myThing';
  var eventNames = ['Left Geofence', 'Entered Geofence', 'Battery Low', 'Signal Quality Low', 'Exceeded Speed Threshold'];
  console.log(eventNames);
  var initialEventLatitude = 37.7616535;
  var initialEventLongitude= -122.4491129;
  var maxEventDisplacementMiles = 1.5;
  var maxEventDisplacementDegrees = maxEventDisplacementMiles / 69.0;
  var initialTimeStamp = new Date();
  var eventUpdateIntervalSeconds = 120;
  var timeStamp = new Date();
  var timeStampSeconds = initialTimeStamp.getTime();
  var eventUpdateLatitude = initialEventLatitude;
  var eventUpdateLongitude = initialEventLongitude;

  console.log("generating %d records", numberRecords);
  for (var i = 0; i < numberRecords; i++) {
    var event = new Event();
    timeStamp = new Date(timeStamp.getTime() + eventUpdateIntervalSeconds * 1000);
    event.created = timeStamp;
    event.thingId = thingId;
    event.coords.longitude = eventUpdateLongitude + ((Math.random() - 0.5) * maxEventDisplacementDegrees);
    event.coords.latitude = eventUpdateLatitude + ((Math.random() - 0.5) * maxEventDisplacementDegrees);
    var eventNameIndex = Math.floor(eventNames.length * Math.random());
    console.log(eventNameIndex);
    event.name = eventNames[eventNameIndex];

    event.save(function (err) {
      if (err) 
        return console.error(err, event);
      }
    )

  }
  console.log('finished');
});


process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});
