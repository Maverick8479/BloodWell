import React from "react";

const FeedCard = ({ autherName, content, date, likes }) => {
  return (
    <div
      className="card m-2"
      style={{
        fontFamily: "Roboto Condensed",
        height: "auto",
        width: "auto",
        border: "1px solid black",
      }}
    >
      <div className="card-body">
        <h5
          className="card-title"
          style={{
            fontFamily: "Roboto Condensed",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          @{autherName}
        </h5>
        <p className="card-text">{content}</p>
        <p className="card-text">
          {
            //make the date simple
            date.substring(0, 10)
          }
        </p>
        <p className="card-text">{likes}</p>
      </div>
    </div>
  );
};

export default FeedCard;
