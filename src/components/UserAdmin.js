import React, { useState } from "react";
import defaultAvatar from "./../static/default-avatar.png";
import SvgEllipsis from "./../iconComponents/SvgEllipsis";

const UserAdmin = (props) => {
  // const [menuVis, setMenuVis] = useState(false);

  // const onClickHandler = () => {
  //   if (menuVis) setMenuVis(false);
  //   else setMenuVis(true);
  // };

  return (
    <div className='leftsidebar__container'>
      <div className='leftsidebar__useradmin' onClick={props.menu}>
        <img className='leftsidebar__useradmin__avatar' src={defaultAvatar} />
        <div>
          <div className='leftsidebar__useradmin__name'>
            {props.currentUser.name}
          </div>
          <div className='leftsidebar__useradmin__handle'>
            @{props.currentUser.handle}
          </div>
        </div>
        <SvgEllipsis className='leftsidebar__useradmin__ellipsis' />
      </div>
    </div>
  );
};

export default UserAdmin;
