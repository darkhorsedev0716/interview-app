import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {API_URL} from "./config/"
const Context = createContext();
export const ContextProvider = ({ children }) => {
  const [state, setState] = useState({
    loading: false,
    blobs: [],
    videos: [],
    candidate: {},
    interview: {},
    initials: "",
  });

  const addCandidate = async (details) => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const { data } = await axios.post(`${API_URL}candidate`, details);
      setState((prev) => ({
        ...prev,
        candidate: data.candidate,
        loading: false,
      }));
      return { success: true };
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false }));
      console.log({ error });
      return { success: false, error };
    }
  };

  const upDateCandidate = async (details, id) => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const { data } = await axios.post(
        `${API_URL}candidate/resumeupload/${id}`,
        details
      );

      console.log({ datattataat: data });
      setState((prev) => ({
        ...prev,
        candidate: data.candidate,
        loading: false,
      }));
      return { success: true };
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false }));
      console.log({ error });
      return { success: false, error };
    }
  };

  const submitInterviewAnswers = async (videos) => {
    const { interview, candidate } = state;
    console.log({ videos });
    try {
      let formData = new FormData();
      formData.append("interviewId", interview._id);
      formData.append("candidateId", candidate._id);

      for (let video of videos) {
        formData.append("files", video.blob);
        formData.append("questionId", video.questionId);
      }

      setState((prev) => ({ ...prev, loading: true }));
      const URL = `${API_URL}candidate/submit_answers/${candidate._id}`;
      // const URL = "http://localhost:5505/upload";
      const { data } = await axios.post(URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log({ data });
      setState((prev) => ({
        ...prev,
        loading: false,
      }));

      return data;
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false }));
      console.log({ error });
    }
  };

  const fetchInterviewDetails = async (token) => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const { data } = await axios.get(`${API_URL}interview/get/${token}`);
      if (data.interview === null) {
        alert("Interview link expired or invalid");
        window.location.href = "/";
      }
      setState((prev) => ({
        ...prev,
        interview: data.interview,
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false }));
      console.log({ error });
    }
  };

  const fetchCandidateDetails = async (token) => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const { data } = await axios.get(`${API_URL}candidate/invite/${token}`);

      if (data.candidate === null) {
        alert("Interview link expired or invalid");
        window.location.href = "/";
      }

      setState((prev) => ({
        ...prev,
        candidate: data.candidate,
        interview: data.candidate.interviewId,
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false }));
      console.log({ error });
    }
  };

  useEffect(() => {}, []);
  return (
    <Context.Provider
      value={{
        state,
        setState,
        addCandidate,
        fetchInterviewDetails,
        fetchCandidateDetails,
        submitInterviewAnswers,
        upDateCandidate,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const ContextConsumer = Context.Consumer;
export default Context;
