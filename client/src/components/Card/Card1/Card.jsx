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
      <Link className={styles.cardlink} to={`/detail/${props.id}`}>
        <div key={props.id}></div>
        <img className={styles.cardimg} src={props.image} alt={props.name} />
        <header className={styles.cardheader}>
          <h3 className={styles.cardh3}>{props.name}</h3>
        </header>
        <footer className={styles.cardfooter}>
          <span>
            <h2>🫀 {props.healthScore}</h2>
          </span>
          <span className={styles.carddietas}>
            {props.diets?.map((el, i) => (
              <p key={i}>{el}</p>
            ))}
          </span>
        </footer>
      </Link>
      <div className={styles.cardfav}>
        {isFav ? (
          <button className={styles.card_btn} onClick={handleRemoveFavorites}>
            ❤️
          </button>
        ) : (
          <button onClick={handleAddFavorites}>💛</button>
        )}
      </div>
    </div>
  );
};

export default Card;
