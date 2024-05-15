import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AuthContext } from "../helpers/AuthContext";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:3001/posts", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfPosts(response.data.listOfPosts);
          setLikedPosts(
            response.data.likedPosts.map((like) => {
              return like.PostId;
            })
          );
        });
    }
  }, [navigate]);

  const likeAPost = (postId) => {
    axios
      .post(
        "http://localhost:3001/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );

        if (likedPosts.includes(postId)) {
          setLikedPosts(
            likedPosts.filter((id) => {
              return id !== postId;
            })
          );
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
      });
  };

  return (
    <div className="App">
      <h1 className="app-name">CONNECT</h1>
      {listOfPosts.map((value, key) => {
        return (
          <div key={key} className="post">
            <div className="title"> {value.title} </div>
            <div
              className="body"
              onClick={() => {
                navigate(`/post/${value.id}`);
              }}
            >
              {value.postText}
            </div>
            <div className="footer">
              <Link className="username" to={`/profile/${value.UserId}`}>
                {value.username}
              </Link>
              <div className="buttons">
                <FavoriteIcon
                  style={{ color: likedPosts.includes(value.id) ? "red" : "inherit" }}
                  onClick={() => {
                    likeAPost(value.id);
                  }}
                  className={likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"}
                />
                <label> {value.Likes.length}</label>
              </div>
            </div>
          </div>
        );
      })}
      <div className="additional-info">
        <p>Created by Surya</p>
        <p>&copy; <span id="year"></span> Connect App. All Rights Reserved.</p>
        {/* <p>
          <a href="/privacy-policy">Privacy Policy</a> |
          <a href="/terms-of-service">Terms of Service</a> |
          <a href="/contact">Contact Us</a>
        </p> */}
      </div>
    </div>
  );
}

export default Home;
