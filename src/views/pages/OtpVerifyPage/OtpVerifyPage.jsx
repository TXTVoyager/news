
/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { toast} from "react-toastify";
import { OTPVerify } from "../../../API/Api";
import ReactCodeInput from "react-code-input";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { topLogo } from "../../../assets/index";
import PulseLoader from "react-spinners/PulseLoader";

const OtpVerifyPage = () => {
  const profileData = useSelector((state) => state.profile.Email);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [OTP, setOtp] = useState("");
  const OtpSend = () => {
    setLoading(true);
    if (OTP.length === 6) {
      OTPVerify(profileData,OTP)
      .then((result) => {
        if (result === true) {
          setLoading(false);
          navigate("/RestPassword");
        }
      });
    } else {
      toast.error("OTP  MUST 6 digits");
    }
  };
  const inputStyleInvalid = {
    fontFamily: "monospace",
    margin: "10px",
    MozAppearance: "textfield",
    width: "70px",
    borderRadius: "5px",
    fontSize: "25px",
    height: "56px",
    fontWeight: 700,
    paddingLeft: "30px",
    backgroundColor: "#F4F2FF",
    color: "black",
  };
  return (
    <>
      <section className="auth-section otp-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-6 login-section-left">
              <div className="login-logo">
                <img src={topLogo}></img>
              </div>
            </div>
            <div className="col-md-12 mt-5  col-lg-6 login-section-right">
              <div className="login-top-title mr-5">
                <h2>Verify Your OTP </h2>
                <h4>
                  We will sent a code to your email. Please fill in the field
                  below with the code{" "}
                </h4>
              </div>
              <div className="login-input-field">
                <ReactCodeInput
                  onChange={(value) => setOtp(value)}
                  inputStyle={inputStyleInvalid}
                  fields={6}
                />
              </div>
              <div className="login-button">
                <button onClick={OtpSend} disabled={loading}>
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
              <div className="sinUp-link-item">
                <p>
                  Don't get OTP? <Link to="/PageForget">agin Send</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default OtpVerifyPage;
