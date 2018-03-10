import * as api from 'app/admin/api/auth';
import * as types from '../mutation-types';
import Cookies from 'js-cookie'

// state
export const state = {
  user: null,
}

// mutations
export const mutations = {
  // Login the user
  [types.SAVE_USER] (state, { user }) {  
    state.user = user;
  },

  // Save the token
  [types.SAVE_TOKEN] (state, { token } ) {
    Cookies.set('token', token, { expires: 365 });
  },

  // logout
  [types.LOGOUT] (state) {
    state.user = null;
    Cookies.remove('token');
  },
}

// actions
export const actions = {
  /**
   * Login
   * @param  {Function} options.commit
   * @return {Object} user
   */
  async login({ commit }, data) {
    const response = await api.login(data);
    commit(types.SAVE_USER, { user: response.user });
    commit(types.SAVE_TOKEN, { token: response.token });
    return response.user;
  },

  /**
   * ReLogin
   * @param  {Function} options.commit
   * @return {Object} user
   */
  async getUser({ commit }) {
    if (Cookies.get('token')) {
      const response = await api.get();
      commit(types.SAVE_USER, { user: response.user });
      return response.user;
    }
    return false;
  },

  /**
   * Logout
   * @param  {Function} options.commit
   * @return 
   */
  async logout ({ commit }) {
    const response = await api.logout();
    commit(types.LOGOUT);
  },

  /**
   * Clear
   * @param  {Function} options.commit
   * @return 
   */
  async clear ({ commit }) {
    commit(types.LOGOUT);
  },
}

// getters
export const getters = {
  isLoggedIn(state) {
    return state.user !== null || Cookies.get('token');
  },
  user(state) {
    return state.user;
  },
}
