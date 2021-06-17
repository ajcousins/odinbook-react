import React, { useState } from "react";
import defaultAvatar from "./../static/default-avatar.png";
import TweetButton from "./TweetButton";
import TwitterReply from "./../iconComponents/SvgTwitterReply";
import TwitterRetweet from "./../iconComponents/SvgTwitterRetweet";
import TwitterLike from "./../iconComponents/SvgTwitterLike";
import TwitterShare from "./../iconComponents/SvgTwitterShare";
import Ellipsis from "./../iconComponents/SvgEllipsis";

const Tweet = (props) => {
  const [menuActive, setMenuActive] = useState(false);

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
          <div className='tweet__menu__background' onClick={menuHandler}></div>
        </div>
      );
    } else return null;
  };

  const Menu = () => {
    if (menuActive) {
      return (
        <div>
          <div
            className='tweet__menu__face'
            onClick={() => deleteTweetHandler(props.tweetId)}
          >
            Delete Tweet
          </div>
        </div>
      );
    } else return null;
  };

  return (
    <div className='tweet'>
      <div className='tweet__col-1'>
        <img className='tweet__avatar' src={defaultAvatar} />
      </div>
      <div className='tweet__col-2'>
        <div className='tweet__col-2__row-1'>
          <span
            className='tweet__name'
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
            <TweetButton data={props.replies}>
              <TwitterReply />
            </TweetButton>

            <TweetButton data={props.retweets}>
              <TwitterRetweet />
            </TweetButton>

            <TweetButton data={props.likes}>
              <TwitterLike />
            </TweetButton>

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
