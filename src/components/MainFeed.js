import React, { useEffect, useState } from "react";
import axios from "axios";
import MainFeedIndex from "./MainFeedIndex";
import MainFeedUser from "./MainFeedUser";
import SvgBackArrow from "./../iconComponents/SvgBackArrow";
import FollowHeader from "./FollowHeader";
import MessageTile from "./MessageTile";
import defaultAvatar from "./../static/default-avatar.png";

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

  const UserTile = (props) => {
    return (
      <div className='userPreviewTile'>
        <div className='userPreviewTile__col-1'>
          <img className='tweet__avatar' src={defaultAvatar} />
        </div>
        <div className='userPreviewTile__col-2'>
          <div className='userPreviewTile__col-2__row-1'>
            <div className='userPreviewTile__name'>{props.user.name}</div>
            <div className='userPreviewTile__handle'>@{props.user.handle}</div>
          </div>
          <div className='userPreviewTile__col-2__row-2'>
            Placeholder bio text.
          </div>
        </div>
      </div>
    );
  };

  const MainFeedUserFollowing = (props) => {
    const [followingArr, setFollowingArr] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      axios
        .get(`/api/v1/users/${props.selectedUser._id}/following`)
        .then((res) => {
          console.log("res:", res);
          setFollowingArr(res.data.followingInfo);
          setIsLoaded(true);
        });

      console.log("followingArr:", followingArr);
    }, [isLoaded]);

    return (
      <div className='mainfeed'>
        <FollowHeader
          type='Following'
          selectedUser={props.selectedUser}
          changePage={props.changePage}
        />
        <div className='mainfeed__follow-list'>
          {console.log(props.selectedUser)}
          {props.selectedUser.following.length === 0 ? (
            <MessageTile
              heading={`@${props.selectedUser.handle} isn't following anyone`}
              message="When they do, they'll be listed here."
            />
          ) : (
            // Current maps each id number saved in array..
            // Need to update to map each detailed user in array, saved in state.
            followingArr.map((user) => {
              return <UserTile user={user} />;
            })
          )}
        </div>
      </div>
    );
  };

  const MainFeedUserFollowers = (props) => {
    const [followersArr, setFollowersArr] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      axios
        .get(`/api/v1/users/${props.selectedUser._id}/followers`)
        .then((res) => {
          console.log("res:", res);
          setFollowersArr(res.data.followersInfo);
          setIsLoaded(true);
        });

      console.log("followersArr:", followersArr);
    }, [isLoaded]);

    return (
      <div className='mainfeed'>
        <FollowHeader
          type='Followers'
          selectedUser={props.selectedUser}
          changePage={props.changePage}
        />
        <div className='mainfeed__follow-list'>
          {console.log(props.selectedUser)}
          {props.selectedUser.followers.length === 0 ? (
            <MessageTile
              heading={`@${props.selectedUser.handle} doesn't have any followers`}
              message="When someone follows them, they'll be listed here."
            />
          ) : (
            followersArr.map((user) => {
              return <UserTile user={user} />;
            })
          )}
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
        <div>
          <MainFeedUserFollowing
            selectedUser={selectedUser}
            changePage={changePage}
          />
        </div>
      );
    case 3:
      // SelectedUser follower list
      return (
        <div>
          <MainFeedUserFollowers
            selectedUser={selectedUser}
            changePage={changePage}
          />
        </div>
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
