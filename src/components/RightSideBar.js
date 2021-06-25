import React, { useEffect, useState } from "react";
import WhoToFollow from "./WhoToFollow";

const RightSideBar = (props) => {
  return (
    <div className='rightsidebar'>
      <WhoToFollow fetchUser={props.fetchUser} />
    </div>
  );
};

export default RightSideBar;
