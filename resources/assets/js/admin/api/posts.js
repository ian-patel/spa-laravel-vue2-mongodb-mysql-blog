import axios from 'axios';

const BASE_URL = '/api/posts';

/**
 * Delete the post
 * @param {String} id
 * @return {Objects}
 */
export async function softDelete(_id) {
  const response = await axios.delete(
    `${BASE_URL}/${_id}`
  );
  return response.data;
}

/**
 * Edit the post
 * @param {String} id
 * @return {Objects}
 */
export async function editPost(_id, payload) {
  console.log(payload);
  const response = await axios.put(
    `${BASE_URL}/edit/${_id}`, payload
  );
  return response.data;
}

/**
 * Add the post
 * @param {String} id
 * @return {Objects}
 */
export async function addPost(payload) {
  console.log(payload);
  const response = await axios.post(
    `${BASE_URL}/store`, payload
  );
  return response.data;
}