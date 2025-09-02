// eslint-disable-next-line
import React from "react";
import { toast } from "react-toastify";
import { favoriteAssistantReq, getAllAssistantUserReq } from "../API/Api";
import { BsStar } from "react-icons/bs";
import { GiStarsStack } from "react-icons/gi";
import { addFavoriteAlert, removeFavoriteAlert } from "../helper/PopupAlert";
const HomePageAssistantCard = ({
  id,
  title,
  brandIcon,
  favorite,
  photo,
  desc,
  packageType,
}) => {
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
        await favoriteAssistantReq({ id, favoriteData });
        await getAllAssistantUserReq();
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
          <div className={`home-assistant-card-${packageType}`}>
            <div className="cart-icon-header-section">
              <div className="chatbot-brand-icon-section">
                {brandIcon}
                <span className="brand-icon-text">{packageType}</span>
              </div>
              <div className="card-button-section">
                <p className="text-center pt-3">
                  {favorite === "like" ? (
                    <GiStarsStack
                      className=""
                      onClick={(e) => handleToggleClick(e, id, "disliked")}
                    />
                  ) : (
                    <BsStar
                      className=""
                      onClick={(e) => handleToggleClick(e, id, "like")}
                    />
                  )}
                </p>
              </div>
            </div>
            <div className="card-text-assistant">
              <div className="card-photo-item-assistant">{photo}</div>
              <h1>{title}</h1>
              <p>{desc}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePageAssistantCard;
