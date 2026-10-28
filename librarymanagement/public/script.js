const form = document.getElementById("bookForm");

const title = document.getElementById("title");
const author = document.getElementById("author");
const year = document.getElementById("year");

const bookList = document.getElementById("bookList");

const heading = document.getElementById("heading");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");

let editId = null;


// ================= GET =================

function loadBooks() {

    fetch("/api/books")

        .then(response => response.text())

        .then(data => {

            bookList.innerHTML = data;

        })

        .catch(error => {

            console.log(error);

        });
}


// ================= POST / PUT =================

form.addEventListener("submit", function(event) {

    event.preventDefault();


    const formData = new URLSearchParams();

    formData.append("title", title.value);

    formData.append("author", author.value);

    formData.append("year", year.value);


    // PUT - Update

    if (editId !== null) {

        fetch("/api/books/" + editId, {

            method: "PUT",

            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded"
            },

            body: formData

        })

        .then(response => response.text())

        .then(data => {

            alert(data);

            cancelEdit();

            loadBooks();

        });

    }


    // POST - Add

    else {

        fetch("/api/books", {

            method: "POST",

            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded"
            },

            body: formData

        })

        .then(response => response.text())

        .then(data => {

            alert(data);

            form.reset();

            loadBooks();

        });

    }

});


// ================= EDIT =================

function editBook(id) {

    fetch("/api/books")

        .then(response => response.text())

        .then(data => {

            // Get the complete table from server
            bookList.innerHTML = data;

            editId = id;

            const rows = bookList.getElementsByTagName("tr");

            for (let row of rows) {

                const idCell = row.children[0];

                if (idCell && idCell.innerText == id) {

                    title.value =
                        row.children[1].innerText;

                    author.value =
                        row.children[2].innerText;

                    year.value =
                        row.children[3].innerText;

                    break;
                }
            }

            heading.innerText = "Update Book";

            submitBtn.innerText = "Update Book";

            cancelBtn.style.display = "inline-block";

            window.scrollTo(0, 0);

        });

}


// ================= DELETE =================

function deleteBook(id) {

    const answer = confirm(
        "Are you sure you want to delete this book?"
    );

    if (!answer) {
        return;
    }


    fetch("/api/books/" + id, {

        method: "DELETE"

    })

    .then(response => response.text())

    .then(data => {

        alert(data);

        loadBooks();

    });

}


// ================= CANCEL =================

function cancelEdit() {

    editId = null;

    form.reset();

    heading.innerText = "Add New Book";

    submitBtn.innerText = "Add Book";

    cancelBtn.style.display = "none";

}


// Load books when page opens

loadBooks();