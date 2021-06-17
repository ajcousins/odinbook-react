import defaultAvatar from "./../static/default-avatar.png";

const UserTile = (props) => {
  const status = (status) => {
    if (status === "current user") return null;
    else if (status === "following")
      return (
        <button
          className='btn--following'
          onClick={() => props.updateArray(props.user._id, "not following")}
        ></button>
      );
    else
      return (
        <button
          className='btn--follow'
          onClick={() => props.updateArray(props.user._id, "following")}
        >
          Follow
        </button>
      );
  };

  const nameClickHandler = () => {
    console.log("id:", props.user._id);
    props.fetchUser(props.user._id);
    // props.refreshSelectedUser();
  };

  return (
    <div className='userPreviewTile'>
      <div className='userPreviewTile__col-1'>
        <img className='tweet__avatar' src={defaultAvatar} />
      </div>
      <div className='userPreviewTile__col-2'>
        <div className='userPreviewTile__col-2__row-1'>
          <div>
            <div className='userPreviewTile__name' onClick={nameClickHandler}>
              {props.user.name}
            </div>
            <div className='userPreviewTile__handle'>@{props.user.handle}</div>
          </div>
          {status(props.status)}
        </div>
        <div className='userPreviewTile__col-2__row-2'>
          Placeholder bio text.
        </div>
      </div>
    </div>
  );
};

export default UserTile;
