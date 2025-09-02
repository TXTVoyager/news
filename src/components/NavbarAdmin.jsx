// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { Link } from "react-router-dom";
import { topLogo, favicon } from "../assets/index";
import Popup from "../components/Popup";
import { getToken } from "../helper/Session";
import { MdOutlineDarkMode } from "react-icons/md";
import { BsBrightnessHighFill } from "react-icons/bs";
import { CHeaderNav } from "@coreui/react";
import AppHeaderDropdown from "../components/header/AppHeaderDropdown";

const NavbarAdmin = () => {
  const token = getToken();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const savedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(savedTheme || "light-theme");

  const toggle = () => {
    const newTheme = theme === "light-theme" ? "dark-theme" : "light-theme";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  
    useEffect(() => {
      document.body.dir = currentLanguage.dir || "ltr";
      document.title = pageTitle;
      var link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = favicon;
    }, [currentLanguage, t]);

  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const [isSticky, setIsSticky] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar
        expand="md"
        className={`navbar-body p-1 ${isSticky ? "sticky" : ""}`}
      >
        <Container>
          <Navbar.Brand>
            <ScrollLink to="top" smooth={true} duration={500}>
              <img src={topLogo} alt="Logo" />
            </ScrollLink>
          </Navbar.Brand>
          <div className="Nave-right-item">
            <Link to="/Admin-dashboard">Admin Dashboard</Link>
            <div className="dark-light-button-nave">
              <button onClick={toggle}>
                {" "}
                {theme === "light-theme" ? (
                  <BsBrightnessHighFill />
                ) : (
                  <MdOutlineDarkMode />
                )}
              </button>
            </div>
            {token ? (
              <CHeaderNav className="ms-3">
                <AppHeaderDropdown />
              </CHeaderNav>
            ) : (
              <div>
                <div className="nave-join-popup" onClick={openPopup}>
                  Join
                </div>
                {isPopupOpen && (
                  <Popup isPopupOpen={isPopupOpen} onClose={closePopup} />
                )}
              </div>
            )}
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarAdmin;
