import mongoose, {  Schema, model } from "mongoose";
const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: Object,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    status: {
        type: String,
        enum: ['Active', 'NotActive']
    },
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    },
    sendCode: {
        type: String,
        default: null
    }
}, {
    timestamps: true
})

const userModel = mongoose.models.User ||  model('User',userSchema);

export default userModel