import React, { useState } from "react";
import MainFeedIndex from "./MainFeedIndex";
import MainFeedUser from "./MainFeedUser";

const MainFeed = (props) => {
  const [page, setPage] = useState(0);

  switch (page) {
    case 0:
      return <MainFeedIndex title='Home' />;
    case 1:
      return <MainFeedUser title='User' />;
    default:
      return null;
  }
};

export default MainFeed;
