//import modules
const exp = require('express')

//creating mini exp app
const userExpApp = exp.Router()

const moment = require('moment')

//body parsing
userExpApp.use(exp.json())

//export api (mini app)
module.exports = userExpApp;

//importing ids generating module
const blogIds = require('../src/middleware/generateids');
const verifyUser = require('../src/middleware/verifyToken');

const mc = require('mongodb').MongoClient

// //importin db
// const dbObj=require('../db')

var dbo;

var dbURL = 'mongodb://vchanti679:9393490610@cluster0-shard-00-00-hfzzf.gcp.mongodb.net:27017,cluster0-shard-00-01-hfzzf.gcp.mongodb.net:27017,cluster0-shard-00-02-hfzzf.gcp.mongodb.net:27017/<dbname>?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
// var dbURL = 'mongodb+srv://vchanti679:9393490610@cluster0-hfzzf.gcp.mongodb.net/blogdb?retryWrites=true&w=majority'

mc.connect(dbURL, { useUnifiedTopology: true }, (err, clientObj) => {
    if (err) {
        console.log('err in connecting', err)
    }
    else {
        dbo = clientObj.db('blogdb')
        // console.log('connected to database')
    }
})

//middleware 2
var commentId = (req, res, next) => {
    dbo.collection('commentIds').updateOne({ name: 'cmntId' }, { $inc: { number: 2 } }, (err, objt) => {
        if (!err) {
            dbo.collection('commentIds').find().toArray((err, dataArray1) => {
                if (!err) {
                    req.body.cmntId = dataArray1[0].name + dataArray1[0].number
                    next();
                }
                else {
                    console.log(err, 'err in find')
                }
            })
        }
        else {
            console.log(err, 'err in update');
        }
    })
}

userExpApp.post('/addpost', verifyUser, blogIds, (req, res) => {
    var today = moment().format('ll');
    var likesArray = [];
    req.body.postdate = today;
    req.body.likes = likesArray;
    dbo.collection('allposts').insertOne(req.body, (err, resp) => {
        if (!err) {
            res.send({ message: 'Post Created' })
        }
        else (
            res.send({ message: 'failed to post' })
        )
    })
})

userExpApp.get('/getallposts', (req, res) => {
    dbo.collection('allposts').find().toArray((err, blogArray) => {
        if (err) {
            console.log('err in find', err)
        }
        else if (blogArray.length == 0) {
            res.send({ message: 'no posts found' })
        }
        else {
            var bArray = blogArray.reverse();
            res.send({ message: bArray })
        }
    })
})

userExpApp.get('/getpostbyid/:id', (req, res) => {
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


userExpApp.get('/getpostbyusername/:un', (req, res) => {
    var bno = (req.params.un)
    dbo.collection('approvedBlogs').find({ userName: bno }).toArray((err, blogsArray1) => {
        if (err) {
            console.log('err in find', err)
        }
        else if (blogsArray1.length == 0) {
            res.send({ message: 'no data found' })
        }
        else {
            var bArray1 = blogsArray1.reverse()
            res.send({ message: bArray1 })
        }
    })
})

userExpApp.delete('/removepost/:id', (req, res) => {
    var del = (req.params.id)
    console.log(del);
    dbo.collection('approvedBlogs').findOne({ blogId: del }, (err, deleted) => {
        if (err) {
            console.log('console.log', err)
        }
        else if (deleted == null) {
            res.send({ message: 'no data found to delete' })
        }
        else {
            dbo.collection('approvedBlogs').deleteOne({ blogId: del }, (err, done) => {
                if (err) {
                    console.log('err in deleting', err)
                }
                else {
                    res.send({ message: 'post deleted success' })
                }
            })
        } 
    })
})

userExpApp.put('/updatepost', (req, res) => {
    var today = moment().format('LLL');
    req.body.postupdated = today
    dbo.collection('allposts').findOne({ blogId: req.body.blogId }, (err, blogObj) => {
        if (err) {
            console.log('err in find blog', err)
        }
        else if (blogObj == null) {
            res.send({ message: 'no blog found' })
        }
        else {
            dbo.collection('allposts').updateOne({ blogId: req.body.blogId },
                {
                    $set: { blogTitle: req.body.blogTitle, description: req.body.description, category: req.body.category, postupdated: req.body.postupdated }
                }
                , (err, blogObj1) => {
                    if (err) {
                        conso.log('err in update blog', err);
                    }
                    else {
                        res.send({ message: 'post updated successfully' })
                    }
                })
        }
    })
})


userExpApp.get('/getlikeslist/:id', (req, res) => {
    var likesArray2;
    dbo.collection('approvedBlogs').findOne({ blogId: req.params.id }, (err, Obj3) => {
        if (err) {
            return console.log(err);
        }
        else if (Obj3.likes == null) {
            res.send({ message: 'no likes' })
        }
        else {
            likesArray2 = Obj3.likes
            res.send({ message: likesArray2, likescount: likesArray2.length })
        }
    })
})


userExpApp.put('/add-removelike', (req, res) => {
    // console.log(req.body);
    var reflikes = [];
    reflikes.push(req.body.loggedUser)
    req.body.likes = reflikes
    dbo.collection('approvedBlogs').findOne({ blogId: req.body.blogId }, (err, Obj4) => {
        if (err) {
            console.log('err in find', err)
        }
        else if (Obj4.likes == null) {
            dbo.collection('approvedBlogs').updateOne({ blogId: req.body.blogId }, { $set: { likes: req.body.likes } },
                (err, result1) => {
                    if (err) {
                        console.log(err, 'err in update');
                    }
                    else {
                        return res.send({ message: 'post liked' })
                    }
                })
        }
        else if (Obj4.likes.length == 0) {
            dbo.collection('approvedBlogs').updateOne({ blogId: req.body.blogId }, { $addToSet: { likes: req.body.loggedUser } },
                (err, result) => {
                    if (err) {
                        console.log(err, 'err in update');
                    }
                    else {
                        return res.send({ message: 'post liked' })
                    }
                })
        }
        else {
            var likesarray = Obj4.likes
            var existingUser;
            for (let x of likesarray) {
                if (req.body.loggedUser == x) {
                    existingUser = true;
                }
                else {
                    existingUser = false;
                }
            }
            if (existingUser !== true) {
                dbo.collection('approvedBlogs').updateOne({ blogId: req.body.blogId }, { $push: { likes: req.body.loggedUser } },
                    (err, result) => {
                        if (err) {
                            console.log(err, 'err in update');
                        }
                        else {
                            return res.send({ message: 'post liked' })
                        }
                    })
            }
            else {
                dbo.collection('approvedBlogs').updateOne({ blogId: req.body.blogId }, { $pull: { likes: req.body.loggedUser } },
                    (err, result) => {
                        if (err) {
                            console.log('err in pull', err)
                        }
                        else {
                            return res.send({ message: 'post unliked' })
                        }
                    })
            }
        }

    })

})



userExpApp.put('/save-unsaveposts', (req, res) => {
    var list = [];
    list.push(req.body.blogId)
    req.body.savedposts = list
    dbo.collection('allusers').findOne({ userName: req.body.userName }, (err, Obj5) => {
        if (err) {
            return console.log('err in find', err)
        }
        else if (Obj5.savedposts == null) {
            dbo.collection('allusers').updateOne({ userName: req.body.userName }, { $set: { savedposts: req.body.savedposts } },
                (err, reslt) => {
                    if (err) {
                        return console.log(err);
                    }
                    else {
                        res.send({ message: 'post saved' })
                    }
                })
        }
        else if (Obj5.savedposts.length == 0) {
            dbo.collection('allusers').updateOne({ userName: req.body.userName }, { $addToSet: { savedposts: req.body.blogId } },
                (err, result) => {
                    if (err) {
                        return console.log(err);
                    }
                    else {
                        return res.send({ message: 'post saved' })
                    }
                })
        }
        else {
            var postsarray = Obj5.savedposts
            var existingPostId;
            for (let y of postsarray) {
                if (req.body.blogId == y) {
                    existingPostId = true;
                }
                else {
                    existingPostId = false;
                }
            }
            if (existingPostId !== true) {
                dbo.collection('allusers').updateOne({ userName: req.body.userName }, { $push: { savedposts: req.body.blogId } },
                    (err, result) => {
                        if (err) {
                            return console.log(err);
                        }
                        else {
                            return res.send({ message: 'post saved' })
                        }
                    })
            }
            else {
                dbo.collection('allusers').updateOne({ userName: req.body.userName }, { $pull: { savedposts: req.body.blogId } },
                    (err, result) => {
                        if (err) {
                            return console.log(err);
                        }
                        else {
                            return res.send({ message: 'post unsaved' })
                        }
                    })
            }
        }
    })
})


userExpApp.get('/getallsaved/:un', (req, res) => {
    // console.log(req.params.un);
    dbo.collection('allusers').findOne({ userName: req.params.un }, (err, Obj6) => {
        if (err) {
            return console.log(err);
        }
        else if (Obj6.savedposts == null) {
            res.send({ message: 'no saved posts' })
        }
        else {
            var Array1 = [];
            dbo.collection('approvedBlogs').find().toArray((err, posts) => {
                if (err) {
                    return console.log(err);
                }
                else if (posts !== null) {
                    for (let z of Obj6.savedposts) {
                        for (let post of posts) {
                            if (post.blogId == z) {
                                Array1.push(post)
                            }
                        }
                    }
                    res.send({ message: Array1, listlength: Array1.length, ids: Obj6.savedposts })
                }
            })
        }
    })
})


userExpApp.post('/addcomment', commentId, (req, res) => {
    var today2 = moment().format('LLL');
    req.body.commentTime = today2;
    dbo.collection('allComments').findOne({ cmntId: req.body.cmntId }, (err, result) => {
        if (err) {
            return res.status(400).send({ message: err, info: 'err in find' })
        }
        else {
            dbo.collection('allComments').insertOne(req.body, (err, obj001) => {
                if (err) {
                    return res.status(400).send({ message: err, info: 'err while inserting data' })
                }
                else {
                    return res.status(200).send({ message: 'comment posted' });
                }
            })
        }
    })
})


userExpApp.get('/getallcomments', (req, res) => {
    dbo.collection('allComments').find().toArray((err, commentsArray) => {
        if (err) {
            return console.log('err in find', err);
        }
        else {
            return res.status(200).send({ message: commentsArray })
        }
    })
})
