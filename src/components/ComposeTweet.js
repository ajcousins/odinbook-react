import React, { useState } from "react";
import TextareaAutosize from "react-autosize-textarea";
import axios from "axios";

const ComposeTweet = (props) => {
  const [tweetText, setTweetText] = useState("");

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
      },
    });

    props.tweetHandler();
    setTweetText("");
  };

  return (
    <div className='tweet__compose'>
      <div className='tweet__col-1'>
        <img
          className='tweet__avatar'
          src={`img/users/${props.currentUser.photo}`}
        />
      </div>
      <div className='tweet__compose__col-2'>
        <TextareaAutosize
          className='tweet__compose__input'
          placeholder="What's happening?"
          onChange={onChangeHandler}
          value={tweetText}
          maxLength='280'
        />
        <div className='tweet__compose__footer'>
          <button
            className='tweet__compose--submit'
            type='submit'
            onClick={tweetSubmit}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComposeTweet;
