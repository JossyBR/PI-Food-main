import React, { useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./detail.module.css";

import {
  getAllDiets,
  getRecipeDetail,
  getAllRecipes,
  setCurrentPage,
  clearRecipeDetail,
  deleteRecipe,
  RECIPE_DETAIL,
} from "../../redux/actions/index";

const Detail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const recDetail = useSelector((state) => state.recipeDetail);
  const allRecipes = useSelector((state) => state.allRecipes); // Obtener el estado allRecipes desde el almacenamiento

  console.log("detail", recDetail);
  console.log("recipes", allRecipes);

  const { id } = useParams();

  function removeLinks(html) {
    // Crea un elemento div temporal
    const temp = document.createElement("div");
    // Asigna la cadena de texto HTML al contenido del elemento div
    temp.innerHTML = html;
    // Obtiene todas las etiquetas a del elemento div
    const links = temp.getElementsByTagName("a");
    // Recorre todas las etiquetas a y elimina el atributo href
    for (let i = 0; i < links.length; i++) {
      links[i].removeAttribute("href");
    }
    // Devuelve el contenido del elemento div sin los enlaces
    return temp.innerHTML;
  }
  const htmlWithoutLinks = removeLinks(recDetail?.summary);

  const handleDelete = () => {
    dispatch(clearRecipeDetail());
    dispatch(deleteRecipe(id));
    dispatch(getAllDiets());
    dispatch(getAllRecipes());
    alert("Receta eliminada correctamente");
    dispatch(clearRecipeDetail());
    history.push("/home");
    dispatch(setCurrentPage(1));
  };

  // useEffect(() => {
  //   dispatch(getRecipeDetail(id));
  // }, [dispatch, id]);

  useEffect(() => {
    // Verifica si la receta ya está en el estado allRecipes
    const existingRecipe = allRecipes.find((recipe) => recipe.id === id);

    if (existingRecipe) {
      // Si la receta está en el estado, utiliza la información existente
      dispatch({
        type: RECIPE_DETAIL,
        payload: existingRecipe,
      });
    } else {
      // Si la receta no está en el estado, llama a la API para obtener la información
      dispatch(getRecipeDetail(id));
    }

    dispatch(getAllDiets());
  }, [dispatch, id, allRecipes]);

  // useEffect(() => {
  //   dispatch(getAllDiets());
  //   if (id.length > 6) {
  //     // Si la longitud de id es mayor a 6, es una receta creada
  //     // No necesitamos obtener el detalle de la receta, ya que ya está en el estado
  //     return;
  //   }
  //   dispatch(getRecipeDetail(id)); // Obtenemos el detalle de la receta de la API
  // }, [dispatch, id]);

  // useEffect(() => {
  //   dispatch(getRecipeDetail(id));
  //   dispatch(getAllDiets());
  // }, [dispatch, id]);

  const homeHandler = () => {
    dispatch(setCurrentPage(1));
    dispatch(getAllRecipes());
  };

  return (
    <div className={styles.divdetail}>
      <div className={styles.divBtnHome}>
        <Link to="/home">
          <button className={styles.btnhome} onClick={homeHandler}>
            🏠 Home
          </button>
        </Link>
        {id.length > 6 ? (
          <>
            {/* <Link to={"/update/" + id}>
              <button>🛠 Update</button>
            </Link> */}

            <button className={styles.btndelete} onClick={handleDelete}>
              🗑 Delete
            </button>
          </>
        ) : null}
      </div>

      {recDetail && recDetail.name ? (
        <div className={styles.divgeneral}>
          <h1 className={styles.nameh1}>{recDetail.name}</h1>
          <h2 className={styles.healthScoreh2}>
            Health Score: {recDetail.healthScore}
          </h2>
          <img
            className={styles.detailimg}
            src={recDetail.image}
            alt={recDetail.name}
          />
          <h4 className={styles.cookingh4}>
            Cooking Time: {recDetail.cookingTime}
          </h4>
          <div className={styles.divdiets}>
            <h4 className={styles.dietsh4}>Diets</h4>
            {recDetail.diets?.map((ele, index) => (
              <h3 className={styles.dietsh3} key={index}>
                {ele}
              </h3>
            ))}
          </div>
          {recDetail.steps ? (
            <div className={styles.divsteps}>
              <h4 className={styles.stepsh4}>Steps</h4>
              <div className={styles.divstepspar}>
                <p className={styles.stepspar}>{recDetail.steps}</p>
              </div>
            </div>
          ) : null}
          {recDetail.summary ? (
            <div className={styles.summary}>
              <h4 className={styles.summaryh4}>Summary:</h4>
              <div
                className={styles.summarydivinner}
                dangerouslySetInnerHTML={{ __html: htmlWithoutLinks }}
              ></div>
            </div>
          ) : null}
          <div></div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Detail;
