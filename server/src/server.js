const express = require('express')
const PORT = process.env.PORT || 8080
require("dotenv").config()
var bodyParser = require('body-parser')
const cors = require("cors");
const mongoose = require('mongoose')
const {
  LOCAL_DB_URL,
  initial,
  options
} = require('./config/mongodb.config')
const app = express()

var corsOptions = {
  origin: process.env.CORS_ORIGIN
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/post.routes')(app);



app.get('*', (req, res) => {
  res.send('This route does not exist!')
})

mongoose.connect(LOCAL_DB_URL, options).then(() => {
    console.log("Successfully connect to MongoDB.");
    initial;
  }).then(() => {
    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

module.exports = app;