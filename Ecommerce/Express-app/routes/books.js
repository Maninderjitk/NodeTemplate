const express = require("express");
const Book = require("../models/books");
const router = new express.Router();
const auth=require('../middleware/auth')

router.post("/create", async (req, res) => {
  const book = new Book(req.body);
  try {
    await book.save();
    res.status(401).send(book);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/getBooks", auth, async (req, res) => {
  try {
    const books = await Book.find({});
    res.send(books);
  } catch (error) {
    res.send(error);
  }
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send(" book not found");
    }

    res.send(book);
  } catch (error) {
    res.send(error);
  }
});
router.patch("/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "page_count", "description"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const book = await Book.findById(req.params.id);
    updates.every((update) => (book[update] = req.body[update]));
    await book.save();
    if (!book) {
      return res.status(404).send();
    }
    res.send(book);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    // console.log("book----------",book)
    if (!book) {
      return res.status(404).send();
    }
    res.send(book);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
