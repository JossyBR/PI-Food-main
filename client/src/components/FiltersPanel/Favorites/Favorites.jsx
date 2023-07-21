import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { removeFromFavs } from "../../../redux/reducer/";
import { Link } from "react-router-dom";
import { removeFromFavs } from "../../../redux/actions/index"
import "./favorites.module.css"

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
      {props.openModal && (
        <div className="ModalFavorite_Overlay">
          <div className="ModalFavorite_Container">
            <div className="ModalFavorite_H2_and_x">
              <h2>My Favorites</h2>
              <button onClick={() => props.handleCloseModal(false)}>❌</button>
            </div>
            <br></br>
            <hr></hr>

            {favorites?.length ? (
              favorites?.map((favorite) => (
                <div className="ModelFavorite_Item-Container">
                  <div
                    key={favorite.id}
                    className="ModalFavorite_TitleContainer"
                  >
                    {favorite.name}
                  </div>
                  <div className="ModalFavorite-Grid">
                    <div className="ModalFavorite_Image">
                      <Link to={`/detail/${favorite.id}`}>
                        <img src={favorite.image} alt={favorite.name} />
                      </Link>
                    </div>

                    <div className="ModalFavorite_info">
                      <p>🫀 {favorite.healthScore}</p>
                      <div className="ModalFavorite_info_buttons">
                        <button onClick={() => handleRemoveFavorites(favorite)}>
                          💔
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="horizontal-line">
                    <hr></hr>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-favorites">You have no favorites yet</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Favorites;