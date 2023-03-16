import React from "react";

const FamiliarizeStep = ({ step, setStep }) => {
  
  return (
    <div className="my-5">
      <p>
        This video interview will last 4-9 mins. Before proceeding check your
        internet connectivity, webcam and audio settings
      </p>

      <div>
          <img height={"300px"} src="/assets/images/familiarize.png" alt="" />
      </div>
      

      <div className="d-flex justify-content-center mb-3 mt-5">
        <button
          onClick={() => setStep(step + 1)}
          className="btn btn-primary checkCam"
        >
          Start Practice Interview
        </button>
      </div>
    </div>
  );
};

export default FamiliarizeStep;
