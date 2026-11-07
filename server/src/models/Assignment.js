const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true },
    course: { type: String, required: [true, 'Course is required'], trim: true },
    dueDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
    status: { type: String, enum: ['Pending', 'Submitted'], default: 'Pending' },
    submittedBy: { type: String, default: 'RVU Student', trim: true }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
      }
    }
  }
);

module.exports = mongoose.model('Assignment', assignmentSchema);
