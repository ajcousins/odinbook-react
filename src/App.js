import React, { useEffect, useState } from "react";

import "./App.scss";
import LeftSideBar from "./components/LeftSideBar";
import MainFeed from "./components/MainFeed";

import Login from "./components/Login";

function App() {
  const [header, setHeader] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState("");
  const [menuVis, setMenuVis] = useState(false);

  const tokenHandler = (token) => {
    let tokenCopy = token;
    setHeader({ Authorization: `Bearer ${tokenCopy}` });
    setIsAuth(true);
  };

  useEffect(async () => {
    const response = await fetch("/tweets/", {
      method: "GET",
    });
    const data = await response.json();
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
  }, [isAuth]);

  const menuHandler = () => {
    console.log("Menu handler from App");
    if (menuVis) setMenuVis(false);
    else setMenuVis(true);
  };

  const logOut = async () => {
    try {
      await fetch("/api/v1/users/logout", {
        method: "GET",
      });
      setMenuVis(false);
      setIsAuth(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (!isAuth) {
    return (
      <div className='App'>
        <Login tokenHandler={tokenHandler} />
      </div>
    );
  } else {
    return (
      <div className='App'>
        {!menuVis ? null : (
          <div>
            <div className='menu__click-area' onClick={menuHandler}>
              <div className='menu'>
                <div className='menu__item' onClick={logOut}>
                  Log out @Ganaden1024
                </div>
              </div>
            </div>
          </div>
        )}
        <div className='wrapper-main'>
          <LeftSideBar menu={menuHandler} />
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
