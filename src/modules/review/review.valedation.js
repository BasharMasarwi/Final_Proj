import joi from 'joi';
export const createReviews=joi.object({
    comment:joi.string().min(3).max(20).required(),
    rating:joi.number().min(1).max(5).required(),
    productId:joi.string().hex().min(24).max(24).required(),
})