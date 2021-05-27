import classes from "./LeftSideBar.module.scss";
import SvgTwitterLogo from "../iconComponents/SvgTwitterLogo";

import React from "react";

const SideButton = (props) => {
  return (
    <div className='leftsidebar__button'>
      <SvgTwitterLogo color='#1da1f2' />
      {props.text}
    </div>
  );
};

export default SideButton;
