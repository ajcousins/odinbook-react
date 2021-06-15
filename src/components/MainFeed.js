import React, { useEffect, useState } from "react";
import axios from "axios";
import MainFeedIndex from "./MainFeedIndex";
import MainFeedUser from "./MainFeedUser";
import SvgBackArrow from "./../iconComponents/SvgBackArrow";
import FollowHeader from "./FollowHeader";
import MessageTile from "./MessageTile";
import defaultAvatar from "./../static/default-avatar.png";

const MainFeed = (props) => {
  // const [selectedUser, setSelectedUser] = useState({});

  // const changePage = (page) => {
  //   console.log(`Change to page ${page}.`);
  //   if (page === 0) setSelectedUser({});
  //   props.pageRequest(page);
  // };

  // const fetchUser = (id) => {
  //   axios.get(`/api/v1/users/${id}`).then((res) => {
  //     setSelectedUser(res.data.data.user);
  //   });
  //   props.changePage(1);
  // };

  const UserTile = (props) => {
    const status = (status) => {
      if (status === "current user") return null;
      else if (status === "following")
        return <button className='btn--following'></button>;
      else return <button className='btn--follow'>Follow</button>;
    };

    return (
      <div className='userPreviewTile'>
        <div className='userPreviewTile__col-1'>
          <img className='tweet__avatar' src={defaultAvatar} />
        </div>
        <div className='userPreviewTile__col-2'>
          <div className='userPreviewTile__col-2__row-1'>
            <div>
              <div className='userPreviewTile__name'>{props.user.name}</div>
              <div className='userPreviewTile__handle'>
                @{props.user.handle}
              </div>
            </div>
            {/* <button className='btn--follow'>Follow</button> */}
            {status(props.status)}
          </div>
          <div className='userPreviewTile__col-2__row-2'>
            Placeholder bio text.
          </div>
        </div>
      </div>
    );
  };

  const appendToList = (arr) => {
    // Appends follow status (whether current user is following any of the users in the array)
    let arrayNew = [...arr];
    if (arrayNew) {
      const appendedArr = arrayNew.map((user) => {
        if (user._id === props.currentUser._id) {
          user.followStatus = "current user";
        } else if (props.currentUser.following.includes(user._id)) {
          user.followStatus = "following";
        } else {
          user.followStatus = "not following";
        }
        return user;
      });
      return appendedArr;
      // setFollowingArr(newFollowingArr);
      // setListAppended(true);
    }
  };

  const MainFeedUserFollowing = (props) => {
    const [followingArr, setFollowingArr] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [listAppended, setListAppended] = useState(false);

    useEffect(() => {
      axios
        .get(`/api/v1/users/${props.selectedUser._id}/following`)
        .then((res) => {
          setFollowingArr(appendToList(res.data.followingInfo));
          setIsLoaded(true);
          // setListAppended(true);
        });
    }, [isLoaded]);

    // useEffect(() => {
    //   console.log("listAppended:", followingArr);
    // }, [listAppended]);

    return (
      <div className='mainfeed'>
        <FollowHeader
          type='Following'
          selectedUser={props.selectedUser}
          changePage={props.changePage}
        />
        <div className='mainfeed__follow-list'>
          {/* {console.log(props.selectedUser)} */}
          {props.selectedUser.following.length === 0 ? (
            <MessageTile
              heading={`@${props.selectedUser.handle} isn't following anyone`}
              message="When they do, they'll be listed here."
            />
          ) : (
            followingArr.map((user) => {
              return <UserTile user={user} status={user.followStatus} />;
            })
          )}
          {followingArr.map((user) => {
            return (
              <div>
                <div>{user._id}</div>
                <div>{user.name}</div>
                <div>{user.followStatus}</div>
                <div>---</div>
              </div>
            );
          })}
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
          setFollowersArr(appendToList(res.data.followersInfo));
          setIsLoaded(true);
          // setListAppended(true);
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
              return <UserTile user={user} status={user.followStatus} />;
            })
          )}
          {followersArr.map((user) => {
            return (
              <div>
                <div>{user._id}</div>
                <div>{user.name}</div>
                <div>{user.followStatus}</div>
                <div>---</div>
              </div>
            );
          })}
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
          changePage={props.changePage}
          currentUser={props.currentUser}
          fetchUser={props.fetchUser}
          isLoaded={props.isLoaded}
        />
      );
    case 1:
      // Profile page
      return (
        <MainFeedUser
          title='User'
          changePage={props.changePage}
          selectedUser={props.selectedUser}
          currentUser={props.currentUser}
          fetchUser={props.fetchUser}
        />
      );
    case 2:
      // SelectedUser following list
      return (
        <div>
          <MainFeedUserFollowing
            selectedUser={props.selectedUser}
            changePage={props.changePage}
            currentUser={props.currentUser}
          />
        </div>
      );
    case 3:
      // SelectedUser follower list
      return (
        <div>
          <MainFeedUserFollowers
            selectedUser={props.selectedUser}
            changePage={props.changePage}
          />
        </div>
      );
    default:
      return (
        <div className='mainfeed'>
          <div className='mainfeed__header'>
            <SvgBackArrow
              height='22.5px'
              changePage={() => props.changePage(0)}
            />
            <div className='mainfeed__header__col-2'>
              <div className='mainfeed__header__text'>404: Page Not Found</div>
            </div>
          </div>
        </div>
      );
  }
};

export default MainFeed;
