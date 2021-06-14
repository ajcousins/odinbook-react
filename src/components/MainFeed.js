import React, { useEffect, useState } from "react";
import axios from "axios";
import MainFeedIndex from "./MainFeedIndex";
import MainFeedUser from "./MainFeedUser";

const MainFeed = (props) => {
  const [selectedUser, setSelectedUser] = useState({});

  const changePage = (page) => {
    if (page === 0) setSelectedUser({});
    props.pageRequest(page);
  };

  const fetchUser = (id) => {
    axios.get(`/api/v1/users/${id}`).then((res) => {
      setSelectedUser(res.data.data.user);
    });
    changePage(1);
  };

  switch (props.page) {
    case 0:
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
      return (
        <MainFeedUser
          title='User'
          changePage={changePage}
          selectedUser={selectedUser}
          currentUser={props.currentUser}
          fetchUser={fetchUser}
        />
      );
    default:
      return null;
  }
};

export default MainFeed;
