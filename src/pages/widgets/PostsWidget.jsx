// Importing necessary libraries and components
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

function PostsWidget ({ userId, isProfile = false }) {
  const dispatch = useDispatch(); // useDispatch hook used for dispatching actions to the Redux store

  // useSelector hook used for selecting the posts and token state from the Redux store
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  // Function to make a GET request to the server for all posts
  const getPosts = async () => {
    // Fetch data from server, with token passed in headers for authentication
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json(); // Parse the response into a JSON object
    dispatch(setPosts({ posts: data.reverse() }));  // Dispatch the setPosts action to the Redux store with the received data, reverse the array for newest posts first
  };

  // Function to make a GET request to the server for a specific user's posts
  const getUserPosts = async () => {
    // Fetch data from server, with token passed in headers for authentication
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json(); // Parse the response into a JSON object
    dispatch(setPosts({ posts: data.reverse() })); // Dispatch the setPosts action to the Redux store with the received data, reverse the array for newest posts first
  };

  // useEffect hook used for executing the getPosts or getUserPosts functions when the component mounts
  // It depends on the isProfile prop to decide which function to execute
  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* Check if posts is an array and then map over it to create a PostWidget for each post */}
      {Array.isArray(posts) &&
        posts.map(({ _id, userId, firstName, lastName, description, location, picturePath, userPicturePath, likes, comments }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        ))}
    </>
  );
};

export default PostsWidget;
