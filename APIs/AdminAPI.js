//all imports
const exp = require('express')

//creating exp mini app
const adminExpApp = exp.Router()

//importing jsonwebtoken module
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

const moment = require('moment');

const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require("multer-storage-cloudinary");

//configuring cloudinary credentials
cloudinary.config({
    cloud_name: 'dn00siouh',
    api_key: '496356963664855',
    api_secret: 's3emmJ2YDxRVLXjLktMaRzkdTz0'
});

//configure cloudinary storage
var storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'blogapp',
    allowedFormats: ['jpg', 'png', 'jpeg'],
    filename: function (req, file, cb) {
        cb(req.body, file.fieldname + '-' + Date.now());
    }
})

//body parser
adminExpApp.use(exp.json())

//export api (mini app)
module.exports = adminExpApp

const mc = require('mongodb').MongoClient

const deletepost = require('../src/middleware/removepost')
// //importing db
// const dbObj=require('../db')

const verifyUser = require('../src/middleware/verifyToken')

var dbo;

var dbURL = 'mongodb://vchanti679:9393490610@cluster0-shard-00-00-hfzzf.gcp.mongodb.net:27017,cluster0-shard-00-01-hfzzf.gcp.mongodb.net:27017,cluster0-shard-00-02-hfzzf.gcp.mongodb.net:27017/<dbname>?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
// var dbURL = 'mongodb+srv://vchanti679:9393490610@cluster0-hfzzf.gcp.mongodb.net/blogdb?retryWrites=true&w=majority'

mc.connect(dbURL, { useUnifiedTopology: true }, (err, clientObj) => {
    if (err) {
        console.log('err in connecting', err)
    }
    else {
        dbo = clientObj.db('blogdb')
        console.log('connected to database via adminapi')
    }
})


//configure multer middleware
var upload = multer({ storage: storage })

//request handlers
adminExpApp.post('/register', upload.single('photo'), (req, res) => {
    
    //converting stringified data to JSON format
    req.body = JSON.parse(req.body.rform);
    // console.log(req.body);
    req.body.displayPic=req.file.secure_url
    delete req.body.photo
    var today = moment().format('lll');
    req.body.createdon = today
    dbo.collection('collection1').findOne({ userName: req.body.userName, email: req.body.email }, (err, userObj) => {
        if (err) {
            console.log('err in find', err)
        }
        else if (userObj == null) {
            //hashing password
            bcrypt.hash(req.body.password, 8, (err, hashedpass) => {
                if (err) {
                    console.log('err in hashing', err)
                }
                else {
                    //replacing plain password with hashedpass
                    req.body.password = hashedpass
                    //insert in db
                    dbo.collection('allusers').insertOne(req.body, (err, result) => {
                        if (err) {
                            console.log('err in inserting', err)
                        }
                        else {
                            res.send({ message: 'Registered successfully' })
                        }
                    })
                }
            })
        }
        else {
            res.send({ message: 'data already existed' })
        }
    })
})

adminExpApp.post('/login', (req, res) => {
    // console.log(req.body,1)
    dbo.collection('allusers').findOne({ userType: req.body.userType }, (err, userobj) => {
        if (err) {
            console.log('err in find', err)
        }
        else if (userobj == null) {
            res.send({ message: 'invalid userType' })
        }
        else {
            dbo.collection('allusers').findOne({ userName: req.body.userName, userType: req.body.userType }, (err, resl) => {
                // console.log(resl)
                if (err) {
                    console.log('err in find', err)
                }
                else if (resl == null) {
                    res.send({ message: 'invalid userName' })
                }
                else {
                    //compare password
                    bcrypt.compare(req.body.password, resl.password, (err, isMatched) => {
                        if (err) {
                            console.log('err in compare', err)
                        }
                        else if (isMatched == false) {
                            res.send({ message: 'invalid password' })
                        }
                        else {
                            //generating token
                            jwt.sign({ userName: resl.userName }, 'signed', { expiresIn: 120000 }, (err, signedToken) => {
                                if (err) {
                                    console.log('err in token generation', err)
                                }
                                else {
                                    delete resl.password;
                                    res.send({ message: 'success', userObject: resl, token: signedToken, userName: resl.userName })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

// adminExpApp.get('/getallusers',(req,res)=>{

// })

adminExpApp.post('/approveblog', deletepost, (req, res) => {
    var statustext = "approved"
    req.body.status = statustext
    dbo.collection('approvedBlogs').insertOne(req.body, (err, Obj1) => {
        if (err) {
            console.log('err in insert', err);
        }
        else {
            res.send({ message: 'post Approved' })
        }
    })
})

adminExpApp.post('/rejectblog', deletepost, (req, res) => {
    var statustext = 'rejected'
    req.body.status = statustext
    dbo.collection('rejectedBlogs').insertOne(req.body, (err, Obj2) => {
        if (err) {
            console.log('err in update', err);
        }
        else {
            res.send({ message: 'post Rejected' })
        }
    })
})


adminExpApp.get('/getallapproved', (req, res) => {
    dbo.collection('approvedBlogs').find().toArray((err, blogArray) => {
        if (err) {
            console.log('err in find', err)
        }
        else if (blogArray.length == 0) {
            res.send({ message: 'no posts found' })
        }
        else {
            // console.log(blogArray);
            var newblogArray = blogArray.reverse();
            // console.log(newblogArray)
            res.send({ message: newblogArray })
        }
    })
})


adminExpApp.get('/getallrejected', (req, res) => {
    dbo.collection('rejectedBlogs').find().toArray((err, blogArray1) => {
        if (err) {
            console.log('err in find', err)
        }
        else if (blogArray1.length == 0) {
            res.send({ message: 'no posts found' })
        }
        else {
            res.send({ message: blogArray1 })
        }
    })
})

adminExpApp.get('/getpostbyid/:id', (req, res) => {
    var bno = (req.params.id)
    dbo.collection('approvedBlogs').find({ blogId: bno }).toArray((err, blogsArray) => {
        if (err) {
            console.log('err in find', err)
        }
        else if (blogsArray.length == 0) {
            res.send({ message: 'no data found' })
        }
        else {
            res.send({ message: blogsArray })
        }
    })
})
