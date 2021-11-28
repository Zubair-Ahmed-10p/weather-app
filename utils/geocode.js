const request = require("request");
const { mapBoxApiKey } = require("../config");
// Geocoding
const MAP_BOX_API_KEY = mapBoxApiKey;

const goeCode = (address, callback) => {
  const MAP_BOX_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${MAP_BOX_API_KEY}&limit=1`;
  request({ url: MAP_BOX_URL, json: true }, (error, response) => {
    if (error) {
      // low level error
      callback("Unable to connect to geocoding api!", undefined);
    } else if (!response?.body?.features?.length) {
      // api level error
      callback("Unable to find location. Try another search term.", undefined);
    } else {
      const data = response.body;
      const [long, lat] = (data?.features || [])[0]?.center || [];
      const { place_name } = (data?.features || [])[0] || {};
      callback(undefined, { long, lat, location: place_name });
    }
  });
};

const goeCodePrommise = (address) => {
  const MAP_BOX_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${MAP_BOX_API_KEY}&limit=1`;
  return new Promise((resolve, reject) => {
    request({ url: MAP_BOX_URL, json: true }, (error, response) => {
      if (error) {
        // low level error
        reject("Unable to connect to geocoding api!");
      } else if (!response?.body?.features?.length) {
        // api level error
        reject("Unable to find location. Try another search term.");
      } else {
        const data = response.body;
        const [long, lat] = (data?.features || [])[0]?.center || [];
        const { place_name } = (data?.features || [])[0] || {};
        resolve({ long, lat, location: place_name });
      }
    });
  });
};

module.exports = { goeCode, goeCodePrommise };
