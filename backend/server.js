import express from "express";
const port = 5001;
const app = express();

app.get("/api/notes", (req, res) => {
  res.status(200).send("You got 10 notes");
});

app.post("/api/notes", (req, res) => {
  res.status(201).json({ message: "Post created successfully" });
});

app.put("/api/notes/:id", (req, res) => {
  res.status(200).json({ message: "Post updated successfully" });
});

app.delete("/api/notes/:id", (req, res) => {
  res.status(200).json({ message: "Post deleted successfully" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
