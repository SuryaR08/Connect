import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Profile() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
    });

    axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

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
              return id != postId;
            })
          );
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
      });
  };

  return (
    <div className="App">
        <div className="basicInfo">
          <h1 className="profilename"> Username: {username} </h1>
          {authState.username === username && (
            <button onClick={() => navigate("/changepassword")}>
              Change Password
            </button>
          )}
        </div>
        <div className="listOfPosts">
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
                  <div className="username">{value.username}</div>
                  <div className="buttons">
                    <FavoriteIcon
                      style={{
                        color: value.Likes.length > 0 ? "red" : "inherit",
                      }}
                      onClick={() => {
                        likeAPost(value.id);
                      }}
                      className={
                        likedPosts.includes(value.id)
                          ? "unlikeBttn"
                          : "likeBttn"
                      }
                    />
                    <label> {value.Likes.length}</label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      <div className="additional-info">
        <p>Created by Surya</p>
        <p>
          &copy; <span id="year"></span> Connect App. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export default Profile;
