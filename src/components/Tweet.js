import React from "react";
import defaultAvatar from "./../static/default-avatar.png";
import TweetButton from "./TweetButton";
import TwitterReply from "./../iconComponents/SvgTwitterReply";
import TwitterRetweet from "./../iconComponents/SvgTwitterRetweet";
import TwitterLike from "./../iconComponents/SvgTwitterLike";
import TwitterShare from "./../iconComponents/SvgTwitterShare";

const Tweet = (props) => {
  return (
    <div className='tweet'>
      <div className='tweet__col-1'>
        <img className='tweet__avatar' src={defaultAvatar} />
      </div>
      <div className='tweet__col-2'>
        <div className='tweet__col-2__row-1'>
          <span className='tweet__name'>{props.name}</span>&nbsp;
          <span className='tweet__handle'>{props.handle}&nbsp;·&nbsp;</span>
          <span className='tweet__time'>{props.time}</span>
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
