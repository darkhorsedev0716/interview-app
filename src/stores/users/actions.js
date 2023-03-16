import { USERS_LOADING, USERS_SET_DATA } from "./constants";
import { _fetchUsers, _editUser } from "./services";

export function usersSetLoading(loading) {
	return {
		type: USERS_LOADING,
		payload: loading
	};
}
export function usersSetData(params) {
	return {
		type: USERS_SET_DATA,
		payload: params
	};
}
export const fetchUsers = () => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth;
		dispatch(usersSetLoading(true));
		_fetchUsers(token).then((resp) => {
			if (Array.isArray(resp?.users)) {
				dispatch(usersSetData(resp.users));
			}
			resolve(resp)
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(usersSetLoading(false));
		})
	})
};
export const editUser = (id, formData) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth;
		dispatch(usersSetLoading(true));
		_editUser(id, formData, token).then((resp) => {
			dispatch(fetchUsers());
			resolve(resp);
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(usersSetLoading(false));
		})
	})
};