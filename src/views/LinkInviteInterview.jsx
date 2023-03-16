import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import Header from "../components/candidate-interview/Header";
import InterviewSteps from "../components/candidate-interview/InterviewSteps";
import Context from "../context";

const LinkInviteInterview = () => {
    const { token } = useParams();
  const { fetchInterviewDetails } = useContext(Context);

  useEffect(() => {
    const load = async () => {
      await fetchInterviewDetails(token);
    };

    load();
  }, []);
  return (
    <div>
      <Header title="Hiiree"/>
      <div className="container">
        <InterviewSteps form={true} />
      </div>
    </div>
  );
};

export default LinkInviteInterview;
