import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName } from "../../redux/actions/index";
import styles from "./searchbar.module.css";

const SearchBar = (props) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  console.log("aqui", name);

  const updateName = (e) => {
    e.preventDefault();
    const input = e.target.value;

    if (input === "") {
      setName("");
      return;
    }

    const regex = /^[a-zA-Z]+$/;
    if (!regex.test(input)) {
      alert(
        "La entrada de búsqueda no puede estar vacía o contener caracteres especiales"
      );
      return;
    }

    setName(input);
  };

  useEffect(() => {
    dispatch(getRecipeByName(name));
  }, [dispatch, name]);

  return (
    <div className={styles.searchbar}>
      <input
        className={styles.input}
        type="text"
        value={name}
        placeholder="Search . . . 🔎 "
        onChange={updateName}
        // <i class="fa-solid fa-magnifying-glass"></i>
      />
      {/* <span classname={styles.search_icon}>
        <i class="fa-solid fa-magnifying-glass"></i>
      </span> */}
    </div>
  );
};

export default SearchBar;

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getRecipeByName, setCurrentPage } from "../../redux/actions/index";
// import "./searchbar.module.css"

// const SearchBar = (props) => {
//   //check props
//   const dispatch = useDispatch();
//   const allRecipes = useSelector((state) => state.allRecipes);

//   //--------------> LOCAL STATE
//   const [name, setName] = useState("");

//   //--------------------------> HANDLERS <--------------------------

//   const updateName = (e) => {
//     e.preventDefault();
//     // capture the value of the input
//     const input = e.target.value;

//     // if it's empty, set it as an empty string
//     if (input === "") {
//       setName("");
//       return;
//     }

//     // validate the value of the search input
//     const regex = /^[a-zA-Z]+$/; // regular expresion that allows num, leters and space
//     if (!regex.test(input)) {
//       // mostramos el mensaje de alerta solo si el valor del campo de búsqueda no es vacío
//       alert("The search input can not be empty or contain special characters");
//       return;
//     }

//     setName(input);
//   };

//   useEffect(() => {
//     dispatch(getRecipeByName(name));
//   }, [name]);

//   return (
//     <div className="searchBar-wrap">
//       <input
//         type="text"
//         value={name}
//         placeholder="🔎 Search . . ."
//         onChange={updateName}
//       />
//     </div>
//   );
// };

// export default SearchBar;
