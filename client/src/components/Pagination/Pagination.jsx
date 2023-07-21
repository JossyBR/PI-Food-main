import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/actions/index";
import styles from "./pagination.module.css";

const Pagination = (props) => {
  const dispatch = useDispatch();

  const allRecipes = useSelector((state) => state.recipes);
  const currentPage = useSelector((state) => state.currentPage);

  let pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(allRecipes?.length / props.recipesPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const onPageChange = (pageNo) => {
    dispatch(setCurrentPage(pageNo));
  };

  return (
    <div className={styles.pagination}>
      {pageNumbers?.map((num, i) => (
        <button
          key={i}
          onClick={() => onPageChange(num)}
          className={num === currentPage ? "active" : ""}
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

// import React, { useEffect } from "react";
// // import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setCurrentPage } from "../../redux/actions/index";
// import "./pagination.module.css";

// const Pagination = (props) => {
//   const dispatch = useDispatch();

//   const allRecipes = useSelector((state) => state.recipes);
//   const currentPage = useSelector((state) => state.currentPage);
//   const favorites = useSelector((state) => state.favorites);

//   let pageNumbers = [];
//   for (
//     let i = 1;
//     i <= Math.ceil(allRecipes?.length / props.recipesPerPage);
//     i++
//   )
//     pageNumbers.push(i);

//   //------------------------------> LOCAL STATES -------------------------------

//   const onPageChange = (pageNo) => {
//     dispatch(setCurrentPage(pageNo));
//   };

//   return (
//     <div className="pagination">
//       {pageNumbers?.map(
//         (num, i) => (
//           // num < maxPageNumberLimit + 1 && num > minPageNumberLimit - 1 ? (
//           <button
//             key={i}
//             onClick={() => onPageChange(num)}
//             className={num == currentPage ? "active" : ""}
//           >
//             {num}
//           </button>
//         )
//         // ) : null
//       )}
//     </div>
//   );
// };

// export default Pagination;
