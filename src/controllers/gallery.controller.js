import Gallery from "../models/Gallery.model.js";

// ✅ ADD IMAGE (Admin)
export const createGalleryItem = async (req, res) => {
  try {
    const { title, image, category } = req.body;

    if (!title || !image || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const galleryItem = await Gallery.create({
      title,
      image,
      category,
    });

    res.status(201).json({
      message: "Gallery item added successfully",
      galleryItem,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
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
    res.status(500).json({ message: "Server error" });
  }
};
// ✅ UPDATE GALLERY ITEM (Admin)
export const updateGalleryItem = async (req, res) => {
  try {
    const { id } = req.query;
    const { title, image, category } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Gallery ID is required" });
    }

    const updatedItem = await Gallery.findByIdAndUpdate(
      id,
      { title, image, category },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    res.status(200).json({
      message: "Gallery item updated successfully",
      updatedItem,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
