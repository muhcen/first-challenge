const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "list must have a title"],
    minlength: 4,
  },
  description: {
    type: String,
    required: [true, "list must have a description"],
    minlength: 4,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  priority: {
    type: Number,
    required: [true, "list must have a priority"],
    default: 1,
  },
  status: {
    type: String,
    enum: ["close", "open"],
    default: "open",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const List = mongoose.model("List", listSchema);

module.exports = List;
