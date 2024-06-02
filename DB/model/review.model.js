import { Schema, Types, model } from "mongoose";


const reviewSchema = new Schema({
    comment: {
        type: String,
        requered: true,
    },
    rating:{
        type: Number,
        requered: true,
        min:1,
        max:5
    },
    userId:{
        type: Types.ObjectId,
        ref:'User',
        required: true
    },
    productId:{
        type: Types.ObjectId,
        ref:'Product',
        required: true
    },
    image: {
        type: Object,
    },
    
},);


const reviewModel = new model('Review', reviewSchema);
export default reviewModel;