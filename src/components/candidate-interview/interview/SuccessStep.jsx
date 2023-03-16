import React from "react";

const SuccessStep = () => {
  return (
    <div>
      <h1 className="text-center">Well done</h1>
      <p className="my-4 text-center">You have completed your interview</p>

      <div className="d-flex justify-content-center">
        <a href="https://hiiree.com" className="btn text-center btn-success">
          Exit
        </a>
      </div>
    </div>
  );
};

export default SuccessStep;
