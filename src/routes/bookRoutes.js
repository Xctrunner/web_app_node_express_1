const express = require('express');

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

  bookRouter.route('/')
    .get((req, res) => {
      res.render(
        'bookListView',
        {
          nav,
          title: 'Library',
          books,
        },
      );
    });

  // with route('/single'), just goes to /books/single
  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      res.render(
        'bookView',
        {
          nav,
          title: 'Library',
          book: books[id],
        },
      );
    });

  return bookRouter;
}

module.exports = router;
