//Importing modules

var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var express = require('express');
var path = require('path');

var app = express();
const route = require('./routes/route');

//Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/newseodb');//On connection


mongoose.connection.on('connected',() => {
   console.log('Connected to MongoDB on port number');
});

mongoose.connection.on('error',(err) => {
   if(err)
   {
       console.log('Error in DB connection'+ err);
   }
});


//Define port number

const port = 3000;



//Adding middleware-cors
app.use(cors());

//Adding json parser
app.use(bodyparser.json());

//Static files
app.use(express.static(path.join(__dirname,'public')));//__dirname means current working directory.


//All calls to API will get routed to route.js
app.use('/api',route);
app.get('/',(req,res)=> {

   res.send('foobar');
})


app.listen(port,() => {

   console.log('Server started at port'+port);

});


