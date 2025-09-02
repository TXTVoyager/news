// eslint-disable-next-line
import React, { useEffect, useState, useRef } from "react";
import { Container, Navbar, Nav, Row, Col, NavDropdown, Button } from "react-bootstrap";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import cookies from "js-cookie";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { useTranslation } from "react-i18next";
import { languages, pageTitle } from "../constant/Form";
import { Link } from "react-router-dom";
import { topLogoAI, windSfx, favicon } from "../assets/index";
import Popup from "./Popup";
import { getToken } from "../helper/Session";
import { MdOutlineDarkMode } from "react-icons/md";
import { BsBrightnessHighFill } from "react-icons/bs";
import { CHeaderNav } from "@coreui/react";
import { useNavigate } from "react-router-dom";
import AppHeaderDropdown from "./header/AppHeaderDropdown";
import { FaBasketShopping, FaBrain, FaMoneyBill } from "react-icons/fa6";
import { HiHome } from "react-icons/hi";

const NavBar = ({ audioRef, togglePlay }) => {
  const token = getToken();
  const navigate = useNavigate();
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

  const assistant = async () => {
    if (!token) {
      navigate("/login/item");
      return;
    }
    navigate("/AI-Assistant");
  };
  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };
  const [flagName, setFlagName] = useState(
    localStorage.getItem("language") || "en"
  );
  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();


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


  useEffect(() => {
    localStorage.setItem("language", flagName);
  }, [flagName]);

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
        expand={true}
        className={`navbar-body p-1 ${isSticky ? "sticky" : ""}`}
      >

        <Container>
          <Navbar.Brand className="mx-1 my-0">
            <audio ref={audioRef} src={windSfx} preload="auto" />
            <img src={topLogoAI} alt="Logo" onClick={togglePlay} />
          </Navbar.Brand>

          <Nav className="nave-item-top text-center">
            <Link to="/"><HiHome /> News</Link>
            <Link to="https://ai.txtviews.com"><FaBrain /> AI</Link>
            <Link to="https://store.txtviews.com" target="_blank">
              <FaBasketShopping /> Store
            </Link>
          </Nav>


          <div className="Nave-right-item">

            <div className="dark-light-button-nave">
              <button onClick={toggle}>
                {" "}
                {theme === "light-theme" ? (
                  <BsBrightnessHighFill />
                ) : (
                  <MdOutlineDarkMode />
                )}
              </button>
              {"  "}
            </div>

            {/* {token ? (
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
            )} */}
          </div>
        </Container>
      </Navbar >

      {/* <Navbar bg="dark" variant="dark" expand="md" sticky="top">
        <Container>
        
            <div className="d-flex justify-content-center w-100">
              <Navbar.Brand href="#home" className="mx-auto">Brand</Navbar.Brand>
            </div>

            
            <div className="d-flex justify-content-between w-100 mt-2">
              <Navbar.Toggle aria-controls="navbar-nav" /> 
              <Navbar.Collapse id="navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="#services">Services</Nav.Link>
                  <Nav.Link href="#about">About</Nav.Link>
                  <NavDropdown title="More" id="navbar-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something else</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Nav>
                  <Nav.Link href="#contact">Contact</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </div>
        </Container>
      </Navbar> */}
    </>
  );
};

export default NavBar;
