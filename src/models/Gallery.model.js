import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    category: {
      type: String,
      enum: {
        values: ["Wildlife", "Birds", "Tourist", "Safari", "Others"],
        message: "Category must be one of: Wildlife, Birds, Tourist, Safari, Others",
      },
      trim: true,
    },
    imageFile: {
      type: String, // Stores filename if uploaded via Multer
    },
    imageUrl: {
      type: String, // Stores direct URL if provided
    },
  },
  { timestamps: true }
);

// Use async function and throw error instead of next()
gallerySchema.pre("validate", async function () {
  if (!this.imageFile && !this.imageUrl) {
    throw new Error("Image file or image URL is required");
  }
});

const Gallery = mongoose.model("Gallery", gallerySchema);

export default Gallery;