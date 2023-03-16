import { QUESTIONS_LOADING, QUESTIONS_SET_DATA } from "./constants";
import { _fetchQuestions, _createQuestion, _deleteQuestion, _changeQuestion, _editQuestion } from "./services";

export function questionsSetLoading(loading) {
	return {
		type: QUESTIONS_LOADING,
		payload: loading
	};
}
export function questionsSetData(params) {
	return {
		type: QUESTIONS_SET_DATA,
		payload: params
	};
}
export const fetchQuestions = () => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth;
		dispatch(questionsSetLoading(true));
		_fetchQuestions(token).then((resp) => {
			if (Array.isArray(resp?.questions)) {
				dispatch(questionsSetData(resp.questions));
			}
			resolve(resp)
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(questionsSetLoading(false));
		})
	})
};
export const createQuestion = (formData) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth;
		dispatch(questionsSetLoading(true));
		_createQuestion(formData, token).then((resp) => {
			dispatch(fetchQuestions());
			resolve(resp);
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(questionsSetLoading(false));
		})
	})
};
export const deleteQuestion = (id) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth;
		dispatch(questionsSetLoading(true));
		_deleteQuestion(id, token).then((resp) => {
			dispatch(fetchQuestions());
			resolve(resp);
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(questionsSetLoading(false));
		})
	})
};
export const editQuestion = (id, formData) => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		const {token} = getState().auth;
		dispatch(questionsSetLoading(true));
		_editQuestion(id, formData, token).then((resp) => {
			dispatch(fetchQuestions());
			resolve(resp);
		}).catch(err => {
			reject(err);
		}).finally(() => {
			dispatch(questionsSetLoading(false));
		})
	})
};