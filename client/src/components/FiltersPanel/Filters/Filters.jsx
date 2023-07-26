import React from "react";
import styles from "./filters.module.css";

const Filters = (props) => {
  return (
    <div className={styles.filters}>
      <label className={styles.label}>
        <p>Dietas</p>
        <span>
          <select
            defaultValue="--"
            onChange={(e) => props.dietFilterHandler(e)}
          >
            <option value="--">--</option>
            {props.allDiets?.map((el, i) => (
              <option key={i} value={el.name}>
                {el.name}
              </option>
            ))}
          </select>
        </span>
      </label>
      <label className={styles.labell}>
        <p>Para crear: </p>
        <span>
          <select onChange={(e) => props.createdFilterHandler(e)}>
            <option value="api">Libro de Recetas</option>
            <option value="database">Recetas Creadas</option>
          </select>
        </span>
      </label>
    </div>
  );
};

export default Filters;
