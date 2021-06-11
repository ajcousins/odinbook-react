import React, { useState, useEffect } from "react";
import defaultAvatar from "./../static/default-avatar.png";
import SvgBackArrow from "./../iconComponents/SvgBackArrow";
import Follows from "./Follows";
import Tweet from "./Tweet";
import ComposeTweet from "./ComposeTweet";

const MainFeedUser = (props) => {
  const [userTweets, setUserTweets] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");

  // Get tweets from current user
  const loadTweets = () => {
    console.log("Get tweets");
    console.log("User:", props.user._id);
    async function fetchData() {
      const response = await fetch(`/api/v1/tweets/user/${props.user._id}`, {
        method: "GET",
      });
      const data = await response.json();
      console.log(data.userTweets);
      setUserTweets(data.userTweets);
      // copy tweets into userTweets state
    }
    fetchData();
  };

  useEffect(() => {
    if (!currentUserId) {
      setCurrentUserId(props.user._id);
    } else {
      console.log("Use Effect User:", currentUserId);
      console.log("Load tweets!");
      loadTweets();
    }
  }, [currentUserId, props.user._id]);

  return (
    <div className='mainfeed'>
      <div className='mainfeed__header'>
        <SvgBackArrow height='22.5px' changePage={() => props.changePage(0)} />
        <div className='mainfeed__header__col-2'>
          <div className='mainfeed__header__text'>{props.user.name}</div>
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
          <button className='btn--follow'>Follow</button>
        </div>
        <div className='mainfeed__bio__row-2'>
          <h2 className='mainfeed__user-title'>{props.user.name}</h2>
          <p>@{props.user.handle}</p>
        </div>
        <div className='mainfeed__bio__row-3'>
          <p>
            That bloke off BBC Breakfast & The NFL Show. Former Football Focus
            host, President of #EggClub & author of 'Remarkable People' ...
            http://amzn.to/2BavjV5
          </p>
        </div>
        <div className='mainfeed__bio__row-5'>
          <Follows type='Following ' number={props.user.following_length} />
          <Follows type='Followers ' number={props.user.followers_length} />
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
            changePage={props.changePage}
            fetchUser={props.fetchUser}
          />
        );
      })}
    </div>
  );
};

export default MainFeedUser;
