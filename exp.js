const express = require('express');
const app = express();
const students = [
    { id:1, name:"rahul", branch:"cse" },
    { id:2, name:"aman", branch:"cse" }
];
app.get('/students', (req, res) => {
    res.json(students);
});
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});