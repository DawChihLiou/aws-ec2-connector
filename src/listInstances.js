import AWS from 'aws-sdk'
import { ACCESS_KEY_ID, SECRET_ACCESS_KEY } from '../credential'

/*
 * List all ec2 instances in given region
 * @param { String } region : availability zone cluster
 */
function listInstances (region) {
  AWS.config.update({ accessKeyId: cred.ACCESS_KEY_ID, secretAccessKey: cred.SECRET_ACCESS_KEY })
  AWS.config.update({ region: region})

  const ec2 = new AWS.EC2()

  ec2.describeInstances((err, data) => {
    if (err) console.error(err)
    console.log(data)
  })
}
