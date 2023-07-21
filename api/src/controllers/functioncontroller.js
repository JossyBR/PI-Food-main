const axios = require("axios");
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");
const db = require("../db");

const apiSearch = async () => {
  try {
    // const response = await axios.get(
    //   `https://api.spoonacular.com/recipes/complexSearch/?&addRecipeInformation=true&apiKey=${process.env.API_KEY}` //esta es mi apikey
    // );
    const response = await axios.get(
      `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`
    );

    const apiRecipes = await response.data.results.map((recipe) => {
      return {
        id: recipe.id,
        name: recipe.title,
        cookingTime: recipe.readyInminutes,
        image: recipe.image,
        summary: recipe.summary,
        healthScore: recipe.HealthScore,
        diets: recipe.diets?.map((el) => el),
        steps: recipe.analyzedInstructions[0]?.steps
          .map((ele) => `${ele.number} ${ele.step}`)
          .join(" "),
      };
    });
    return apiRecipes;
  } catch (err) {
    console.log("Error en la función apiSearch:", err);
    return err;
  }
};

const dbSearch = async () => {
  try {
    const dbRecipes = await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    const dbRecipe = await dbRecipes?.map((el) => {
      return {
        id: el.id,
        title: el.title,
        cookingTime: el.cookingTime,
        image: el.image,
        summary: el.summary,
        healthScore: el.healthScore,
        diets: el.diets?.map((el) => el.name),
        steps: el.steps,
      };
    });
    return dbRecipe;
  } catch (err) {
    console.log("Error en la función dbSearch:", err);
    return err;
  }
};

const allSearches = async () => {
  try {
    const apiResponse = await apiSearch();
    const dbResponse = await dbSearch();

    // Verificar si ambas variables son arrays antes de usar concat
    if (Array.isArray(apiResponse) && Array.isArray(dbResponse)) {
      const allResponses = apiResponse.concat(dbResponse);
      return allResponses;
    } else {
      // Manejar el caso si alguna de las respuestas no es un array
      console.log("Error: Las respuestas no son arrays.");
      return [];
    }
  } catch (err) {
    console.log("Error en la función allSearches:", err);
    return err;
  }
};

// const allSearches = async () => {
//   try {
//     const apiResponse = await apiSearch();
//     const dbResponse = await dbSearch();

//     const allResponses = await apiResponse.concat(dbResponse);
//     return allResponses;
//   } catch (err) {
//     console.log("Error en la función allSearches:", err);
//     return err;
//   }
// };

module.exports = { apiSearch, dbSearch, allSearches };
