import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavs, removeFromFavs } from "../../../redux/actions/index";
import styles from "./card.module.css";

const Card = (props) => {
  console.log(props.id);
  const dispatch = useDispatch();
  //------------------> LOCAL STATES
  const favs = useSelector((state) => state.favorites);

  const [isFav, setIsFav] = useState(false);

  const handleAddFavorites = () => {
    dispatch(addToFavs(props));
    setIsFav(true);
  };

  const handleRemoveFavorites = () => {
    if (isFav) {
      dispatch(removeFromFavs(props));
      setIsFav(false);
    }
  };

  useEffect(() => {
    setIsFav(favs?.some((fav) => fav.id === props.id));
  }, [favs, props.id]);

  return (
    <div className={styles.cardcontenedor}>
      <Link to={`/detail/${props.id}`}>
        <div key={props.id}></div>
        <img src={props.image} alt={props.name} />
        <header>
          <h3>{props.name}</h3>
        </header>
        <footer>
          <span>
            <h2>🫀 {props.healthScore}</h2>
          </span>
          <span>
            {props.diets?.map((el, i) => (
              <p key={i}>👉 {el}</p>
            ))}
          </span>
        </footer>
      </Link>
      <div>
        {isFav ? (
          <button onClick={handleRemoveFavorites}>❤️</button>
        ) : (
          <button onClick={handleAddFavorites}>💛</button>
        )}
      </div>
    </div>
  );
};

export default Card;
