/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect, useState } from "react";
import { Link, useParams,useLocation } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { LoginApi } from "../../../API/Api";
import { toast } from "react-toastify";
import { isEmpty, isEmail } from "../../../helper/Validation";
import { topLogo } from "../../../assets/index";


const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const location =useLocation();
  const queryParams = new URLSearchParams(location.search);
  const msg = queryParams.get("msg");
  useEffect(() => {
    if(msg){
      toast.success(msg);
    }
  }, []);

  const keepLogin = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (isEmail(email)) {
      toast.error("Email is Required");
    } else if (isEmpty(password)) {
      toast.error("Password Required");
    } else {
      setLoading(true);
      LoginApi(email, password, "user")
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
          toast.error("Request failed. Please try again.");
          console.error(error);
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
            <div className="col-md-12  col-lg-6 login-section-right">
              <i className="text-success">{msg}</i>
              <div className="login-top-title">
                <h2>Welcome Back 👏 </h2>
                <h4>Have we met before? Are we in love?</h4>
              </div>

              <div className="line-text">
                <p>Or continue with </p>
              </div>
              <div className="login-input-field">
                <input
                  type="text"
                  placeholder="Enter Email"
                  id="emailInput"
                  ref={emailRef}
                />
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
              <div className="login-sign-up-text">
                <span>
                  Don't have an account?{" "}
                  <Link to="/register/user" className="sign-up-link">
                    Sign-up
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
