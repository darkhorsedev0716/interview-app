import axios from "axios";
import { API_URL } from "../../config";
export function _fetchUsers(token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}users/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(async (response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export function _editUser(id, formData, token) {
  return new Promise((resolve, reject) => {
    axios
    .patch(`${API_URL}users/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(async (response) => {
      resolve(response.data);
    })
    .catch((err) => {
      reject(err);
    });
  });
}