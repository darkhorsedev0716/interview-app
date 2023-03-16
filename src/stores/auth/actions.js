import { AUTH_LOADING, AUTH_SET_TOKEN, AUTH_LOGOUT } from "./constants";
import { loginWithPassword, _register, _forgotPassword, _resetPassword } from "./services";

export function authSetLoading(loading) {
	return {
		type: AUTH_LOADING,
		payload: loading
	};
}
export function authSetData(params) {
	return {
		type: AUTH_SET_TOKEN,
		payload: params
	};
}
export function authLogout() {
	return {
		type: AUTH_LOGOUT
	};
}
export const checkLogin = (formData) => (dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch(authSetLoading(true));
		loginWithPassword(formData).then((resp)=>{
			dispatch(authSetData(resp));
			resolve(resp)
		}).catch(err=>{
			reject(err);
		}).finally(()=>{
			dispatch(authSetLoading(false));
		})
	})
};
export const register = (formData) => (dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch(authSetLoading(true));
		_register(formData).then((resp)=>{
			resolve(resp)
		}).catch(err=>{
			reject(err);
		}).finally(()=>{
			dispatch(authSetLoading(false));
		})
	})
};
export const forgotPassword = (formData) => (dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch(authSetLoading(true));
		_forgotPassword(formData).then((resp)=>{
			resolve(resp)
		}).catch(err=>{
			reject(err);
		}).finally(()=>{
			dispatch(authSetLoading(false));
		})
	})
};
export const resetPassword = (token, formData) => (dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch(authSetLoading(true));
		_resetPassword(token, formData).then((resp)=>{
			dispatch(authSetData(resp));
			resolve(resp)
		}).catch(err=>{
			reject(err);
		}).finally(()=>{
			dispatch(authSetLoading(false));
		})
	})
};