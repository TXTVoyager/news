// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSidebarShow } from "../redux/slice/naveSlice";
import { MdOutlineDarkMode } from "react-icons/md";
import { BsBrightnessHighFill } from "react-icons/bs";
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { AppBreadcrumb } from "./index";
import { AppHeaderDropdown, AppHeaderDropdownNotify } from "./header/index";
import { topLogo } from "../assets/index";
import { cilMenu } from "@coreui/icons";

const AppHeader = () => {
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

  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebar.sidebarShow);
  return (
    <CHeader position="sticky">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch(setSidebarShow(!sidebarShow))}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <img src={topLogo} alt="Logo" className="img-fluid" size="lg"/>
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink component={NavLink}>Dashboard</CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <div className="dark-light-button-nave-admin">
              <button onClick={toggle}>
                {" "}
                {theme === "light-theme" ? (
                  <BsBrightnessHighFill />
                ) : (
                  <MdOutlineDarkMode />
                )}
              </button>
            </div>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <AppHeaderDropdownNotify />
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  );
};
export default AppHeader;
