import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const tagSchema = new Schema({
    label:{type:String, required:true, unique:true},
    value:{type:String, required:true, unique:true},
    posts:[{type:Schema.Types.ObjectId, ref:"Post"}]
})

export default model("Tag", tagSchema)