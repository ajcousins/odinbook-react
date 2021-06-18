import React, { useState, useEffect } from "react";
import axios from "axios";
import Tweet from "./../components/Tweet";
import ComposeTweet from "./../components/ComposeTweet";
import LoadingTile from "./../components/LoadingTile";
import MessageTile from "./MessageTile";

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

  const deleteTweet = (tweetId) => {
    console.log("Delete tweet!", tweetId);

    // Delete from database

    axios.delete(`/api/v1/tweets/${tweetId}`).then((res) => {
      console.log(res);
      // If delete successful..
      // Delete from state array.
      console.log(tweets);
      const newTweets = [...tweets];

      let index = newTweets.findIndex((tweet) => tweet.id === tweetId);
      console.log(index);
      newTweets.splice(index, 1);
      setTweets(newTweets);
    });
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
      {tweets.length === 0 ? (
        <MessageTile
          heading={"Welcome to Twitter!"}
          message="This is the best place to see what's happening in your world. Find some people to follow now."
        />
      ) : null}
      {!props.isLoaded ? (
        <LoadingTile />
      ) : (
        tweets.map((tweet) => {
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
              likes={tweet.likes}
              fetchUser={props.fetchUser}
              changePage={props.changePage}
              currentUser={props.currentUser}
              deleteTweet={deleteTweet}
              likeTweet={props.likeTweet}
            />
          );
        })
      )}
    </div>
  );
};

export default MainFeedIndex;
