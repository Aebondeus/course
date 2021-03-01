import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const userSchema = new Schema({
    login:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    nickName:{type:String, required:true, unique:true},
    posts:[{type:Schema.Types.ObjectId, ref:"Post"}],
    comments:[{type:Schema.Types.ObjectId, ref:"Comment"}],
    isAdmin:{type:Boolean, required:true}
})

export default model('User', userSchema)