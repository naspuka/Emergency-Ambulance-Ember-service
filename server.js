const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const dbRoles = require("./models/index")
const Role = dbRoles.role;


const app = express();



// // DB config to cloud
// const db = require('./config/keys').MongoURI;
// // Connect to MongoDB
// mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
//    .then(() =>{
//        console.log('Mongodb is Connected....');
//    })
//    .catch(err => {
//        console.log(err);
//    });

mongoose.connect('mongodb://localhost:27017/ea_db', { useNewUrlParser: true, useUnifiedTopology: true })
.then( (db)=>{
     console.info('Successfully connected to MongoDB.');
 }).catch(error => {
     console.info("db error", error);
 });



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({ message: "Welcome to Emergency Ambulance application." });
});

function initial() { 
    Role.estimatedDocumentCount((err, count) => {
        if(!err && count === 0){
            new Role({
                name: "user"
            }).save(err => {
                if(err){
                    console.log("error", err);
                }
                console.log("Added 'user' to roles collection");
            });
            new Role({
                name: "moderator"
            }).save(err => {
                if(err){
                    console.log("error", err)
                }
                console.log("Added 'moderator' to roles collection");
            });
            new Role({
                name: "admin"
            }).save(err => {
                if(err){
                    console.log("error", err)
                }
                console.log("Added 'admin' to roles collection");
            });
        }
    });
 }

 initial();
//  routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});