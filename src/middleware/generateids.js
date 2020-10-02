const mc = require('mongodb').MongoClient

// //importin db
// const dbObj=require('../db')

var dbo;

var dbURL = 'mongodb://vchanti679:9393490610@cluster0-shard-00-00-hfzzf.gcp.mongodb.net:27017,cluster0-shard-00-01-hfzzf.gcp.mongodb.net:27017,cluster0-shard-00-02-hfzzf.gcp.mongodb.net:27017/<dbname>?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'

mc.connect(dbURL, { useUnifiedTopology: true }, (err, clientObj) => {
    if (err) {
        console.log('err in connecting', err)
    }
    else {
        dbo = clientObj.db('blogdb')
    }
})

// middleware
var blogId = (req, res, next) => {
    dbo.collection("blogids").updateOne({ name: 'blgno' }, { $inc: { number: 1 } }, (err, result) => {
        if (err) {
            console.log("error in reading data", err)
        }
        else {
            dbo.collection("blogids").find().toArray((err, dataArray) => {
                if (err) {
                    console.log('err in find')
                }
                else {
                    // console.log(dataArray);
                    req.body.blogId = dataArray[0].name + dataArray[0].number;
                    next();
                }
            })
        }
    })
}

// exporting generateid module
module.exports = blogId;
