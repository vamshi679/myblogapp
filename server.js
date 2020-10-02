//importing express module
const exp = require('express')
// const cors = require('cors');
const blogApp = exp();

// const dbo = require('./db');

//assigning port number to express app
// let port = 1111;
let port = process.env.PORT || 8081;
blogApp.listen(port, () => {
    console.log('server started')
})

//body parser
blogApp.use(exp.json());

//cors
// blogApp.use(cors());

//importing path module 
const path = require('path')

//linking backend to frontend with dist(uploading js bundles)
blogApp.use(exp.static(path.join(__dirname, './dist/assignment')))

//import api's
const adminAPI = require('./APIs/AdminAPI')
const userAPI = require('./APIs/UserAPI');

//redirecting to apis
blogApp.use('/admin', adminAPI)
blogApp.use('/user', userAPI)


// //req handler for common login
// blogApp.post('/register',(req,res)=>{
//     console.log(req.body);
//     dbo.collection('alluser').insertOne(req.body,(err,result)=>{
//         res.send({message:'success'})
//     })
// }) 

// //req handler for common login
// blogApp.post('/login',(req,res)=>{
//     console.log(req.body);
//     res.status(200).send({message:'login success'})
// }) 


// blogApp.put('/update',(req,res)=>{
//     res.status(200).send({message:'updated success'})
// })

// blogApp.get('/getdata',(req,res)=>{
//     res.status(200).send({message:'get success'})
// })

// blogApp.delete('/delete',(req,res)=>{
//     res.status(200).send({message:'delete success'})
// })