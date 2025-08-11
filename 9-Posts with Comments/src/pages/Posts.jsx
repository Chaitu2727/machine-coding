import axios from "axios";
import PostCard from "../components/PostCard";
import { useLoaderData } from "react-router-dom";
import { FixedSizeList } from "react-window";
const Posts = () => {
  const { data: posts } = useLoaderData();

  const Post = ({ index, style }) => (
    <div style={style}>
      <PostCard key={posts[index].id} post={posts[index]} />
    </div>
  );

  return (
    <div className="posts-container">
      {/* virtualization code */}
      <FixedSizeList
        height={window.innerHeight}
        itemCount={posts.length}
        width="100%"
        itemSize={170}
      >
        {Post}
      </FixedSizeList>
      {/* {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))} */}
    </div>
  );
};

export default Posts;

export async function postsLoader() {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_limit=50`
  );
  return response;
}
