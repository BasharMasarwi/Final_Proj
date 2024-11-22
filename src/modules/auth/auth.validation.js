import Joi from 'joi';
import { generalFields } from '../../middleware/validation.js';

export const registerSchema = Joi.object({
    userName: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][a-z0-9]{3,20}$/).required(),
    confirmPassword: Joi.valid(Joi.ref('password')).required(),
    address : Joi.string().required(),
    file: generalFields.file,
    phone : Joi.string().min(10).max(10)
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][a-z0-9]{3,20}$/).required(),
});

export const sendCodeSchema = Joi.object({
    email: Joi.string().email().required(),
});

export const forgetPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][a-z0-9]{3,20}$/).required(),
    code: Joi.string().length(4).required(),
});



