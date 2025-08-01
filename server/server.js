import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import consumption from "./controller/consumption.control.js"
import income from "./controller/income.control.js"
import stats from "./controller/stats.control.js"

const app = express();

app.use(express.json());
app.use(cors({
  origin: "*"
}));

app.use("/api/consumption", consumption)
app.use("/api/income", income)
app.use("/api/stats", stats)


function start() {
  try {
    mongoose
      .connect(
        "mongodb+srv://akmalzhantokhtasinov:AUoHThnY6sYmUhO7@cluster0.0pufaop.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
      )
      .then(() => {
        app.listen(8080, () => {
          console.log("server.js started on port " + 8080);
        });
      });
  } catch (error) {
    console.log(error);
    
  }
}

start()