import React, { useState, useEffect } from "react";
// import stringify from

const Test = (props) => {
  const [testMessage, setTestMessage] = useState("");

  useEffect(async () => {
    const response = await fetch("/tweets/", {
      method: "GET",
      // headers: new Headers(props.header),
    });
    const data = await response.json();
    setTestMessage(JSON.stringify(data.data.tweets));
  });

  return <div>Testing connection: {testMessage}</div>;
};

export default Test;
