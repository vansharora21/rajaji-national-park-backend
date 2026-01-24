import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String, // image URL
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: ["wildlife", "landscape", "birds", "safari", "others"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Gallery", gallerySchema);
