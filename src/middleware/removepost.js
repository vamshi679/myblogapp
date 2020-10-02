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

var deletepost = (req, res, next) => {
    dbo.collection('allposts').findOne({ blogId: req.body.blogId }, (err, deleted) => {
        if (err) {
            console.log('console.log', err)
        }
        else if (deleted == null) {
            res.send({ message: 'no data found to delete' })
        }
        else {
            // var removedpost=req.body
            // console.log(removedpost,'body to variable')
            dbo.collection('allposts').deleteOne({ blogId: req.body.blogId }, (err, done) => {
                if (err) {
                    console.log('err in deleting', err)
                }
                else {
                    // console.log('data deleted')
                    // req.body=removedpost
                    // console.log(req.body,'variable to body')
                    next();
                }
            })
        }
    })
}

module.exports = deletepost;