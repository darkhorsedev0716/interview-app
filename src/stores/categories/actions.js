import { CATEGORIES_LOADING, CATEGORIES_SET_DATA } from "./constants";
import { _fetchCategories, _createCategory, _deleteCategory, _changeCategory, _editCategory } from "./services";

export function categoriesSetLoading(loading) {
	return {
		type: CATEGORIES_LOADING,
		payload: loading
	};
}
export function categoriesSetData(params) {
	return {
		type: CATEGORIES_SET_DATA,
		payload: params
	};
}
export const fetchCategories = () => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth;
		dispatch(categoriesSetLoading(true));
		_fetchCategories(token).then((resp) => {
			if (Array.isArray(resp?.categories)) {
				dispatch(categoriesSetData(resp.categories));
			}
			resolve(resp)
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(categoriesSetLoading(false));
		})
	})
};
export const createCategory = (formData) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth;
		dispatch(categoriesSetLoading(true));
		_createCategory(formData, token).then((resp) => {
			dispatch(fetchCategories());
			resolve(resp);
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(categoriesSetLoading(false));
		})
	})
};
export const deleteCategory = (id) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth;
		dispatch(categoriesSetLoading(true));
		_deleteCategory(id, token).then((resp) => {
			dispatch(fetchCategories());
			resolve(resp);
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(categoriesSetLoading(false));
		})
	})
};
export const editCategory = (id, formData) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth;
		dispatch(categoriesSetLoading(true));
		_editCategory(id, formData, token).then((resp) => {
			dispatch(fetchCategories());
			resolve(resp);
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(categoriesSetLoading(false));
		})
	})
};