import { CANDIDATES_LOADING, CANDIDATES_SET_DATA, CANDIDATES_SET_DETAILS } from "./constants";
import { _fetchCandidates, _createCandidate, _deleteCandidate, _changeCandidate, _editCandidate, _fetchCandidateDetails, _sendInvitation, _submitReview } from "./services";
import { fetchInterviewDetails } from "../interviews/actions";
export function candidatesSetLoading(loading) {
	return {
		type: CANDIDATES_LOADING,
		payload: loading
	};
}
export function candidatesSetData(params) {
	return {
		type: CANDIDATES_SET_DATA,
		payload: params
	};
}
export function candidatesSetDetails(params) {
	return {
		type: CANDIDATES_SET_DETAILS,
		payload: params
	};
}
export const fetchCandidates = (status) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth;
		dispatch(candidatesSetLoading(true));
		_fetchCandidates(status, token).then((resp) => {
			if (Array.isArray(resp?.candidates)) {
				let key = "";
				if(status === "open"){
					key = "openCandidates"
				}else if (status === "closed"){
					key = "closedCandidates"
				}else if (status === "on_hold"){
					key = "onHoldCandidates"
				}
				dispatch(candidatesSetData({data: resp.candidates, key}));
			}
			resolve(resp)
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(candidatesSetLoading(false));
		})
	})
};
export const createCandidate = (formData) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth;
		dispatch(candidatesSetLoading(true));
		_createCandidate(formData, token).then((resp) => {
			dispatch(fetchInterviewDetails(formData.interviewId));
			resolve(resp);
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(candidatesSetLoading(false));
		})
	})
};
export const deleteCandidate = (id) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth;
		dispatch(candidatesSetLoading(true));
		_deleteCandidate(id, token).then((resp) => {
			dispatch(fetchCandidates());
			resolve(resp);
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(candidatesSetLoading(false));
		})
	})
};
export const editCandidate = (id, formData) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth;
		dispatch(candidatesSetLoading(true));
		_editCandidate(id, formData, token).then((resp) => {
			dispatch(fetchCandidateDetails(id));
			dispatch(fetchInterviewDetails(formData.interviewId));
			resolve(resp);
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(candidatesSetLoading(false));
		})
	})
};
export const fetchCandidateDetails = (id) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth;
		dispatch(candidatesSetLoading(true));
		_fetchCandidateDetails(id, token).then((resp) => {
			dispatch(candidatesSetDetails(resp.candidate));
			resolve(resp)
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(candidatesSetLoading(false));
		})
	})
};
export const sendInvitation = (id, interviewId) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth;
		dispatch(candidatesSetLoading(true));
		_sendInvitation(id, token).then((resp) => {
			dispatch(fetchInterviewDetails(interviewId));
			resolve(resp);
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(candidatesSetLoading(false));
		})
	})
};
export const submitReview = (id, formData) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth;
		dispatch(candidatesSetLoading(true));
		_submitReview(id, formData, token).then((resp) => {
			dispatch(fetchCandidateDetails(id));
			dispatch(fetchInterviewDetails(formData.interviewId));
			resolve(resp);
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(candidatesSetLoading(false));
		})
	})
};