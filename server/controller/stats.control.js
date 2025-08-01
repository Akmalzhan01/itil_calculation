import { Router } from "express";
import incomeModel from "../model/income.model.js";
import consumptionModel from "../model/consumption.model.js";

const router = Router();

// get by month Consumption
router.get("/:year/:month", async (req, res) => {
  try {
    const { year, month } = req.params;
    
    // Parametrlarni tekshirish
    const yearNum = parseInt(year);
    const monthNum = parseInt(month);
    
    if (isNaN(yearNum) || isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid year or month parameter" 
      });
    }

    // MongoDB aggregation yordamida yig'indi hisoblash
    const result = await consumptionModel.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $year: "$date" }, yearNum] },
              { $eq: [{ $month: "$date" }, monthNum] }
            ]
          }
        }
      },
      {
        $group: {
          _id: null,
          totalConsumption: { $sum: "$value" },
          records: { $push: "$$ROOT" }
        }
      }
    ]);

    const response = result.length > 0 
      ? { 
          success: true,
          totalConsumption: result[0].totalConsumption
        }
      : { 
          success: true,
          totalConsumption: 0,
          records: []
        };

    res.json(response);
    
  } catch (error) {
    console.error("Error fetching income:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error while fetching consumption data",
      error: error.message 
    });
  }
});

export default router;