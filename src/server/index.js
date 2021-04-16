var path = require("path");
const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const dotenv = require("dotenv");
var FormData = require("form-data");
const fetch = require("node-fetch");
const request = require('request');

dotenv.config();

const app = express();
app.use(cors());
// to use json
app.use(bodyParser.json());
// to use url encoded values
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("dist"));

let API_KEY = process.env.API_KEY;

app.post("/api_response", async function (req, res) {
  let url = req.body.url;
  const formdata = new FormData();
  formdata.append("key", process.env.API_KEY);
  formdata.append("txt", url);
  formdata.append("lang", "en"); // 2-letter code, like en es fr ...

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  const response = await fetch(
    "https://api.meaningcloud.com/sentiment-2.1",
    requestOptions
  );
  const body = await response.json();
  res.json(body);
});

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

let port = process.env.PORT || 8081;
// designates what port the app will listen to for incoming requests
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
