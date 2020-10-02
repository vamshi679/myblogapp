//importing mongodb module with mongoclient
const mc = require('mongodb').MongoClient

var dbo;

var dbURL = 'mongodb://vchanti679:9393490610@cluster0-shard-00-00-hfzzf.gcp.mongodb.net:27017,cluster0-shard-00-01-hfzzf.gcp.mongodb.net:27017,cluster0-shard-00-02-hfzzf.gcp.mongodb.net:27017/<dbname>?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'

mc.connect(dbURL, { useUnifiedTopology: true }, (err, clientObj) => {
    if (err) {
        console.log('err in connecting', err)
    }
    else {
        dbo = clientObj.db('blogdb')
        console.log('connected to database')
    }
})

// exporting module
// module.exports = dbo;

// var dbURL = 'mongodb+srv://vchanti679:9393490610@cluster0-hfzzf.gcp.mongodb.net/blogdb?retryWrites=true&w=majority'
