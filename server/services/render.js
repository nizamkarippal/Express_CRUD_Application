// separating call back handlers from router.js and exporting it directly for easy handling
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const filepath = './server/database/data.json'
const fileContents = fs.readFileSync(filepath,'utf-8');
const data = JSON.parse(fileContents);


//exporting homeRoutes
exports.homeRoutes = (req, res)=>{
      //rendering index.ejs file
      res.render('index', {data:data});
}

exports.add_user = (req,res)=>{
      //rendering add user ejs file
      res.render('add_user');
}

exports.update_user = (req,res)=>{

             //rendering update ejs file with data
            const id = req.query.id;
            
            res.render('update_user', {user:data[id-1]})
     
     
}