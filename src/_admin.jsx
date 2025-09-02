// eslint-disable-next-line no-unused-vars
import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilShareAlt,
  cilSpeedometer,
  cilSettings,
  cilMemory,
  cilPeople,
  cilTags,
  cilNewspaper,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";
import { FaInstagram } from "react-icons/fa6";
const _nav = [
  {
    component: CNavTitle,
    name: "Admin Dashboard",
  },
  {
    component: CNavItem,
    name: "Admin Dashboard",
    to: "/dashboard-admin",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Create Posts",
    to: "/CreateBlogPage",
    icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
  },

  // {
  //   component: CNavGroup,
  //   name: "Pitch Documents",
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: "Elevator Pitch",
  //       to: "/AllImagePage",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Pitch Deck",
  //       to: "/AllCaptionData",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Projections",
  //       to: "/AllChatData",
  //     }]
  // },

  {
    component: CNavItem,
    name: "Account Setting",
    to: "/Admin/AccountSetting",
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
];
export default _nav;
