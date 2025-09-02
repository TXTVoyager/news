/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaWindowClose } from "react-icons/fa";
import confetti from "canvas-confetti";
const salesCode="SUMMERTXTVIEWS10"
const PopupSales = ({ isPopupOpenSales, onClose }) => {
  
  const [loading, setLoading] = useState(false);
  
  const copyCode = ()=>{
    console.log('copy the sales code')
    navigator.clipboard.writeText(salesCode)
    toast.success(`Code "${salesCode}" Copied!`);
    onClose();
    getRejoice();
  }
  
  
  return (
    <>
      <div className={`popup-container ${isPopupOpenSales ? "active" : ""}`}>
        <section
          className="popup-login-section popup-content "
          data-aos="zoom-in"
        >
          <div className="container">
            <div className="row">
              <div className="close-button">
                <button onClick={onClose}>
                  <FaWindowClose />
                </button>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 popup-login-sectio">
                <div className="popup-login-top-title mb-4">
                  <h2>TXTVIEWS NEWS Annnouncements & Sales!!!</h2>
                  <div className="login-sign-up-text">
                    <span>
                      Use the coupon code below to get ADDITIONAL <b>10% OFF</b> on <b>NEW</b> products! 🚀
                    </span>
                  </div>
                </div>
                
                <div className="line-text">
                  <p>click below to COPY the coupon code </p>
                </div>
                
                
                <div className="login-button">
                  <button onClick={copyCode}>
                      {salesCode}
                  </button>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PopupSales;
