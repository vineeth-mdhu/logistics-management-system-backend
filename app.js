const express = require('express')
const dotenv = require('dotenv')
const bodyParser=require('body-parser')
const distance_warehouse= require('./routes/distance-warehouse')
const distance_store= require('./routes/distance-store')
const distance_factory= require('./routes/distance-factory')
const delivery = require('./routes/delivery')
const app = express()
const port = 5000
dotenv.config()

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/distance-warehouse',distance_warehouse)

app.use('/distance-store',distance_store)

app.use('/distance-factory',distance_factory)

app.use('/delivery',delivery)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})