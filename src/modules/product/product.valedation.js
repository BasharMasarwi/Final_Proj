import Joi from 'joi';

export const createProductSchema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().required(),
    stock: Joi.number().min(0).default(1),
    price: Joi.number().min(1).required(),
    discount: Joi.number().min(0).max(100).default(0),
    status: Joi.string().validate('Active', 'NotActive'),
    categoryId: Joi.string().hex().length(24),
    subcategoryId: Joi.string().hex().length(24),
    sizes: Joi.array().items(Joi.string().valid('s', 'm', 'lg', 'xl')),
    mainImage: Joi.array().items({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5000000).required(),
    }).required(),
    subImages: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
            originalname: Joi.string().required(),
            encoding: Joi.string().required(),
            mimetype: Joi.string().required(),
            destination: Joi.string().required(),
            filename: Joi.string().required(),
            path: Joi.string().required(),
            size: Joi.number().max(5000000).required(),
    })).max(5).optional(), 
});
