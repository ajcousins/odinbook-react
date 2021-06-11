import React, { useEffect, useState } from "react";
import axios from "axios";
import MainFeedIndex from "./MainFeedIndex";
import MainFeedUser from "./MainFeedUser";

const MainFeed = (props) => {
  const [page, setPage] = useState(0);
  const [selectedUser, setSelectedUser] = useState({});

  // useEffect(() => {
  //   console.log("useEffect from MainFeed");
  // }, [page]);

  const changePage = (page) => {
    console.log("Fetch User!");
    console.log("page:", page);
    if (page === 0) setSelectedUser({});
    setPage(page);
  };

  const fetchUser = (id) => {
    console.log(id);

    axios.get(`/api/v1/users/${id}`).then((res) => {
      console.log(res);
      console.log(res.data.data.user);
      setSelectedUser(res.data.data.user);
    });

    changePage(1);
  };

  switch (page) {
    case 0:
      return (
        <MainFeedIndex
          title='Home'
          changePage={changePage}
          fetchUser={fetchUser}
        />
      );
    case 1:
      return (
        <MainFeedUser
          title='User'
          changePage={changePage}
          user={selectedUser}
        />
      );
    default:
      return null;
  }
};

export default MainFeed;
