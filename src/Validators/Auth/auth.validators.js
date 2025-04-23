import Joi from "joi";

export const SignUpSchema = {
    body: Joi.object({
        FirstName: Joi.string()
            .min(2)
            .max(50)
            .required()
            .messages({
                'string.base': 'First name must be a string',
                'string.empty': 'First name is required',
                'string.min': 'First name must be at least 2 characters',
                'string.max': 'First name must be at most 50 characters',
                'any.required': 'First name is required'
            }),
        LastName: Joi.string()
            .min(2)
            .max(50)
            .required()
            .messages({
                'string.base': 'Last name must be a string',
                'string.empty': 'Last name is required',
                'string.min': 'Last name must be at least 2 characters',
                'string.max': 'Last name must be at most 50 characters',
                'any.required': 'Last name is required'
            }),
        DOB: Joi.date()
            .iso()
            .required()
            .messages({
                'date.base': 'Date of birth must be a valid ISO date',
                'any.required': 'Date of birth is required'
            }),
        gender: Joi.string()
            .valid('male', 'female')
            .required()
            .messages({
                'string.base': 'Gender must be a string',
                'any.only': 'Gender must be either male or female',
                'any.required': 'Gender is required'
            }),
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.base': 'Email must be a string',
                'string.email': 'Email must be a valid email address',
                'any.required': 'Email is required'
            }),
        phone: Joi.string()
            .pattern(/^[0-9]{10,15}$/)
            .required()
            .messages({
                'string.pattern.base': 'Phone must be a valid number (10 to 15 digits)',
                'string.empty': 'Phone is required',
                'any.required': 'Phone is required'
            }),
            password: Joi.string()
            .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))
            .required()
            .messages({
                'string.pattern.base': 'Password must be at least 8 characters long, include uppercase, lowercase, number and special character',
                'string.empty': 'Password is required',
                'any.required': 'Password is required'
            }),
        
        confirmPassword: Joi.string()
            .required()
            .valid(Joi.ref('password'))
            .messages({
                'any.only': 'Confirm password must match password',
                'any.required': 'Confirm password is required'
            }),
    })
};

export const VerifyAccountSchema = {
    body: Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.base': 'Email must be a string',
                'string.email': 'Email must be a valid email address',
                'string.empty': 'Email is required',
                'any.required': 'Email is required'
            }),
        otp: Joi.string()
            .pattern(/^\d{6}$/)
            .required()
            .messages({
                'string.pattern.base': 'OTP must be a 6-digit number',
                'string.empty': 'OTP is required',
                'any.required': 'OTP is required'
            }),
    })
};


export const SigninSchema = {
    body: Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.base': 'Email must be a string',
                'string.email': 'Email must be a valid email address',
                'string.empty': 'Email is required',
                'any.required': 'Email is required'
            }),
            password: Joi.string()
            .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))
            .required()
            .messages({
                'string.pattern.base': 'Password must be at least 8 characters long, include uppercase, lowercase, number and special character',
                'string.empty': 'Password is required',
                'any.required': 'Password is required'
            }),
    })
};
