import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";

const PostComments = () => {
  const navigate = useNavigate();

  const [{ data: post }, { data: comments }] = useLoaderData();

  return (
    <>
      <div>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </div>
      <div>
        <h1>Comments</h1>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.body}</li>
          ))}
        </ul>
      </div>
      <button className="btn btn-post" onClick={() => navigate(-1)}>
        Back
      </button>
    </>
  );
};

export async function postCommentLoader({ params: { postID } }) {
  const [post, comments] = await Promise.all([
    axios.get(`https://jsonplaceholder.typicode.com/posts/${postID}`),
    axios.get(`https://jsonplaceholder.typicode.com/posts/${postID}/comments`),
  ]);

  return [post, comments];
}

export default PostComments;
