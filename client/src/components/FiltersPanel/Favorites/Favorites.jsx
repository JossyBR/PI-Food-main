import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { removeFromFavs } from "../../../redux/reducer/";
import { Link } from "react-router-dom";
import { removeFromFavs } from "../../../redux/actions/index";
import styles from "./favorites.module.css";

const Favorites = (props) => {
  // const [isFav, setIsFav] = useState(false);

  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  //---------------> Pagination

  const handleRemoveFavorites = (favorite) => {
    dispatch(removeFromFavs(favorite));
  };

  //-------------------------------------------

  return (
    <>
      {/* Se muestra la ventana modal solo si la prop "openModal" es true */}
      {props.openModal && (
        <div className={styles.ModalFavorite_Overlay}>
          <div className={styles.ModalFavorite_Container}>
            <div className={styles.ModalFavorite_H2_and_x}>
              <h2>Mis Favoritos</h2>
              <button onClick={() => props.handleCloseModal(false)}>❌</button>
            </div>
            <br></br>
            <hr></hr>

            {/* Si hay recetas favoritas en la lista, las mostramos */}
            {favorites?.length ? (
              favorites?.map((favorite) => (
                
                // Se renderiza la información de cada receta favorita
                <div className={styles.ModelFavorite_Item_Container}>
                  <div
                    key={favorite.id}
                    className={styles.ModalFavorite_TitleContainer}
                  >
                    {favorite.name}
                  </div>
                  <div className={styles.ModalFavorite_Grid}>
                    <div className={styles.ModalFavorite_Image}>
                      <Link to={`/detail/${favorite.id}`}>
                        <img src={favorite.image} alt={favorite.name} />
                      </Link>
                    </div>

                    <div className={styles.ModalFavorite_info}>
                      <p>🫀 {favorite.healthScore}</p>
                      <div className={styles.ModalFavorite_info_buttons}>
                        <button onClick={() => handleRemoveFavorites(favorite)}>
                          💔
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={styles.horizontal_line}>
                    <hr></hr>
                  </div>
                </div>
              ))
            ) : (
              <div className="styles.no-favorites">
                No tienes favoritos todavia
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Favorites;
