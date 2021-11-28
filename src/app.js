const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { port } = require("../config");

// utils
const { weatherForecast } = require("../utils/weather");

const app = express();
const PORT = port || 3000;

// express config path
const publicDir = path.join(__dirname, "../public/");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// telling express to use view engine named hbs (handlebar express)
app.set("view engine", "hbs");
// setting view engine path, default path is views
app.set("views", viewsPath);
// partials are reusable UI components
hbs.registerPartials(partialsPath);

// setup static dir (used by templates)
app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Zubair Ahmed",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Zubair Ahmed",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is help page",
    name: "Zubair Ahmed",
  });
});

// with callback
// app.get("/weather", (req, res) => {
//   const { address, unit = "m" } = req.query || {};
//   if (!address) {
//     return res.send({
//       error: "Please provide an address",
//     });
//   }
//   goeCode(address, (error, { lat, long, location } = {}) => {
//     if (error) {
//       return res.send({
//         error,
//       });
//     }
//     forecast({ lat, long, unit }, (error, forecastData) => {
//       if (error) {
//         return res.send({
//           error,
//         });
//       }
//       res.send({
//         address,
//         location,
//         forecastData,
//       });
//     });
//   });
// });

// with promise
app.get("/weather", (req, res) => {
  const { address, unit = "m" } = req.query || {};
  weatherForecast(address, unit)
    .then(({ address, location, forecastData }) => {
      res.status(200).send({
        address,
        location,
        forecastData,
      });
    })
    .catch((error) => {
      res.send({ error });
    });
});

app.get("/products", (req, res) => {
  const { search, rating } = req.query || {};
  if (!search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("help", {
    title: "Not found",
    message: "Help article not found",
    name: "Zubair Ahmed",
  });
});

app.get("*", (req, res) => {
  res.render("help", {
    title: "Not found",
    message: "Page not found",
    name: "Zubair Ahmed",
  });
});

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
