import { createSlice } from "@reduxjs/toolkit"

const intialState = {
    mode: "light",
    user: null,
    token: null,
    posts: []
};

export const authSlice = createSlice({
    name: "auth",
    intialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        }
    },
    setLogin: (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
    },
    setLogout: (state) => {
        state.user = null
        state.token = null
    },
    setFriends: (state, action) => {
        if (state.user) {
            state.user.friends = action.payload.friends;
        } else {
            console.error("User frirnds non-existent :(")
        }
    },
    setPosts: (state, action) => {
        state.posts = action.payload.posts
    },
    setPost: (state, action) => {
        const updatedPosts = state.posts.map((post) => {
            // this if stmt means we are changing the posts array as we add new post
            if (post._id === action.payload.post_id) return action.payload.post;
            // if we aren't able to add new post then will simply return the current post array
            return post
        })
        state.post = updatedPosts;
    }
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;

export default authSlice.reducer;