const express = require("express");
const Author = require("../models/author");
const router = new express.Router();
var auth=require('../middleware/auth');
var pino = require('express-pino-logger')()
 
router.use(pino);

router.post("/create", async (req, res) => {
  const author = new Author(req.body);
  try {
    await author.save();
    res.status(401).send(author);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/getAuthors",auth, async (req, res) => {
  try {

    const authors = await Author.find({});
    req.log.info(authors);
    res.send(authors);
  } catch (error) {
    res.send(error);
  }
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const author = await Author.findById(id);
    if (!author) {
      return res.status(404).send(" author not found");
    }

    res.send(author);
  } catch (error) {
    res.send(error);
  }
});
router.patch("/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name",  "description","books"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const author = await Author.findById(req.params.id);
    updates.every((update) => (author[update] = req.body[update]));
    await author.save();
    if (!author) {
      return res.status(404).send();
    }
    res.send(author);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
  
    if (!author) {
      return res.status(404).send();
    }
    res.send(author);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
