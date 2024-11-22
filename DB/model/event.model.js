import mongoose, { Schema, Types, model } from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    participants: [{ type: Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const eventModel = mongoose.models.Event || model("Event", EventSchema);

export default eventModel;
