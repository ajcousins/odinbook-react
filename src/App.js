import React, { useEffect, useState } from "react";

import "./App.scss";
import LeftSideBar from "./components/LeftSideBar";
import MainFeed from "./components/MainFeed";
import Test from "./components/Test";
import Login from "./components/Login";

function App() {
  const [header, setHeader] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState("");

  const tokenHandler = (token) => {
    let tokenCopy = token;

    // console.log("From App:", token);
    setHeader({ Authorization: `Bearer ${tokenCopy}` });
    // console.log(header);
    setIsAuth(true);
  };

  useEffect(async () => {
    try {
      const response = await fetch("/tweets/", {
        method: "GET",
        // headers: new Headers(props.header),
      });
      const data = await response.json();
      // setTestMessage(JSON.stringify(data.data.tweets));
      console.log("data:", data);
      if (
        data.status === "fail" ||
        data.status === "error" ||
        data.status === null
      )
        setIsAuth(false);
      else {
        setIsAuth(true);
        setUserId(data.data.currentUser);
      }
    } catch (err) {
      console.log(err);
    }
  }, [isAuth]);

  if (!isAuth) {
    return (
      <div className='App'>
        <Login tokenHandler={tokenHandler} />
      </div>
    );
  } else {
    return (
      <div className='App'>
        <div className='wrapper-main'>
          <LeftSideBar />
          <div className='content'>
            <MainFeed title='Home' header={header} />
            {userId}
            <div className='rightsidebar'></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
