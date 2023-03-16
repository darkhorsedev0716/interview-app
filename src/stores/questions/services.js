import axios from "axios";
import { API_URL } from "../../config";
export function _fetchQuestions(token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}question`, {
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
export function _createQuestion(formData, token) {
  return new Promise((resolve, reject) => {
    axios
    .post(`${API_URL}question`, formData, {
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
export function _deleteQuestion(id, token) {
  return new Promise((resolve, reject) => {
    axios
    .delete(`${API_URL}question/${id}`,{
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
export function _editQuestion(id, formData, token) {
  return new Promise((resolve, reject) => {
    axios
    .put(`${API_URL}question/${id}`, formData, {
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