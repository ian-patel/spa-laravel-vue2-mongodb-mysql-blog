import axios from 'axios';

const BASE_URL = '/api/auth';

/**
 * Login
 * @param {Obeject} data
 * @return {Object}
 */
export async function login(data) {
  const response = await axios.post(
    `${BASE_URL}/login`, data
  );
  return response.data;
}

/**
 * Get the user
 * @param {Obeject} data
 * @return {Object}
 */
export async function get() {
  const response = await axios.get(
    `${BASE_URL}/user`
  );
  return response.data;
}

/**
 * Logout
 * @param {Obeject} data
 * @return {Object}
 */
export async function logout(data) {
  const response = await axios.post(
    `${BASE_URL}/logout`
  );
  return response.data;
}