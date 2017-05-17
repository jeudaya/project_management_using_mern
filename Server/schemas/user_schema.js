var mongoose=require('mongoose')
var Schema    = mongoose.Schema;

var userSchema   = new Schema({
    firstname:{type:String,required:true,trim:true} ,
    lastname:{type:String,required:true,trim:true} ,
    email:{type:String,required:true,trim:true,unique:true}, 
    password:{type:String,required:true,trim:true},
    isAdmin:{type:Boolean,default:false},
    addedDate:{type:Date}
},{collection:"user_data"});

module.exports = mongoose.model('user', userSchema);