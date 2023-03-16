import React, { useContext, useState } from "react";
import Context from "../../../context";

const PreInterviewStep = ({ step, setStep }) => {
  const { setState, state } = useContext(Context);
  const [isCheck, setIsCheck] = useState(false);
  const [inits, setInits] = useState("");

  return (
    <div className="my-5">
      <p className="my-3">Well done, {state?.candidate?.name}</p>

      <p>
        You are now ready to start your interview. If you need more time you can
        exit and come back later to finish your interview before deadline. Click{" "}
        <strong style={{cursor:"pointer"}} onClick={()=>setStep(2)}>here</strong> if you want to repeat the practice test.
      </p>

      <p className="my-3">Before you proceed please confirm the following</p>

      <p>
        I understand this video is being recorded and 'Start Interview' button
        below is a one time click option i.e. once I click I would not be able
        to pause, stop or repeat the interview. If the interview is not
        successfully submitted for any reason, it will be considerred cancelled.
      </p>

      <div className="d-flex">
        <input
          checked={isCheck}
          onChange={(e) => setIsCheck(e.target.checked)}
          type="checkbox"
          name=""
          className="mt-2"
        />
        <label htmlFor="internet" className="py-0 m-0 mx-2">
          Please click the box and enter your initials below to confirm that you
          you understood & agree with the above statement & all terms and
          conditions.
        </label>
      </div>

      <div
        style={{ flexDirection: "column" }}
        className="d-flex flex-col align-items-center justify-content-center mb-3 mt-5"
      >
        <input
          type="text"
          value={state?.initials || ""}
          onChange={(e) => {
            setInits(e.target.value);
            setState((prev) => ({ ...prev, initials: e.target.value }));
          }}
          className="form-control my-2 py-2"
          style={{ width: "300px", fontSize: "20px", textAlign: "center" }}
        />
        <button
          disabled={!isCheck || inits === "" ? true : false}
          onClick={() => setStep(step + 1)}
          className="btn btn-primary checkCam my-4"
        >
          Start My Interview
        </button>
      </div>
    </div>
  );
};

export default PreInterviewStep;
