import mongoose, { model } from "mongoose";

const consumptionSchema = mongoose.Schema({
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

export default model("consumption", consumptionSchema)