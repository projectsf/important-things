//
// usage: 
//   $ node locationUpdateInserter.js 
//


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mean-dev');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("connected to db");
});

var LocationSchema = mongoose.Schema({
    created: { type: Date},
    thingId: { type: String},
    coords: { 
      longitude: { type: Number}, 
      latitude: { type: Number}
    }
});

//model class
var Location = mongoose.model('Location', LocationSchema);

var numberRecords = 50;
var thingId = 'myThing';
var initialLocationLatitude = 37.7616535;
var initialLocationLongitude= -122.4491129;
var maxLocationDisplacementMiles = 0.5;
var maxLocationDisplacementDegrees = maxLocationDisplacementMiles / 69.0;
var initialTimeStamp = new Date();
var locationUpdateIntervalSeconds = 120;
var timeStamp = new Date();
var timeStampSeconds = initialTimeStamp.getTime();
var locationUpdateLatitude = initialLocationLatitude;
var locationUpdateLongitude = initialLocationLongitude;

console.log("generating %d records", numberRecords);
for (var i = 0; i < numberRecords; i++) {
  locationUpdateLongitude = locationUpdateLongitude + ((Math.random() - 0.5) * maxLocationDisplacementDegrees);
  locationUpdateLatitude = locationUpdateLatitude + ((Math.random() - 0.5) * maxLocationDisplacementDegrees);
  timeStamp = new Date(timeStamp.getTime() + locationUpdateIntervalSeconds * 1000);

  //model class instance (document)
  var location = new Location();
  location.created = timeStamp;
  location.thingId = thingId;
  location.coords.longitude = locationUpdateLongitude;
  location.coords.latitude = locationUpdateLatitude;

  location.save(function (err) {
    if (err) 
      return console.error(err, location);
    }
  )

}
console.log('finished');
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    console.log('bye bye');
    process.exit(0);
  });
});
