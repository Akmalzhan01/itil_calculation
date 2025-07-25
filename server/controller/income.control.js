import Income from "../model/income.model.js"
import {Router} from "express"

const router = Router()

// get All
router.get("/", async (req, res) => {
  try {
    const income = await Income.find({})
    res.json(income)
  } catch (error) {
    res.json(error)
  }
})

// get by id
router.get("/:id", async (req, res) => {
  try {
    const income = await Income.findById({_id: req.params.id})
    res.json(income)
  } catch (error) {
    res.json(error)
  }
})

// get by month
router.get("/:year/:month", async (req, res) => {
  try {
    const {year, month} = await req.params
    
    const income = await Income.find({
      $expr: {
        $and: [
          { $eq: [{ $year: "$date" }, parseInt(year)] },
          { $eq: [{ $month: "$date" }, parseInt(month)] }
        ]
      }
    }).select("value");

    const totalIncome = income.reduce((sum, value) => {
      return sum + (value.value);
    }, 0);


    res.json(totalIncome)
    
  } catch (error) {
    res.json(error)
  }
})

// create
router.post("/", async (req, res) => {
  try {
    const {title, description, value, date} = req.body

    const newIncome = new Income({
      description,
      value,
      date
    })

    await newIncome.save()

    res.json(newIncome)
  } catch (error) {
    res.json(error)
  }
})



// update
router.put("/:id", async (req, res) => {
  try {
    const income = await Income.findByIdAndUpdate(req.params.id, req.body, {  
      new: true
    })
    res.json(income)
  } catch (error) {
    res.json(error)
  }
})


// delete
router.delete("/:id", async (req, res) => {
  try {
    const income = await Income.findByIdAndDelete(req.params.id)

    res.json(income)
  } catch (error) {
    res.json(error)
  }
})



export default router