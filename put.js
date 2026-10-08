const express = require('express');

const app = express();

app.use(express.json());

let students = [
    { id: 1, name: "Nisha", branch: "CSE" },
    { id: 2, name: "Palak", branch: "IT" },
    { id: 3, name: "Vaishnavi", branch: "ECE" }
];

app.get('/students', (req, res) => {
    res.json(students);
});

app.put('/students/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    student.name = req.body.name;
    student.branch = req.body.branch;

    res.json({
        message: "Student updated successfully",
        student: student
    });

});

app.listen(3005, () => {
    console.log("Server running on port 3005");
});