const mongoose=require('mongoose');

const assignmentSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId ,

    subject : {type:String  , required : true} ,
    date :{type:String  , required : true},
    task : {type:String  , required : true} , 
    class : {type:String  , required : true}
});
module.exports=mongoose.model('Assignment',assignmentSchema);