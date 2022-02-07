import "./singlePost.css";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../context/Context";
import { axiosInstance } from "../../config";

const SinglePost = () => {
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const [post, setPost] = useState(null);
  const { user } = useContext(Context);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const PF = "https://blog-hoang.herokuapp.com/images/";

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axiosInstance.get(`/posts/${postId}`);
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [postId]);

  const handleClick = async () => {
    await axiosInstance.delete("/posts/" + postId, {
      data: { username: user.username },
    });

    window.location.replace("/");
  };

  const handleUpdate = async () => {
    await axiosInstance.put("/posts/" + postId, {
      username: user.username,
      title,
      desc,
    });
    // window.location.reload();
    setUpdateMode(false);
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post?.photo && (
          <img className="singlePostImg" src={PF + post?.photo} alt="" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post?.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleClick}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span>
            Author:
            <Link to={`/?user=${post?.username}`} className="link">
              <b className="singlePostAuthor">{post?.username}</b>
            </Link>
          </span>
          <span>{new Date(post?.createdAt).toDateString()}</span>
        </div>
        {updateMode ? (
          <>
            <textarea
              className="singlePostDescInput"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <button className="singlePostButton" onClick={handleUpdate}>
              Update
            </button>
          </>
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
