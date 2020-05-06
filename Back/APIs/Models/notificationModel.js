const mongoose = require('mongoose');

const notificationSchema=mongoose.Schema({
    
    _id:mongoose.Schema.Types.ObjectId ,
    to :{type:String  , required : true},
    notification: {type:String  , required : true}
});


module.exports = mongoose.model('notifications',notificationSchema) ;