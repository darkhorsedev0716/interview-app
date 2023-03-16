import { MANAGERS_LOADING, MANAGERS_SET_DATA } from "./constants";
import { _fetchManagers, _createManager, _deleteManager, _editManager } from "./services";

export function managersSetLoading(loading) {
	return {
		type: MANAGERS_LOADING,
		payload: loading
	};
}
export function managersSetData(params) {
	return {
		type: MANAGERS_SET_DATA,
		payload: params
	};
}
export const fetchManagers = () => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth;
		dispatch(managersSetLoading(true));
		_fetchManagers(token).then((resp) => {
			if (Array.isArray(resp?.users)) {
				dispatch(managersSetData(resp.users));
			}
			resolve(resp)
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(managersSetLoading(false));
		})
	})
};
export const createManager = (formData) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth;
		dispatch(managersSetLoading(true));
		_createManager(formData, token).then((resp) => {
			dispatch(fetchManagers());
			resolve(resp);
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(managersSetLoading(false));
		})
	})
};
export const deleteManager = (id) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth;
		dispatch(managersSetLoading(true));
		_deleteManager(id, token).then((resp) => {
			dispatch(fetchManagers());
			resolve(resp);
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(managersSetLoading(false));
		})
	})
};
export const editManager = (id, formData) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth;
		dispatch(managersSetLoading(true));
		_editManager(id, formData, token).then((resp) => {
			dispatch(fetchManagers());
			resolve(resp);
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(managersSetLoading(false));
		})
	})
};