import React, { useEffect, useState } from "react";
import axios from "axios";
import MainFeedIndex from "./MainFeedIndex";
import MainFeedUser from "./MainFeedUser";
import SvgBackArrow from "./../iconComponents/SvgBackArrow";

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
      <div className='mainfeed'>
        <div className='mainfeed__header'>
          <SvgBackArrow
            height='22.5px'
            changePage={() => props.changePage(1)}
          />
          <div className='mainfeed__header__col-2'>
            <div className='mainfeed__header__text'>
              {props.selectedUser.name}
            </div>
            <span className='mainfeed__user__tweets'>
              @{props.selectedUser.handle}
            </span>
          </div>
        </div>
        <div className='mainfeed__follow__nav'>
          <div
            className='mainfeed__follow__nav-btn'
            onClick={() => props.changePage(3)}
          >
            Followers
          </div>
          <div className='mainfeed__follow__nav-btn--selected'>Following</div>
        </div>
      </div>
    );
  };

  const MainFeedUserFollowers = (props) => {
    return (
      <div className='mainfeed'>
        <div className='mainfeed__header'>
          <SvgBackArrow
            height='22.5px'
            changePage={() => props.changePage(1)}
          />
          <div className='mainfeed__header__col-2'>
            <div className='mainfeed__header__text'>
              {props.selectedUser.name}
            </div>
            <span className='mainfeed__user__tweets'>
              @{props.selectedUser.handle}
            </span>
          </div>
        </div>
        <div className='mainfeed__follow__nav'>
          <div className='mainfeed__follow__nav-btn--selected'>Followers</div>
          <div
            className='mainfeed__follow__nav-btn'
            onClick={() => props.changePage(2)}
          >
            Following
          </div>
        </div>
      </div>
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
