// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isEmpty } from "../../../helper/Validation";
import { PasswordReset, verifyEmail, OTPVerify } from "../../../API/Api";
import { useSelector } from "react-redux";
import { topLogo } from "../../../assets/index";
import PulseLoader from "react-spinners/PulseLoader";

const RestPasswordPage = () => {
  useEffect(() => {
    verifyEmail();
    OTPVerify();
  }, []);
  const [loading, setLoading] = useState(false);
  const email = useSelector((state) => state.profile.Email);
  const OTP = useSelector((state) => state.profile.OTP);
  const Password = useRef();
  const ConfirmPassword = useRef();
  const navigate = useNavigate();
  const setPassword = () => {
    const password = Password.current.value;
    const confirmPassword = ConfirmPassword.current.value;
    if (isEmpty(password)) {
      toast.error("Password is required");
    } else if (isEmpty(confirmPassword)) {
      toast.error("Confirm password is required");
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      setLoading(true);
      PasswordReset(email, OTP, password).then((res) => {
        if (res === true) {
          setLoading(false);
          toast.success("Password updated successfully");
          navigate("/login/item");
        } else {
          setLoading(false);
          toast.error("Failed to update password");
        }
      });
    }
  };

  return (
    <>
      <section className="auth-section login-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-6 login-section-left">
              <div className="login-logo">
                <img src={topLogo}></img>
              </div>
            </div>
            <div className="col-md-12 mt-5  col-lg-6 login-section-right">
              <div className="login-top-title">
                <h2>Rest Password </h2>
                <h4>Set new Password</h4>
              </div>
              <div className="login-input-field">
                <input
                  type="text"
                  value={email}
                  placeholder="Your Email"
                  id="emailInput"
                  readOnly={true}
                />
                <input
                  type="password"
                  placeholder="Enter your Password"
                  id="password"
                  ref={Password}
                />
                <input
                  type="password"
                  placeholder="Enter confirm PAssword"
                  id="emailInput"
                  ref={ConfirmPassword}
                />
              </div>
              <div className="login-button">
                <button onClick={setPassword} disabled={loading}>
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
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default RestPasswordPage;
