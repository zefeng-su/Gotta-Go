import { createSlice } from "@reduxjs/toolkit"; //Import the createSlice function from the Redux Toolkit

// Define the initial state of the application
const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

// Use the createSlice function from Redux Toolkit to generate the Redux reducer and action
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to toggle the mode between light and dark
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },

    // Action to log in the user and store user data and authentication token
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    // Action to log out the user and remove user data and authentication token
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    
    // Action to set the list of friends for the currently logged in user
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("Friend list blank");
      }
    },

    // Action to set the list of posts
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },

    // Action to update a specific post's description 
    setPost: (state, action) => {
      const { postId, description } = action.payload; // Destructure postId and description from the payload
      const updatedPosts = state.posts.map((post) => {
        if (post._id === postId) {
          return { ...post, description }; // Update the description of the matching post
        }
        return post;
      });
      state.posts = updatedPosts;
    },

    // Action to like a post, then update the post
    setLike: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    
    // Action to delete a post from the list of posts
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload.postId);
      
    },
    
  },
});

// Export actions for use outside of this module
export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost,deletePost, setLike } = authSlice.actions;
export default authSlice.reducer;