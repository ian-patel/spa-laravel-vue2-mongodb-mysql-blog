import * as api from 'app/api/post';
import * as types from '../mutation-types';

// state
export const state = {
  posts: [],
  hasMore: true,
  currentPage: 0,
}

// mutations
export const mutations = {
  // Save posts
  [types.SAVE_POSTS] (state, { posts }) {  
    state.posts.push(...posts.posts);  
    state.hasMore = posts.hasMore;
    state.currentPage = posts.currentPage;
  },
}

// actions
export const actions = {
  /**
   * Get the posts
   * @param  {Function} options.commit
   * @return {Object}
   */
  async fetchPosts ({ commit }) {
    const posts = await api.fetchPosts(state.currentPage + 1);
    commit(types.SAVE_POSTS, { posts: posts });
    return posts;
  },
}

// getters
export const getters = {
  posts(state) {
    return state.posts;
  },
  hasMore(state) {
    return state.hasMore;
  },
}
