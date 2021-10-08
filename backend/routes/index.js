const express = require("express");
const {
  getContext,
  getBooks,
  getChapters,
  getVerse,
} = require("../controller/contextController");
const router = express.Router();

//List of Chapters of book Name
router.post("/getChapters", getChapters);

//List of verse by book name and chapter
router.post("/getVerse", getVerse);

//Context
router.post("/context", getContext);

//List of all books
router.get("/books", getBooks);

module.exports = router;
