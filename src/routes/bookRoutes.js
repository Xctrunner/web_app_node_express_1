const express = require('express');

const bookRouter = express.Router();

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
      'books',
      {
        nav: [
          { link: '/books', title: 'Books' },
          { link: '/authors', title: 'Authors' }],
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
      'book',
      {
        nav: [
          { link: '/books', title: 'Books' },
          { link: '/authors', title: 'Authors' }],
        title: 'Library',
        book: books[id],
      },
    );
  });

module.exports = bookRouter;
