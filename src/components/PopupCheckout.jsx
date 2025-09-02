/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaWindowClose } from "react-icons/fa";
import confetti from "canvas-confetti";
import { topLogo } from "../assets";
const salesCode="NEWANDHOT15"
const PopupCheckout = ({ isPopupOpenSales, onClose }) => {
  
  const [loading, setLoading] = useState(false);

  const getRejoice= () => {
    const animationDuration = 7000;
    const count = 200;
    const fire = (particleRatio, opts) => {
      confetti({
        particleCount: Math.floor(count * particleRatio),
        ...opts,
      });
    };
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    const timer = setTimeout(() => {
      confetti.reset();
    }, animationDuration);

    return () => {
      clearTimeout(timer);
    };
  };

  
  
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
            {getRejoice()}
            <div className="row">
              <div className="close-button">
                <button onClick={onClose}>
                  <FaWindowClose />
                </button>
              </div>
              
              <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 popup-login-sectio">
                <div className="popup-login-top-title mb-4">
                  <h2>TXTVIEWS - Sales!!! 👏  </h2>
                  <div className="login-sign-up-text">
                    <span>
                      Use the coupon code below and get ADDITIONAL <b>10% OFF</b> on <b>NEW</b> products being listed! 🚀
                      <Link to="/register/user" className="sign-up-link">
                        Sign-up
                      </Link>
                    </span>
                  </div>
                </div>
                
                
                <div className="line-text">
                  <p>click below to COPY the coupon code </p>
                </div>
                
                
                <div className="login-button">
                  <button onClick={copyCode}>
                      {"NEWANDHOT15"}
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

export default PopupCheckout;
