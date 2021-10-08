const pool = require("../database/database");

module.exports = {
  getContextByLanguage: (book, chapter, verse) => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT ID FROM BOOKS WHERE BOOK=?`, [book], (err, result) => {
        if (err) {
          reject(err);
        } else {
          pool.query(
            `SELECT * FROM CONTEXTS WHERE ID=? AND CHAPTER=? AND VERSE=?`,
            [result[0].ID, chapter, verse],
            (err, result1) => {
              if (err) {
                reject(err);
              } else {
                resolve(result1[0]);
              }
            }
          );
        }
      });
    });
  },

  getAllBooks: () => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT BOOK FROM BOOKS`, [], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getBookIDByName: (name) => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT ID FROM BOOKS WHERE BOOK=?`, [name], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  },

  getChaptersById: (id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT DISTINCT CHAPTER FROM CONTEXTS WHERE ID=?`,
        [id],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },

  getVerseByChapterBook: (id, chapter) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT VERSE FROM CONTEXTS WHERE ID=? AND CHAPTER=?`,
        [id, chapter],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
};
