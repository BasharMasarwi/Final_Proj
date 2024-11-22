import mongoose, { Schema, Types, model } from "mongoose";

const AnimeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, required: true},
    image: { type: Object, required: true },
    status: { type: String, enum: ['stopped', 'ongoing'], default: 'ongoing' },
    episodes: { type: Number, default: 0 },
    releaseDate: { type: String, required: true },
    views: { type: Number, default: 0 },
    categoryId: {
      type: Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

AnimeSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "productId",
});
const animeModel = mongoose.models.Anime || model("Anime", AnimeSchema);

export default animeModel;
