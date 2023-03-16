import { INTERVIEWS_LOADING, INTERVIEWS_SET_DATA, INTERVIEWS_SET_DETAILS } from "./constants";
import { _fetchInterviews, _createInterview, _deleteInterview, _changeInterview, _editInterview, _fetchInterviewDetails, _generateLink } from "./services";

export function interviewsSetLoading(loading) {
	return {
		type: INTERVIEWS_LOADING,
		payload: loading
	};
}
export function interviewsSetData(params) {
	return {
		type: INTERVIEWS_SET_DATA,
		payload: params
	};
}
export function interviewsSetDetails(params) {
	return {
		type: INTERVIEWS_SET_DETAILS,
		payload: params
	};
}
export const fetchInterviews = (status) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth;
		dispatch(interviewsSetLoading(true));
		_fetchInterviews(status, token).then((resp) => {
			if (Array.isArray(resp?.interviews)) {
				let key = "";
				if(status === "open"){
					key = "openInterviews"
				}else if (status === "closed"){
					key = "closedInterviews"
				}else if (status === "on_hold"){
					key = "onHoldInterviews"
				}
				dispatch(interviewsSetData({data: resp.interviews, key}));
			}
			resolve(resp)
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(interviewsSetLoading(false));
		})
	})
};
export const createInterview = (formData) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth;
		dispatch(interviewsSetLoading(true));
		_createInterview(formData, token).then((resp) => {
			dispatch(fetchInterviews("open"));
			resolve(resp);
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(interviewsSetLoading(false));
		})
	})
};
export const deleteInterview = (id) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth;
		dispatch(interviewsSetLoading(true));
		_deleteInterview(id, token).then((resp) => {
			dispatch(fetchInterviews());
			resolve(resp);
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(interviewsSetLoading(false));
		})
	})
};
export const editInterview = (id, formData) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth;
		dispatch(interviewsSetLoading(true));
		_editInterview(id, formData, token).then((resp) => {
			dispatch(fetchInterviewDetails(id));
			resolve(resp);
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(interviewsSetLoading(false));
		})
	})
};
export const fetchInterviewDetails = (id) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth;
		dispatch(interviewsSetLoading(true));
		_fetchInterviewDetails(id, token).then((resp) => {
			dispatch(interviewsSetDetails(resp.interview));
			resolve(resp)
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(interviewsSetLoading(false));
		})
	})
};
export const generateLink = (id) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth;
		dispatch(interviewsSetLoading(true));
		_generateLink(id, token).then((resp) => {
			dispatch(fetchInterviewDetails(id));
			resolve(resp);
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(interviewsSetLoading(false));
		})
	})
};