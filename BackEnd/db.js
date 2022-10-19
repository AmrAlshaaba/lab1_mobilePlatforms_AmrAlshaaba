const { MongoClient } = require('mongodb')

let dbConnection


const uri = process.env.uri || 'mongodb+srv://amr:4801094d@cluster0.swhuygk.mongodb.net/lab1';

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
      .then((client) => {
        dbConnection = client.db()
        return cb()
      })
      .catch(err => {
        console.log(err)
        return cb(err)
      })
  },
  getDb: () => dbConnection
}

