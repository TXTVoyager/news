// eslint-disable-next-line
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { topLogo, windSfx } from "../assets/index";
import { FaTwitter } from "react-icons/fa6";

const Footer = ({ audioRef, togglePlay }) => {

  
  return (
    <>
      <div className="footer-section">
        <div className="container footer-contain">
          <div className="row justify-content-md-center">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-8 footer-text">
              <h1>TXTVIEWS</h1>
              <h5>
                Innovating the Future: <br />Empowering Content, AI, and Digital Commerce.
              </h5>
              <audio ref={audioRef} src={windSfx} preload="auto" />
              <img src={topLogo} alt="Logo" onClick={togglePlay} />
            </div>
            <div className="d-flex justify-content-center footer-contact-menu">
              <Link to="/Contact">Contact TXTVIEWS</Link>
              <Link to="/TnC">Terms & Condition</Link>
              <Link to="/PrivacyPolicy">Privacy Policy</Link>
              <Link to="/AboutDetails">About TXTVIEWS</Link>
            </div>
            <div className="d-flex justify-content-center">
             
            </div>
          </div>
        </div>
        <div className="footer-copy-right-section">
          <div className="container">

            <div className="row">
              <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                <div className="">
                  <div className="footer-copy-right-text">
                    <Link to="">TXTVIEWS News | © txtviews.com</Link>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                <ul className="social-media-icon">

                  <li key={"sm-linkedin"} className="social-icon">
                    <Link to={"https://www.x.com/txtviewsai"} target="_blank" rel="noopener noreferrer" >
                      <FaTwitter />
                    </Link>
                  </li>

                </ul>
              </div>

              <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                <a className="text-copy-right"> All rights reserved. © 2025</a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
