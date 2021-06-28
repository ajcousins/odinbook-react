import React, { useEffect, useState } from "react";
import defaultAvatar from "./../static/default-avatar.png";
import TweetButton from "./TweetButton";
import TwitterReply from "./../iconComponents/SvgTwitterReply";
import TwitterRetweet from "./../iconComponents/SvgTwitterRetweet";
import TwitterLike from "./../iconComponents/SvgTwitterLike";
import TwitterLikeActive from "./../iconComponents/SvgTwitterLikeActive";
import TwitterShare from "./../iconComponents/SvgTwitterShare";
import Ellipsis from "./../iconComponents/SvgEllipsis";

const Tweet = (props) => {
  const [menuActive, setMenuActive] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesNumber, setLikesNumber] = useState(0);

  const deleteTweetHandler = (tweetId) => {
    console.log("Delete", tweetId);
    // Delete tweet from array and database
    props.deleteTweet(tweetId);
    // Close menu
    menuHandler();
  };

  const menuHandler = () => {
    if (!menuActive) setMenuActive(true);
    else setMenuActive(false);
    console.log("Menu");
    console.log("id:", props.tweetId);
  };

  const MenuBackground = () => {
    if (menuActive) {
      return (
        <div>
          <div
            className='btn btn tweet__menu__background'
            onClick={menuHandler}
          ></div>
        </div>
      );
    } else return null;
  };

  const Menu = () => {
    if (menuActive) {
      return (
        <div>
          <div
            className='btn tweet__menu__face'
            onClick={() => deleteTweetHandler(props.tweetId)}
          >
            Delete Tweet
          </div>
        </div>
      );
    } else return null;
  };

  // Check likes list
  useEffect(() => {
    if (props.likes.includes(props.currentUser._id)) {
      setIsLiked(true);
    }
    setLikesNumber(props.likes.length);
  }, [props.likes, props.currentUser._id]);

  const likeHandler = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikesNumber(likesNumber - 1);
      props.likeTweet(props.tweetId, false);
    } else {
      setIsLiked(true);
      setLikesNumber(likesNumber + 1);
      props.likeTweet(props.tweetId, true);
    }
  };

  const tweetClickHandler = (e) => {
    const btns = Array.from(document.querySelectorAll(".btn"));

    // If a button is clicked, the user hasn't clicked a 'name': cancel the operation.
    if (btns.includes(e.target)) return;
    console.log(e.target);

    props.fetchTweet(props.tweetId);

    console.log("Expand Tweet");
  };

  return (
    <div className='tweet' onClick={tweetClickHandler}>
      <div className='tweet__col-1'>
        <img
          className='btn tweet__avatar'
          src={`img/users/${props.profilePic}`}
        />
      </div>
      <div className='tweet__col-2'>
        <div className='tweet__col-2__row-1'>
          <span
            className='btn tweet__name'
            onClick={() => {
              props.fetchUser(props.id);
              props.changePage(1);
            }}
          >
            {props.name}
          </span>
          &nbsp;
          <span className='tweet__handle'>{props.handle}&nbsp;·&nbsp;</span>
          <span className='tweet__time'>{props.time}</span>
          <MenuBackground />
          <Menu />
          <span className='tweet__menu' onClick={menuHandler}>
            {props.id === props.currentUser._id ? <Ellipsis /> : null}
          </span>
        </div>
        <div className='tweet__col-2__row-2'>{props.message}</div>
        <div className='tweet__col-2__row-3'>
          <div className='tweet__bottom-bar'>
            <TweetButton data={props.replies.length}>
              <TwitterReply />
            </TweetButton>
            <TweetButton data={props.retweets}>
              <TwitterRetweet />
            </TweetButton>
            <span className='tweet__like-btn' onClick={likeHandler}>
              <TweetButton data={likesNumber}>
                {isLiked ? <TwitterLikeActive /> : <TwitterLike />}
              </TweetButton>
            </span>
            <TweetButton>
              <TwitterShare />
            </TweetButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
