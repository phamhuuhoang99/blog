import "./post.css";
import { Link } from "react-router-dom";
const Post = ({ post }) => {
  const PF = "https://blog-hoang.herokuapp.com/images/";

  return (
    <div className="post">
      {post.photo && <img src={PF + post.photo} alt="" className="postImg" />}

      <div className="postInfo">
        <div className="postCat">
          {post.categories.map((category, index) => (
            <span className="postCat" key={index}>
              {category}
            </span>
          ))}
        </div>

        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
};

export default Post;
