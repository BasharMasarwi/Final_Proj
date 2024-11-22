import mongoose, { Schema, Types, model } from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [{ type: Types.ObjectId, ref: "Comment" }],
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const postModel = mongoose.models.Post || model("Post", PostSchema);

export default postModel;
