const mongoose = require('mongoose');

const feedbackSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId ,
    t_id : {type:String  , required : true} ,
    s_id :{type:String  , required : true},
    subject : {type:String  , required : true} , 
    feedback : {type:String  , required : true},
    date : {type:String  , required : true},
});


module.exports = mongoose.model('feedback',feedbackSchema) ;