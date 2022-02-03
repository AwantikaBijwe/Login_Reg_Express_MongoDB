const express = require('express');
const http = require('http');
const bcrypt = require('bcrypt');
const path = require("path");
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'./public/index.html'));
});


app.post('/register', async (req, res) => {
    try{

        var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("userdb");
          
         let newUser = {
                id: Date.now(),
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            }; 
            dbo.collection("users1").insertOne(newUser, function(err, res) {
              if (err) throw err;
              console.log("Registered");
              db.close();
            });
        });
             res.send("<div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>");
             
             }   catch{
                 res.send("Internal server error");
                }            
});

  
app.post('/login', async (req, res) => {
    try{

        var MongoClient = require('mongodb').MongoClient;
        var url ="mongodb://localhost:27017/";

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("userdb");
            var query = { email: req.body.email,password: req.body.password };
            dbo.collection("users1").find(query).toArray(function(err, result) {
                if (err) throw err;
                if (result) {
                    let usrname = result[0].username;
                    res.send(`<div align ='center'><h2>login successful</h2></div><br><br><br><div align ='center'><h3>Hello ${usrname}</h3></div><br><br><div align='center'><a href='./login.html'>logout</a></div>`);
                     } else {
                    res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='./login.html'>login again</a></div>");
                }
                db.close();
              });      
            });
            }catch{
                res.send("Internal server error");
               }  
        });   
server.listen(3000, function(){
    console.log("server is listening on port: 3000");
});