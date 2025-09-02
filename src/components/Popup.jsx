/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LoginApi } from "../API/Api";
import { toast } from "react-toastify";
import { isEmpty, isEmail } from "../helper/Validation";
import { FaWindowClose } from "react-icons/fa";
import PulseLoader from "react-spinners/PulseLoader";
const Popup = ({ isPopupOpen, onClose }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);

  const keepLogin = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (isEmail(email)) {
      toast.error("Email is Required");
    } else if (isEmpty(password)) {
      toast.error("Password Required");
    } else {
      setLoading(true);
      LoginApi(email, password,"user")
        .then((Result) => {
          if (Result === true) {
            setLoading(false);
            toast.success("Login successfully");
            window.location.href = "/";
          } else {
            setLoading(false);
            toast.error("Failed to Login. Please try again.");
          }
        })
        .catch((error) => {
          setLoading(false);
          toast.error("Request failed. Please try again.");
          console.error(error);
        });
    }
  };

  return (
    <>
      <div className={`popup-container ${isPopupOpen ? "active" : ""}`}>
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
                  <h2>Welcome Back 👏 </h2>
                  <div className="login-sign-up-text">
                    <span>
                      Don't have an account?
                      <Link to="/register/user" className="sign-up-link">
                        Sign-up
                      </Link>
                    </span>
                  </div>
                </div>

                <div className="line-text">
                  <p>login with TXTVIEWS account </p>
                </div>
                <div className="login-input-field">
                  <input
                    type="text"
                    placeholder="Enter Email"
                    id="emailInput"
                    ref={emailRef}
                  />
                  <br></br>
                  <input
                    type="password"
                    placeholder="Enter password"
                    id="passwordInput"
                    ref={passwordRef}
                  />
                </div>
                <div className="checkout-section">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexCheckChecked"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked"
                    >
                      Remember me
                    </label>
                  </div>
                  <div>
                    <Link to="/PageForget" className="forget-password-link">
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="login-button">
                  <button onClick={keepLogin} disabled={loading}>
                    {loading ? (
                      <>
                        <PulseLoader
                          color="#ffffff"
                          size={11}
                          speedMultiplier={1}
                        />
                        <span style={{ marginLeft: "5px" }}></span>
                      </>
                    ) : (
                      "Sign in"
                    )}
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

export default Popup;
