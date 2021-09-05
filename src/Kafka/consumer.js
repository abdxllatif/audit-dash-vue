// import the `Kafka` instance from the kafkajs library
const { Kafka } = require('kafkajs')

// the client ID lets kafka know who's producing the messages
const clientId = 'my-app'
// we can define the list of brokers in the cluster
const brokers = ['localhost:9092']
// this is the topic to which we want to write messages
// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({ clientId,     ssl: { rejectUnauthorized: false }  ,  brokers })
const consumer = kafka.consumer({ groupId: 'test-group' })
const run = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic: 'logs', fromBeginning: true })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      var table = message.key
      var date = message.value.split(':')[3]
      var itemId = message.value.split(':')[2]
      var action = message.value.split(':')[1]
      var admin = message.value.split(':')[0]
      var data = {
        date: date,
        item_id: itemId,
        action: action,
        admin: admin,
        table: table
      }
      // this.$store.state.logsdata.push(data)
      console.log('rani hna nik mok')
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString()
      })
      console.log('data: ' + data)
    }
  })
}
run().catch(console.error)
