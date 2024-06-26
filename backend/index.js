const express = require('express')
const app = express()
const port = 5000
const connectToDatabase = require('./db');


connectToDatabase();

app.use(express.json());
app.use('/quiz', require('./route/queRouter'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})