import * as api from 'app/commons/api/posts';
import * as authApi from 'app/admin/api/posts';
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

  // remove the post
  [types.DELETE_POST] (state, { _id }) {  
    _.remove(state.posts, function(p) {
      return p._id == _id;
    });
  },

  // update the post
  [types.UPDATE_POST] (state, { post }) {  
    const index = _.findIndex(state.posts, { _id: post._id });
    state.posts[index] = post;
  },

  // acd the post
  [types.ADD_POST] (state, { post }) {  
    state.posts.unshift(...post);
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
   * @param  {String} _id
   * @return {Object}
   */
  async fetchPost ({ commit }, _id) {
    const post = await api.get( _id );
    commit(types.SAVE_POSTS, { posts: post });
    return post;
  },

  /**
   * Delete the post
   * @param  {Function} options.commit
   * @param  {String} _id
   * @return {Boolean}
   */
  async deletePostById ({ commit }, _id) {
    const response = await authApi.softDelete( _id );
    commit(types.DELETE_POST, { _id: _id });
    return response.success;
  },

  /**
   * Edit the post
   * @param  {Function} options.commit
   * @param  {Object} payload
   * @return {Object}
   */
  async editPost ({ commit }, payload) {
    const post = await authApi.editPost( payload._id, payload.data );
    commit(types.UPDATE_POST, { post: post });
    return post;
  },

  /**
   * Add the post
   * @param  {Function} options.commit
   * @param  {Object} payload
   * @return {Object}
   */
  async addPost ({ commit }, payload) {
    const post = await authApi.addPost( payload.data );
    commit(types.ADD_POST, { post: post });
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
