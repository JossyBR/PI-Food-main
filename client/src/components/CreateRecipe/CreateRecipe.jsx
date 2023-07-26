import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import validate from "./validate";
import { Link } from "react-router-dom";
import { postRecipe, getAllDiets } from "../../redux/actions/index";
import styles from "./createRecipe.module.css";

export const CreateRecipe = (props) => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.allRecipes);
  const diets = useSelector((state) => state.diets);
  const history = useHistory();

  const [input, setInput] = useState({
    name: "",
    summary: "",
    healthScore: 10,
    cookingTime: 20,
    image: "",
    diets: [],
    steps: "",
  });
  const [errorInput, setErrorInput] = useState({
    name: "",
    summary: "",
    healthScore: 0,
    cookingTime: 0,
    image: "",
    diets: [],
    steps: "",
  });

  useEffect(() => {
    dispatch(getAllDiets());
  }, [dispatch]);

  ///"handleCheckChange" se utiliza para manejar el cambio de estado de los campos de tipo checkbox que seleccionan las dietas de la receta. Actualiza el estado de "input" y "errorInput" con la nueva información.
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      // Si fue marcado, actualiza el estado "input" añadiendo la dieta seleccionada al array de "diets"
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });

      setErrorInput(
        // Realiza la validación de los campos del formulario, incluyendo la nueva dieta seleccionada
        validate({
          ...input,
          diets: [...input.diets, e.target.value],
        })
      );
    } else {
      setInput({
        ...input,
        diets: input.diets.filter((t) => t !== e.target.value),
      });

      // Realiza la validación de los campos del formulario, excluyendo la dieta deseleccionada
      setErrorInput(
        validate(
          {
            ...input,
            diets: input.diets.filter((t) => t !== e.target.value),
          },
          [...allRecipes]
        )
      );
    }
  };

  ///"handleChange" se utiliza para manejar el cambio de estado de los demás campos de "input". Actualiza el estado de "input" y "errorInput" con la nueva información.
  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
    setErrorInput(
      validate({ ...input, [event.target.name]: event.target.value })
    );
  };

  ///"handleSubmit" se utiliza para manejar el envío del formulario. Valida la información de "input" y, si es válida, envía una acción de "postRecipes" al almacenamiento de Redux y navega a la página principal.
  const handleSubmit = (event) => {
    event.preventDefault();
    if (allRecipes.find((ele) => ele.name === input.name)) {
      alert("Esta receta ya existe");
      return;
    }

    dispatch(postRecipe(input));
    setInput({
      ...input,
      name: "",
      summary: "",
      healthScore: 10,
      cookingTime: 0,
      image: "",
      diets: [],
      steps: "",
    });
    alert("Su receta fue creada con éxito");
    history.push("/home");
  };

  return (
    <div className={styles.divForm}>
      <div>
        <div className={styles.divBtnHome}>
        <Link to="/home">
          <button className={styles.btnhome}>🏠 Home</button>
        </Link>
        </div>
        

        <h1 className={styles.h1Sesion}>Crea tu Propia Receta 📝</h1>

        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.divform}>
            <p>* Campos obligatorios</p>
            <label className={styles.labels}>Nombre: *</label>
            <input
              type="text"
              name="name"
              placeholder="✏️ Nombre de tu receta..."
              value={input.name}
              onChange={(e) => handleChange(e)}
              className={styles.input}
            />
            {errorInput.name ? (
              <span className={styles.error}>{errorInput.name}</span>
            ) : (
              <span></span>
            )}
            <label className={styles.labels}>Descripción: *</label>
            <textarea
              type="text"
              name="summary"
              placeholder="✏️ Describe brevemente tu receta..."
              value={input.summary}
              onChange={(e) => handleChange(e)}
              className={styles.textarea}
            />
            {errorInput.summary ? (
              <span className={styles.error}>{errorInput.summary}</span>
            ) : (
              <span></span>
            )}
            <label className={styles.labels}>Health Score: 🫀</label>
            <input
              type="number"
              name="healthScore"
              placeholder="✏️ ..."
              value={input.healthScore}
              onChange={(e) => handleChange(e)}
              className={styles.input}
            />

            {errorInput.healthScore ? (
              <span className={styles.error}>{errorInput.healthScore}</span>
            ) : (
              <span></span>
            )}
            <label className={styles.labels}>Cooking Time: ⏰</label>
            <input
              type="number"
              name="cookingTime"
              placeholder="✏️ ..."
              value={input.cookingTime}
              onChange={(e) => handleChange(e)}
              className={styles.input}
            />

            {errorInput.cookingTime ? (
              <span className={styles.error}>{errorInput.cookingTime}</span>
            ) : (
              <span></span>
            )}
            <label>Image:</label>
            <input
              type="text"
              name="image"
              placeholder="
              Insertar una URL de imagen..."
              value={input.image}
              onChange={(e) => handleChange(e)}
              className={styles.input}
            />
            {errorInput.image ? (
              <span className={styles.error}>{errorInput.image}</span>
            ) : (
              <span></span>
            )}
            <label className={styles.labels}>Cooking instructions:</label>
            <textarea
              type="text"
              name="steps"
              placeholder="✏️ ..."
              value={input.steps}
              onChange={(e) => handleChange(e)}
              className={styles.textarea}
            />
            {errorInput.steps ? (
              <span className={styles.error}>{errorInput.steps}</span>
            ) : (
              <span></span>
            )}
            {!Object.entries(errorInput).length ? (
              <button className={styles.btncrear} type="submit">
                Crear Receta
              </button>
            ) : (
              <div className={styles.butcampos}>
                <button className={styles.btncrear} type="submit" disabled>
                  Crear Receta
                </button>
                <span className={styles.error}>
                  Campos obligatorios incompletos
                </span>
              </div>
            )}
          </div>

          <div className={styles.divdietas}>
            <label>Dietas:</label>
            <div className={styles.divdietasdetail}>
              {Array.isArray(diets) &&
                diets.map((element, index) => {
                  return (
                    <label key={index}>
                      <input
                        key={element.id}
                        type="checkbox"
                        value={element.name}
                        name={element.name}
                        onChange={handleCheckboxChange}
                      />
                      {element.name}
                    </label>
                  );
                })}
              {errorInput.diets ? (
                <span className={styles.error}>{errorInput.diets}</span>
              ) : (
                <span></span>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
