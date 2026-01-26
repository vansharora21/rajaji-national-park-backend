import Blog from "../models/Blog.model.js";

// ✅ CREATE BLOG (Admin)
export const createBlog = async (req, res) => {
  try {
    const { title, details, publishedDate, category } = req.body;

    // Handle image from file upload or body (URL)
    const image = req.file ? req.file.filename : req.body.image;

    if (!title || !image || !details || !category) {
      return res.status(400).json({ message: "All fields (title, image, details, category) are required" });
    }

    const blog = await Blog.create({
      title,
      image,
      details,
      publishedDate,
      category,
    });

    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// ✅ GET ALL BLOGS (Frontend)
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ publishedDate: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
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
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// ✅ UPDATE BLOG (Admin)
// ✅ UPDATE BLOG (Admin)
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, details, publishedDate, category, imageUrl } = req.body;

    // Build the update object with existing text data
    const updateData = { title, details, publishedDate, category };

    // 🔹 IMAGE LOGIC:
    // 1. If a new file is uploaded via Multer, use the new filename.
    // 2. If no file is uploaded but a new imageUrl string is provided, use that.
    // 3. If neither is provided, the 'image' field is simply not included in updateData,
    //    meaning Mongoose will leave the existing value in the database alone.
    if (req.file) {
      updateData.image = req.file.filename;
    } else if (imageUrl) {
      updateData.image = imageUrl;
    }

    const blog = await Blog.findByIdAndUpdate(id, updateData, { 
      new: true, 
      runValidators: true 
    });

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json({
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// ✅ DELETE BLOG (Admin)
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndDelete(id);
    if (!blog)
      return res.status(404).json({ message: "Blog not found" });

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// ✅ SEARCH BLOGS
export const searchBlogs = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const blogs = await Blog.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { details: { $regex: q, $options: "i" } },
      ],
    }).sort({ publishedDate: -1 });

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// ✅ GET BLOGS BY CATEGORY
export const getBlogsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const blogs = await Blog.find({ category }).sort({ publishedDate: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// ✅ PUBLISH BLOG
export const publishBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndUpdate(
      id,
      { published: true },
      { new: true }
    );

    if (!blog)
      return res.status(404).json({ message: "Blog not found" });

    res.status(200).json({
      message: "Blog published successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// ✅ UNPUBLISH BLOG
export const unpublishBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndUpdate(
      id,
      { published: false },
      { new: true }
    );

    if (!blog)
      return res.status(404).json({ message: "Blog not found" });

    res.status(200).json({
      message: "Blog unpublished successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};
