import * as types from '../mutation-types';
import * as api from 'app/admin/api/categories';

// state
export const state = {
  categories: null,
  total: 0,
}

// mutations
export const mutations = {
  // Save categories
  [types.SAVE_CATEGORIES] (state, { categories }) {  
    state.categories = categories;
    state.categories = _.sortedUniqBy(state.categories, '_id');
  },

  // update total number of categories
  [types.UPDATE_CATEGORY_TOTAL] (state, { total }) {  
    state.total = total;
  },
}

// actions
export const actions = {
  /**
   * Get the categories
   * @param  {Function} options.commit
   * @param  {Object} payload
   * @return {Object}
   */
  async fetchCategories ({ commit }, payload) {
    const response = await api.list(payload)
    commit(types.SAVE_CATEGORIES, { categories: response.data });
    commit(types.UPDATE_CATEGORY_TOTAL, { total: response.total });
    return response.categories;
  },
}

// getters
export const getters = {
  categories(state) {
    return state.categories;
  },
  totalCategories(state) {
    return state.total;
  },
  getCategoryById(state) {
    return (prop) => {
      return state.categories.find(n => n._id === prop);
    };
  },
}
