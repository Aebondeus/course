import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const partSchema = new Schema({
    name:{type:String},
    date:{type:Date},
    content:{type:String},
    post:{type:Schema.Types.ObjectId, ref:'Post'},
})

export default model('Part', partSchema);