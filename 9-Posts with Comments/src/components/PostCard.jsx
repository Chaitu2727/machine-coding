import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <h1 className="text">{post.title}</h1>
      <p className="text">{post.body}</p>
      <div className="button-container">
        <Link to={`/posts/${post.id}`}>
          <button className="btn btn-post">View Post & Comments</button>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
