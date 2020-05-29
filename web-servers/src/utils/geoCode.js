const request = require("request");
const geoCode = (place, callback) => {
  const urlGeo =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(place) +
    ".json?access_token=pk.eyJ1IjoibWFuaW5kZXJqaXRrYXVyIiwiYSI6ImNrYWdzNWY5ODA5ZG8ycm81Mzdjd210ZzAifQ.hoNA8ud0oiMAJTWQgGsa0w&limit=1";
  request({ url: urlGeo, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect the site", undefined);
    } else if (body.features.length === 0) {
      callback("unable to find the location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
      });
    }
  });
};
const foreCast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=ff36d46eed687b0f0e64b1d49de7c672&query=" +
    longitude +
    "," +
    latitude;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect the site", undefined);
    } else if (body.error) {
      callback("unable to find the location", undefined);
    } else {
      callback(undefined, {
        temperature: body.current.temperature,
        feelslike: body.current.feelslike,
      });
    }
  });
};
module.exports = {
  geoCode: geoCode,
  foreCast: foreCast,
};
