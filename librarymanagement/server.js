const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// To read form data
app.use(express.urlencoded({ extended: true }));

// Serve HTML, CSS and JS
app.use(express.static(path.join(__dirname, "public")));

// Books stored in memory
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

app.get("/api/books", (req, res) => {
    let html = "";

    books.forEach(book => {
        html += `
            <tr>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.year}</td>
                <td>
                    <button onclick="editBook(${book.id})">
                        Edit
                    </button>

                    <button onclick="deleteBook(${book.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });

    res.send(html);
});


// ================= POST =================

app.post("/api/books", (req, res) => {

    const title = req.body.title;
    const author = req.body.author;
    const year = req.body.year;

    const newBook = {
        id: books.length + 1,
        title: title,
        author: author,
        year: year
    };

    books.push(newBook);

    res.send("Book added successfully");
});


// ================= PUT =================

app.put("/api/books/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const book = books.find(book => book.id === id);

    if (!book) {
        return res.send("Book not found");
    }

    book.title = req.body.title;
    book.author = req.body.author;
    book.year = req.body.year;

    res.send("Book updated successfully");
});


// ================= DELETE =================

app.delete("/api/books/:id", (req, res) => {

    const id = parseInt(req.params.id);

    books = books.filter(book => book.id !== id);

    res.send("Book deleted successfully");
});


// Start server

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});