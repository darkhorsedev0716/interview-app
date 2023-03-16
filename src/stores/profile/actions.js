import { PROFILE_LOADING, PROFILE_SET_DATA } from "./constants";
import { _fetchProfile, _changePassword, _editProfile, _editEmail, _uploadAvatar, _setLocation } from "./services";

export function profileSetLoading(loading) {
	return {
		type: PROFILE_LOADING,
		payload: loading
	};
}
export function profileSetData(params) {
	return {
		type: PROFILE_SET_DATA,
		payload: params
	};
}
export const fetchProfile = () => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth
		dispatch(profileSetLoading(true));
		_fetchProfile(token).then((resp) => {
			dispatch(profileSetData(resp));
			resolve(resp)
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(profileSetLoading(false));
		})
	})
};
export const changePassword = (formData) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		dispatch(profileSetLoading(true));
		const { token } = getState().auth;
		_changePassword(formData, token).then((resp) => {
			resolve(resp)
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(profileSetLoading(false));
		})
	})
};
export const editProfile = (formData) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		dispatch(profileSetLoading(true));
		const { token } = getState().auth;
		_editProfile(formData, token).then((resp) => {
			resolve(resp)
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(profileSetLoading(false));
		})
	})
};
export const editEmail = (formData) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		dispatch(profileSetLoading(true));
		const { token } = getState().auth;
		_editEmail(formData, token).then((resp) => {
			resolve(resp)
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(profileSetLoading(false));
		})
	})
};
export const setLocation = (formData) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const { token } = getState().auth;
		_setLocation(formData, token).then((resp) => {
			resolve(resp);
		}).catch(err => {
			reject(err);
		})
	})
};
export const uploadAvatar = (formData, id) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const { token } = getState().auth;
		_uploadAvatar(formData, token).then((resp) => {
			dispatch(fetchProfile(id))
			resolve(resp)
		}).catch(err => {
			reject(err);
		})
	})
};