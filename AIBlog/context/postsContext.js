import React, { useCallback, useReducer, useState } from "react";
const PostsContext = React.createContext();

export default PostsContext;

function postReducer(state, action) {
  switch (action.type) {
    case "ADD_POST": {
      const newPosts = [...state];
      action.posts.forEach((post) => {
        const exits = newPosts.find((p) => p._id === post._id);
        if (!exits) newPosts.push(post);
      });
      return newPosts;
    }
    case "DELETE_POST": {
      const newPosts = [];
      state.forEach((post) => {
        if (post._id !== action.postId) {
          newPosts.push(post);
        }
      });
      return newPosts;
    }
    default: {
      return state;
    }
  }
}

export const PostProvider = ({ children }) => {
  const [posts, dispatch] = useReducer(postReducer, []);
  const [noMorePosts, setNoMorePosts] = useState(false);

  const deletePost = useCallback((postId) => {
    dispatch({
      type: "DELETE_POST",
      postId,
    });
  }, []);

  const setPostsFromSSR = useCallback((postsFromSSR = []) => {
    dispatch({
      type: "ADD_POST",
      posts: postsFromSSR,
    });
  }, []);

  const getPosts = useCallback(
    async ({ lastPostDate, getNewerPosts = false }) => {
      const results = await fetch("/api/getPosts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ lastPostDate, getNewerPosts }),
      });
      const json = await results.json();
      const postResults = json.posts || [];
      if (postResults.length < 5) {
        setNoMorePosts(true);
      }
      dispatch({
        type: "ADD_POST",
        posts: postResults,
      });
    },
    []
  );
  return (
    <PostsContext.Provider
      value={{ posts, setPostsFromSSR, getPosts, noMorePosts, deletePost }}
    >
      {children}
    </PostsContext.Provider>
  );
};
