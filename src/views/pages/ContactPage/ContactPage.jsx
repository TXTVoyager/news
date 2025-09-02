/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useRef, useState, useEffect } from "react";
import { isEmpty, isEmail } from "../../../helper/Validation";
import Footer from "../../../components/Footer";
import { toast } from "react-toastify";
import { massageApi } from "../../../API/Api";
import { TiSocialInstagram } from "react-icons/ti";
import { TfiEmail } from "react-icons/tfi";
import { CiLocationOn } from "react-icons/ci";
import ScaleLoader from "react-spinners/ScaleLoader";
import NavBarNew from "../../../components/Navbar";
import { getToken } from "../../../helper/Session";
import { Link } from "react-router-dom";
import { pageTitle } from "../../../constant/Form";

const ContactPage = () => {
  const isLoggedIn = getToken();
  const emailRef = useRef();
  const nameRef = useRef();
  const massageRef = useRef();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.title = pageTitle;
    return () => document.title = pageTitle; 
  }, [pageTitle]);

  const sendMasses = () => {
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const massage = massageRef.current.value;
    if (isEmail(email)) {
      toast.error("Email is Required");
    } else if (isEmpty(massage)) {
      toast.error("Message Required");
    } else if (isEmpty(name)) {
      toast.error("Name Required");
    } else {
      setLoading(true);
      massageApi(email, name, massage)
        .then((res) => {
          if (res === true) {
            setLoading(false);
            toast.success("Message sent successfully");
            emailRef.current.value = "";
            nameRef.current.value = "";
            massageRef.current.value = "";
          } else {
            setLoading(false);
            toast.error("Failed to send message. Please try again.");
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
      {<NavBarNew/>}
      <section className="contact-page-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8 col-xl-8 ">
              <div className="contact-section-left">
                <div className="contact-top-title">
                  <h2>Don't Hesitate to Contact with Us </h2>
                  <p>
                    Reach out to us at any time and we will be happy to assist
                    you
                  </p>
                </div>
                <div className="login-input-field">
                  <input
                    type="text"
                    placeholder="Name"
                    id="Name"
                    ref={nameRef}
                  />
                  <input
                    type="email"
                    placeholder="Enter email"
                    id="email"
                    ref={emailRef}
                  />
                </div>
                <div className="contact-page-textarea">
                  <textarea
                    id="contact"
                    placeholder="Type your message"
                    ref={massageRef}
                  ></textarea>
                </div>
                <div className="login-button">
                  <button onClick={sendMasses} disabled={loading}>
                    {loading ? (
                      <>
                        <ScaleLoader
                          color="#FFF"
                          height={25}
                          radius={10}
                          width={4}
                        />
                        <span style={{ marginLeft: "5px" }}></span>
                      </>
                    ) : (
                      "Send Massage"
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-4 col-xl-4">
              <div className="contact-information">
                <h3>Support Contact</h3>
                <div className="row">
                  <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 contact-item">
                    <Link to="https://www.instagram.com/txtviews/" target="_blank"><TiSocialInstagram /></Link>
                  </div>
                  <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 contact-item">
                    <h5>Social Media </h5>
                    <p>Insta : <Link to="https://www.instagram.com/txtviews/" target="_blank" style={{ color: '#FFF' }}>@txtviews</Link></p>
                    <p>For quicker and easy resolution we prefer</p><p> you contact us on instagram.</p>
                  </div>

                  <div className="col-2 col-sm-2 col-md-2 col-lg-2 contact-item">
                    <TfiEmail />
                  </div>
                  <div className="col-10 col-sm-10 col-md-10 col-lg-10 contact-item">
                    <h5>Email</h5>
                    <p>contact@txtviews.com</p>
                  </div>
                  <div className="col-2 col-sm-2 col-md-2 col-lg-2 contact-item">
                    <CiLocationOn />
                  </div>
                  <div className="col-10 col-sm-10 col-md-10 col-lg-10 contact-item">
                    <h5>Location</h5>
                    <p>TXTVIEWS</p>
                    <p>Lucknow, India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-footer-section ">
        <Footer />
      </section>
    </>
  );
};
export default ContactPage;
