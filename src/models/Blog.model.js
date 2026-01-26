import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    details: {
      type: String,
      required: [true, "Details are required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: ["Wildlife", "Birds", "Tourist", "Safari", "Others"],
        message: "Category must be one of: Wildlife, Birds, Tourist, Safari, Others",
      },
      trim: true,
    },
    publishedDate: {
      type: Date,
      default: Date.now,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;