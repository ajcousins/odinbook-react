import React, { useEffect, useState } from "react";

import "./App.scss";
import LeftSideBar from "./components/LeftSideBar";
import MainFeed from "./components/MainFeed";
import Test from "./components/Test";
import Login from "./components/Login";

function App() {
  const [header, setHeader] = useState({});
  const [isAuth, setIsAuth] = useState(false);

  const tokenHandler = (token) => {
    let tokenCopy = token;

    // console.log("From App:", token);
    setHeader({ Authorization: `Bearer ${tokenCopy}` });
    // console.log(header);
  };

  // useEffect(() => {
  //   console.log(header);
  //   if (header.Authorization && header.Authorization.length > 10) {
  //     setIsAuth(true);
  //     console.log("True!");
  //   }
  // }, [header]);

  useEffect(async () => {
    const response = await fetch("/tweets/", {
      method: "GET",
      // headers: new Headers(props.header),
    });
    const data = await response.json();
    // setTestMessage(JSON.stringify(data.data.tweets));
    console.log(data);
    if (data.status === "fail") setIsAuth(false);
    else setIsAuth(true);
  });

  if (!isAuth) {
    return (
      <div className='App'>
        <Login tokenHandler={tokenHandler} />
        {/* <div className='wrapper-main'>
          <LeftSideBar />
          <div className='content'>
            <MainFeed title='Home' />
            <div className='rightsidebar'></div>
          </div>
        </div> */}
      </div>
    );
  } else {
    return (
      <div className='App'>
        <div className='wrapper-main'>
          <LeftSideBar />
          <div className='content'>
            <MainFeed title='Home' header={header} />
            <div className='rightsidebar'></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
