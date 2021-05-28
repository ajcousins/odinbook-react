// import classes from "./LeftSideBar.module.scss";

import React from "react";

const SideButton = (props) => {
  return (
    <div className='leftsidebar__button'>
      {props.children}
      {props.text}
    </div>
  );
};

export default SideButton;
