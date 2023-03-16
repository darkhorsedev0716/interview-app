import { useState } from "react";
import {  Link } from "react-router-dom";
import ForgotPasswordModal from "../components/sign-in/ForgotPasswordModal";

//redux
import { connect } from "react-redux";
import { checkLogin } from "../stores/auth/actions";

//helpers
import { showAlert } from "../helpers/";

import "../custom-styles/signin.css";

function SignIn(props) {

  const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [btnLoading, setBtnLoading] = useState(false);

  const onSubmit = async (e) => {
    try {
      setBtnLoading(true);
      e.preventDefault();
      await props.checkLogin(credentials);
      // navigate("/dashboard")
    } catch (err) {
      let message = "Invalid Email/Password";
      if (err?.response?.data?.message) {
        message = err?.response?.data?.message;
      }
      showAlert({ title: "Error!", message, type: "danger" });
    } finally {
      setBtnLoading(false);
    }
  };

  const onForgotPasswordClick = (e) => {
    e.preventDefault();
    setForgotPasswordModalOpen(true);
  };

  const onInputCredentials = (fieldName, value) => {
    setCredentials({
      ...credentials,
      [fieldName]: value,
    });
  };

  return (
    <div className="signin-container">
      <ForgotPasswordModal open={forgotPasswordModalOpen} onModalClose={() => { setForgotPasswordModalOpen(false) }} />
      <div className="signin-left">
        <h3>
          Transforming hiring process through <br /> video based interviews
        </h3>
        <p>Easy, efficient & better pre screening for hiring best talent</p>
        <p>Enterprise-grade security and compliance protects critical data</p>
        <div className="left-footer">
          <p>@ {new Date().getFullYear()} Hiiree</p>
          <div>
            <a href="https://hiiree.com/policy.html" target="_blank" rel="noopenner">
              Privacy
            </a>
            <a href="https://hiiree.com/terms.html" target="_blank" rel="noopenner">
              Legal
            </a>
            <a href="https://hiiree.com/#contact" target="_blank" rel="noopenner">
              Contact
            </a>
          </div>
        </div>
      </div>
      <div className="signin-right">
        <div className="abs-right">
          Don't have an account yet? <Link to="/sign-up">Sign Up!</Link>
        </div>
        <div className="form">
          <h3 className="form-title">Sign In</h3>
          <h6 className="form-sub-title">Enter your username and password</h6>
          <input onChange={e => { onInputCredentials("email", e.target.value) }} type="text" placeholder="User Name" />
          <input onChange={e => { onInputCredentials("password", e.target.value) }} type="password" placeholder="Password" />
          <div className="btn-cont">
            <div onClick={onForgotPasswordClick} className="forgot-pass">Forgot Password ?</div>
            <button onClick={onSubmit} disabled={btnLoading}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  token: state.auth.token,
});
const mapDispatchToProps = {
  checkLogin,
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
