import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },

    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent");
      }
    },

    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },

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

    setLike: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload.postId);
      
    },
    
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost,deletePost, setLike } = authSlice.actions;
export default authSlice.reducer;