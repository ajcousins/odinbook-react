import React, { useState, useEffect } from "react";
import defaultAvatar from "./../static/default-avatar.png";
import SvgBackArrow from "./../iconComponents/SvgBackArrow";
import Follows from "./Follows";
import Tweet from "./Tweet";
import ComposeTweet from "./ComposeTweet";

const MainFeedUser = (props) => {
  return (
    <div className='mainfeed'>
      <div className='mainfeed__header'>
        <SvgBackArrow height='22.5px' />
        <div className='mainfeed__header__col-2'>
          <div className='mainfeed__header__text'>Dan Walker</div>
          <span className='mainfeed__user__tweets'>88K Tweets</span>
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
          <h2 className='mainfeed__user-title'>Dan Walker</h2>
          <p>@mrdanwalker</p>
        </div>
        <div className='mainfeed__bio__row-3'>
          <p>
            That bloke off BBC Breakfast & The NFL Show. Former Football Focus
            host, President of #EggClub & author of 'Remarkable People' ...
            http://amzn.to/2BavjV5
          </p>
        </div>
        <div className='mainfeed__bio__row-5'>
          <Follows type='Following ' number='1572' />
          <Follows type='Followers ' number='712123' />
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
      Stuff!
    </div>
  );
};

export default MainFeedUser;
