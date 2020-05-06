const mongoose=require('mongoose');

const noteSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    studentID:{type:String, required:true},
    teacherID:{type:String, required:true},
    note:{type:String, required:true},
    subject:{type:String,required:true}
});
module.exports=mongoose.model('Note',noteSchema);