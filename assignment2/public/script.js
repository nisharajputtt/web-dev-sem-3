const bookForm = document.getElementById("bookForm");

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const yearInput = document.getElementById("year");

const bookList = document.getElementById("bookList");

const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");

const formTitle = document.getElementById("formTitle");
const message = document.getElementById("message");

let editBookId = null;


// ======================================
// GET - Load all books
// ======================================

async function loadBooks() {

    try {

        const response = await fetch("/api/books");

        const books = await response.json();

        bookList.innerHTML = "";

        books.forEach(book => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${book.id}</td>

                <td>${book.title}</td>

                <td>${book.author}</td>

                <td>${book.year}</td>

                <td>
                    <button
                        class="edit-btn"
                        onclick="editBook(${book.id})">
                        ✏️ Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteBook(${book.id})">
                        🗑️ Delete
                    </button>
                </td>
            `;

            bookList.appendChild(row);

        });

    } catch (error) {

        showMessage("Unable to load books.", "red");

    }
}


// ======================================
// POST - Add new book
// ======================================

bookForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const year = yearInput.value;

    const bookData = {
        title: title,
        author: author,
        year: year
    };


    // If editBookId exists → PUT
    if (editBookId !== null) {

        await updateBook(editBookId, bookData);

        return;
    }


    // Otherwise → POST
    try {

        const response = await fetch("/api/books", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(bookData)

        });

        const data = await response.json();

        if (response.ok) {

            showMessage(data.message, "green");

            bookForm.reset();

            loadBooks();

        } else {

            showMessage(data.message, "red");

        }

    } catch (error) {

        showMessage("Error adding book.", "red");

    }

});


// ======================================
// Edit Book
// ======================================

async function editBook(id) {

    try {

        const response = await fetch("/api/books");

        const books = await response.json();

        const book = books.find(book => book.id === id);

        if (!book) {
            return;
        }

        titleInput.value = book.title;

        authorInput.value = book.author;

        yearInput.value = book.year;

        editBookId = id;

        formTitle.textContent = "Update Book";

        submitBtn.textContent = "Update Book";

        cancelBtn.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (error) {

        showMessage("Error loading book.", "red");

    }
}


// ======================================
// PUT - Update Book
// ======================================

async function updateBook(id, bookData) {

    try {

        const response = await fetch(`/api/books/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(bookData)

        });

        const data = await response.json();

        if (response.ok) {

            showMessage(data.message, "green");

            cancelEdit();

            loadBooks();

        } else {

            showMessage(data.message, "red");

        }

    } catch (error) {

        showMessage("Error updating book.", "red");

    }
}


// ======================================
// DELETE - Delete Book
// ======================================

async function deleteBook(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(`/api/books/${id}`, {

            method: "DELETE"

        });

        const data = await response.json();

        if (response.ok) {

            showMessage(data.message, "green");

            loadBooks();

        } else {

            showMessage(data.message, "red");

        }

    } catch (error) {

        showMessage("Error deleting book.", "red");

    }
}


// ======================================
// Cancel Edit
// ======================================

function cancelEdit() {

    editBookId = null;

    bookForm.reset();

    formTitle.textContent = "Add New Book";

    submitBtn.textContent = "Add Book";

    cancelBtn.style.display = "none";
}


// ======================================
// Show Message
// ======================================

function showMessage(text, color) {

    message.textContent = text;

    message.style.color = color;

    setTimeout(() => {

        message.textContent = "";

    }, 3000);
}


// Load books when page opens

loadBooks();