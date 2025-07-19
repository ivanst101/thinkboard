import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use("/api/notes", notesRoutes);
app.use(authRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
