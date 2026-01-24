import Blog from "../models/Blog.model.js";

// ✅ CREATE BLOG (Admin)
export const createBlog = async (req, res) => {
  try {
    const { title, image, details, publishedDate } = req.body;

    if (!title || !image || !details) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const blog = await Blog.create({
      title,
      image,
      details,
      publishedDate,
    });

    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET ALL BLOGS (Frontend)
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ publishedDate: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET SINGLE BLOG
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog)
      return res.status(404).json({ message: "Blog not found" });

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
