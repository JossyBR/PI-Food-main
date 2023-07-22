const { allSearches } = require("../controllers/functioncontroller.js");
const { Diet, Recipe } = require("../db");
const axios = require("axios");

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
      const allRecipes = await allSearches();
      return allRecipes;
    }
  } catch (err) {
    console.log(error);
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
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=bb30919adf2f4ddcab8cbd1af1d94114`
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

    // Filtra las dietas existentes para evitar enviar un array vacío o indefinido
    const validDiets = allDiets.filter((diet) => diet);

    // Asocia las dietas válidas a la receta creada
    await recetaCreada.setDiets(validDiets);

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
