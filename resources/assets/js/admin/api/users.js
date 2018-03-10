import axios from 'axios';

const BASE_URL = '/api/users';

/**
 * Fetch the users
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
 * Fetch the User
 * @param {String} id
 * @return {Objects}
 */
export async function get(id) {
  const response = await axios.get(
    `${BASE_URL}/${id}`
  );
  return response.data;
}

/**
 * Delete the user
 * @param {String} id
 * @return {Objects}
 */
export async function softDelete(id) {
  const response = await axios.delete(
    `${BASE_URL}/${id}`
  );
  return response.data;
}