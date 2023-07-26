import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes } from "../../redux/actions/index";
import SearchBar from "../SearchBar/SearchBar";
import Pagination from "../Pagination/Pagination";
import FiltersPanel from "../FiltersPanel/FiltersPanel";
import Loading from "../Loading/Loading";
import Cards from "../Card/Cards/Cards";
import Empty from "../Empty/Empty";
import Footer from "../Footer/Footer";
import styles from "./home.module.css";

const Home = () => {
  const dispatch = useDispatch();

  const allRecipes = useSelector((state) => state.recipes);
  // const favorites = useSelector((state) => state.favorites);
  const currentPage = useSelector((state) => state.currentPage);

  const [loading, setLoading] = useState(false);

  //setRecipesPerPage
  const [recipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage; //9indice de la ultima receta que se mostrara en la pagina actual.
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; //9- 2indice de la primera receta que se mostrara en la pagina actual.

   // Obtener las recetas que se mostrarán en la página actual
  const currentRecipes = allRecipes
    ? allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
    : [];


  useEffect(() => {
    setLoading(true);
    dispatch(getAllRecipes()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  return (
    <div className={styles.contenedor}>
      <div className={styles.home}>
        <div className={styles.search_home}>
          <div>
            <h1 className={styles.foodh1}>FOOD API</h1>
          </div>
          <SearchBar />
          {/* <SearchBar currentRecipes={currentRecipes} /> */}
        </div>
      </div>

      <div className={styles.header}></div>

      <div className={styles.home}>
        <div className={styles.paginacion_home}>
          <Pagination recipesPerPage={recipesPerPage} />
        </div>

        <div className={styles.div_fil_foo}>
          <div className={styles.filterpanel_home}>
            <FiltersPanel />
          </div>

          <div className={styles.cargando_home}>
            {loading ? (
              <Loading />
            ) : currentRecipes.length === 0 ? (
              <Empty />
            ) : (
              <>
                <Cards currentRecipes={currentRecipes} />
              </>
            )}
          </div>
        </div>
      </div>
      <div className={styles.footer_home}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;

// import React from "react";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllRecipes } from "../../redux/actions/index";
// import SearchBar from "../SearchBar/SearchBar";
// import Pagination from "../Pagination/Pagination";
// import FiltersPanel from "../FiltersPanel/FiltersPanel"
// import Loading from "../Loading/Loading";
// import Cards from "../Card/Cards";
// import Empty from "../Empty/Empty";
// import Footer from "../Footer/Footer";
// import "./home.module.css";

// const Home = () => {
//   const dispatch = useDispatch();

//   //same as mapStateToProps
//   //all that it's in the recipes state contained in a constant
//   //-------------------------->GLOBAL STATES

//   const allRecipes = useSelector((state) => state.recipes);
//   const favorites = useSelector((state) => state.favorites);
//   const currentPage = useSelector((state) => state.currentPage);
//   const [loading, setLoading] = useState(false);

//   //---------------------------> PAGINATION <-------------------------------

//   // const [currentPage, setCurrentPage] = useState(1); BETTER AS A GLOBAL STATE
//   const [recipesPerPage, setRecipesPerPage] = useState(9);
//   const indexOfLastRecipe = currentPage * recipesPerPage; // 8
//   const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; //0

//   const currentRecipes = allRecipes?.slice(
//     indexOfFirstRecipe,
//     indexOfLastRecipe
//   );

//   //  function refreshPage() {
//   //   window.location.reload();
//   // }
//   //instead of componentDidMount
//   //brings all the recipes in the state when the component gets rendered
//   useEffect(() => {
//     setLoading(true);
//     dispatch(getAllRecipes()).then(() => {
//       setLoading(false);
//     });
//   }, []); //second parameter the dependency as long as [...] is there (USE DISPATCH TO AVOID THE WARNIG)

//   // if (allRecipes?.length === 0) {
//   //   return <h1>Loading....</h1>;
//   // }

//   return (
//     <div>
//       {/* SEARCH BAR */}
//       <SearchBar currentRecipes={currentRecipes} />

//       <div>
//         <Pagination recipesPerPage={recipesPerPage} />
//       </div>
//       <div>
//         <div >
//           {/* SIDE PANELS */}
//           <FiltersPanel />
//         </div>

//         <div>
//           {/* CARDS, PAGINATION, EMPTY VIEW */}
//           {loading ? (
//             <Loading />
//           ) : currentRecipes.length === 0 ? (
//             <Empty />
//           ) : (
//             <>
//               <Cards currentRecipes={currentRecipes} />
//             </>
//           )}
//           <div>
//             <Footer />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
