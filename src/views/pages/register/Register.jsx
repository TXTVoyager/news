// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterApi } from "../../../API/Api";
import { isEmpty, isEmail } from "../../../helper/Validation";
import { toast} from "react-toastify";
import { topLogo } from "../../../assets/index";
import PulseLoader from "react-spinners/PulseLoader";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const nameRef = useRef();
  const userRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const sendData = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const auth = "user";
    if (isEmpty(name)) {
      toast.error("name is Required");
    } else if (isEmail(email)) {
      toast.error("Email is Required");
    } else if (isEmpty(password)) {
      toast.error("password Required");
    } else {
      setLoading(true);
      RegisterApi(name, email, auth, password)
        .then((res) => {
          if (res.status === 200) {
            setLoading(false);
            toast.success("Data saved successfully");
            navigate("/login/item");
          }else if(res === 400){
            setLoading(false);
            toast.error("Already in Use or marked for deletion! Register with Unique Email")
          } else {
            setLoading(false);
            toast.error("Failed to save data. Please try again.");
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
      <section className="auth-section registration-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-6 login-section-left">
              <div className="login-logo">
                <img src={topLogo}></img>
              </div>
            </div>

            <div className="col-md-12  col-lg-6 login-section-right">
              <div className="login-top-title">
                <h2>Register </h2>
              </div>


              <div className="line-text">
                <p>continue with TXTVIEWS account</p>
              </div>
              <div className="login-input-field">
                <input
                  type="text"
                  placeholder="Full Name"
                  id="name"
                  ref={nameRef}
                />
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  ref={emailRef}
                />
                <input
                  type="password"
                  placeholder="Password"
                  id="passwordInput"
                  ref={passwordRef}
                />
              </div>
              <div className="login-button">
                <button onClick={sendData} disabled={loading}>
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
                    "Sign Up"
                  )}
                </button>
              </div>

              <div className="login-sign-up-text">
                <span>
                  Already have an account?{" "}
                  <Link to="/login/item" className="sign-up-link">
                    Login
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

export default Register;
