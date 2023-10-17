import React, { useState, useEffect } from "react";
import axios from "axios";
import server from "../config/index";
import FeedCard from "../components/FeedCard";
const Feed = () => {
  const [feed, setFeed] = React.useState([]);
  const [autherName, setAutherName] = React.useState("");
  const [autherId, setAutherId] = React.useState("");
  const [content, setContent] = React.useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    const userObj = JSON.parse(user);
    setAutherId(userObj._id);
    setAutherName(userObj.name);
  }, []);
  useEffect(() => {
    axios
      .get(`${server}/api/post/getAllPosts`)
      .then((res) => {
        setFeed(res.data.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${server}/api/post/createPost`, {
        autherName,
        autherId,
        content,
      });
      axios
        .get(`${server}/api/post/getAllPosts`)
        .then((res) => {
          setFeed(res.data.data.posts);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container-fluid container">
      <div className="row">
        <div className="col-12">
          <h1
            className="text-center"
            style={{
              fontFamily: "Roboto Condensed",
            }}
          >
            Feed
          </h1>
        </div>
        <div className="col-12">
          <hr />
        </div>

        <div className="col-12">
          <form>
            <div className="form-group">
              <label htmlFor="content">
                <h3>Share your thoughts with the world </h3>
              </label>
              <textarea
                className="form-control"
                id="content"
                rows="3"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                fontFamily: "Roboto Condensed",
                marginTop: "10px",
              }}
              onClick={handleSubmit}
            >
              Post
            </button>
          </form>
        </div>

        <div className="col-12">
          <hr />
        </div>

        <div className="col-12">
          {feed.map((item, index) => (
            <FeedCard
              key={index}
              autherName={item.autherName}
              content={item.content}
              date={item.date}
              likes={item.likes}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
