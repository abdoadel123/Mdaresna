const mongoose = require('mongoose');

const grade=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId ,

    studentid :{type:String  , required : true},
    subject : {type:String  , required : true} , 
    grade : {type:Number  , required : true},
    description : {type:String  , required : true},
});


module.exports = mongoose.model('grade',grade) ;