 
import CourseModel from "../../../DB/models/course.model.js";

 export const AddNewCourse = async (req ,res ) => {
    const { title, description, startDate, endDate, price } = req.body;
    const {file} = req 
    if(!file){
        return res.status(400).json({message:"No file uploaded"})
    }

    const url = `${req.protocol}://${req.headers.host}/${file.path}`
   
    const course = new CourseModel({
        title,
        description,
        image:url,
        startDate,
        endDate,
        price
    });

    await course.save();
    res.status(201).json({ message: "Course created successfully", data: course });
};

export const GetAllCousrses = async (req, res) => {
    const courses = await CourseModel.find()
    res.status(201).json({message:"Courses Featched successfully", courses})
}

export const GetCourseById = async (req, res) => {
    const {id} =req.params
    const course = await CourseModel.findById(id)
    if(!course){
        return res.status(404).json({message:"course not found"})
    }
    res.status(201).json({message:"course found successfully",course})
}

export const UpdatecourseById = async (req , res) => {
    const {id} = req.params 
    const course = await CourseModel.findById(id);
    if(!course){
        return res.status(404).json({message:"course not found"})
    }
    const { title, description, startDate, endDate, price } = req.body;

    if (title) course.title = title;
    if (description) course.description = description;
    if (startDate) course.startDate = startDate;
    if (endDate) course.endDate = endDate;
    if (price) course.price = price;
    await course.save();
    res.status(200).json({ message: "Course updated successfully", data: course });
} 

export const DeleteCourse = async (req , res) => {
    const {id} =req.params
    const course = await CourseModel.findById(id)
    if(!course){
        return res.status(404).json({message:"course not found"})
    }
    await CourseModel.deleteOne({_id:id})
    res.status(200).json({message:"course deleted successfully"})

}





 