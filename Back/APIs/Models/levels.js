const mongoose=require('mongoose');

const levelSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    level:{type:String, required:true},
    class:{type:String, required:true},
    subject:{type:String, required:true},
    teacherID:{type:String, required:true}

});
module.exports=mongoose.model('Levels',levelSchema);