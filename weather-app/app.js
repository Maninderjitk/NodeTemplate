const request = require("request");
const geo = require("./geoCode");

var address = process.argv[2];
if (!address) {
  console.log("provide address ");
} else {
  geo.geoCode(address, (error, {latitude,longitude}) => {
    if (error) {
      console.log(error);
    } else {
      console.log({latitude,longitude});
      geo.foreCast(latitude, longitude, (error, data) => {
        if (error) {
          console.log(error);
        } else {
          console.log(data);
        }
      });
    }
  });
}
