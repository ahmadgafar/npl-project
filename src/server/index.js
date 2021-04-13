var path = require("path");
const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

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

// designates what port the app will listen to for incoming requests
app.listen(process.env.PORT || 8081, function () {
  console.log("Example app listening on port 8081!");
});
