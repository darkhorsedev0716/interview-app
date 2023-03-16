import axios from "axios";
import { API_URL } from "../../config";
export function _fetchCategories(token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}question-category`, {
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
export function _createCategory(formData, token) {
  return new Promise((resolve, reject) => {
    axios
    .post(`${API_URL}question-category`, formData, {
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
export function _deleteCategory(id, token) {
  return new Promise((resolve, reject) => {
    axios
    .delete(`${API_URL}question-category/${id}`,{
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
export function _editCategory(id, formData, token) {
  return new Promise((resolve, reject) => {
    axios
    .put(`${API_URL}question-category/${id}`, formData, {
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