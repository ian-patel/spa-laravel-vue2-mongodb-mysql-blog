import axios from 'axios';

const BASE_URL = '/api/categories';

/**
 * Fetch the categories
 * @param {Number} page
 * @return {Objects}
 */
export async function list(params) {
  const response = await axios.get(
    `${BASE_URL}`, {
      params: {
        ...params
      }
    }
  );
  return response.data;
}

/**
 * Fetch the category
 * @param {String} _id
 * @return {Objects}
 */
export async function get(_id) {
  const response = await axios.get(
    `${BASE_URL}/${_id}`
  );
  return response.data;
}

/**
 * Delete the category
 * @param {String} id
 * @return {Objects}
 */
export async function softDelete(_id) {
  const response = await axios.delete(
    `${BASE_URL}/${_id}`
  );
  return response.data;
}