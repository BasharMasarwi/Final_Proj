import mongoose, { Schema, model, Types } from "mongoose";
const productSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    mainImage: {
      type: Object,
      required: true,
    },
    subImages:[{
      type: Object,
      required: true,

    }],
    stock: {
      type: Number,
    },
   
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    finalPrice: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
    },
    sizes: [{
      type: String,
      enum: ["S", "M", "L", "XL", "XXL"],
    }],
    colors: [String],
    

    slug: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "NotActive"],
    },
    categoryId: {
      type: Types.ObjectId,
      ref: "Category",
      required: true
    },
    subcategoryId: {
      type: Types.ObjectId,
      ref: "Subcategory",
      required: true
    },

    createdBy: { type: Types.ObjectId, ref: "User" },
    updatedBy: { type: Types.ObjectId, ref: "User" },
  },
  {      
    timestamps: true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
   
  }
);
productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "productId",
});

const productModel = model("Product", productSchema);
export default productModel;
