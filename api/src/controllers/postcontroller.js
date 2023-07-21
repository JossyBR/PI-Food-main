// const { json } = require("body-parser");
// const { Diet, Recipe } = require("../db");
// const { Op } = require("sequelize");

// const postDb = async (req, res) => {
//   console.log("Se alcanzó el controlador postRecipe");
//   try {
//     const {
//       name,
//       summary,
//       healthScore,
//       steps,
//       image,
//       diets,
//       cookingTime,
//       diet,
//     } = req.body;

//     if (
//       !name ||
//       !summary ||
//       !healthScore ||
//       !steps ||
//       !image ||
//       !diets ||
//       !cookingTime ||
//       !diet
//     ) {
//       return res.status(401).send("Faltan datos");
//     }

//     // Convertir los nombres de las dietas a minúsculas
//     const formattedDiets = diets.map((d) => d.toLowerCase());

//     // Dieta existe en base de datos
//     // const exiDiet = await Diet.findOne({ where: { name: diet } });

//     // if (!exiDiet) {
//     //   return res.status(400).json({ info: "Elige un tipo de dieta valido" });
//     // }

//     // Validar que exista receta en BD
//     const exiRecipe = await Recipe.findOne({ where: { name: req.body.name } });

//     if (exiRecipe) {
//       return res.json({ info: "Existe receta" });
//     }

//     // Creación de receta en BD
//     const crearRecipe = await Recipe.create({
//       name: req.body.name,
//       summary: req.body.summary,
//       healthScore: req.body.healthScore,
//       steps: req.body.steps,
//       image: req.body.image,
//       diets: formattedDiets, // Usar los nombres de las dietas en minúsculas
//       cookingTime: req.body.cookingTime,
//     });

//     // Validación de todas las dietas
//     const allDiet = await Diet.findAll({
//       where: { name: { [Op.in]: formattedDiets } },
//     });

//     if (!allDiet || allDiet.length === 0) {
//       return res
//         .status(400)
//         .json({ info: "Seleccione un tipo de dieta valido" });
//     }

//     await crearRecipe.addDiet(allDiet);

//     return res.status(201).json(crearRecipe);
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// };

// module.exports = {
//   postDb,
// };

// const { json } = require("body-parser");
// const { Diet, Recipe } = require("../db");
// const { Op } = require("sequelize");

// const postDb = async (req, res) => {
//     console.log("Se alcanzó el controlador postRecipe");
//   try {
//     const {
//       name,
//       summary,
//       healthScore,
//       steps,
//       image,
//       diets,
//       cookingTime,
//       diet,
//     } = req.body;

//     if (
//       !name ||
//       !summary ||
//       !healthScore ||
//       !steps ||
//       !image ||
//       !diets ||
//       !cookingTime ||
//       !diet
//     ) {
//       return res.status(401).send("Faltan datos");
//     }

//     //Dieta existe en base de datos
//     const exiDiet = await Diet.findOne({ where: { name: diet } });

//     if (!exiDiet) {
//       return res.status(400).json({ info: "Elige un tipo de dieta valido" });
//     }

//     //Validar que exista receta en BD
//     const exiRecipe = await Recipe.findOne({ where: { name: req.body.name } });

//     if (exiRecipe) {
//       return res.json({ info: "Existe receta" });
//     }

//     //Creación de receta en BD
//     const crearRecipe = await Recipe.create({
//       name: req.body.name,
//       summary: req.body.summary,
//       healthScore: req.body.healthScore,
//       steps: req.body.steps,
//       image: req.body.image,
//       diets: req.body.diets,
//       cookingTime: req.body.cookingTime,
//     });

//     //validación de todas las dietas
//     const allDiet = await Diet.findAll({ where: { name: { [Op.in]: diet } } });

//     if (!allDiet || allDiet.length === 0)
//       return (
//         res.status(400), json({ info: "Seleccione un tipo de dieta valido" })
//       );

//     await crearRecipe.addDiet(allDiet);

//     return res.status(201).json(crearRecipe);
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// };

// module.exports = {
//     postDb,
// };
