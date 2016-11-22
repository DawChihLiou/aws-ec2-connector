var express = require('express')
var AWS     = require('aws-sdk')
var cred    = require('./credential')

var app     = express()
var router  = express.Router()
var port    = process.env.PORT || 8080

AWS.config.update({ accessKeyId: cred.ACCESS_KEY_ID, secretAccessKey: cred.SECRET_ACCESS_KEY })

router.use((req, res, next) => {
  // log routing
  console.log(req.method, req.url)
  next()
})

// list all ec2 instances
router.get('/list/:region', (req, res) => {
  AWS.config.update({ region: req.params.region})

  const ec2 = new AWS.EC2()
  ec2.describeInstances((err, data) => {
    if (err) console.error(err)

    res.send(data);
  })
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
