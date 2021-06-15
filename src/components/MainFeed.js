import React, { useEffect, useState } from "react";
import axios from "axios";
import MainFeedIndex from "./MainFeedIndex";
import MainFeedUser from "./MainFeedUser";
import SvgBackArrow from "./../iconComponents/SvgBackArrow";
import FollowHeader from "./FollowHeader";

const MainFeed = (props) => {
  const [selectedUser, setSelectedUser] = useState({});

  const changePage = (page) => {
    console.log(`Change to page ${page}.`);
    if (page === 0) setSelectedUser({});
    props.pageRequest(page);
  };

  const fetchUser = (id) => {
    axios.get(`/api/v1/users/${id}`).then((res) => {
      setSelectedUser(res.data.data.user);
    });
    changePage(1);
  };

  const MainFeedUserFollowing = (props) => {
    return (
      <FollowHeader
        type='Following'
        selectedUser={props.selectedUser}
        changePage={props.changePage}
      />
    );
  };

  const MainFeedUserFollowers = (props) => {
    return (
      <FollowHeader
        type='Followers'
        selectedUser={props.selectedUser}
        changePage={props.changePage}
      />
    );
  };

  switch (props.page) {
    case 0:
      // Main feed
      return (
        <MainFeedIndex
          title='Home'
          changePage={changePage}
          currentUser={props.currentUser}
          fetchUser={fetchUser}
          isLoaded={props.isLoaded}
        />
      );
    case 1:
      // Profile page
      return (
        <MainFeedUser
          title='User'
          changePage={changePage}
          selectedUser={selectedUser}
          currentUser={props.currentUser}
          fetchUser={fetchUser}
        />
      );
    case 2:
      // SelectedUser following list
      return (
        <MainFeedUserFollowing
          selectedUser={selectedUser}
          changePage={changePage}
        />
      );
    case 3:
      // SelectedUser follower list
      return (
        <MainFeedUserFollowers
          selectedUser={selectedUser}
          changePage={changePage}
        />
      );
    default:
      return (
        <div className='mainfeed'>
          <div className='mainfeed__header'>
            <SvgBackArrow height='22.5px' changePage={() => changePage(0)} />
            <div className='mainfeed__header__col-2'>
              <div className='mainfeed__header__text'>404: Page Not Found</div>
            </div>
          </div>
        </div>
      );
  }
};

export default MainFeed;
