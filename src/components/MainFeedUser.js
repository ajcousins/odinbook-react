import React, { useState, useEffect } from "react";
import defaultAvatar from "./../static/default-avatar.png";
import SvgBackArrow from "./../iconComponents/SvgBackArrow";
import Follows from "./Follows";
import Tweet from "./Tweet";
import axios from "axios";

const MainFeedUser = (props) => {
  const [userTweets, setUserTweets] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [isFollowingState, setIsFollowingState] = useState(false);

  // Get tweets from selected user
  const loadTweets = () => {
    async function fetchData() {
      const response = await fetch(`/api/v1/tweets/user/${selectedUserId}`, {
        method: "GET",
      });
      const data = await response.json();
      // copy tweets into userTweets state
      setUserTweets(data.userTweets);
    }
    fetchData();
  };

  useEffect(() => {
    if (!selectedUserId) {
      setSelectedUserId(props.selectedUser._id);
    } else {
      loadTweets();
    }
  }, [selectedUserId, props.selectedUser._id]);

  const followHandler = () => {
    console.log("follow handler");
    console.log(props.currentUser);
    if (isFollowingState) {
      console.log("Already following");
      return null;
    }

    axios
      .post("/api/v1/users/follow", {
        userToFollow: selectedUserId,
      })
      .then(
        (res) => {
          console.log(res);
          setIsFollowingState(true);
        },
        (err) => {
          console.log(err);
        }
      );
  };

  // Check if selected user is being followed by current user.
  useEffect(() => {
    if (!props.selectedUser.followers) {
      setIsFollowingState(false);
      return false;
    } else if (props.selectedUser.followers.includes(props.currentUser._id)) {
      console.log("Current user ID:", props.currentUser._id);
      console.log("Selected user followers:", props.selectedUser.followers);
      setIsFollowingState(true);
      return true;
    }
    return false;
  }, [isFollowingState, props.selectedUser.followers]);

  /*
  const isFollowing = () => {
    // Check if selected user is being followed by current user.
    // console.log("selectedUser:", props.selectedUser.followers);
    // console.log("currentUser:", props.currentUser._id);
    if (!props.selectedUser.followers) {
      console.log("Here");
      return false;
    }
    console.log(
      "Check:",
      props.selectedUser.followers.includes(props.currentUser._id)
    );
    return props.selectedUser.followers.includes(props.currentUser._id);
  };
*/
  const followingBtn = () => {
    if (isFollowingState) {
      return (
        <button className='btn--following' onClick={followHandler}>
          Following
        </button>
      );
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
        <div className='mainfeed__bio__row-1'>
          {isFollowingState ? (
            <button className='btn--following' onClick={followHandler}>
              Following
            </button>
          ) : (
            <button className='btn--follow' onClick={followHandler}>
              Follow
            </button>
          )}
        </div>
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
          />
          <Follows
            type='Followers '
            number={props.selectedUser.followers_length}
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
            handle={`@${tweet.user.handle}`}
            profilePic=''
            time={tweet.tweetAge}
            message={tweet.textContent}
            replies={tweet.replies_short}
            retweets={tweet.retweets_short}
            likes={tweet.likes_short}
            // changePage={props.changePage}
            fetchUser={props.fetchUser}
          />
        );
      })}
    </div>
  );
};

export default MainFeedUser;
