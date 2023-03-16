import axios from "axios";
import { API_URL } from "../../config";
export function _fetchSharedInterviews(token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}shared-interview`, {
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
export function _createSharedInterview(formData, token) {
  return new Promise((resolve, reject) => {
    axios
    .post(`${API_URL}shared-interview`, formData, {
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
export function _deleteSharedInterview(id, token) {
  return new Promise((resolve, reject) => {
    axios
    .delete(`${API_URL}shared-interview/${id}`,{
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
export function _editSharedInterview(id, formData, token) {
  return new Promise((resolve, reject) => {
    axios
    .put(`${API_URL}shared-interview/${id}`, formData, {
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
export function _fetchSharedInterviewDetails(id, formData, token) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}shared-interview/${id}`, formData, {
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
export function _fetchSharedInterviewDetailsPublic(id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}shared-interview/public/${id}`)
      .then(async (response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}