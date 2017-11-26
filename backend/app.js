var express = require("express");
var morgan = require("morgan");
var bp = require("body-parser");
var jwt = require("jsonwebtoken");
var mongoose = require('mongoose');

var app = express();
app.use(bp.urlencoded({extended: true}));
app.use(bp.json());
app.use(morgan('dev'));




app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


//database

var Products = require("./models/products");
mongoose.connect("mongodb://localhost/ecommerce");
const db = mongoose.connection;
  
db.once("open", () => console.log( "db connected"));


  


// products = [ {
//                     title: 'Name 1',
//                     price: "Price 1",
//                     subtitle: "SubTitle 1",
//                     id: 134
//                 },
//                 {
//                     title: "Name 2",
//                     price: "Price 2",
//                     subtitle: "SubTitle 2",
//                     id: 15234
//                 }  
//             ];

users = [];


app.get("/", (req,res) => {
    
    Products.findProduct().then( prodArray => res.json(prodArray));
    // res.json(products);
});

app.post("/addproduct", (req, res) => {

    

    Products.addProduct(req.body).then( () => console.log("Prod added")).then(() => res.json(req.body));


    //products.push(req.body);
    console.log(req.body);
    res.json(req.body);
});


app.get("/products/:id", (req, res) => {
    
    Products.findProduct({
        "_id": req.params.id
    }).then( (product) => res.json(product));

    // let currentProd = products.filter( prod =>  {return prod.id == req.params.id});
    // res.json(currentProd);
})

app.post("/register", (req, res) => {
    console.log(req.body);
    users.push(req.body);
    generateToken(req, res);
    
})

app.post("/login", (req, res) => {
    var user = users.find( user => user.email === req.body.email);
    if(user){
    
        if(user.password === req.body.password){
            generateToken(req, res);
        }else{
            sendError(res);
        }
    }
    else{
        sendError(res);
    }
})

function generateToken(req, res){
    var token = jwt.sign((users.length-1), "dummyvalue");
    res.json({username: req.body.email, token});
    console.log(token);
}

function sendError(res){
    res.json({success: false, message: "incorrect email or password"});
}

app.listen(9000);
