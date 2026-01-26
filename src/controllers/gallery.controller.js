import Gallery from "../models/Gallery.model.js";

// ✅ ADD IMAGE (Admin)
export const createGalleryItem = async (req, res) => {
  try {
    const { title, category, imageUrl } = req.body;

    // ✅ Correct validation
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    // ✅ Accept EITHER file OR URL
    if (!req.file && !imageUrl) {
      return res.status(400).json({
        message: "Image file or image URL is required",
      });
    }

    const galleryData = {
      title,
      category,
    };

    // If file uploaded
    if (req.file) {
      galleryData.imageFile = req.file.filename; // or req.file.path / cloudinary url
    }

    // If URL provided
    if (imageUrl) {
      galleryData.imageUrl = imageUrl;
    }

    const galleryItem = await Gallery.create(galleryData);

    return res.status(201).json({
      success: true,
      data: galleryItem,
    });
  } catch (error) {
    console.error("Create gallery error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};


// ✅ GET ALL IMAGES (Frontend)
export const getGalleryItems = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = category ? { category } : {};

    const items = await Gallery.find(filter).sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// ✅ UPDATE GALLERY ITEM (Admin)
export const updateGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, imageUrl } = req.body;

    const galleryItem = await Gallery.findById(id);
    if (!galleryItem) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    const updateData = {
      title,
      category,
    };

    // If new file uploaded
    if (req.file) {
      updateData.imageFile = req.file.filename;
    } else if (imageUrl) {
      // If new URL provided
      updateData.imageUrl = imageUrl;
    }

    const updatedItem = await Gallery.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    res.status(200).json({
      message: "Gallery item updated successfully",
      updatedItem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// ✅ DELETE GALLERY ITEM (Admin)
export const deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Gallery.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    res.status(200).json({ message: "Gallery item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// ✅ GET SINGLE GALLERY ITEM BY ID
export const getGalleryById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Gallery.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// ✅ GET GALLERY BY CATEGORY
export const getGalleryByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const items = await Gallery.find({ category }).sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// ✅ SEARCH GALLERY
export const searchGallery = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const items = await Gallery.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};
