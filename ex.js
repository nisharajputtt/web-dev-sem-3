const express = require('express');
const app = express();
app.use(express.json());

let students = [
  { id: 1, name: 'Rahul', branch: 'CSE', age: 20 },
  { id: 2, name: 'Aman', branch: 'IT', age: 21 },
  { id: 3, name: 'Priya', branch: 'CSE', age: 20 },
  { id: 4, name: 'Neha', branch: 'ECE', age: 21 }
];

app.get('/' ,(req, res) => {
  res.send("server is running");
});

app.post('/students',(req, res) => {
  const newStudent = req.body;
 students.push(newStudent);
    res.status(201).json({message: "student added successfully", student: newStudent});
});

app.listen(3005,() => {
  console.log('Server running at port 3005');
});
//npm.cmd install express express-graphql graphql