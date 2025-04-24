import { Router } from "express";
import * as courseService from '../Course/services/course.service.js'
import { errorhandler } from "../../Middleware/error-handler.middleware.js";
import { authenticationMiddleware } from "../../Middleware/authentication.middleware.js";
import { ImageExtension } from "../../Constants/constants.js";
import { ValidationMiddleware } from "../../Middleware/validation.moddleware.js";
import { AddNewCourseSchema } from "../../Validators/Course/course.vaildators.js";
import { MulterCloud } from "../../Middleware/multer.middleware.js";


const courseController = Router()

courseController.post('/addCourse',
    // errorhandler(authenticationMiddleware()),
    MulterCloud('Course/image',ImageExtension).single('image'),
    errorhandler(courseService.AddNewCourse),
    errorhandler(ValidationMiddleware(AddNewCourseSchema))
)
courseController.get('/allcourses',
    errorhandler(courseService.GetAllCousrses)
)
courseController.get('/coursebyid/:id',
    errorhandler(courseService.GetCourseById)
)
courseController.put('/update/:id',
    errorhandler(courseService.UpdatecourseById)
)
courseController.delete('/delete/:id',
    errorhandler(courseService.DeleteCourse)
)

export default courseController