// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import getBaseUrl from "../helper/BackendConnect";
import { FaWindowClose, FaChevronLeft, FaChevronRight } from "react-icons/fa";
const BASE_URL = getBaseUrl();
const ImagePopup = ({
  isPopupOpen,
  onClose,
  selectedImageId,
  allImageItems,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const index = allImageItems.findIndex(
      (item) => item._id === selectedImageId
    );
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [selectedImageId, allImageItems]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? allImageItems.length - 1 : prevIndex - 1
    );
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === allImageItems.length - 1 ? 0 : prevIndex + 1
    );
  };
  const selectedImage = allImageItems[currentIndex];
  return (
    <div className={`popup-container-image ${isPopupOpen ? "active" : ""}`}>
      <section className="chat-popup-content-image" data-aos="zoom-in">
        <div className="close-button-image">
          <button onClick={onClose}>
            <FaWindowClose />
          </button>
        </div>
        <div className="container">
          <div className="chat-popup-section">
            <div className="chat-popup-image-item">
              {selectedImage && (
                <>
                  {selectedImage.image && (
                    <img
                      src={BASE_URL + selectedImage.image}
                      alt="Popup Image"
                    />
                  )}
                  {selectedImage.url && (
                    <img src={BASE_URL + selectedImage.url} alt="Popup Image" />
                  )}
                  <div
                    className="prev chat-image-icon-arrow"
                    onClick={handlePrev}
                  >
                    <FaChevronLeft />
                  </div>
                  <div
                    className="next chat-image-icon-arrow"
                    onClick={handleNext}
                  >
                    <FaChevronRight />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImagePopup;
