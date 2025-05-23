import multer from "multer";


export const MulterCloud= (allowsExtensions=[]) => {
    
    const storage = multer.diskStorage({})
      
    const fileFliter = (req,file,cb) => {
        if(allowsExtensions.includes(file.mimetype)){
            cb(null , true)
        }
        else{
            cb(new Error ('Invaild file name',false))
        }
    }

    const upload = multer({fileFliter ,storage})
    return upload 
}