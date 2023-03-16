import axios from "axios";
import { API_URL } from "../../config";
export function _fetchProfile(token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}users/me`, {
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
export function _changePassword(formData, token) {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${API_URL}users/updatePassword`, formData, {
        headers:{
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
export function _editProfile(formData, token) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}profile/edit`, formData, {
        headers:{
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
export function _editEmail(formData, token) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}profile/edit-email`, formData, {
        headers:{
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
export function _setLocation(formData, token) {
  return new Promise((resolve, reject) => {
    axios
    .put(`${API_URL}profile/set-location`, formData, {
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
  })
}
export function _uploadAvatar(formData, token) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}profile/upload-avatar`, formData, {
        headers:{
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