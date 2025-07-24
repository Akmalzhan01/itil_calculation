import Consumption from "../model/consumption.model.js"
import {Router} from "express"

const router = Router()

// get All
router.get("/", async (req, res) => {
  try {
    const consumption = await Consumption.find({})
    res.json(consumption)
  } catch (error) {
    res.json(error)
  }
})

// get by id
router.get("/:id", async (req, res) => {
  try {
    const consumption = await Consumption.findById({id: req.params.id})
    res.json(consumption)
  } catch (error) {
    res.json(error)
  }
})

// get by month
router.get("/:year/:month", async (req, res) => {
  try {
    const {year, month} = await req.params
    
    const consumption = await Consumption.find({
      $expr: {
        $and: [
          { $eq: [{ $year: "$date" }, parseInt(year)] },
          { $eq: [{ $month: "$date" }, parseInt(month)] }
        ]
      }
    }).select("value");

    const totalConsumption = consumption.reduce((sum, value) => {
      return sum + (value.value);
    }, 0);


    res.json(totalConsumption)
    
  } catch (error) {
    res.json(error)
  }
})

// create
router.post("/", async (req, res) => {
  try {
    const {title, description, value, date} = req.body

    const newConsumption = new Consumption({
      title,
      description,
      value,
      date
    })

    await newConsumption.save()

    res.json(newConsumption)
  } catch (error) {
    res.json(error)
  }
})



// update
router.put("/:id", async (req, res) => {
  try {
    const consumption = await Consumption.findByIdAndUpdate(req.params.id, req.body, {  
      new: true
    })
    res.json(consumption)
  } catch (error) {
    res.json(error)
  }
})


// delete
router.delete("/:id", async (req, res) => {
  try {
    const consumption = await Consumption.findByIdAndDelete(req.params.id)

    res.json(consumption)
  } catch (error) {
    res.json(error)
  }
})



export default router