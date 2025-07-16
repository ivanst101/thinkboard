import express from "express";
const port = 5001;
const app = express();
import notesRoutes from "./routes/notesRoutes.js";

app.use("/api/notes", notesRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
