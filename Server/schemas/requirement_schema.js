var mongoose=require('mongoose')
var Schema    = mongoose.Schema;
var requirementSchema   = new Schema({
    requirement:{type: String,trim: true},
    project:{type: Schema.Types.ObjectId,required:true},
    user:{type: Schema.Types.ObjectId,required:true},
    addedDate:{type:Date},
    comments:[{commnet:{type:String},addedDate:{type:Date},user:{type:Schema.Types.ObjectId}}],
    status:{type:String,trim:true,default:"NEW"} 
},{collection:"requirement_data"});

module.exports = mongoose.model('requirement', requirementSchema);