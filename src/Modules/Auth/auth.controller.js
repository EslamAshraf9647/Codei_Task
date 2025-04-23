import { Router } from "express";
import * as authServices from "../Auth/services/auth.service.js"
import { errorhandler } from "../../Middleware/error-handler.middleware.js";
import * as Vaildation from '../../Validators/Auth/auth.validators.js'
import { ValidationMiddleware } from "../../Middleware/validation.moddleware.js";


const authcontroller = Router()

authcontroller.post('/signUp',
    errorhandler(authServices.SignUpService))
    errorhandler(ValidationMiddleware(Vaildation.SignUpSchema))

authcontroller.post('/verify',
    errorhandler(authServices.VerifyAccoountService))
    errorhandler(ValidationMiddleware(Vaildation.VerifyAccountSchema))

authcontroller.post('/signin',
    errorhandler(authServices.SigninService),
    errorhandler(ValidationMiddleware(Vaildation.SigninSchema))
)





export default authcontroller
