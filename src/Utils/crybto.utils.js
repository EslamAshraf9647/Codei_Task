import { compareSync, hashSync } from "bcrypt";
import CryptoJS from "crypto-js";

export const Encryption = async ({value , secretkey}={}) => {
    return CryptoJS.AES.encrypt(value , secretkey).toString();
}

export const Decryption = async ({cipher , secretkey}={}) => {
    return CryptoJS.AES.decrypt(cipher , secretkey ).toString(CryptoJS.enc.Utf8)
}

export const Hashing = (data , salt) => {
    return hashSync(data.toString(), salt)
}

export const Comparing = (data , hashedData) => {
    return compareSync(data.toString() , hashedData)
}
