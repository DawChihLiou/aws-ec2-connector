var express = require('express')
var aws     = require('aws-sdk')

var app     = express()
var router  = express.Router()
var port    = process.env.PORT || 8080


router.use((req, res, next) => {
  // log routing
  console.log(req.method, req.url)
  next()
})

// list all ec2 instances
router.get('/list', (req, res) => {
  res.send('/api/list')
})

// create new ec2 instance
router.post('/create', (req, res) => {
  res.send('/api/create')
})

// delete given ec2 instance
router.delete('/delete/:instance', (req, res) => {
  res.send('/api/delete')
})

app.use('/api/ec2', router)

app.listen(port)
console.log('Express is listening to port ', port)
