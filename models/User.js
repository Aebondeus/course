import mongoose from 'mongoose';
import findOrCreate from "mongoose-findorcreate";
const {Schema, model} = mongoose;

const userSchema = new Schema({
    login:{type:String, unique:true},
    password:{type:String},
    nickName:{type:String, required:true, unique:true},
    posts:[{type:Schema.Types.ObjectId, ref:"Post"}],
    comments:[{type:Schema.Types.ObjectId, ref:"Comment"}],
    facebookId:{type:String},
    twitterId:{type:String},
    vkId:{type:String},
    isAdmin:{type:Boolean, required:true, default:false}
})
userSchema.plugin(findOrCreate);
export default model('User', userSchema)