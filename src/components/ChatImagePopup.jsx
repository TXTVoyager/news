import React, { useState, useEffect } from "react";
import getBaseUrl from "../helper/BackendConnect";
import { FaWindowClose, FaChevronLeft, FaChevronRight } from "react-icons/fa";
const BASE_URL = getBaseUrl();
const ChatImagPopup = ({
  isPopupOpen,
  onClose,
  selectedImageId,
  allImageItems,
  email,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const filteredImages = allImageItems.filter((item) => item.email === email);
  useEffect(() => {
    const index = filteredImages.findIndex(
      (item) => item._id === selectedImageId
    );
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [selectedImageId, selectedImageId]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? filteredImages.length - 1 : prevIndex - 1
    );
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === filteredImages.length - 1 ? 0 : prevIndex + 1
    );
  };
  const selectedImage = filteredImages[currentIndex];
  return (
    <div className={`popup-container-image ${isPopupOpen ? "active" : ""}`}>
      <section className="chat-popup-content-image" data-aos="zoom-in">
        <div className="close-button-image">
          <button onClick={onClose}>
            <FaWindowClose />
          </button>
        </div>
        <div className="container ">
          <div className="chat-popup-section">
            <div className="chat-popup-image-item chat-factional-icon">
              {selectedImage && (
                <>
                  <img
                    src={BASE_URL + selectedImage.message}
                    alt="Popup Image"
                  />
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
export default ChatImagPopup;
