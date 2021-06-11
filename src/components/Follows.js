const Follows = (props) => {
  const numberFormat = (int) => {
    return int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <span style={{ marginRight: "1.5em" }}>
      <strong>{numberFormat(props.number)}</strong>&nbsp;{props.type}
    </span>
  );
};

export default Follows;
