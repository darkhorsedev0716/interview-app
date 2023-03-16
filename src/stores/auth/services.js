import axios from "axios";
import { API_URL } from "../../config";
export function loginWithPassword(formData) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}auth/login`, formData)
      .then(async (response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export function _register(formData) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}auth/register`, formData)
      .then(async (response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export function _forgotPassword(formData) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}auth/forgotPassword`, formData)
      .then(async (response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export function _resetPassword(token, formData) {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${API_URL}auth/resetPassword/${token}`, formData)
      .then(async (response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}