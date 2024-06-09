const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
    //Write your code here
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        const done = users.push({ "username": username, "password": password });
        if(done){
        return res.status(200).json({ message: "Review for ISBN for user 1 has been deleted" });
        }
    }
    return res.status(404).json({ message: "Unable to register user." });

});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    //Write your code here
    res.send(JSON.stringify(books, null, 2));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    //Write your code here
    const isbn = req.params.isbn;
    res.send(books[isbn])
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const authorName = req.params.author.toLowerCase(); // Lowercase for case-insensitive search (optional)
    const matchingBooks = [];

    for (const bookId in books) {
        if (books[bookId].author.toLowerCase() === authorName) {
            matchingBooks.push(books[bookId]);
        }
    }

    if (matchingBooks.length > 0) {
        res.json(matchingBooks); // Send an array of matching books
    } else {
        res.status(404).json({ message: 'No books found for this author' }); // Send a 404 Not Found if no match
    }
});


// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    //Write your code here
    const authorName = req.params.title.toLowerCase(); // Lowercase for case-insensitive search (optional)
    const matchingBooks = [];

    for (const bookId in books) {
        if (books[bookId].title.toLowerCase() === authorName) {
            matchingBooks.push(books[bookId]);
        }
    }

    if (matchingBooks.length > 0) {
        res.json(matchingBooks); // Send an array of matching books
    } else {
        res.status(404).json({ message: 'No books found with this tile' }); // Send a 404 Not Found if no match
    }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    const review = req.params.isbn;
    res.send(books[review])
});

module.exports.general = public_users;
