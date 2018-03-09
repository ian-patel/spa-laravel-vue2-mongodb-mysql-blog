import * as api from 'app/blog/api/post';
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
    state.posts.push(...posts);
    state.posts = _.sortedUniqBy(state.posts, '_id');
  },

  // update has more posts
  [types.UPDATE_HAS_MORE_POSTS] (state, { hasMore }) {  
    state.hasMore = hasMore;
  },

  // update current page
  [types.UPDATE_CURRENT_PAGE] (state, { currentPage }) {  
    state.currentPage = currentPage;
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
    const response = await api.list(state.currentPage + 1);
    commit(types.SAVE_POSTS, { posts: response.posts });
    commit(types.UPDATE_HAS_MORE_POSTS, { hasMore: response.hasMore });
    commit(types.UPDATE_CURRENT_PAGE, { currentPage: response.currentPage });
    return response.posts;
  },

  /**
   * Get the post
   * @param  {Function} options.commit
   * @param  {String} options.commit
   * @return {Object}
   */
  async fetchPost ({ commit }, _id) {
    const post = await api.get( _id );
    commit(types.SAVE_POSTS, { posts: post });
    return post;
  },

  /**
   * Fire click
   * @param  {Function} options.commit
   * @param  {String} options.commit
   * @return {Object}
   */
  async fireClick ({ commit }, _id) {
    const post = await api.clicked( _id );
    commit(types.SAVE_POSTS, { posts: post });
    return post;
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
  getPostById(state) {
    return (prop) => {
      return state.posts.find(n => n._id === prop);
    };
  },
}
