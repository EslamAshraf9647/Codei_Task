import Joi from "joi";


export const AddNewCourseSchema = {
    body:Joi.object({
        title: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.base': 'Title must be a string',
            'string.empty': 'Title is required',
            'string.min': 'Title must be at least 3 characters long',
            'string.max': 'Title must be at most 100 characters long',
            'any.required': 'Title is required'
        }),
    description: Joi.string()
        .min(10)
        .required()
        .messages({
            'string.base': 'Description must be a string',
            'string.empty': 'Description is required',
            'string.min': 'Description must be at least 10 characters long',
            'any.required': 'Description is required'
        }),
    startDate: Joi.date()
        .required()
        .messages({
            'date.base': 'Start date must be a valid date',
            'any.required': 'Start date is required'
        }),
    endDate: Joi.date()
        .greater(Joi.ref('startDate'))
        .required()
        .messages({
            'date.base': 'End date must be a valid date',
            'date.greater': 'End date must be after start date',
            'any.required': 'End date is required'
        }),
    price: Joi.number()
        .positive()
        .required()
        .messages({
            'number.base': 'Price must be a number',
            'number.positive': 'Price must be a positive number',
            'any.required': 'Price is required'
        }),
})
}
      

   