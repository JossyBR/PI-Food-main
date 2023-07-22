import React from "react";
// import Card from "../Card/Card/";
import Card  from "../Card1/Card";
import styles from "./cards.module.css"

const Cards = (props) => {
  return (
    <div className={styles.cardscontenedor}>
      <div className={styles.cardscontenedor2}>
        {props.currentRecipes?.map((el) => {
          return (
            <Card
              key={el.id}
              id={el.id}
              name={el.name}
              diets={el.diets}
              image={el.image}
              healthScore={el.healthScore}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
