import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const partSchema = new Schema({
    name:{type:String, required:true},
    date:{type:Date},
    content:{type:String},
    image:{type:String, default:''},
    post:{type:Schema.Types.ObjectId, ref:'Post'},
})

export default model('Part', partSchema);