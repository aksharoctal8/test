const mongoose = require('mongoose');


const AddmineSchema =mongoose.Schema({

    name:{
        type:String,
      
    },
    email:{
        type:String,
      
    },
    password:{
        type:String,
      
    },
   image:{
        type:String,
      
    },
 
   
})

const Admin = mongoose.model('Admine',AddmineSchema);
module.exports = Admin;