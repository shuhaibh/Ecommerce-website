require('dotenv').config()

const cors = require('cors');
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const router = require('./routes/index')
const connectDB = require('./config/db')

const port = process.env.PORT

app.use(express.json())

app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));

app.get('/', (req, res) => {
  res.send('Hi Muhammad Shuhaibh')
})

connectDB()
.then(()=>console.log("DB connected..."))
.catch(err => console.log(error));

app.use('/api', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
