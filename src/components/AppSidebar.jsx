// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSidebarShow, setSidebarUnfoldable } from "../redux/slice/naveSlice";
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";
import { AppSidebarNav } from "./AppSidebarNav";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { getUserDetailsReq } from "../API/Api";
import { topLogo } from "../assets/index";
import userNavigation from "../_user";
import adminNavigation from "../_admin";

const AppSidebar = () => {
  const getUser = useSelector((state) => state.profile.userData);
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebar.sidebarShow);
  const unfoldable = useSelector((state) => state.sidebar.sidebarUnfoldable);
  useEffect(() => {
    getUserDetailsReq();
  }, []);
  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(setSidebarShow(visible));
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <img
          className="sidebar-brand-full img-fluid"
          src={topLogo}
          alt="Logo Sidebar"
          style={{maxHeight:"128px",maxWidth:"128px"}}
        />
      </CSidebarBrand>
      <CSidebarNav>
        {Array.isArray(getUser) &&
          getUser.map((item, id) => (
            <SimpleBar key={id}>
              {item.auth === "user" && item.authPass=="143" && <AppSidebarNav items={userNavigation} />}
              {item.auth === "admin" && (
                <AppSidebarNav items={adminNavigation} />
              )}
            </SimpleBar>
          ))}
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch(setSidebarUnfoldable(!unfoldable))}
      />
    </CSidebar>
  );
};
export default AppSidebar;
