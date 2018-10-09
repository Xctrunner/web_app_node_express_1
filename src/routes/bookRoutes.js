const express = require('express');
const sql = require('mssql');
// const debug = require('debug')('app:bookRoutes');

const bookRouter = express.Router();

function router(nav) {
  const books = [
    {
      title: 'Ender\'s Game',
      genre: 'Science Fiction',
      author: 'Orson Scott Card',
      read: false,
    },
    {
      title: 'The Power of One',
      genre: 'Historical Fiction',
      author: 'Bryce Courtenay',
      read: true,
    },
  ];

  // with a promise
  // bookRouter.route('/')
  //   .get((req, res) => {
  //     const request = new sql.Request();
  //     request.query('select * from books')
  //       .then((result) => {
  //         debug(result);
  //         res.render(
  //           'bookListView',
  //           {
  //             nav,
  //             title: 'Library',
  //             books: result.recordset,
  //           },
  //         );
  //       });
  //   });

  bookRouter.route('/')
    .get((req, res) => {
      (async function query() {
        const request = new sql.Request();
        const { recordset } = await request.query('select * from books');
        // debug(result);
        res.render(
          'bookListView',
          {
            nav,
            title: 'Library',
            books: recordset,
          },
        );
      }());
    });

  // with route('/single'), just goes to /books/single
  bookRouter.route('/:id')
    .all((req, res, next) => {
      (async function query() {
        const { id } = req.params;
        const request = new sql.Request();
        const { recordset } = await request
          .input('id', sql.Int, id)
          .query('select * from books where id = @id');
        [req.book] = recordset;
        next();
      }());
    })
    .get((req, res) => {
      res.render(
        'bookView',
        {
          nav,
          title: 'Library',
          book: req.book,
        },
      );
    });

  return bookRouter;
}

module.exports = router;
