import React, { useContext, useRef, useState } from "react";
import Context from "../../../context";
import moment from "moment";

const WelcomeStep = ({ step, setStep }) => {
  const { state, upDateCandidate } = useContext(Context);
  const [checkInfo, setCheckInfo] = useState(false);
  const [checkTerms, setCheckTerms] = useState(false);

  const [resume, setResume] = useState(null);

  const fileRef = useRef();

  const handleContinue = async () => {
    // if (!resume) {
    //   alert("Please upload your resume!");
    //   return;
    // }
    if(resume){
      const { _id  } = state.candidate
      const formdata = new FormData();
      formdata.append("files", resume);
      const result = await upDateCandidate(formdata, _id);
  
      if (result.success) {
        setStep(step + 1);
      } else {
        alert(result.error.response.data.message);
      }
    }else{
      setStep(step + 1);
    }
  };

  return (
    <div className="mt-3">
      <p>Hi {state?.candidate?.name}</p>
      <p>
        Thank you for your interest in{" "}
        <span className="h5">{state?.interview?.title}</span> position at{" "}
        {state?.interview?.location}. Here you can record the interview for this
        position.
      </p>
      <p>
        Before proceeding to your scheduled video interview, please verify your
        following personal information
      </p>
      {state.loading ? (
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      ) : (
        <table className="my-4">
          <tr>
            <td>
              <h6>Name</h6>
            </td>
            <td className="px-3">
              <h6>{state?.candidate?.name}</h6>
            </td>
          </tr>
          <tr>
            <td>
              <h6>Email</h6>
            </td>
            <td className="px-3">
              <h6>{state?.candidate?.email}</h6>
            </td>
          </tr>
          <tr>
            <td>
              <h6>Phone</h6>
            </td>
            <td className="px-3">
              <h6>{state?.candidate?.phone}</h6>
            </td>
          </tr>
          <tr>
            <td>
              <h6>Interview Title</h6>
            </td>
            <td className="px-3">
              <h6>{state?.interview?.title}</h6>
            </td>
          </tr>
        </table>
      )}

      <div className="my-3">
        <label htmlFor="name" className="form-label">
          Upload your resume
        </label>
        <div onClick={() => fileRef.current.click()} className="file-upload">
          {resume?.name ? resume.name : "Click here to upload"}
        </div>
        <input
          type="file"
          style={{ display: "none" }}
          onChange={(e) => setResume(e.target.files[0])}
          ref={fileRef}
          accept=".pdf,.doc"
        />
      </div>

      <div className="d-flex align-items-center">
        <input
          id="check"
          type="checkbox"
          name=""
          checked={checkInfo}
          onChange={(e) => setCheckInfo(e.target.checked)}
          className="form-controll mt-1"
        />
        <label htmlFor="check" className="py-0 m-0 mx-2">
          I verify that the above information is correct
        </label>
      </div>
      <div className="d-flex align-items-center">
        <input
          id="terms"
          type="checkbox"
          name=""
          checked={checkTerms}
          onChange={(e) => setCheckTerms(e.target.checked)}
          className="form-controll mt-1"
        />
        <label htmlFor="terms" className="py-0 m-0 mx-2">
          I have read and understood all <a href="https://hiiree.com/terms.html" target="_blank">terms and conditions</a>{" "}
          and agree with them all
        </label>
      </div>
      <div className="d-flex mt-3 align-items-center">
        <h6 className="">Deadline:</h6>
        <h6>
          <span className="mx-3 ">{moment(state?.interview?.completionDate).format("MM/DD/YYYY")}</span>
        </h6>
      </div>
      <p>
        This is the date untill when you should complete and submit your video
        ineterview
      </p>

      <button
        disabled={
          !state?.candidate?._id || !state?.interview?._id || !checkInfo || !checkTerms
            ? true
            : false
        }
        onClick={handleContinue}
        className="btn btn-success"
      >
        Continue
      </button>
    </div>
  );
};

export default WelcomeStep;
