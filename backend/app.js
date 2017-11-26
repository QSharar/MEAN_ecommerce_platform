var express = require("express");
var morgan = require("morgan");
var bp = require("body-parser");
var jwt = require("jsonwebtoken");
var mongoose = require('mongoose');
var Products = require("./models/products");
var Users = require("./models/users");

var app = express();
app.use(bp.urlencoded({extended: true}));
app.use(bp.json());
app.use(morgan('dev'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.connect("mongodb://localhost/ecommerce");
const db = mongoose.connection;
  
db.once("open", () => console.log( "db connected"));

app.get("/", (req,res) => {
    Products.findProduct().then( prodArray => res.json(prodArray));
});

app.post("/addproduct", (req, res) => {
    
    Products.addProduct(req.body).then( () => console.log("Prod added")).then(() => res.json(req.body));
    console.log(req.body);
    res.json(req.body);

});


app.get("/products/:id", (req, res) => {
    
    Products.findProduct({
        "_id": req.params.id
    }).then( (product) => res.json(product));

})

app.post("/register", (req, res) => {

    Users.addUser(req.body);
    generateToken(req, res, req.body);
    
})

app.post("/login", (req, res) => {

    Users.findUser({
        "email" : req.body.email
    }).then( (user) => {
        console.log(user);
        if(user.length !== 0){
                if(user[0].password === req.body.password){
                    
                    generateToken(req, res, JSON.stringify(user[0]));
                    console.log( `${req.body.password}  === ${user[0].password}`);
                }else{
                    sendError(res);
                }
            }
            else{
                sendError(res);
            }
    });
})

function generateToken(req, res, user){
    var token = jwt.sign(user, "dummyvalue");
    res.json({username: req.body.email, token});
}

function sendError(res){
    res.json({success: false, message: "incorrect email or password"});
}

app.listen(9000);
