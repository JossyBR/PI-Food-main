const { Diet } = require("../db");

const dietsToDb = async () => {
  const dietsT = [
    "gluten free",
    "ketogenic",
    "vegetarian",
    "lacto ovo vegetarian",
    "vegan",
    "dairy free",
    "pescatarian",
    "lacto vegetarian",
    "paleolithic",
    "primal",
    "whole 30",
    "low FODMAP",
  ];

  dietsT.forEach((el) => {
    Diet.findOrCreate({
      where: {
        name: el,
      },
    });
  });
  return Diet.findAll();
};

module.exports = { dietsToDb };
