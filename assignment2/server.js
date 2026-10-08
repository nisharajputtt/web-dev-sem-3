const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Sample books
let books = [
    {
        id: 1,
        title: "The Alchemist",
        author: "Paulo Coelho",
        year: 1988
    },
    {
        id: 2,
        title: "Atomic Habits",
        author: "James Clear",
        year: 2018
    },
    {
        id: 3,
        title: "Clean Code",
        author: "Robert C. Martin",
        year: 2008
    }
];

// ================= GET =================
// Display all books
app.get("/api/books", (req, res) => {
    res.json(books);
});

// ================= POST =================
// Add a new book
app.post("/api/books", (req, res) => {
    const { title, author, year } = req.body;

    if (!title || !author || !year) {
        return res.status(400).json({
            message: "Please provide title, author and year."
        });
    }

    const newBook = {
        id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
        title,
        author,
        year
    };

    books.push(newBook);

    res.status(201).json({
        message: "Book added successfully!",
        book: newBook
    });
});

// ================= PUT =================
// Update a book
app.put("/api/books/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const book = books.find(book => book.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found."
        });
    }

    const { title, author, year } = req.body;

    book.title = title;
    book.author = author;
    book.year = year;

    res.json({
        message: "Book updated successfully!",
        book
    });
});

// ================= DELETE =================
// Delete a book
app.delete("/api/books/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const bookExists = books.some(book => book.id === id);

    if (!bookExists) {
        return res.status(404).json({
            message: "Book not found."
        });
    }

    books = books.filter(book => book.id !== id);

    res.json({
        message: "Book deleted successfully!"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Library Management System running at http://localhost:${PORT}`);
});