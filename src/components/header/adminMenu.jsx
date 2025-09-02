// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import { removeSessions } from "../../helper/Session";
import { FiLogOut } from "react-icons/fi";
import { CiBadgeDollar } from "react-icons/ci";
import { BiUserPin } from "react-icons/bi";
import { BsClipboardCheck } from "react-icons/bs";
import { AiOutlineSketch } from "react-icons/ai";
import { TbHomeShare } from "react-icons/tb";

const adminMenu = () => {
  return (
    <>
      <ul className="nave-dropdown-menu">
      <li>
          <Link to="/homepage">
          <TbHomeShare/>
            <span>Home Page</span>
          </Link>
        </li>
        <li>
          <Link to="/PaidUserPage">
            <AiOutlineSketch />
            <span>Paid Users</span>
          </Link>
        </li>
        <li>
          <Link to="/CreatePricingPlan">
            <BsClipboardCheck />
            <span>Package</span>
          </Link>
        </li>
        <li>
          <Link to="/Admin/AccountSetting">
            <BiUserPin />
            <span>My Profile</span>
          </Link>
        </li>
        <li>
          <Link to="/AffiliateSetting">
            <CiBadgeDollar />
            <span>Affiliate</span>
          </Link>
        </li>
        <li onClick={removeSessions}>
          <FiLogOut />
          <span>Logout</span>
        </li>
      </ul>
    </>
  );
};

export default adminMenu;
