const fs = require('fs');
// const path = require('path')

const path = require('path');
const filepath = "./server/database/data.json";
const fileContents = fs.readFileSync(filepath,'utf-8');
const data = JSON.parse(fileContents);


//create and save new user
exports.create=(req,res)=>{
    //validate request
    if(!req.body){
      res.status(400).send({message:"Content can't be empty"});
      return;
    }

    //new user
    const user = {
                  id : data.length+1,
                  name: req.body.name,
                  email : req.body.email,
                  gender : req.body.gender,
                  status : req.body.status
            };

      //Save user
      data.push(user);
      fs.writeFileSync(filepath,JSON.stringify(data));
      res.redirect('/add-user');

}

//Retrieve and return all users
exports.find=(req,res)=>{
      if(data){
            res.send(data);
      }else{
            res.status(500).send({message:error.message || "User Data not found"});
      }
}

// retrieve and returna a single user
exports.findById=(req,res)=>{
      const userId = req.params.id;
      const user = data.find((item)=> item.id === parseInt(userId));
     
      if(user){
            res.send(user);
      } else{
            res.status(500).send({message:error.message || "User Data not found"});
      }
}

//Update a new identified user by user ID
exports.update=(req,res)=>{


      const userId = req.params.id;
      const updatedData = req.body;

      for(let i = 0; i < data.length; i++){
            const index = data.findIndex((obj => obj.id == userId) )
                  if(index !== -1){
                        data[index] = {...data[index], ...updatedData}
                        fs.writeFileSync(filepath,JSON.stringify(data));
                  }
           
            
      }
      res.status(200).send('<script>alert(Form Submitted Successfully!);</script>')
}

// delete a user with specified user ID in the request
exports.delete=(req,res)=>{
      const id = req.params.id;
                  //deleting todo from todos
                  const index = data.findIndex(obj => obj.id === parseInt(id));
                  if(index !== -1){
                   data.splice(index, 1);
                  }
                  for(let i =0 ; i< data.length ; i++){
                        data[i].id = i + 1;
                  }
                  fs.writeFileSync(filepath, JSON.stringify(data));
             res.status(200).send('<script>alert(Data Deleted Successfully!);</script>')
}