const request = require("request");
const { weatherStackApiKey } = require("../config");
// Weather Api

const WEATHER_STACK_API_KEY = weatherStackApiKey;

const UNITS = ["m", "f", "s"];
const T_UNIT = {
  m: "celcius",
  f: "fahreneit",
  s: "kelvin",
};

const forecast = ({ lat, long, unit }, callback) => {
  const currentUnit = unit || UNITS[0];
  const query = `${lat},${long}`;
  const URL = `http://api.weatherstack.com/forecast?access_key=${WEATHER_STACK_API_KEY}&units=${currentUnit}&query=${query}`;
  request({ url: URL, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response?.body?.error) {
      callback("Unable to find location", undefined);
    } else {
      const data = response?.body || {};
      const weatherData = data?.current || {};
      const { temperature, feelslike } = weatherData;
      callback(undefined, {
        temperature,
        feelslike,
        temperatureUnit: T_UNIT[currentUnit],
      });
    }
  });
};

const forecastPromise = ({ lat, long, unit }) => {
  const currentUnit = unit || UNITS[0];
  const query = `${lat},${long}`;
  const URL = `http://api.weatherstack.com/forecast?access_key=${WEATHER_STACK_API_KEY}&units=${currentUnit}&query=${query}`;
  return new Promise((resolve, reject) => {
    request({ url: URL, json: true }, (error, response) => {
      if (error) {
        reject("Unable to connect to weather service!");
      } else if (response?.body?.error) {
        reject("Unable to find location");
      } else {
        const data = response?.body || {};
        const weatherData = data?.current || {};
        const { temperature, feelslike } = weatherData;
        const forecastData = `It is ${temperature} degree ${T_UNIT[currentUnit]} out there. And it feels like ${feelslike} degree ${T_UNIT[currentUnit]}.`;
        resolve(forecastData);
      }
    });
  });
};

module.exports = { forecast, forecastPromise };
