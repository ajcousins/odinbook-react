import React from "react";
import Tweet from "./../components/Tweet";
import Test from "./../components/Test";

const MainFeed = (props) => {
  return (
    <div className='mainfeed'>
      <div className='mainfeed__header'>
        <div className='mainfeed__header__text'>{props.title}</div>
      </div>
      <Tweet
        className='tweet'
        name='Barack Obama'
        handle='@BarackObama'
        profilePic=''
        time='May 28'
        message='It’s great to be back in my hometown and even better to spend some time with talented young people in Jackson Park. I’m proud of the Wolfpack for a terrific season, and for their leadership off the field as well. Thanks for letting me give a guest pep talk!'
        replies='16K'
        retweets='16.9K'
        likes='119.9K'
      />
      <Tweet
        className='tweet'
        name='Alvin Cousins'
        handle='@ilovelamp1024'
        profilePic=''
        time='2h'
        message='Hello, World!'
        replies='265K'
        retweets='52.9K'
        likes='135.6K'
      />
      <Test />
    </div>
  );
};

export default MainFeed;
