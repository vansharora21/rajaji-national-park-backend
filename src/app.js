import express from "express";
import cors from "cors";

import adminRoutes from "./routes/admin.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import blogRoutes from "./routes/blog.routes.js";

import galleryRoutes from "./routes/gallery.routes.js";


const app = express();

app.use(cors());
app.use(express.json());


//routes

app.use("/api/blogs", blogRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/gallery", galleryRoutes);

app.get("/", (req, res) => {
  res.send("Rajaji National Park API 🐘🌲");
});

export default app;
