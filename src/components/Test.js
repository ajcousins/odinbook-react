import React, { useState, useEffect } from "react";
// import stringify from

const Test = (props) => {
  const [testMessage, setTestMessage] = useState("");

  useEffect(async () => {
    const response = await fetch("/users/", {
      method: "GET",
      headers: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYjkxYTg5MTA1ZmI4MTBkZDNiMDYzNCIsImlhdCI6MTYyMjgwMzUyNiwiZXhwIjoxNjIyODM5NTI2fQ.nosObeobqly2pX-vOqQlGhGcDFMLOh8cen9RM8aSY94",
      }),
    });
    const data = await response.json();
    setTestMessage(JSON.stringify(data.data.tweets));
  });

  // useEffect(() => {
  //   fetch("/users/")
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //     })
  //     .then((jsonRes) => setTestMessage(jsonRes.message));
  // });

  return <div>Testing connection: {testMessage}</div>;
};

export default Test;
