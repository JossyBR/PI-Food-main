import {
  GET_ALL_RECIPES,
  GET_ALL_DIETS,
  FILTER_BY_DIET,
  SET_CURRENT_PAGE,
  FILTER_CREATED,
  SORT_ALPHABETICALLY,
  SORT_BY_HEALTHSCORE,
  GET_RECIPES_BY_NAME,
  CLEAR_RECIPES,
  RECIPE_DETAIL,
  CLEAR_RECIPE_DETAIL,
  ADD_TO_FAVS,
  REMOVE_FROM_FAVS,
  DELETE_RECIPE,
  SET_LOADING,
  POST_RECIPE,
} from "../actions/index";

const initialState = {
  recipes: [], // rendering
  allRecipes: [], // backup one
  diets: [],
  recipeDetail: [],
  currentPage: 1,
  favorites: [],
  loading: false,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };

    case GET_ALL_DIETS:
      return {
        ...state,
        diets: action.payload,
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case GET_RECIPES_BY_NAME:
      return {
        ...state,
        recipes: action.payload,
      };

    case RECIPE_DETAIL:
      return {
        ...state,
        recipeDetail: action.payload,
      };

    case POST_RECIPE:
      return {
        ...state,
      };

    case CLEAR_RECIPES:
      return {
        ...state,
        recipes: [],
      };

    case CLEAR_RECIPE_DETAIL:
      return {
        ...state,
        recipeDetail: [],
      };

    case DELETE_RECIPE:
      const { allRecipes } = state;
      if (!allRecipes || !Array.isArray(allRecipes)) {
        // Si allRecipes no existe o no es un array, devolvemos el estado actual
        return state;
      }
      return {
        ...state,
        allRecipes: state.allRecipes.filter((r) => r.id !== action.payload), // Filtra la receta eliminada por ID
      };

    // case DELETE_RECIPE:
    //   return {
    //     ...state,
    //     allRecipes: state.allRecipes.filter((r) => r.id !== action.payload), // Filtra la receta eliminada por ID
    //   };
    // case DELETE_RECIPE:
    // return {
    //   ...state,
    //   allRecipes: state.allRecipes.filter((r) => r !== action.payload),
    // };

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    //----------------------> FAVORITES FEATURE

    case ADD_TO_FAVS:
      const favorites = state.favorites || [];
      if (!favorites.find((fav) => fav.id === action.payload.id)) {
        return {
          ...state,
          favorites: [...favorites, action.payload],
        };
      } else {
        return state;
      }

    case REMOVE_FROM_FAVS:
      return {
        ...state,
        favorites: state.favorites?.filter((el) => el.id !== action.payload.id),
      };

    //--------------------------> FILTERS <----------------------------------------
    case FILTER_BY_DIET:
      const filteredRecipes = state.recipes.filter((el) =>
        el.diets.includes(action.payload) ? el : null
      );

      return {
        ...state,
        recipes: filteredRecipes,
      };

    case FILTER_CREATED:
      // Copia del array de todas las recetas en el estado
      const filtRecipes = state.allRecipes;
      let createdFiltered =
        action.payload === "api" // Si el payload es "api", mostrar todas las recetas
          ? filtRecipes
          : action.payload === "database" // Si el payload es "database", mostrar solo las recetas creadas en la base de datos
          ? state.recipes.filter((el) => el.id.length > 20) // Si el payload es "database", mostrar solo las recetas creadas en la base de datos (filtrar por ID largo)
          : state.recipes.filter((el) => el.id.toString().length < 20); // Si el payload es "user", mostrar solo las recetas creadas por usuarios (filtrar por ID corto)

      // Si no se encontraron recetas creadas según el filtro seleccionado, se muestra una alerta
      if (!createdFiltered.length) {
        alert("No hay recetas creadas todavia");
        createdFiltered = filtRecipes;
      }

      // Devolver el nuevo estado con las recetas filtradas
      return {
        ...state,
        recipes: createdFiltered,
      };

    //------------------------> SORTERS <-------------------------------------------

    case SORT_ALPHABETICALLY:
      const alphSorted =
        action.payload === "a-z" // Si el payload es "a-z", ordenar de A a Z
          ? state.recipes.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1; // Si el nombre de a es mayor que el nombre de b, colocar a después de b
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1; //// Si el nombre de a es menor que el nombre de b, colocar a antes de b
              return 0;
            })
          : // Si el payload no es "a-z", ordenar de Z a A
            state.recipes.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
              return 0;
            });

      // Devolver el nuevo estado con las recetas ordenadas alfabéticamente y actualizar la página actual a 2
      return {
        ...state,
        recipes: alphSorted,
        currentPage: 2,
      };

    case SORT_BY_HEALTHSCORE:
      const newOne = [...state.recipes];
      const yessssssss =
        action.payload === "max-min"
          ? newOne.sort((a, b) => {
              if (a.healthScore < b.healthScore) return 1; // Si el puntaje de salud de a es menor que el de b, colocar a después de b
              if (a.healthScore > b.healthScore) return -1; // Si el puntaje de salud de a es mayor que el de b, colocar a antes de b
              return 0;
            })
          : // Si el payload no es "max-min", ordenar de menor a mayor puntaje de salud
            newOne.sort((a, b) => {
              if (a.healthScore > b.healthScore) return 1; // Si el puntaje de salud de a es mayor que el de b, colocar a antes de b
              if (a.healthScore < b.healthScore) return -1;
                // Si el puntaje de salud de a es menor que el de b, colocar a después de breturn -1;
                return 0; // Si los puntajes de salud son iguales, mantener el orden actual
            });
      // Devolver el nuevo estado con las recetas ordenadas por puntaje de salud y actualizar la página actual a 2      
      return {
        ...state,
        recipes: yessssssss,
        currentPage: 2,
      };

    default:
      return { ...state };
  }
};
