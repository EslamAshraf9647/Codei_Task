import { globalErrorHandler } from "../Middleware/error-handler.middleware.js";
import authcontroller from "../Modules/Auth/auth.controller.js";
import courseController from "../Modules/Course/course.controller.js";




const routerhandler = (app ) => {
    app.use('/auth', authcontroller)
    app.use('/course',courseController)
    app.get('/', async (req,res) => {
        return  res.status(200).json({message:'Welcome to codei task'})
    })


    app.use(globalErrorHandler)
}

export default routerhandler 