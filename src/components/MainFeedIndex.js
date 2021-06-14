import React, { useState, useEffect } from "react";
import Tweet from "./../components/Tweet";
import ComposeTweet from "./../components/ComposeTweet";
import LoadingTile from "./../components/LoadingTile";

const MainFeedIndex = (props) => {
  const [tweets, setTweets] = useState([]);
  const [tweetPosted, setTweetPosted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/tweets/", {
        method: "GET",
      });
      const data = await response.json();
      setTweets(data.data.tweets);
      setTweetPosted(false);
    }
    fetchData();
  }, [tweetPosted]);

  const tweetHandler = () => {
    setTweetPosted(true);
  };

  return (
    <div className='mainfeed'>
      <div className='mainfeed__header'>
        <div className='mainfeed__header__text'>{props.title}</div>
      </div>
      <ComposeTweet
        currentUser={props.currentUser}
        tweetHandler={tweetHandler}
      />
      <div className='mainfeed__divider' />
      {!props.isLoaded ? (
        <LoadingTile />
      ) : (
        tweets.map((tweet) => {
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
        })
      )}
    </div>
  );
};

export default MainFeedIndex;
