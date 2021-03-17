import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const postSchema = new Schema({
    name:{type:String, required:true},
    synopsis:{type:String},
    author:{type:Schema.Types.ObjectId, ref:"User"},
    genre:{type:String, required:true},
    tags:[{type:Schema.Types.ObjectId, ref:"Tag"}],
    parts: [{type:Schema.Types.ObjectId, ref:"Part"}],
    comments:[{type:Schema.Types.ObjectId, ref:"Comment"}],
    rating:{type:Array},
    ratingTotal:{type:Number},
    updated:{type:Date}
})

export default model("Post", postSchema);