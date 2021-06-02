import React from "react";

const TweetButton = (props) => {
  return (
    <div className='tweet__button'>
      <div className='tweet__icon-area'>{props.children}</div>
      &nbsp;&nbsp; {props.data}
    </div>
  );
};

export default TweetButton;
