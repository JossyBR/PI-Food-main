import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getAllDiets,
  getAllRecipes,
  filterByDiet,
  setCurrentPage,
  filterCreated,
  sortAlphabetically,
  sortByHealthScore,
} from "../../redux/actions/index";

import Filters from "./Filters/Filters";
import Sorters from "./Sorters/Sorters";
import Favorites from "./Favorites/Favorites";
import styles from "./filterspanel.module.css";

const FiltersBar = (props) => {
  const allDiets = useSelector((state) => state.diets);
  const Favs = useSelector((state) => state.favorites);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDiets());
  }, [dispatch]);

  const dietFilterHandler = (e) => {
    dispatch(filterByDiet(e.target.value));
    dispatch(setCurrentPage(1));
  };

  const createdFilterHandler = (e) => {
    dispatch(filterCreated(e.target.value));
    dispatch(setCurrentPage(1));
  };

  const alphSorterHandler = (e) => {
    e.preventDefault();
    dispatch(sortAlphabetically(e.target.value));
    dispatch(setCurrentPage(1));
  };

  const scoreSorterHandler = (e) => {
    e.preventDefault();
    dispatch(sortByHealthScore(e.target.value));
    dispatch(setCurrentPage(1));
  };

  const onClickHandler = (e) => {
    e.preventDefault();
    dispatch(getAllRecipes());
  };

  return (
    <div className={styles.filterspanel}>
      <div>
        <p>Sort</p>
        <Sorters
          className={styles.sorters}
          alphSorterHandler={alphSorterHandler}
          scoreSorterHandler={scoreSorterHandler}
        />
      </div>
      <div className={styles.divfilter}>
        <p>Filtros</p>
        <Filters
          allDiets={allDiets}
          dietFilterHandler={dietFilterHandler}
          createdFilterHandler={createdFilterHandler}
        />
        <button
          className={styles.custom_btn}
          onClick={(e) => onClickHandler(e)}
        >
          🔄 Actualizar Filtros
        </button>
        <Link to="/create">
          <button className={styles.custom_btn}>Crear Receta</button>
        </Link>
        <div>
          <div onClick={handleOpenModal}>
            ❤️
            <span className={styles.custom_btn}>{Favs?.length}</span>
          </div>
          {openModal && (
            <Favorites
              handleCloseModal={handleCloseModal}
              openModal={openModal}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FiltersBar;

// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { Link } from "react-router-dom";
// // import { useState } from "react";

// import {
//   getAllDiets,
//   getAllRecipes,
//   filterByDiet,
//   setCurrentPage,
//   filterCreated,
//   sortAlphabetically,
//   sortByHealthScore,
// } from "../../redux/actions/index";

// import Filters from "./Filters/Filters";
// import Sorters from "./Sorters/Sorters";
// import Favorites from "./Favorites/Favorites";

// const FiltersBar = (props) => {
//   const allDiets = useSelector((state) => state.diets);
//   const Favs = useSelector((state) => state.favorites);
//   const [openModal, setOpenModal] = useState(false);

//   const handleOpenModal = () => {
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };

//   //------------------->  LOCAL STATES <------------------
//   // const [alphOrder, setAlphOrder] = useState("");
//   //   const [scoreOrder, setScoreOrder] = useState("");
//   //--------------------------------------------------------
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getAllDiets());
//   }, []);

//   //----------------------> FILTER HANDLERS <---------------
//   const dietFilterHandler = (e) => {
//     dispatch(filterByDiet(e.target.value));
//     dispatch(setCurrentPage(1)); // if standing on another page thats not 1 directs you to page 1 when filtering
//     // setAlphOrder("");
//     //     setScoreOrder("");
//   };

//   const createdFilterHandler = (e) => {
//     dispatch(filterCreated(e.target.value));
//     dispatch(setCurrentPage(1));
//     // setAlphOrder("");
//     // setScoreOrder("");
//   };

//   //--------------------------> SORT HANDLERS <-----------------

//   const alphSorterHandler = (e) => {
//     e.preventDefault();
//     dispatch(sortAlphabetically(e.target.value));
//     dispatch(setCurrentPage(1));
//     // setAlphOrder(`Ordered ${e.target.value}`);
//   };

//   const scoreSorterHandler = (e) => {
//     e.preventDefault();
//     dispatch(sortByHealthScore(e.target.value));
//     dispatch(setCurrentPage(1));
//     // setScoreOrder(`Ordered${e.target.value}`);
//   };
//   //-----------------------------------------------------------------

//   const onClickHandler = (e) => {
//     e.preventDefault();
//     dispatch(getAllRecipes());
//   };

//   return (
//     <div>
//       {/* SORTERS */}
//       <div className="sort-group">
//         <p className="label">Sort</p>
//         <Sorters
//           alphSorterHandler={alphSorterHandler}
//           scoreSorterHandler={scoreSorterHandler}
//         />
//       </div>
//       {/* FILTERS */}
//       <div>
//         <p className="label">Filter</p>
//         <Filters
//           allDiets={allDiets}
//           dietFilterHandler={dietFilterHandler}
//           createdFilterHandler={createdFilterHandler}
//         />
//         <button
//           className="custom-btn btn-home"
//           onClick={(e) => onClickHandler(e)}
//         >
//           🔄
//         </button>

//         <Link to="/create">
//           <button className="custom-btn btn-home">Create Recipe</button>
//         </Link>
//         <div>
//           <div className="custom-btn btn-home" onClick={handleOpenModal}>
//             ❤️
//             <span>{Favs?.length}</span>
//           </div>
//           {openModal && (
//             <Favorites
//               handleCloseModal={handleCloseModal}
//               openModal={openModal}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FiltersBar;
