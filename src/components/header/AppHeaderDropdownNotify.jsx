// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import Navigation from "./AdminNotifyMenu";
import { cilBell } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CBadge } from "@coreui/react";
import { getOrderNotifyReq } from "../../API/Api";

const AppHeaderDropdown = () => {
  const totalData = useSelector((state) => state.OrderList.notifyData);
  const td = useSelector((state) => state.OrderList);
  const [showNotify, setShowNotify] = useState(false);
  const getUser = useSelector((state) => state.profile.userData);
  useEffect(() => {
    if (getUser?.[0]?.email && getUser?.[0]?.auth == "user") {
      getOrderNotifyReq(getUser?.[0]?.email);
    } else if (getUser?.[0]?.auth == "admin"){
      getOrderNotifyReq();
    }
  }, [getUser]);
  useEffect(() => {
    if (totalData >= 0) {
      setShowNotify(true);
    } else {
      setShowNotify(false);
    }
  }, [totalData]);

  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="link" id="dropdown-basic">
        <div className="notify-icon">
          <CIcon icon={cilBell} size="lg" />

          {showNotify && (
            <CBadge className="notify-icon-value top-0 start-100 translate-middle p-1">
              {totalData}
            </CBadge>
          )}
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu className="main-drop-dwn">
        <Navigation />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AppHeaderDropdown;
