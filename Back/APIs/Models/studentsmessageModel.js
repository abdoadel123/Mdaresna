const mongoose=require('mongoose');

const studentsMessageSchema =mongoose.Schema({

    _id:mongoose.Schema.Types.ObjectId , 
    to_student_id :{type:String  , required : true},
    from_teacher_id : {type:String  , required : true}, 
    message_text : {type:String  , required : true} ,
});

module.exports = mongoose.model('studentsmessage' , studentsMessageSchema);
/* 
    keda 3mal function constructor we 7at el layout bta3 el object feha 
    we hy7t functions bta3t el mongo we bkda nkdar nstkhdmha 
    3lshan n3mel insert lel object dah bshola
*/ 