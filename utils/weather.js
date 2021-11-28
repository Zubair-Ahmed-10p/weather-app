const { forecastPromise } = require("./forecast");
const { goeCodePrommise } = require("./geocode");

const weatherForecast = (address, unit = "m") => {
  return new Promise((resolve, reject) => {
    if (!address) {
      return reject("Please provide an address");
    }
    goeCodePrommise(address)
      .then(({ lat, long, location } = {}) => {
        return Promise.all([
          forecastPromise({ lat, long, unit }),
          Promise.resolve(location),
        ]);
      })
      .then(([forecastData, location]) => {
        resolve({
          address,
          location,
          forecastData,
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = { weatherForecast };
