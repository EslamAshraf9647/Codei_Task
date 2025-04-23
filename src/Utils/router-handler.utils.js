import { globalErrorHandler } from "../Middleware/error-handler.middleware.js";
import authcontroller from "../Modules/Auth/auth.controller.js";
import courseController from "../Modules/Course/course.controller.js";




const routerhandler = (app , express) => {
    app.use("/Assets",express.static("Assets")) 
    app.use('/auth', authcontroller)
    app.use('/course',courseController)
    app.get('/',(req,res) => res.status(200).json({message:"Task Done"}))




    app.use(globalErrorHandler)
}

export default routerhandler 