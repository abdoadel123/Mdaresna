const mongoose=require('mongoose');

const teacherSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    teacherID:{type:String, required:true},
    age:{type:Number,required:true},
    address:{type:String, required:true},
    birthDate:{type:String, required:true},
    number:{type:String, required:true},
    name:{type:String, required:true},
    gender:{type:String, required:true},
    religion:{type:String, required:true},
    password:{type:String, required:true},
});
module.exports=mongoose.model('Teachers',teacherSchema);