// Import dependencies
const express = require('express');
const mongoose = require('mongoose');

// Initialize express app
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://ranvithamothkuri:ranvithamothkuri@cluster0.evbs9np.mongodb.net', {
});


// Define student schema and model
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  grade: String,
});

const Student = mongoose.model('Student', studentSchema);

// CREATE - Add new student
app.post('/students', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.status(201).send(student);
});

// READ - Get all students
app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.send(students);
});

// UPDATE - Update student by ID
app.put('/students/:id', async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(student);
});

// DELETE - Delete student by ID
app.delete('/students/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.send({ message: 'Student deleted successfully' });
});

// Start the server
app.listen(3000, () => console.log('🚀 Server running on port 3000'));
