const mongoose = require('mongoose');

const homeworkSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId ,
    task : {type:String  , required : true} ,
    date :{type:String  , required : true},
    subject : {type:String  , required : true} , 
    class : {type:Number  , required : true} , 
    level : {type:Number  , required : true}  
});


module.exports = mongoose.model('homework',homeworkSchema) ;