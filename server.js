import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

connectDB(); // 👈 connect database

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🌲 Rajaji National Park backend running on port ${PORT}`);
});
