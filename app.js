let express = require('express');
let app = express()
const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
let dotenv = require('dotenv');
const req = require('express/lib/request');
dotenv.config()
let port = process.env.PORT || 9000
const mongoUrl = "mongodb+srv://mustaeen:plastion@realmcluster.ecbjk.mongodb.net/flipkart?retryWrites=true&w=majority"
const bodyparser = require('body-parser')
const cors = require('cors');
const { query } = require('express');

// middlewear
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use(cors())


app.get('/', (req,res) => {
    res.send('welcome to flipkart')
})

app.get('/categories', (req,res) => {
    db.collection('categories').find().toArray((err,result) => {
        if(err) throw err
        res.send(result)
    })
})

app.get('/products/', (req,res) => {
    let query = {}
    let categoryId = Number(req.query.category_id)
    let customerRating = Number(req.query.customer_rating)
    let brand = req.query.brand
    let cost = Number(req.query.cost)


    if(categoryId){
        query = {category_id:categoryId}
    }else if(customerRating){
        query = {customer_rating:customerRating}
    }else if(brand){
        query = {brand:brand}
    }else if(cost){
        query = {cost:cost}
    }


    db.collection('products').find(query).toArray((err,result) => {
        if(err) throw err
        res.send(result)
    })
})


// details

app.get('/details/:id', (req,res) => {
    let categoryId = Number(req.params.id)
    db.collection('products').find({category_id:categoryId}).toArray((err,result) => {
        if(err) throw err
        res.send(result)
    })
})

// productDetails on item selected
app.post('/productDetails',(req,res) => {
    console.log(req.body)
    db.collection('products').find({product_id:{$in:req.body}}).toArray((err,result) => {
        if(err) throw err
        res.send(result)
    })
})

// placeOrder

app.post('/placeorder', (req,res) => {
    db.collection('orders').insert(req.body,(err,result) => {
        if(err) throw err
        res.send('order placed')
    })
})

// view Orders
app.get('/vieworder', (req,res) => {
    let email = req.query.email;
    let query = {}
    if(email){
        query = {'email':email}
    }
    db.collection('orders').find(query).toArray((err,result) => {
        if(err) throw err
        res.send(result)
    })
})

// connecting to db

mongoClient.connect(mongoUrl,(err,client) => {
    if(err) console.log('Error While Connecting...')
    db = client.db('flipkart')
    app.listen(port,() => {
        console.log(`server is running on ${port}`);
    })
})