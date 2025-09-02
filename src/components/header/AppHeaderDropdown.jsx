// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import Navigation from "./userMenu";
import AdminDropdownMenu from "./adminMenu";
import { getUserDetailsReq } from "../../API/Api";

const AppHeaderDropdown = () => {
  const getUser = useSelector((state) => state.profile.userData);
  const [user, setUser] = useState(getUser[0] || {});

  useEffect(() => {
    getUserDetailsReq();
  }, []);

  useEffect(() => {
    setUser(getUser[0] || {});
  }, [getUser]);

  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="link" id="dropdown-basic">
        <img src={user.image} alt="User Avatar" className="avatar img-fluid" />
      </Dropdown.Toggle>
      <Dropdown.Menu className="main-drop-dwn">
        {Array.isArray(getUser) &&
          getUser.map((item, id) => (
            <span key={id}>
              {item.auth === "user" && <Navigation />}
              {item.auth === "admin" && <AdminDropdownMenu />}
            </span>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AppHeaderDropdown;
