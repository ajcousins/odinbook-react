import classes from "./LeftSideBar.module.scss";
import SideButton from "./SideButton";
import SvgTwitterLogo from "../iconComponents/SvgTwitterLogo";
import SvgHomeIcon from "../iconComponents/SvgHomeIcon";
import SvgNotificationIcon from "../iconComponents/SvgNotificationIcon";
import SvgProfileIcon from "../iconComponents/SvgProfileIcon";
import UserAdmin from "../components/UserAdmin";

import React from "react";

const iconHeight = "26px";

const LeftSideBar = (props) => {
  return (
    <div className='leftsidebar'>
      <div>
        <SideButton>
          <SvgTwitterLogo height='29px' />
        </SideButton>

        <SideButton text='Home'>
          <SvgHomeIcon height={iconHeight} />
        </SideButton>

        <SideButton text='Notifications'>
          <SvgNotificationIcon height={iconHeight} />
        </SideButton>

        <SideButton text='Profile'>
          <SvgProfileIcon height={iconHeight} />
        </SideButton>
      </div>

      <UserAdmin menu={props.menu} currentUser={props.currentUser} />
    </div>
  );
};

export default LeftSideBar;
