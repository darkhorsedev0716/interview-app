import axios from "axios";
import { API_URL } from "../../config";
export function _fetchCandidates(status, token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}candidate?status=${status}`, {
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
export function _createCandidate(formData, token) {
  return new Promise((resolve, reject) => {
    axios
    .post(`${API_URL}candidate`, formData, {
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
export function _deleteCandidate(id, token) {
  return new Promise((resolve, reject) => {
    axios
    .delete(`${API_URL}candidate/${id}`,{
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
export function _editCandidate(id, formData, token) {
  return new Promise((resolve, reject) => {
    axios
    .put(`${API_URL}candidate/${id}`, formData, {
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
export function _fetchCandidateDetails(id, token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}candidate/${id}`, {
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
export function _sendInvitation(id, token) {
  return new Promise((resolve, reject) => {
    axios
    .get(`${API_URL}candidate/send_invitation/${id}`, {
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
export function _submitReview(id, formData, token) {
  return new Promise((resolve, reject) => {
    axios
    .post(`${API_URL}candidate/submit_review/${id}`, formData, {
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