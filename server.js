const express = require('express');
// const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const app = express();

// dotenv.config({path:'config.env'});
const PORT =  3001

// log requests
app.use(morgan('tiny'));

//parse request to body parser (POST REQESTS PARSING the body)
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json());

//set view engine we are using ejs template engine
app.set("view engine","ejs");
// app.set("views", path.resolve(__dirname, "views/ejs"))

//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
// app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// load routers
app.use('/', require('./server/routes/router'))

app.listen(PORT, ()=>{
      console.log(`Server is running on http://localhost:${PORT}`)
});