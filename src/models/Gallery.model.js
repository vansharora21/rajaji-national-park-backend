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
        message:
          "Category must be one of: Wildlife, Birds, Tourist, Safari, Others",
      },
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"], // ✅ Cloudinary URL
    },

    // OPTIONAL (Recommended for future delete/update)
    imagePublicId: {
      type: String, // Cloudinary public_id
    },
  },
  { timestamps: true }
);

const Gallery = mongoose.model("Gallery", gallerySchema);

export default Gallery;
