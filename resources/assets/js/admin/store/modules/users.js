import * as types from '../mutation-types';
import * as api from 'app/admin/api/users';

// state
export const state = {
  users: null,
  total: 0,
}

// mutations
export const mutations = {
  // Save users
  [types.SAVE_USERS] (state, { users }) {  
    state.users = users;
  },

  // update total number of users
  [types.UPDATE_USER_TOTAL] (state, { total }) {  
    state.total = total;
  },
}

// actions
export const actions = {
  /**
   * Get the users
   * @param  {Function} options.commit
   * @param  {Object} payload
   * @return {Object}
   */
  async fetchUsers ({ commit }, payload) {
    const response = await api.list(payload)
    commit(types.SAVE_USERS, { users: response.data });
    commit(types.UPDATE_USER_TOTAL, { total: response.total });
    return response.users;
  },
}

// getters
export const getters = {
  users(state) {
    return state.users;
  },
  totalUsers(state) {
    return state.total;
  },
}
