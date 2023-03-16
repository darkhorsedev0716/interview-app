import React, { useContext, useRef, useState } from "react";
import moment from "moment";
import Context from "../../../context";

const CorrectDetailsStep = ({ step, setStep }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [checkInfo, setCheckInfo] = useState(false);
  const [resume, setResume] = useState(null);
  const [checkTerms, setCheckTerms] = useState(false);

  const { addCandidate, state } = useContext(Context);

  const fileRef = useRef();

  const handleSubmitDetails = async () => {
    //!resume || 
    // and resume uploaded
    if (email === "" || name === "" || phone === "") {
      alert("Make sure all fields are filled");
      return;
    }

    let emailRegEx =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    if (!email.match(emailRegEx)) {
      alert("Invalid email");
      return;
    }

    let {
      interview: { _id },
    } = state;

    // const obj = {
    //   name: name,
    //   email: email,
    //   phone: phone,
    //   additionalDetails: "Test Data",
    //   interviewId: _id,
    //   deadline: "15/01/2022",
    // };

    const formdata = new FormData();
    if(resume){
      formdata.append("files", resume);
    }
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("phone", phone);
    formdata.append("additionalDetails", "Test Data");
    formdata.append("interviewId", _id);
    formdata.append("deadline", "15/01/2022");

    const result = await addCandidate(formdata);
    if (result.success) {
      setStep(step + 1);
    } else {
      alert(result.error.response.data.message);
    }
  };
  return (
    <div className="mt-3">
      <p>Hi There</p>
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

      <div className="my-4">
        <h6>Please update your details below to continue</h6>
        {state.loading ? (
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <>
            {state?.candidate?._id ? (
              <div>
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
              </div>
            ) : (
              <div className="form col col-12 col-sm-10 col-md-8 col-lg-6">
                <div className="my-3">
                  <label htmlFor="name" className="form-label">
                    Upload your resume
                  </label>
                  <div
                    onClick={() => fileRef.current.click()}
                    className="file-upload"
                  >
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
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="examble@gmail.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone number
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    name="phone"
                    id="phone"
                    className="form-control"
                    placeholder="+13456677777"
                  />
                </div>
              </div>
            )}
          </>
        )}
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
          <span className="mx-3 ">
            {moment(state?.interview?.completionDate).format("MM/DD/YYYY")}
          </span>
        </h6>
      </div>
      <p>
        This is the date untill when you should complete and submit your video
        ineterview
      </p>

      <button
        disabled={!checkInfo || !checkTerms ? true : false}
        onClick={handleSubmitDetails}
        className="btn btn-success"
      >
        Continue
      </button>
    </div>
  );
};

export default CorrectDetailsStep;
