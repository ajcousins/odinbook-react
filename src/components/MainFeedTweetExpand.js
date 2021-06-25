import SvgBackArrow from "./../iconComponents/SvgBackArrow";

const MainFeedTweetExpand = (props) => {
  return (
    <div className='mainfeed'>
      <div className='mainfeed__header'>
        <SvgBackArrow height='22.5px' changePage={() => props.changePage(0)} />
        <div className='mainfeed__header__col-2'>
          <div className='mainfeed__header__text'>Tweet</div>
        </div>
      </div>
      <div className='tweet-expanded'>
        <div>{props.selectedTweet.userDetails.name}</div>

        <div>{props.selectedTweet.userDetails.handle}</div>
        <div>{props.selectedTweet.userDetails.photo}</div>
        <div>{props.selectedTweet.tweetDetails.textContent}</div>
      </div>
    </div>
  );
};

export default MainFeedTweetExpand;
