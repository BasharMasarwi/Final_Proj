
import cartModel from "../../../DB/model/cart.model.js";
import couponModel from "../../../DB/model/coupon.model.js";
import orderModel from "../../../DB/model/order.model.js";
import productModel from "../../../DB/model/product.model.js";
import userModel from "../../../DB/model/user.model.js";



export const getUsers =async (req,res)=>{
    const users = await userModel.find({}).select("-password -sendCode -confirmEmail");
    return res.json({message:"success",users});
}

export const getUserData = async (req, res)=>{
    const user = await userModel.findById(req.user._id);
    return res.json({message:"success",user});
};