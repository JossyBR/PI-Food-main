import React from "react";
import spinner from "../../assets/spinner.gif";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <img src={spinner} alt="loading..." />
    </div>
  );
};

export default Loading;