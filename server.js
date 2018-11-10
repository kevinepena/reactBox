const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./routes");
const cors = require('cors');
const cookieParser = require('cookie-parser');


require("dotenv").config()

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE configured';
}

const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// This allows us to serve files out of the client/build folder
app.use(express.static("client/build"));

// Add routes, both API and view
app.use(routes);


// This is a catch all if no other routes are matched
app.use(function (req, res) {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});


  app.listen(PORT, function () {
    console.log(`API Server now listening on port ${PORT}`);
  });