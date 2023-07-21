const { allSearches } = require("../controllers/functioncontroller.js");
const { Diet, Recipe } = require("../db");

const filterByName = async (name) => {
  try {
    if (name) {
      const searchAll = await allSearches();
      const filteredRecipes = await searchAll.filter(
        (ele) => ele.name.toLowerCase().includes(name.toLowerCase()) === true
      );
      if (filteredRecipes.length) return filteredRecipes;
      else {
        throw `No recipe found by ${name}! Try again!`;
      }
    } else {
      const allRecipes = allSearches();
      return allRecipes;
    }
  } catch (err) {
    return err;
  }
};

// const filterById = async (id) => {
//   try {
//     const searchAll = await allSearches();
//     const foundRecipe = await searchAll.find((el) => el.id == id);
//     if (foundRecipe) return foundRecipe;
//     else throw `No recipes found with the id ${id}! Try again!`;
//   } catch (err) {
//     return err;
//   }
// };

const filterById = async (id) => {
  try {
    const response = await axios(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.API_KEY}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const postRecipe = async (createdRecipe) => {
  try {
    const { name, summary, healthScore, steps, image, diets, cookingTime } =
      createdRecipe;
    const recipe = {
      name,
      summary,
      healthScore,
      steps,
      image,
      cookingTime,
    };

    // if (diets && diets.length > 0) {
    const allDiets = await Diet.findAll({
      where: {
        name: diets,
      },
    });

    const recetaCreada = await Recipe.create(recipe); // Asociar las dietas a la receta
    //}

    //AGREGAR DIETA
    recetaCreada.addDiets(allDiets);

    return Recipe.findAll();

    // const allDiets = await Diet.findAll({
    //   where: {
    //     name: diets,
    //   },
    // });
    // const createdRecipe = await Recipe.create(recipe);

    // createdRecipe.addDiets(allDiets);
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = { filterByName, filterById, postRecipe };
