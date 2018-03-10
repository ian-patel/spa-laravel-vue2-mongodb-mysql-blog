import axios from 'axios';

const BASE_URL = '/api/posts';

/**
 * Fetch the posts
 * @param {Number} page
 * @return {Objects}
 */
export async function list(page) {
  const response = await axios.get(
    `${BASE_URL}`, {
      params: {
        page: page,
      }
    }
  );
  return response.data;
}

/**
 * Fetch the post
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
 * Fetch the post
 * @param {String} _id
 * @return {Objects}
 */
export async function clicked(_id) {
  const response = await axios.put(
    `${BASE_URL}/click`,
    {
      id: _id,
    }
  );
  return response.data;
}