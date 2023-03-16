import axios from "axios";
import { API_URL } from "../../config";
export function _fetchManagers(token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}users/system_users`, {
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
export function _createManager(formData, token) {
  return new Promise((resolve, reject) => {
    axios
    .post(`${API_URL}users/system_users`, formData, {
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
export function _deleteManager(id, token) {
  return new Promise((resolve, reject) => {
    axios
    .delete(`${API_URL}users/system_users/${id}`,{
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
export function _editManager(id, formData, token) {
  return new Promise((resolve, reject) => {
    axios
    .put(`${API_URL}users/system_users/${id}`, formData, {
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