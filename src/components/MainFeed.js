import React, { useState, useEffect } from "react";
import Tweet from "./../components/Tweet";
import Test from "./../components/Test";

const MainFeed = (props) => {
  const [tweets, setTweets] = useState([]);

  useEffect(async () => {
    const response = await fetch("/tweets/", {
      method: "GET",
    });
    const data = await response.json();
    // console.log(data.data.tweets);
    setTweets(data.data.tweets);
  }, []);

  return (
    <div className='mainfeed'>
      <div className='mainfeed__header'>
        <div className='mainfeed__header__text'>{props.title}</div>
      </div>
      {tweets.map((tweet) => {
        return (
          <Tweet
            className='tweet'
            name={tweet.user.name}
            handle={`@${tweet.user.handle}`}
            profilePic=''
            time={tweet.tweetAge}
            message={tweet.textContent}
            replies={tweet.replies_short}
            retweets={tweet.retweets_short}
            likes={tweet.likes_short}
          />
        );
      })}
    </div>
  );
};

export default MainFeed;
