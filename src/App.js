import React, { useEffect, useState } from "react";
import "./App.scss";
import MenuPopUp from "./components/MenuPopUp";
import LeftSideBar from "./components/LeftSideBar";
import MainFeed from "./components/MainFeed";
import axios from "axios";
import Login from "./components/Login";

function App() {
  const [header, setHeader] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedUser, setSelectedUser] = useState({});
  const [curUserLikes, setCurUserLikes] = useState([]);
  const [menuVis, setMenuVis] = useState(false);
  const [page, setPage] = useState(0);

  const tokenHandler = (token) => {
    let tokenCopy = token;
    setHeader({ Authorization: `Bearer ${tokenCopy}` });
    setIsAuth(true);
  };

  useEffect(() => {
    async function fetchData() {
      try {
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
          setIsLoaded(true);
          const currentUserCopy = { ...data.data.currentUser };
          const curUserLikesCopy = [...data.data.currentUser.likedTweets];

          setCurrentUser(currentUserCopy);
          setCurUserLikes(curUserLikesCopy);
          // console.log(curUserLikes);
        }
      } catch (err) {
        console.log(err);
        setIsAuth(false);
      }
    }
    fetchData();
  }, [isAuth]);

  const refreshCurrentUser = async () => {
    await axios.get("/api/v1/users/current").then((res) => {
      const currentUserCopy = { ...res.data.data.currentUser };
      setCurrentUser(currentUserCopy);
      console.log("currentUser refreshed");
    });
  };

  const refreshSelectedUser = async () => {
    await axios.get(`/api/v1/users/${selectedUser._id}`).then((res) => {
      const selectedUserCopy = { ...res.data.data.user };
      setSelectedUser(selectedUserCopy);
      console.log("selectedUser refreshed");
    });
  };

  const fetchUser = (id) => {
    axios.get(`/api/v1/users/${id}`).then((res) => {
      setSelectedUser(res.data.data.user);
      // refreshSelectedUser();
    });
    changePage(1);
  };

  const menuHandler = () => {
    if (menuVis) setMenuVis(false);
    else setMenuVis(true);
  };

  const logOut = async () => {
    try {
      await fetch("/api/v1/users/logout", {
        method: "GET",
      });
      setHeader({});
      setIsAuth(false);
      setIsLoaded(false);
      setCurrentUser({});
      setSelectedUser({});
      setCurUserLikes([]);
      setMenuVis(false);
      setPage(0);
    } catch (err) {
      console.log(err);
    }
  };

  const changePage = (page) => {
    console.log(`Change to page ${page}.`);
    if (page === 0) setSelectedUser({});
    setPage(page);
  };

  const likeTweet = (tweetId, add) => {
    // If second attribute is true-- add to array. If false, remove from array.
    console.log("Like:", tweetId);
    const curUserLikesCopy = [...curUserLikes];

    if (add) {
      axios.patch(`/api/v1/tweets/${tweetId}/like`).then((res) => {
        curUserLikesCopy.push(tweetId);
        setCurUserLikes(curUserLikesCopy);
      });
    } else {
      axios.patch(`/api/v1/tweets/${tweetId}/unlike`).then((res) => {
        // Remove tweet from array.
        const index = curUserLikesCopy.findIndex((tweet) => tweet === tweetId);
        curUserLikesCopy.splice(index, 1);
        console.log("remove:", index);
        setCurUserLikes(curUserLikesCopy);
      });
    }
  };

  if (!isAuth) {
    // Login/ register screen
    return (
      <div className='App'>
        <Login tokenHandler={tokenHandler} logOut={logOut} />
      </div>
    );
  } else {
    // Main screen
    return (
      <div className='App'>
        <div className='wrapper-main'>
          <MenuPopUp
            menuVis={menuVis}
            menuHandler={menuHandler}
            logOut={logOut}
            currentUser={currentUser}
          />
          <LeftSideBar
            menu={menuHandler}
            currentUser={currentUser}
            // pageRequest={(page) => pageRequest(page)}
            changePage={changePage}
            // setPage={setPage}
            fetchUser={fetchUser}
          />
          <MainFeed
            header={header}
            currentUser={currentUser}
            selectedUser={selectedUser}
            page={page}
            changePage={changePage}
            fetchUser={fetchUser}
            // pageRequest={(page) => pageRequest(page)}
            isLoaded={isLoaded}
            refreshCurrentUser={refreshCurrentUser}
            refreshSelectedUser={refreshSelectedUser}
            likeTweet={likeTweet}
          />
          <div className='rightsidebar'></div>
        </div>
      </div>
    );
  }
}

export default App;
