const express = require('express');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Student = require('../models/Student');

const router = express.Router();

// Helper: send validation errors
const handleValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
};

// GET /students
// supports optional ?page=1&limit=10 and ?major=CS
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 25, ...filters } = req.query;
    const query = {};
    if (filters.major) query.major = filters.major;
    if (filters.enrolled !== undefined) query.enrolled = filters.enrolled === 'true';

    const students = await Student.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Student.countDocuments(query);
    res.json({ data: students, meta: { total, page: Number(page), limit: Number(limit) }});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /students/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'Invalid id' });

    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /students
router.post('/',
  body('name').isString().trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('age').optional().isInt({ min: 0 }),
  body('enrolled').optional().isBoolean(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { name, email, age, major, enrolled } = req.body;
      const existing = await Student.findOne({ email });
      if (existing) return res.status(409).json({ error: 'Email already exists' });

      const student = new Student({ name, email, age, major, enrolled });
      await student.save();
      res.status(201).json(student);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// PUT /students/:id (full update)
router.put('/:id',
  body('name').isString().trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('age').optional().isInt({ min: 0 }),
  body('enrolled').optional().isBoolean(),
  async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'Invalid id' });

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const update = req.body;
      const student = await Student.findByIdAndUpdate(id, update, { new: true, runValidators: true });
      if (!student) return res.status(404).json({ error: 'Student not found' });
      res.json(student);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// PATCH /students/:id (partial)
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'Invalid id' });

  try {
    const update = req.body;
    const student = await Student.findByIdAndUpdate(id, update, { new: true, runValidators: true });
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /students/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'Invalid id' });

  try {
    const student = await Student.findByIdAndDelete(id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Student deleted', id: student._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
