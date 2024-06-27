const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000;
const connectToDatabase = require('./db');

app.use(cors());
connectToDatabase();

app.use(express.json());
app.use('/quiz', require('./route/queRouter'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})