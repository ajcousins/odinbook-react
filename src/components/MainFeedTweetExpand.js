import React, { useState } from "react";
import axios from "axios";
import TextareaAutosize from "react-autosize-textarea";
import SvgBackArrow from "./../iconComponents/SvgBackArrow";
import TweetButton from "./TweetButton";
import TwitterReply from "./../iconComponents/SvgTwitterReply";
import TwitterRetweet from "./../iconComponents/SvgTwitterRetweet";
import TwitterLike from "./../iconComponents/SvgTwitterLike";
import TwitterLikeActive from "./../iconComponents/SvgTwitterLikeActive";
import TwitterShare from "./../iconComponents/SvgTwitterShare";
import { useEffect } from "react/cjs/react.development";
import LoadingTile from "./../components/LoadingTile";
import Tweet from "./../components/Tweet";

const MainFeedTweetExpand = (props) => {
  const [selectedTweet, setSelectedTweet] = useState({});
  const [tweetText, setTweetText] = useState("");
  const [replies, setReplies] = useState([]);
  const [tweetPosted, setTweetPosted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (selectedTweet.tweetDetails) {
      fetchReplies();
    }
  }, [selectedTweet, tweetPosted]);

  const fetchReplies = () => {
    axios({
      method: "GET",
      url: `/tweets/${selectedTweet.tweetDetails.tweetId}/replies`,
    }).then((res) => {
      console.log(res);
      setReplies(res.data.data.tweets);
      setIsLoaded(true);
      setTweetPosted(false);
    });
    // console.log(selectedTweet.tweetDetails.tweetId);
  };

  useEffect(() => {
    setSelectedTweet(props.selectedTweet);
  }, [props.selectedTweet]);

  useEffect(() => {});

  const onChangeHandler = (e) => {
    setTweetText(e.target.value);
  };

  const tweetSubmit = async () => {
    if (!tweetText) return;

    axios({
      method: "POST",
      url: "/api/v1/tweets/",
      data: {
        textContent: tweetText,
        user: props.currentUser._id,
        replyParent: selectedTweet.tweetDetails.tweetId,
      },
    });

    tweetHandler();
    setTweetText("");
  };

  const tweetHandler = () => {
    setTweetPosted(true);
  };

  const deleteTweet = (tweetId) => {
    // Delete from database

    axios.delete(`/api/v1/tweets/${tweetId}`).then((res) => {
      console.log(res);
      // If delete successful..
      // Delete from state array.
      console.log(replies);
      const newTweets = [...replies];

      let index = newTweets.findIndex((tweet) => tweet.id === tweetId);
      console.log(index);
      newTweets.splice(index, 1);
      setReplies(newTweets);
    });
  };

  return (
    <div className='mainfeed'>
      <div className='mainfeed__header'>
        <SvgBackArrow height='22.5px' changePage={() => props.changePage(0)} />
        <div className='mainfeed__header__col-2'>
          <div className='mainfeed__header__text'>Tweet</div>
        </div>
      </div>
      <div className='tweet-expanded'>
        {selectedTweet.userDetails ? (
          <div>
            <div className='tweet-expanded__row-1'>
              <img
                className='tweet__avatar'
                src={`img/users/${selectedTweet.userDetails.photo}`}
              />
              <div className='tweet-expanded__row-1__col-2'>
                <div className='tweet-expanded__row-1__col-2__name'>
                  {selectedTweet.userDetails.name}
                </div>
                @{selectedTweet.userDetails.handle}
              </div>
            </div>
            <div className='tweet-expanded__row-2'>
              {selectedTweet.tweetDetails.textContent}
            </div>
            <div className='tweet-expanded__row-3'>
              {selectedTweet.tweetDetails.dateAdded}
            </div>
            <div className='tweet-expanded__row-4'>
              <strong>{selectedTweet.tweetDetails.likesQty}</strong>
              &nbsp;Likes
            </div>
            <div className='tweet-expanded__row-5'>
              <TweetButton>
                <TwitterReply height='24' />
              </TweetButton>
              <TweetButton>
                <TwitterRetweet height='24' />
              </TweetButton>
              <TweetButton>
                {/* {isLiked ? <TwitterLikeActive /> :  */}
                <TwitterLike height='24' />
                {/* } */}
              </TweetButton>
              <TweetButton>
                <TwitterShare height='24' />
              </TweetButton>
            </div>
            <div className='tweet-expanded__reply'>
              <div className='tweet-expanded__reply__col-1'>
                <img
                  className='tweet__avatar'
                  src={`img/users/${props.currentUser.photo}`}
                />
              </div>
              <div className='tweet-expanded__reply__col-2'>
                <TextareaAutosize
                  className='tweet__compose__input'
                  placeholder='Tweet your reply'
                  onChange={onChangeHandler}
                  value={tweetText}
                  maxLength='280'
                />
              </div>
              <div className='tweet-expanded__reply__col-3 tweet-expanded__btn--right'>
                <button
                  className='tweet__compose--submit tweet-expanded__btn'
                  type='submit'
                  onClick={tweetSubmit}
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className='mainfeed__divider' />
      <div>
        {!isLoaded ? (
          <LoadingTile />
        ) : (
          replies.map((tweet) => {
            return (
              <Tweet
                className='tweet'
                name={tweet.user.name}
                id={tweet.user._id}
                tweetId={tweet._id}
                handle={`@${tweet.user.handle}`}
                profilePic={tweet.user.photo}
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
                fetchTweet={props.fetchTweet}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default MainFeedTweetExpand;
