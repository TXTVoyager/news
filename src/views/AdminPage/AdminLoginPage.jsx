// eslint-disable-next-line
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginApi } from "../../API/Api";
import { toast } from "react-toastify";
import { isEmpty, isEmail } from "../../helper/Validation";
import { topLogo } from "../../assets/index";
import PulseLoader from "react-spinners/PulseLoader";

const AdminLoginPage = () => {
const navigate = useNavigate();
  if(false)
  {
    navigate("/homepage");
    return (<><span>"Error"</span></>);
  }  
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const keepLogin = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (isEmail(email)) {
      toast.error("Email is Required");
    } else if (isEmpty(password)) {
      toast.error("Password Required");
    } else {
      setLoading(true);
      const type="admin"
      LoginApi(email, password, type)
        .then((response) => {
          if (response === true) {
            
            console.log("res",JSON.stringify(response))
            setLoading(false);
            toast.success("Login successfully");
            navigate("/dashboard-admin");
            window.location.reload();
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
      <section className="auth-section login-section ">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-6 login-section-left">
              <div className="login-logo">
                <img src={topLogo}></img>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 login-section-right  admin-login-field bt-5">
              <div className="login-top-title">
                <h2>Sign-in </h2>
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
                Contact Web Admin For an Account or Account Activation Process!
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default AdminLoginPage;
