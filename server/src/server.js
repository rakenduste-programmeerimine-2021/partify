const express = require('express')

const PORT = process.env.PORT
require("dotenv").config()
require('./config/mongodb.config');

const postRoutes = require('./routes/posts');

const app = express()
app.use(express.json());

app.use('/api/post', postRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('*', (req, res) => {
  res.send('Thisot exist')
})

app.listen(PORT, function () {
  console.log(`Server Listening on ${PORT}`);
});