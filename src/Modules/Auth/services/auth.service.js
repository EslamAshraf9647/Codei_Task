import UserModel from "../../../DB/models/user.model.js"
import { emitter } from "../../../Services/send-email.service.js"
import { Comparing, Encryption, Hashing } from "../../../Utils/crybto.utils.js"
import { emailTemplate } from "../../../Utils/email=templete.js"
import  { DateTime } from "luxon"
import jwt from 'jsonwebtoken'
import {v4 as uuidv4} from 'uuid'


export const SignUpService = async (req , res) => {
    const {FirstName , LastName , DOB ,gender , email , phone , password , confirmPassword} = req.body
    if(password !== confirmPassword){
        return res.status(400).json({message:"password not equal confirmPassword"})
    }

    const isEmailExsist = await UserModel.findOne({email})
    if(isEmailExsist){
        return res.status(409).json({message:"Email is already Exsist"})
    }
    const hashedPassword = Hashing(password , +process.env.SALT)
    const EncryptedPhone =  await Encryption ({value:phone , secretkey: process.env.ENCRYPTED_KEY})
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const hashedOtp = Hashing(otp , +process.env.SALT)
    const otp_expires = new Date(Date.now() + 10 * 60 * 1000)

    emitter.emit('SendEmail',
        {
            to:email,
            subject:"Verify Your Email",
            html:emailTemplate(FirstName , otp)
        }
    )
    const bithday = DateTime.fromISO(DOB).toJSDate()

    const user = await UserModel({
        FirstName ,LastName , email , gender,
        password:hashedPassword,
        phone:EncryptedPhone,
        ConfirmOtp:hashedOtp,
        Otp_expires:otp_expires,
        DOB:bithday
    })
     
    await user.save()

    res.status(200).json({message:"Account Created Successfully"})

}


export const VerifyAccoountService = async (req , res) => {
    const {email , otp} = req.body
     const user = await UserModel.findOne({email , isEmailVerified:false})
     if(!user){
        return res.status(404).json({message:"user not found"})
     }

     if (!user.ConfirmOtp || !user.Otp_expires) {
        return res.status(400).json({ message: "OTP not found. Please request a new one." });
    }

    if (new Date() > user.Otp_expires) {
        return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }

    const isOtpValid = Comparing(otp, user.ConfirmOtp);
    if (!isOtpValid) {
        return res.status(400).json({ message: "Invalid OTP" });
    }
    await UserModel.findByIdAndUpdate(user._id, {
        isEmailVerified: true,
        ConfirmOtp: null,
        Otp_expires: null
    });
    
    return res.status(200).json({ message: "Email verified successfully" })
}

export const SigninService = async(req,res) => {
    const {email , password} = req.body 
    const user = await UserModel.findOne({email, isEmailVerified:true })
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    const isPasswordMatched = Comparing(password, user.password)
    if(!isPasswordMatched){
        return res.status(400).json({message:"Invaild Email or password"})
    }
    const accesstoken = jwt.sign(
        {_id:user._id, email:user.email},
        process.env.JWT_SECRET_LOGIN,
        {expiresIn:"1h",jwtid:uuidv4()}
    )
    const refreshtoken = jwt.sign(
        {_id:user._id, email:user.email},
        process.env.JWT_SECRET_REFRESH,
        {expiresIn:"7d",jwtid:uuidv4()}
    )
    res.status(200).json({message:"User login Successfully",accesstoken,refreshtoken})

}

