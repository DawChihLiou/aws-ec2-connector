import AWS from 'aws-sdk'

export default function ec2Connector (accessKeyId, secretAccessKey) {
  AWS.config.update({ accessKeyId, secretAccessKey })
  AWS.config.update({ region: region})

  const ec2 = new AWS.EC2()

  /**
   * List all ec2 instances in given region
   * @param { String } region Availability zone cluster
   */
  function listInstances (region) {
    ec2.describeInstances((err, data) => {
      if (err) console.error(err)
      console.log(data)
    })
  }

  /**
   * Launch a new ec2 instance with an AMI and instance type
   *
   * @param { Object } specs Instance
   *    specs = {
   *      ImageId: String,
   *      InstanceType: String
   *    }
   *
   * For more information, please visit
   * http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html#runInstances-property
   */
  function runInstance (specs) {
    if (!specs.ImageId || !specs.InstanceType)
      console.error('ImageId and InstanceType is required.')

    var params = {
      ...specs,
      MaxCount: 1,
      MinCount: 0,
      Monitoring: { Enabled: false }
    }

    ec2.runInstances(params, function (err, data) {
      if (err) console.error(err)
      console.log(data)
    })
  }

  /**
   * Start and run a new ec2 instance
   * @param { Array } ids ec2 instance ids
   */
  function terminateInstance (ids) {
    ec2.terminateInstances({
      InstanceIds: ids
    }, function (err) {
      if (err) console.error(err)
    })
  }

  return {
    listInstances,
    runInstance,
    teminateInstance
  }
}
