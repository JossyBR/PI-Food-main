import axios from "axios";

// export const API_KEY = "process.env";

export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_ALL_DIETS = "GET_ALL_DIETS";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const FILTER_CREATED = "FILTER_CREATED";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SORT_ALPHABETICALLY = "SORT_ALPHABETICALLY";
export const SORT_BY_HEALTHSCORE = "SORT_BY_HEALTHSCORE";
export const GET_RECIPES_BY_NAME = "GET_RECIPES_BY_NAME";
export const CLEAR_RECIPES = "CLEAR_RECIPES";
export const POST_RECIPE = "POST_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const RECIPE_DETAIL = "RECIPE_DETAIL";
export const CLEAR_RECIPE_DETAIL = "RECIPE_DETAIL";
export const ADD_TO_FAVS = "ADD_TO_FAVS";
export const REMOVE_FROM_FAVS = "REMOVE_FROM_FAVS";
export const SET_LOADING = "SET_LOADING";

export const filterByDiet = (payload) => {
  return {
    type: FILTER_BY_DIET,
    payload,
  };
};

export const filterCreated = (payload) => {
  return {
    type: FILTER_CREATED,
    payload,
  };
};

export const setCurrentPage = (payload) => {
  return {
    type: SET_CURRENT_PAGE,
    payload,
  };
};

export const sortAlphabetically = (payload) => {
  return {
    type: SORT_ALPHABETICALLY,
    payload,
  };
};

export const sortByHealthScore = (payload) => {
  return {
    type: SORT_BY_HEALTHSCORE,
    payload,
  };
};

export const clearRecipes = () => {
  return {
    type: CLEAR_RECIPES,
  };
};

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

//Para adicionar favoritos

export const addToFavs = (payload) => {
  return {
    type: ADD_TO_FAVS,
    payload,
  };
};

export const removeFromFavs = (payload) => {
  return {
    type: REMOVE_FROM_FAVS,
    payload,
  };
};

//*
export const clearRecipeDetail = () => {
  return {
    type: CLEAR_RECIPE_DETAIL,
  };
};

//* ACTIONS QUE CONECTAN CON EL BACKEND
const recipesBaseUrl = "http://localhost:3001/recipes";
const dietsBaseUrl = "http://localhost:3001/diets";

export const getAllRecipes = () => {
  return async function (dispatch) {
    try {
      let res = await axios(recipesBaseUrl);
      return dispatch({
        type: GET_ALL_RECIPES,
        payload: res.data,
      });
    } catch (error) {
      window.alert("Receta no encontrada");
    }
  };
};

export const getAllDiets = () => {
  return async function (dispatch) {
    try {
      let res = await axios(dietsBaseUrl);

      return dispatch({
        type: GET_ALL_DIETS,
        payload: res.data,
      });
    } catch (error) {
      window.alert("Dieta no encontrada");
    }
  };
};

export const getRecipeByName = (name) => {
  return async (dispatch) => {
    try {
      let res = await axios(`${recipesBaseUrl}?name=${name}`);
      return dispatch({
        type: "GET_RECIPES_BY_NAME",
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const postRecipe = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(recipesBaseUrl, payload);
      dispatch({
        type: POST_RECIPE,
        payload: res.data, // Agregar la nueva receta al estado allRecipes
      });
      return res;
    } catch (err) {
      window.alert("No se puede crear la receta");
    }
  };
};

// export const postRecipe = (payload) => {
//   return async (dispatch) => {
//     try {
//       const res = await axios.post(recipesBaseUrl, payload);
//       console.log(res);
//       return res;
//     } catch (err) {
//       window.alert("No se puede crear la receta");
//     }
//   };
// };
//https://api.spoonacular.com/recipes/{id}/information"

//let res = await axios(`${recipesBaseUrl}/${id}`);

export const getRecipeDetail = (id) => {
  return function (dispatch, getState) {
    const state = getState();
    const recipeDetail = state.allRecipes.find((recipe) => recipe.id === id);

    if (recipeDetail) {
      // Si la receta ya está en el estado, se obtiene directamente del estado
      dispatch({
        type: RECIPE_DETAIL,
        payload: recipeDetail,
      });
    } else {
      // Si la receta no está en el estado, se hace una llamada a la API
      axios
        .get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=bb30919adf2f4ddcab8cbd1af1d94114`
        )
        .then((res) => {
          // Renombrar la propiedad 'name' a 'title' en los datos de la API antes de enviar al reducer
          const recipeData = {
            ...res.data,
            title: res.data.name,
          };
          delete recipeData.name;

          dispatch({
            type: RECIPE_DETAIL,
            payload: recipeData,
          });
        })
        .catch((err) => {
          window.alert(`Algo salió mal`);
        });
    }
  };
};

// export const getRecipeDetail = (id) => {
//   return function (dispatch, getState) {
//     const state = getState();
//     const recipeDetail = state.allRecipes.find((recipe) => recipe.id === id);

//     if (recipeDetail) {
//       // Si la receta ya está en el estado, se obtiene directamente del estado
//       dispatch({
//         type: RECIPE_DETAIL,
//         payload: recipeDetail,
//       });
//     } else {
//       // Si la receta no está en el estado, se hace una llamada a la API
//       axios
//         .get(
//           `https://api.spoonacular.com/recipes/${id}/information?apiKey=bb30919adf2f4ddcab8cbd1af1d94114`
//         )
//         .then((res) => {
//           dispatch({
//             type: RECIPE_DETAIL,
//             payload: res.data,
//           });
//         })
//         .catch((err) => {
//           window.alert(`Algo salió mal`);
//         });
//     }
//   };
// };

// export const getRecipeDetail = (id) => {
//   return async (dispatch) => {
//     try {
//       let res = await axios(
//         `https://api.spoonacular.com/recipes/${id}/information?apiKey=bb30919adf2f4ddcab8cbd1af1d94114`
//       );
//       return dispatch({
//         type: RECIPE_DETAIL,
//         payload: res.data,
//       });
//     } catch (err) {
//       window.alert(`Algo salio mal`);
//     }
//   };
// };

export const deleteRecipe = (id) => {
  return async function (dispatch) {
    try {
      await axios.delete(`${recipesBaseUrl}/${id}`); // Cambia la URL para que apunte a tu ruta de eliminación de recetas
      dispatch({
        type: DELETE_RECIPE,
        payload: id, // En lugar de `selectRecipe`, envía el ID de la receta eliminada como payload
      });
    } catch (error) {
      console.error("Error al eliminar la receta", error);
    }
  };
};

// export const deleteRecipe = (id) => {
//   return async function (dispatch) {
//     const selectRecipe = await axios.delete(
//       `https://api.spoonacular.com/recipes/${id}/information?apiKey=bb30919adf2f4ddcab8cbd1af1d94114`
//     );
//     return dispatch({
//       type: DELETE_RECIPE,
//       payload: selectRecipe,
//     });
//   };
// };

// export const update = (id, payload) => {
//   return async function () {
//     const UPDATE = await axios.put(
//       `https://api.spoonacular.com/recipes/${id}/information?apiKey=bb30919adf2f4ddcab8cbd1af1d94114`,
//       payload
//     );
//     return UPDATE;
//   };
// };

// export const deleteRecipe = (id) => {
//   return async function (dispatch) {
//     const selectRecipe = await axios.delete()
//   }
// }
