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
        throw `Ninguna receta encontrada por ${name}! Intenta de nuevo!`;
      }
    } else {
      const allRecipes = await allSearches();
      return allRecipes;
    }
  } catch (err) {
    console.log(error);
  }
};

//Esta función auxiliar verifica si una cadena (ID) dada es un UUID válido. Un UUID es un identificador único universal, y esta función utiliza una expresión regular para comprobar si el ID dado sigue el formato de un UUID.

const isUUID = (id) => {
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(id);
};

const filterById = async (id) => {
  try {
    id = id.toString(); // Convertir a cadena (string)

    // Verificar si el ID es un UUID válido
    if (isUUID(id)) {
       // Buscar la receta en la base de datos local por su ID
      const bdReceId = await Recipe.findByPk(id);

        // Si se encuentra la receta en la base de datos, devolverla
      if (bdReceId) {
        return bdReceId;
      }
    }


     // Si el ID no es un UUID válido o no se encontró en la base de datos local,
    // realizar una solicitud a la API Spoonacular para obtener la información de la receta
    const { data } = await axios(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=54b06dcc2cb44aa094ac1bf673d1d498`
    );

    // console.log(data);
    // Crear un objeto con los detalles de la receta
    const idRecipe = {
      id: data.id,
      name: data.title,
      cookingTime: data.readyInMinutes,
      image: data.image,
      summary: data.summary,
      healthScore: data.healthScore,
      diets: data.diets,
      steps: data.analyzedInstructions[0]?.steps
        .map((ele) => `${ele.number} ${ele.step}`)
        .join(" "),
    };

    // console.log(idRecipe);
    // Devolver el objeto con los detalles de la receta
    return idRecipe;
  } catch (error) {
    // En caso de que ocurra un error (por ejemplo, la receta no existe en la API),
    // devolver los datos del error proporcionados por la API
    return error.response.data;
  }
};


const postRecipe = async (createdRecipe) => {
  try {
    const { name, summary, healthScore, steps, image, diets, cookingTime } =
      createdRecipe;
      // Se crea un objeto recipe con las propiedades extraídas
    const recipe = {
      name,
      summary,
      healthScore,
      steps,
      image,
      cookingTime,
    };

      // Se Buscan todas las dietas en la base de datos que coincidan con los nombres de las dietas en el objeto createdRecipe
    // if (diets && diets.length > 0) {
    const allDiets = await Diet.findAll({
      where: {
        name: diets,
      },
    });

    const recetaCreada = await Recipe.create(recipe); // Se crea la receta en la base de datos
    //}

    // Filtra las dietas existentes para evitar enviar un array vacío o indefinido
    const validDiets = allDiets.filter((diet) => diet);

    // Asocia las dietas válidas a la receta creada
    await recetaCreada.setDiets(validDiets);

    //Se agrega la dieta a la receta creada
    recetaCreada.addDiets(allDiets);

    return Recipe.findAll();

   
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = { filterByName, filterById, postRecipe };
