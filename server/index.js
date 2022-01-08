const express = require('express')
const app = express()
const mongoose = require('mongoose')
const UserModel = require('./models/Users')
const ProductModel = require('./models/Products')
const cors = require('cors')
require('dotenv').config()
const pass = process.env.PASS

app.use(express.json());
app.use(cors())

const uri = `mongodb+srv://testuser00:${pass}@cluster0.trxjj.mongodb.net/YokeTest?retryWrites=true&w=majority`

mongoose.connect(uri)
// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false, // this is the new line of code we're adding
// })

app.get("/getUsers", (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

app.get("/getProducts", (req, res) => {
    ProductModel.find({}, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

app.post("/update/userinfo", (req, res) => {
    const { filter } = req.body; // { name: 'Luke' };
    const { update } = req.body; // { account: 224, transaction: { id: 0, item: {}, } };
    const opts = { new: true };
    // update user account balance after purchasing
    ProductModel.findOneAndUpdate(filter, update, opts, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

app.post("/update/productinfo", (req, res) => {
    // const { filter } = req.body; // { productName: 'paper' };
    // const { update } = req.body; // { quantityInStock: 4,  };
    const filter = { 'productName': 'paper' };
    const update = req.body;
    // {
    //     "_id": "61d7e58723e10a0717c9a31e",
    //     "productName": "paper",
    //     "price": 2.4,
    //     "quantityInStock": 19,
    //     "transact": 2
    //   };
    const opts = { new: true, upsert: true };
    // if quantity is 0 return no inventory cannot purchase
    ProductModel.findOneAndUpdate(filter, update, opts)
    // findOneAndUpdate({ _id: req.params.id }, updates, { new: true })
    .then(updated => res.json(updated))
    .catch(err => res.status(400).json("Error: " + err))
        
        //, (err, result) => {
        // if (err) {
        //     res.json(err)
        //     // res.status('404').send({ 'error' : err.message })
        //     console.log('error',err)
        // } else {
        //     res.json(result)
        //     // done(null, result)
        //     console.log('result', result)
        // }
    // })
  
})

app.listen(4000, ()=> {
    console.log('Server runnging on port 4000.')
})


// "name": "Smith",
// "email": "Smith@email.com",
// "account": 200,
// "isMember": true

// "productName": "eraser",
// "price": {
//     "$numberDouble": "1.1"
// },
// "quantityInStock": {
//     "$numberInt": "20"
// }