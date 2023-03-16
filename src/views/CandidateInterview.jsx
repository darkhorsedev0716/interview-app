import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/candidate-interview/Header";
import InterviewSteps from "../components/candidate-interview/InterviewSteps";
import Context from "../context";

const CandidateInterview = () => {
  const { token } = useParams();
  const {  fetchCandidateDetails } =
    useContext(Context);

  useEffect(() => {
    const load = async () => {
      await fetchCandidateDetails(token);
    };

    load();
  }, []);

  return (
    <div>
    <Header title="Hiiree"/>
    <div className="container">
      <InterviewSteps  />
    </div>
  </div>);
};

export default CandidateInterview;



