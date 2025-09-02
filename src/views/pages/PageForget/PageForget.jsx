// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { topLogo } from "../../../assets/index";
import { isEmail } from "../../../helper/Validation";
import { verifyEmail } from "../../../API/Api";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";
const PageForget = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const sendOTP = () => {
    const email = emailRef.current.value;
    if (isEmail(email)) {
      toast.error("Email is require");
    } else {
      setLoading(true);
      verifyEmail({ email }).then((result) => {
        if (result === true) {
          setLoading(false);
          navigate("/VerifyOtp");
        }
      });
    }
  };
  return (
    <>
      <section className="auth-section forgat-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-6 login-section-left">
              <div className="login-logo">
                <img src={topLogo}></img>
              </div>
            </div>
            <div className="col-md-12 mt-5  col-lg-6 login-section-right">
              <div className="login-top-title mt-5">
                <h2>Send Your OTP </h2>
                <h4>
                  We will sent a code to your email. Please fill in the field
                  below with the email.
                </h4>
              </div>
              <div className="login-input-field">
                <input
                  type="text"
                  placeholder="Enter your Email"
                  id="emailInput"
                  ref={emailRef}
                />
              </div>
              <div className="login-button">
                <button onClick={sendOTP} disabled={loading}>
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
export default PageForget;
