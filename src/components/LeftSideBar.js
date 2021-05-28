import classes from "./LeftSideBar.module.scss";
import SideButton from "./SideButton";
import SvgTwitterLogo from "../iconComponents/SvgTwitterLogo";
import SvgHomeIcon from "../iconComponents/SvgHomeIcon";
import SvgNotificationIcon from "../iconComponents/SvgNotificationIcon";
import SvgProfileIcon from "../iconComponents/SvgProfileIcon";

import React from "react";

const iconHeight = "26px";

const LeftSideBar = (props) => {
  return (
    <div className='leftsidebar'>
      <SideButton>
        <SvgTwitterLogo height='29px' />
      </SideButton>

      <SideButton text='Home'>
        <SvgHomeIcon height={iconHeight} />
      </SideButton>

      <SideButton text='Notification'>
        <SvgNotificationIcon height={iconHeight} />
      </SideButton>

      <SideButton text='Profile'>
        <SvgProfileIcon height={iconHeight} />
      </SideButton>
    </div>
  );
};

export default LeftSideBar;
