import loader from "./../static/loader-gif.gif";

const LoadingTile = () => {
  return (
    <div className='loading-tile'>
      <img className='loading-tile__gif' src={loader}></img>
    </div>
  );
};

export default LoadingTile;
