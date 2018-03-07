import axios from 'axios';

const BASE_URL = '/api/v1/posts';

/**
 * Fetch the posts
 * @param {Number} page
 */
export async function fetchPosts(page) {
  const response = await axios.get(
    `${BASE_URL}`, {
      params: {
        page: page,
      }
    }
  );

  return response.data;
}