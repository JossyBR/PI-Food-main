import React from "react";
import spinner from "../../assets/loading.gif";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "40vh",
      }}
    >
      <img src={spinner} alt="loading..." />
    </div>
  );
};

export default Loading;
