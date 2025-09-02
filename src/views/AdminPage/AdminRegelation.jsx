// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterApi } from "../../API/Api";
import { isEmpty, isEmail } from "../../helper/Validation";
import { toast } from "react-toastify";
import { topLogo } from "../../assets/index";
import PulseLoader from "react-spinners/PulseLoader";
import { editUser } from "../../constant/Form";

const AdminRegelation = () => {
  const navigate = useNavigate();
  const getUser = useSelector((state) => state.profile.userData);
    if(getUser?.[0]?.auth!="admin" || getUser?.[0]?.email!=editUser)
    {
      navigate("/homepage");
      return (<><span>"Error"</span></>);
    }
  const [loading, setLoading] = useState(false);
  const nameRef = useRef();
  const userRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const sendData = () => {
    const name = nameRef.current.value;
    const userName = userRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const auth = "admin";

    if (isEmpty(name)) {
      toast.error("name is Required");
    } else if (isEmpty(userName)) {
      toast.error("User Name is Required");
    } else if (isEmail(email)) {
      toast.error("Email is Required");
    } else if (isEmpty(password)) {
      toast.error("password Required");
    } else {
      setLoading(true);
      RegisterApi(name, userName, email, auth, password)
        .then((Result) => {
          if (Result === true) {
            setLoading(false);
            toast.success("Data saved successfully");
            navigate("/admin-login");
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
      <section className="auth-section registration-section pt-5">
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
                <h4>Please Sign Up For a known batter.</h4>
              </div>
              <div className="login-input-field">
                <input
                  type="text"
                  placeholder="Full Name"
                  id="name"
                  ref={nameRef}
                />
                <input
                  type="text"
                  placeholder="User Name"
                  id="userName"
                  ref={userRef}
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
                  <Link to="/admin-login" className="sign-up-link">
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

export default AdminRegelation;
