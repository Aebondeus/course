import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const commentSchema = new Schema({
    content:{type:String, required:true},
    post:{type:Schema.Types.ObjectId, ref:'Post'},
    author:{type:Schema.Types.ObjectId, ref:'User'},
    publishDate:{type:Date, required:true}
})

export default model('Comment', commentSchema);