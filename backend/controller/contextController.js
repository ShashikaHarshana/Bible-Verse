const {
  getContextByLanguage,
  getAllBooks,
  getChaptersById,
  getBookIDByName,
  getVerseByChapterBook,
} = require("../model/bookModel");

module.exports = {
  getBooks: async (req, res) => {
    const books = await getAllBooks();
    if (!books) {
      res.status(500).json({
        error: "Problem connecting to database",
      });
    } else {
      let result = [];
      books.filter((obj) => {
        result.push(obj["BOOK"]);
      });
      res.status(200).json({ Books: result });
    }
  },

  getContext: async (req, res) => {
    const body = req.body;
    try {
      const context = await getContextByLanguage(
        body.name,
        body.chapter,
        body.verse
      );
      const { ENGLISH, HINDI, KANNADA, MALAYALAM, TAMIL, TELUGU } = context;
      if (!context) {
        res.status(404).json({
          Error: "Enter the details correctly",
        });
      } else {
        res.status(200).json({
          context: { ENGLISH, HINDI, KANNADA, MALAYALAM, TAMIL, TELUGU },
        });
      }
    } catch (err) {
      res.status(500).json({
        err,
      });
    }
  },

  getChapters: async (req, res) => {
    const body = req.body;
    try {
      const book = await getBookIDByName(body.name);
      const chapter = await getChaptersById(book.ID);
      let result = [];
      chapter.filter((obj) => {
        result.push(obj["CHAPTER"]);
      });
      res.status(200).json({ Chapters: result });
    } catch (err) {
      res.status(404).json({
        err,
      });
    }
  },

  getVerse: async (req, res) => {
    const body = req.body;
    try {
      const book = await getBookIDByName(body.name);
      const verse = await getVerseByChapterBook(book.ID, body.chapter);
      let result = [];
      verse.filter((obj) => {
        result.push(obj["VERSE"]);
      });
      res.status(200).json({ Verse: result });
    } catch (err) {
      res.status(404).json({
        err,
      });
    }
  },
};
