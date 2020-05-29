const express = require("express");
const path = require("path");
const hbs = require("hbs");
const publicDirectory = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, "../template/views");
const partialPath = path.join(__dirname, "../template/partials");
const geo = require("../src/utils/geoCode");

const app = express();
// app.use("/public", express.static(publicDirectory));
// app.use(express.static(publicDirectory))
app.use('/static', express.static(publicDirectory));
app.set("view engine", "hbs");

app.set("views", viewPath);
hbs.registerPartials(partialPath);

app.get("", (req, res) => {
  //   res.send("home page express");
  res.render("index", {
    title: "index page",
    name: "maninder",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("provide address");
  }

  geo.geoCode(req.query.address, (error, { latitude, longitude } = {}) => {
    if (error) {
      return res.send({ error });
    }
    geo.foreCast(latitude, longitude, (error, data) => {
      if (error) {
        return res.send({ error });
      }
      res.send({ temp: data.temperature, loc: req.query.address });
      //   res.render("weather", {
      //     temp: data.temperature,
      //     loc: req.query.address,
      //     latitude,
      //     longitude,
      //   });
    });
  });
});

app.get("/about", (req, res) => {
  res.send("in about");
});

app.get("/weather", (req, res) => {
  res.send("weather page express");
});

app.listen(3000, () => {
  console.log("node at 3000");
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "help page",
    name: "maninder",
  });
});
console.log(__dirname);
console.log(__filename);
