const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  environment: process.env.NODE_ENV,
  port: process.env.PORT,
  mapBoxApiKey: process.env.MAP_BOX_API_KEY,
  weatherStackApiKey: process.env.WEATHER_STACK_API_KEY,
};
