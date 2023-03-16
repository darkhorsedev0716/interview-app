import React, { useState } from "react";
import ConfirmAudioStep from "./interview/ConfirmAudioStep";
import CorrectDetailsStep from "./interview/CorrectDetailsStep";
import FamiliarizeStep from "./interview/FamiliarizeStep";
import InterviewStep from "./interview/InterviewStep";
import PracticeInterviewStep from "./interview/PracticeInterviewStep";
import PreInterviewStep from "./interview/PreInterviewStep";
import SuccessStep from "./interview/SuccessStep";
import WelcomeStep from "./interview/WelcomeStep";

import { isSafari } from "react-device-detect";
import { useEffect } from "react";

const InterviewSteps = ({ form }) => {
  const [step, setStep] = useState(0);

  const first = form ? (
    <CorrectDetailsStep step={step} setStep={setStep} />
  ) : (
    <WelcomeStep step={step} setStep={setStep} />
  );

  const steps = [
    first,
    <ConfirmAudioStep step={step} setStep={setStep} />,
    <FamiliarizeStep step={step} setStep={setStep} />,
    <PracticeInterviewStep step={step} setStep={setStep} />,
    <PreInterviewStep step={step} setStep={setStep} />,
    <InterviewStep step={step} setStep={setStep} />,
    <SuccessStep />,
  ];

  useEffect(() => {
    if (isSafari) {
      alert(
        "Please enable MediaRecorder on your safari browser...you can follow the 'Safari Guide' to do so"
      );
    }
  }, []);

  return (
    <div className="my-5">
      <div className="row">
        <h3 className="col-8">Candidate Portal</h3>
        {isSafari && (
          <a
            target="_blank"
            rel="noreferrer"
            className="col-2"
            href="https://www.educative.io/edpresso/how-to-enable-the-mediarecorder-api-for-safari"
          >
            Safari Guide
          </a>
        )}
      </div>
      {steps[step]}
    </div>
  );
};

export default InterviewSteps;
