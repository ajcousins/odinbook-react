import React, { useState, useEffect } from "react";
import defaultAvatar from "./../static/default-avatar.png";
import SvgBackArrow from "./../iconComponents/SvgBackArrow";
import Follows from "./Follows";
import Tweet from "./Tweet";
import axios from "axios";

const MainFeedUser = (props) => {
  const [userTweets, setUserTweets] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [isFollowingState, setIsFollowingState] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [followerList, setFollowerList] = useState([]);
  const [followerListLength, setFollowerListLength] = useState(0);

  // Get tweets from selected user
  const loadTweets = () => {
    async function fetchData() {
      const response = await fetch(
        `/api/v1/tweets/user/${props.selectedUser._id}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      // copy tweets into userTweets state
      setUserTweets(data.userTweets);

      setIsLoaded(true);
    }
    fetchData();
  };

  useEffect(() => {
    // A separate variable (selectedUserId) is required as the server crashes if not fed a string.

    if (!selectedUserId) {
      setSelectedUserId(props.selectedUser._id);
    } else {
      console.log("Load tweets useEffect");
      loadTweets();
    }
  }, [selectedUserId, props.selectedUser._id]);
  // }, []);

  const deleteTweet = (tweetId) => {
    console.log("Delete tweet!", tweetId);
    // Delete from database
    axios.delete(`/api/v1/tweets/${tweetId}`).then((res) => {
      // If delete successful..
      // Delete from state array.
      const newTweets = [...userTweets];
      let index = newTweets.findIndex((tweet) => tweet.id === tweetId);
      newTweets.splice(index, 1);
      setUserTweets(newTweets);
    });
  };

  const followHandler = () => {
    if (isFollowingState) {
      return null;
    }
    axios
      .post("/api/v1/users/follow", {
        userToFollow: selectedUserId,
      })
      .then(
        (res) => {
          const followerListCopy = [...followerList];
          followerListCopy.push(props.currentUser._id);
          setFollowerList(followerListCopy);
          setIsFollowingState(true);

          let length = followerListLength;
          length++;
          setFollowerListLength(length);
        },
        (err) => {
          console.log(err);
        }
      );
  };

  const unfollowHandler = () => {
    axios
      .post("/api/v1/users/unfollow", {
        userToUnfollow: selectedUserId,
      })
      .then(
        (res) => {
          const followerListCopy = [...followerList];
          let index = followerListCopy.indexOf(props.currentUser._id);
          followerListCopy.splice(index, 1);
          setFollowerList(followerListCopy);
          setIsFollowingState(false);

          let length = followerListLength;
          length--;
          setFollowerListLength(length);
        },
        (err) => {
          console.log(err);
        }
      );
  };

  useEffect(() => {
    if (isLoaded) {
      const followerListCopy = [...props.selectedUser.followers];
      setFollowerListLength(followerListCopy.length);
    }
  }, [isLoaded]);

  // Check if selected user is being followed by current user.
  useEffect(() => {
    if (!isLoaded) return;
    else {
      const followerListCopy = [...props.selectedUser.followers];
      setFollowerList(followerListCopy);

      if (followerList.includes(props.currentUser._id)) {
        setIsFollowingState(true);
      } else {
        setIsFollowingState(false);
      }
    }
  }, [isLoaded, isFollowingState]);

  const followBtn = () => {
    if (!isLoaded) return null;
    if (props.selectedUser._id === props.currentUser._id) return null;
    if (isFollowingState) {
      return <button className='btn--following' onClick={unfollowHandler} />;
    } else {
      return (
        <button className='btn--follow' onClick={followHandler}>
          Follow
        </button>
      );
    }
  };

  return (
    <div className='mainfeed'>
      <div className='mainfeed__header'>
        <SvgBackArrow height='22.5px' changePage={() => props.changePage(0)} />
        <div className='mainfeed__header__col-2'>
          <div className='mainfeed__header__text'>
            {props.selectedUser.name}
          </div>
          <span className='mainfeed__user__tweets'>
            {userTweets ? userTweets.length : "0"} Tweets
          </span>
        </div>
      </div>
      <div className='mainfeed__banner'>
        <div className='mainfeed__user-avatar--wrapper'>
          <img className='mainfeed__user-avatar' src={defaultAvatar} />
        </div>
      </div>
      <div className='mainfeed__bio'>
        <div className='mainfeed__bio__row-1'>{followBtn()}</div>
        <div className='mainfeed__bio__row-2'>
          <h2 className='mainfeed__user-title'>{props.selectedUser.name}</h2>
          <p>@{props.selectedUser.handle}</p>
        </div>
        <div className='mainfeed__bio__row-3'>
          <p>
            That bloke off BBC Breakfast & The NFL Show. Former Football Focus
            host, President of #EggClub & author of 'Remarkable People' ...
            http://amzn.to/2BavjV5
          </p>
        </div>
        <div className='mainfeed__bio__row-5'>
          <Follows
            type='Following '
            number={props.selectedUser.following_length}
            page={2}
            changePage={props.changePage}
            refreshCurrentUser={props.refreshCurrentUser}
            refreshSelectedUser={props.refreshSelectedUser}
          />
          <Follows
            type='Followers '
            number={followerListLength}
            page={3}
            changePage={props.changePage}
            refreshCurrentUser={props.refreshCurrentUser}
            refreshSelectedUser={props.refreshSelectedUser}
          />
        </div>
        <div className='mainfeed__bio__row-7'>
          <div className='mainfeed__bio--selected'>
            Tweets
            <div className='mainfeed__bio--underline' />
          </div>
          <div>Tweets & replies</div>
          <div>Media</div>
          <div>Likes</div>
        </div>
      </div>
      {userTweets.map((tweet) => {
        return (
          <Tweet
            className='tweet'
            name={tweet.user.name}
            id={tweet.user._id}
            tweetId={tweet._id}
            handle={`@${tweet.user.handle}`}
            profilePic=''
            time={tweet.tweetAge}
            message={tweet.textContent}
            replies={tweet.replies_short}
            retweets={tweet.retweets_short}
            likes={tweet.likes_short}
            // changePage={props.changePage}
            fetchUser={props.fetchUser}
            changePage={props.changePage}
            currentUser={props.currentUser}
            deleteTweet={deleteTweet}
          />
        );
      })}
    </div>
  );
};

export default MainFeedUser;
