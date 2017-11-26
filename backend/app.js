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


var Products = require("./models/products");
var Users = require("./models/users");
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
    
    generateToken(req, res);
    
})

app.post("/login", (req, res) => {

    Users.findUser({
        "email" : req.body.email
    }).then( (user) => {

        if(user){
                console.log( `${user[0].password} === ${req.body.password}`)
                if(user[0].password === req.body.password){
                    
                    generateToken(req, res, user);
                    console.log( `${req.body.password}  === ${user[0].password}`);
                }else{
                    sendError(res);
                }
            }
            else{
                sendError(res);
            }
    });
    //var user = users.find( user => user.email === req.body.email);
    // if(user){
    
    //     if(user.password === req.body.password){
    //         generateToken(req, res);
    //     }else{
    //         sendError(res);
    //     }
    // }
    // else{
    //     sendError(res);
    // }
})

function generateToken(req, res, user){
    var token = jwt.sign((user[0]), "dummyvalue");
    res.json({username: req.body.email, token});
    console.log(token);
}

function sendError(res){
    res.json({success: false, message: "incorrect email or password"});
}

app.listen(9000);
