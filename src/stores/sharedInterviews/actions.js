import { SHARED_INTERVIEW_LOADING, SHARED_INTERVIEW_SET_DATA, SHARED_INTERVIEW_SET_DETAILS, SHARED_INTERVIEW_SET_BASIC_DETAILS } from "./constants";
import { _fetchSharedInterviews, _createSharedInterview, _deleteSharedInterview, _editSharedInterview, _fetchSharedInterviewDetails, _fetchSharedInterviewDetailsPublic } from "./services";

export function sharedInterviewSetLoading(loading) {
	return {
		type: SHARED_INTERVIEW_LOADING,
		payload: loading
	};
}
export function sharedInterviewSetData(params) {
	return {
		type: SHARED_INTERVIEW_SET_DATA,
		payload: params
	};
}
export function sharedInterviewSetDetails(params) {
	return {
		type: SHARED_INTERVIEW_SET_DETAILS,
		payload: params
	};
}
export function sharedInterviewSetBasicDetails(params) {
	return {
		type: SHARED_INTERVIEW_SET_BASIC_DETAILS,
		payload: params
	};
}
export const fetchSharedInterviews = () => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth;
		dispatch(sharedInterviewSetLoading(true));
		_fetchSharedInterviews(token).then((resp) => {
			if (Array.isArray(resp?.sharedInterviews)) {
				dispatch(sharedInterviewSetData(resp.sharedInterviews));
			}
			resolve(resp)
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(sharedInterviewSetLoading(false));
		})
	})
};
export const createSharedInterview = (formData) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth;
		dispatch(sharedInterviewSetLoading(true));
		_createSharedInterview(formData, token).then((resp) => {
			dispatch(fetchSharedInterviews());
			resolve(resp);
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(sharedInterviewSetLoading(false));
		})
	})
};
export const deleteSharedInterview = (id) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth;
		dispatch(sharedInterviewSetLoading(true));
		_deleteSharedInterview(id, token).then((resp) => {
			dispatch(fetchSharedInterviews());
			resolve(resp);
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(sharedInterviewSetLoading(false));
		})
	})
};
export const editSharedInterview = (id, formData) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth;
		dispatch(sharedInterviewSetLoading(true));
		_editSharedInterview(id, formData, token).then((resp) => {
			dispatch(fetchSharedInterviews());
			resolve(resp);
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(sharedInterviewSetLoading(false));
		})
	})
};
export const fetchSharedInterviewDetails = (id, formData) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth;
		dispatch(sharedInterviewSetLoading(true));
		_fetchSharedInterviewDetails(id, formData, token).then((resp) => {
			if (resp?.sharedInterview) {
				dispatch(sharedInterviewSetDetails(resp.sharedInterview));
			}
			resolve(resp)
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(sharedInterviewSetLoading(false));
		})
	})
};
export const fetchSharedInterviewDetailsPublic = (id) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		dispatch(sharedInterviewSetLoading(true));
		_fetchSharedInterviewDetailsPublic(id).then((resp) => {
			dispatch(sharedInterviewSetBasicDetails(resp));
			resolve(resp)
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(sharedInterviewSetLoading(false));
		})
	})
};