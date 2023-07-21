import React from "react";
import "./filters.module.css";

const Filters = (props) => {
  return (
    <div className="filters-wrap">
      <label className="label">
        <p>Diets</p>
        <span className="custom-dropdown big">
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
      <label className="label">
        By created:
        <span className="custom-dropdown big">
          <select onChange={(e) => props.createdFilterHandler(e)}>
            <option value="api">Recipe Book</option>
            <option value="database">Created</option>
          </select>
        </span>
      </label>
    </div>
  );
};

export default Filters;
