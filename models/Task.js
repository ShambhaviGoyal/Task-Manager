const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide task name'],
    trim: true,
    maxlength: [50, 'Task name cannot be more than 50 characters'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date, // <-- Add this
    default: null,
  },
});

module.exports = mongoose.model('Task', TaskSchema);
