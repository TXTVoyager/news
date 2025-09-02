// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import { removeSessions } from "../../helper/Session";
import { FiLogOut } from "react-icons/fi";
import { CiBadgeDollar, CiPhone } from "react-icons/ci";
import { AiFillThunderbolt } from "react-icons/ai";
import { TbHomeShare } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { HiOutlineQueueList } from "react-icons/hi2";

const UserMenu = () => {
  return (
    <>
      <ul className="nave-dropdown-menu mt-3">
        <li>
          <Link to="/homepage">
            <TbHomeShare />
            <span>Home Page</span>
          </Link>
        </li>
        <li>
          <Link to="/userOrders">
            <AiFillThunderbolt />
            <span>Purchases</span>
          </Link>
        </li>
        <li>
          <Link to="/post/Membership">
            <HiOutlineQueueList />
            <span>Subscription</span>
          </Link>
        </li>

        <li>
          <Link to="/accountSetting">
            <CgProfile />
            <span>My Profile</span>
          </Link>
        </li>
        <li>
          <Link to="/affiliatePage">
            <CiBadgeDollar />
            <span>Affiliate</span>
          </Link>
        </li>
        <li>
          <Link to="https://www.instagram.com/txtviews/" target="_blank">
            <CiPhone />
            <span>Contact</span>
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

export default UserMenu;
