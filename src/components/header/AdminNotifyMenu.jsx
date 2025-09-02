// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BsClipboardCheck } from "react-icons/bs";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { CBadge } from "@coreui/react";
import { getOrderNotifyReq } from "../../API/Api";
import { useSelector } from "react-redux";

const AdminNotifyMenu = () => {
  const totalData = useSelector((state) => state.OrderList.notifyData);
  const getUser = useSelector((state) => state.profile.userData);
  const td = useSelector((state) => state.OrderList);
  useEffect(() => {
    if (getUser?.[0]?.email && getUser?.[0]?.auth == "user") {
      getOrderNotifyReq(getUser?.[0]?.email);
    } else if (getUser?.[0]?.auth == "admin"){
      getOrderNotifyReq();
    }
  }, [getUser]);
  return (
    <>
      <ul className="nave-dropdown-menu">
        <li>
          <Link to={getUser?.[0]?.auth == "admin"?"/OrderListPage":"/userOrders"}>

            <FaShoppingCart />
            <span>New Order</span>
            <CBadge className="badge-menu-dropdown-notify">
              {totalData}
            </CBadge>

          </Link>
        </li>
        {getUser?.[0]?.auth == "admin"?(<li>
          <Link to="/AllUserDataList">
            <FaUser />
            <span>New User</span>
            <CBadge className="badge-menu-dropdown-notify">
              {totalData}
            </CBadge>
          </Link>
        </li>):null}
      </ul>
    </>
  );
};

export default AdminNotifyMenu;
