import React from "react";

function SvgEllipsis(props) {
  return (
    <svg
      viewBox='0 0 24 24'
      className='leftsidebar__useradmin__ellipsis'
      // width='24'
      // height='18'
    >
      <g fill='#0F1419'>
        <circle cx='5' cy='12' r='2' fill='#0F1419'></circle>
        <circle cx='12' cy='12' r='2' fill='#0F1419'></circle>
        <circle cx='19' cy='12' r='2' fill='#0F1419'></circle>
      </g>
    </svg>
  );
}
export default SvgEllipsis;
