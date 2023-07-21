import React from "react";
import "./sorters.module.css";

const Sorters = (props) => {
  //const dispatch = useDispatch();

  // const currPage = useSelector((state) => state.currentPage);

  /* always a value - allows us to create conditionals */
  return (
    <div>
      {/* <div className="alph"> */}
      <p>A - Z 📘</p>
      <label>
        <span>
          <select
            defaultValue="--"
            onChange={(e) => props.alphSorterHandler(e)}
          >
            <option value="--">--</option>
            <option value="a-z">a - z</option>
            <option value="z-a">z - a</option>
          </select>
        </span>
      </label>
      <label>
        <p>Health Score 🫀</p>
        <span>
          <select
            defaultValue="--"
            onChange={(e) => props.scoreSorterHandler(e)}
          >
            <option value="--">--</option>
            <option value="min-max">min - max</option>
            <option value="max-min">max - min</option>
          </select>
        </span>
      </label>
      {/* </div> */}
    </div>
  );
};

export default Sorters;
