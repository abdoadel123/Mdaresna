const mongoose=require('mongoose');

const messageSchema =mongoose.Schema({

    _id:mongoose.Schema.Types.ObjectId , 

    from : {type:String  , required : true} ,
    to : {type:String  , required : true} , 
    messagetext :{type:String  , required : true} ,
    seen:{type:Number  , required : true} , /// 0 not seen 1 is seen 
    //messageid:{type:Number , required:true}
});

module.exports = mongoose.model('messages' , messageSchema);