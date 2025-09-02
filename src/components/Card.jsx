// eslint-disable-next-line no-unused-vars
import React from "react";
import { toast } from "react-toastify";
import { favoriteTemplateReq, getAllTemplateUserReq } from "../API/Api";
import { FiHeart } from "react-icons/fi";
import { addFavoriteAlert, removeFavoriteAlert } from "../helper/PopupAlert";
const Card = ({ id, title, brandIcon, favorite, photo, desc, packageType }) => {
  const handleToggleClick = async (e, id, favoriteData) => {
    e.stopPropagation();
    try {
      let Result;
      if (favorite === "like") {
        Result = await removeFavoriteAlert();
      } else {
        Result = await addFavoriteAlert();
      }

      if (Result.isConfirmed) {
        await favoriteTemplateReq({ id, favoriteData });
        await getAllTemplateUserReq();
      }
    } catch (error) {
      console.error("Error updating template:", error);
      toast.error("Failed to update template");
    }
  };

  return (
    <>
      <div className="ag-courses_box">
        <div className="ag-courses_item">
          <div className={`card_${packageType}`}>
            <div className="cart-icon-header-section">
              <div className="card-photo-item">{photo}</div>
              <div className="card-button-section">
                <p className="pt-4">
                  {favorite === "like" ? (
                    <FiHeart
                      className=""
                      onClick={(e) => handleToggleClick(e, id, "disliked")}
                    />
                  ) : (
                    <FiHeart
                      className=""
                      onClick={(e) => handleToggleClick(e, id, "like")}
                    />
                  )}
                </p>
              </div>
            </div>
            <div className="card-text">
              <h2>{title}</h2>
              <p>{desc}</p>
              <div className="brand-icon-section">
                {brandIcon}
                <span className="brand-icon-text">{packageType}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Card;
