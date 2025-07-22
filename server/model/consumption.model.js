import mongoose, { model } from "mongoose";

const consumptionSchema = mongoose.Schema({
  description: String,
  value: Number,
  date: {
    type: Date,
    default: Date.now
  }
})

export default model("consumption", consumptionSchema)