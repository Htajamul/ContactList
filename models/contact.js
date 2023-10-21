const mongoose = require('mongoose');
const ContactScema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    }
})
 const contact=mongoose.model('contact',ContactScema);
 module.exports=contact;