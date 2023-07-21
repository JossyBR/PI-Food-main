const { Router } = require("express");
const dietsRouter = Router();
const { dietsToDb } = require("../controllers/dietcontroller");

dietsRouter.get("/", async (req, res) => {
  try {
    const foundDiets = await dietsToDb();
    res.status(200).json(foundDiets);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = { dietsRouter };
