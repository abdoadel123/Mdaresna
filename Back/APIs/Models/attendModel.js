const mongoose=require('mongoose');

const attnedSchema=mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    studentID:{type:String, required:true},
    subjectName:{type:String, required:true},
    absent:{type:Number,require:true},
});
module.exports=mongoose.model('attend',attnedSchema);