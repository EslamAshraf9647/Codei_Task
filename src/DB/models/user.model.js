import mongoose from "mongoose";
import * as Constants from "../../Constants/constants.js"

const UserSchema = new mongoose.Schema ({
    FirstName:{
        type:String,
        tirm:true,
        required:true
    },
    LastName:{
        type:String,
        tirm:true,
        required:true
    },
    email:{
        type:String,
        unique:[true, "Email is already token"],
        required:[true, "Email is required"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    gender:{
        type:String,
        default:Constants.Gender.OTHER,
        enum:Object.values(Constants.Gender),
        required:true
    },
    DOB: {
        type: Date,
        validate: {
            validator: function (value) {
                const today = new Date();
                const minAge = new Date();
                minAge.setFullYear(today.getFullYear() - 18);
                return value < today && value <= minAge;
            },
            message: "DOB must be a valid date and user must be at least 18 years old"
        }
    },
    phone:{
        type:String
    },
    isEmailVerified:{
        type:Boolean,
        default:false,
    },
    ConfirmOtp:String,
    Otp_expires:String,

},{timestamps:true})

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema)

export default UserModel