import axios from "axios";
import { API_URL } from "../../config";
export function _fetchInterviews(status, token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}interview?status=${status}`, {
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
export function _createInterview(formData, token) {
  return new Promise((resolve, reject) => {
    axios
    .post(`${API_URL}interview`, formData, {
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
export function _deleteInterview(id, token) {
  return new Promise((resolve, reject) => {
    axios
    .delete(`${API_URL}interview/${id}`,{
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
export function _editInterview(id, formData, token) {
  return new Promise((resolve, reject) => {
    axios
    .put(`${API_URL}interview/${id}`, formData, {
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
export function _fetchInterviewDetails(id, token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}interview/${id}`, {
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
export function _generateLink(id, token) {
  return new Promise((resolve, reject) => {
    axios
    .get(`${API_URL}interview/generate_link/${id}`, {
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