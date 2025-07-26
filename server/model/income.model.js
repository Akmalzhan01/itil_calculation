import mongoose, { model } from "mongoose";

const incomeSchema = mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

export default model("income", incomeSchema)