import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("You just fetched the notes");
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "Post created successfully" });
});

router.put("/:id", (req, res) => {
  res.status(200).json({ message: "Post updated successfully" });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({ message: "Post deleted successfully" });
});

export default router;
