import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    price: {
        type: Number,
        required: true
    }
}, {timestamps:true})

const  CourseModel = mongoose.models.Course || mongoose.model('Course',CourseSchema)

export default CourseModel 