const express = require('express');
const app = express();

app.use(express.json());

let students = [
    {
        id: 1,
        name: "Nisha",
        branch: "CSE"
    },
    {
        id: 2,
        name: "Palak",
        branch: "IT"
    }
];

// Home route
app.get('/', (req, res) => {
    res.send("Student API is running");
});

// GET operation
// Show students to get data
app.get('/students', (req, res) => {
    res.json(students);
});

// POST operation
// Add new student data
app.post('/students', (req, res) => {
    students.push(newStudent);

    res.json({
        message: "Student added successfully",
        student: newStudent
    });
});

// Start server
app.listen(3005, () => {
    console.log("Server running at http://localhost:3005");
});