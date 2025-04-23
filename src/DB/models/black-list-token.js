import mongoose from "mongoose";

const blacklisttokensSchema = new mongoose.Schema({
    tokenId:{type:String , required:true , unique:true},
    expiryDate:{type:String , required:true}
},{timestamps:true})

const BlackListToken = mongoose.models.BlackListToken || mongoose.model("BlackListToken",blacklisttokensSchema)

export default BlackListToken