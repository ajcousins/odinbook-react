import classes from "./LeftSideBar.module.scss";
import SideButton from "./SideButton";

import React from "react";

const LeftSideBar = (props) => {
  return (
    <div className='leftsidebar'>
      <SideButton text='test' />
    </div>
  );
};

export default LeftSideBar;
