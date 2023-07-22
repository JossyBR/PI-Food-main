const { Router } = require("express");
const { Diet, Recipe } = require("../db.js");
const { postDb } = require("../controllers/postcontroller");

const {
  filterByName,
  filterById,
  postRecipe,
} = require("../controllers/recipescontroller");

const recipesRouter = Router();

//GET para filtrar por nombre y obtener todas las recetas
recipesRouter.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const filteredRecipes = await filterByName(name);
      res.status(200).json(filteredRecipes);
    } else {
      const allRecipes = await filterByName();
      res.status(200).json(allRecipes);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

//ruta
// recipesRouter.post("/", postDb);

// POST para crear una nueva receta
recipesRouter.post("/", async (req, res) => {
  try {
    const newRecipe = req.body;
    if (!newRecipe) {
      return res.status(404).send("Faltan campos obligatorios");
    }

    const createdRecipe = await postRecipe(newRecipe);
    res.status(201).send(createdRecipe);
  } catch (error) {
    res.status(404).send(error);
  }
});

//GET para obtener una receta por ID
recipesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await filterById(id);

    if (recipe) {
      // Buscar los tipos de dietas asociados a la receta en la base de datos
      const diets = await Diet.findAll({
        include: {
          model: Recipe,
          where: {
            id: recipe.id,
          },
          attributes: [],
        },
        attributes: ["name"],
      });

      // Agregar los tipos de dietas a la respuesta de la receta
      recipe.diets = diets.map((diet) => diet.name);

      res.status(200).json(recipe);
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

recipesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const foundRecipe = await filterById(id);

    res.status(200).json(foundRecipe);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE para eliminar una receta por ID
recipesRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Aquí realiza la eliminación directamente en la base de datos utilizando el modelo `Recipe`
    await Recipe.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).send("Eliminación exitosa");
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la receta" });
  }
});


// recipesRouter.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     await Recipe.destroy({
//       where: {
//         id: id,
//       },
//     });
//     return res.status(200).send("Eliminación exitosa");
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// });

// PUT para actualizar una receta por ID
// recipesRouter.put("/:id", async (req, res) => {
//   const { id } = req.params;
//   const { name, summary, steps, healthScore, diets, image } = req.body;
//   try {
//     const recipe = await Recipe.findByPk(id);
//     if (!recipe) {
//       return res.status(404).json({ error: "Receta no encontrada" });
//     }

//     await Recipe.update(
//       {
//         name: name,
//         summary: summary,
//         image: image,
//         steps: steps,
//         healthScore: healthScore,
//       },
//       {
//         where: {
//           id: id,
//         },
//       }
//     );

//     if (diets && diets.length) {
//       await recipe.setDiets([]);
//       for (const dietName of diets) {
//         const diet = await Diet.findOne({
//           where: {
//             name: dietName,
//           },
//         });
//         if (diet) {
//           await recipe.addDiet(diet);
//         }
//       }
//     }

//     // Obtener la receta actualizada con las relaciones
//     const updatedRecipe = await Recipe.findByPk(id, {
//       include: [{ model: Diet }],
//     });

//     res.status(200).json(updatedRecipe);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// });

module.exports = { recipesRouter };
