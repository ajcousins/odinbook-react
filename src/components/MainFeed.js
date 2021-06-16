import React from "react";
import MainFeedIndex from "./MainFeedIndex";
import MainFeedUser from "./MainFeedUser";
import MainFeedUserFollowing from "./MainFeedUserFollowing";
import MainFeedUserFollowers from "./MainFeedUserFollowers";
import ErrorTile from "./ErrorTile";

const MainFeed = (props) => {
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
          refreshCurrentUser={props.refreshCurrentUser}
          refreshSelectedUser={props.refreshSelectedUser}
        />
      );
    case 2:
      // SelectedUser following list
      return (
        <MainFeedUserFollowing
          selectedUser={props.selectedUser}
          changePage={props.changePage}
          currentUser={props.currentUser}
          fetchUser={props.fetchUser}
          refreshCurrentUser={props.refreshCurrentUser}
          refreshSelectedUser={props.refreshSelectedUser}
        />
      );
    case 3:
      // SelectedUser follower list
      return (
        <MainFeedUserFollowers
          selectedUser={props.selectedUser}
          changePage={props.changePage}
          currentUser={props.currentUser}
          fetchUser={props.fetchUser}
          refreshCurrentUser={props.refreshCurrentUser}
          refreshSelectedUser={props.refreshSelectedUser}
        />
      );
    default:
      // 404
      return <ErrorTile changePage={props.changePage} />;
  }
};

export default MainFeed;
