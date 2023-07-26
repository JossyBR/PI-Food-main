import React from "react";
import styles from "./empty.module.css";

const Empty = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <h3>¡Oops!</h3>
        <p>No se encontró ninguna receta.</p>
      </div>
    </div>
  );
};

export default Empty;
