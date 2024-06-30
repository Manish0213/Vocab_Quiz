const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000;
const connectToDatabase = require('./db');

// app.use(cors({
//   origin: 'https://vocab-quiz-frontend.vercel.app', 
//   methods: ['GET','PUT','POST','DELETE'],
//   credentials: true,
// }));
connectToDatabase();

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hello Vercel");
})

app.use('/quiz', require('./route/queRouter'));
app.use('/auth', require('./route/authRouter'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})