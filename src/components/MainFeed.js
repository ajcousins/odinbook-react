import React, { useEffect, useState } from "react";
import axios from "axios";
import MainFeedIndex from "./MainFeedIndex";
import MainFeedUser from "./MainFeedUser";

const MainFeed = (props) => {
  // const [page, setPage] = useState(0);
  const [selectedUser, setSelectedUser] = useState({});

  const changePage = (page) => {
    // console.log("Fetch User!");
    // console.log("page:", page);
    // console.log("page:", page);
    if (page === 0) setSelectedUser({});
    props.pageRequest(page);
  };

  const fetchUser = (id) => {
    // console.log(id);

    axios.get(`/api/v1/users/${id}`).then((res) => {
      // console.log(res);
      console.log(res.data.data.user);
      setSelectedUser(res.data.data.user);
    });

    changePage(1);
  };

  switch (props.page) {
    case 0:
      console.log("Page 0");
      return (
        <MainFeedIndex
          title='Home'
          changePage={changePage}
          fetchUser={fetchUser}
        />
      );
    case 1:
      console.log("Page 1");
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
